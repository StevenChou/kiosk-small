//Body
Vue.component('component-sign-main', {
  template: '#template-sign-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: false,
      context: null,
      point: {},
      timer: 59,
      timeoutCount: 0,
      myInterval: null,
      myCanvas: null
    };
  },
  methods: {
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    clearCanvas: function() {
      this.myCanvas.width = this.myCanvas.width;
    },
    sendData: function() {
      this.handleMouseDown(this.wording.toSuccess);
    },
    download: function() {
      var data = {
        taxAppNo: kiosk.app.$data.userData['taxAppNo'],
        sign: this.myCanvas.toDataURL().split(',')[1]
      };

      Swal.fire({
        title:
          '<span style="font-size: 24px;">' +
          kiosk.wording[this.culture].scanQRcode.dataProcess +
          '</span>',
        html:
          '<div style="margin-top: 15px; margin-left: 25px;" class="lds-dual-ring"></div>',
        showConfirmButton: false,
        allowOutsideClick: false
      });

      const signObj = this;
      External.TradevanKioskCommon.CommonService.Sign(
        JSON.stringify(data),
        function(res) {
          Swal.close();
          signObj.handleMouseDown(signObj.wording.toSuccess);
        }.bind(this),
        function() {}
      );
    },
    onDocumentTouchMove: function(event) {
      if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX;
        mouseY = event.touches[0].pageY;
      }
    },
    addClick: function(x, y, dragging) {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
    },
    redraw: function() {
      this.context.strokeStyle = '#584843';
      this.context.lineJoin = 'round';
      this.context.lineWidth = 5;
      while (this.clickX.length > 0) {
        this.point.bx = this.point.x;
        this.point.by = this.point.y;
        this.point.x = this.clickX.pop();
        this.point.y = this.clickY.pop();
        this.point.drag = this.clickDrag.pop();
        this.context.beginPath();
        if (this.point.drag && this.point.notFirst) {
          this.context.moveTo(this.point.bx, this.point.by);
        } else {
          this.point.notFirst = true;
          this.context.moveTo(this.point.x - 1, this.point.y);
        }
        this.context.lineTo(this.point.x, this.point.y);
        this.context.closePath();
        this.context.stroke();
      }
    },
    countdown: function() {
      this.myInterval = setInterval(
        function() {
          if (this.timer === 0) {
            this.timer = 59;
            this.timeoutCount++;
            if (this.timeoutCount >= 2) {
              kiosk.API.goToNext('error');
            }
          } else {
            this.timer--;
          }
        }.bind(this),
        1000
      );
    },
    dateFormat: function() {
      const current_datetime = new Date();
      return (
        current_datetime.getFullYear() +
        '_' +
        (current_datetime.getMonth() + 1) +
        '_' +
        current_datetime.getDate()
      );
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].sign;
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  },
  mounted: function() {
    var signComponent = this;
    var canvasDiv = document.getElementById('canvasDiv');
    var canvas = document.createElement('canvas');
    this.myCanvas = canvas;
    var screenwidth = window.innerWidth > 0 ? window.innerWidth : screen.width;

    var canvasWidth = 980;
    var canvasHeight = 320;
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);

    this.point.notFirst = false;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    this.context = canvas.getContext('2d');

    canvas.addEventListener('touchstart', function(e) {
      var mouseX = e.touches[0].pageX - this.offsetLeft;
      var mouseY = e.touches[0].pageY - this.offsetTop;
      signComponent.paint = true;
      signComponent.addClick(
        e.touches[0].pageX - this.offsetLeft,
        e.touches[0].pageY - this.offsetTop
      );

      signComponent.redraw();
    });

    canvas.addEventListener('pointerdown', function(e) {
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
      signComponent.paint = true;
      signComponent.addClick(
        e.pageX - this.offsetLeft,
        e.pageY - this.offsetTop
      );

      signComponent.redraw();
    });

    canvas.addEventListener('touchend', function(e) {
      signComponent.paint = false;
    });

    canvas.addEventListener('pointerup', function(e) {
      signComponent.paint = false;
    });

    canvas.addEventListener(
      'touchmove',
      function(e) {
        if (signComponent.paint) {
          addClick(
            e.touches[0].pageX - this.offsetLeft,
            e.touches[0].pageY - this.offsetTop,
            true
          );
          signComponent.redraw();
        }
      },
      { passive: false }
    );

    canvas.addEventListener(
      'pointermove',
      function(e) {
        if (signComponent.paint) {
          signComponent.addClick(
            e.pageX - this.offsetLeft,
            e.pageY - this.offsetTop,
            true
          );
          signComponent.redraw();
        }
      },
      { passive: false }
    );

    this.countdown();
  },
  created: function() {},
  destroyed: function() {
    clearInterval(this.myInterval);
  }
});
