//Body
Vue.component('component-detail-main', {
  template: '#template-detail-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      rows: [],
      items: []
    };
  },
  mounted: function() {
    kiosk.app.$data.isScrollDisable = false;
  },
  destroyed: function() {
    kiosk.app.$data.isScrollDisable = true;
  },
  methods: {
    // 千分位
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    handleItemMouseDown: function(index) {
      // alert('>>> index:' + index);
      this.rows[index].check = !this.rows[index].check;
    },
    handleItemDelete: function() {
      console.log('>>> clicked!!');
      var detailObj = this;
      this.rows = this.rows.filter(function(row) {
        // 刪除對應發票品項
        row.check &&
          (detailObj.items = detailObj.items.filter(function(item) {
            return item.invNo !== row.invNo;
          }));
        return !row.check;
      });

      // alert('>>> 刪除後的發票:' + JSON.stringify(this.rows));
      // alert('>>> 刪除後的品項:' + JSON.stringify(detailObj.items));
    },
    hasCheckProperty: function() {
      let isValid = true;
      kiosk.app.$data.invoiceNum.forEach(function(invoice) {
        if (invoice.check === undefined) {
          isValid = false;
        }
      });

      return isValid;
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].detail;
    },
    fontStyleRight: function() {
      const style = {};
      // alert('hihi' + this.culture);
      // 英文
      if (this.culture === 1) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '15px';
        style.top = '25px';
        // 繁體中文
      } else if (this.culture === 2) {
        style.fontSize = '24px';
        style.position = 'absolute';
        style.right = '65px';
        style.top = '20px';
        // 簡體中文
      } else if (this.culture === 13) {
        style.fontSize = '24px';
        style.position = 'absolute';
        style.right = '65px';
        style.top = '20px';
        // 日文
      } else if (this.culture === 3) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '30px';
        style.top = '15px';
        // 韓文
      } else if (this.culture === 4) {
        style.fontSize = '20px';
        style.position = 'absolute';
        style.right = '30px';
        style.top = '20px';
        // 西班牙語
      } else if (this.culture === 7) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '70px';
        style.top = '15px';
        // 泰語
      } else if (this.culture === 5) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '65px';
        style.top = '20px';
        // 越南語
      } else if (this.culture === 10) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '35px';
        style.top = '17px';
      }

      return style;
    },
    fontStyleLeft: function() {
      const style = {};
      // alert('hihi' + this.culture);
      // 英文
      if (this.culture === 1) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '100px';
        style.top = '25px';
        // 繁體中文
      } else if (this.culture === 2) {
        style.fontSize = '24px';
        style.position = 'absolute';
        style.right = '65px';
        style.top = '20px';
        // 簡體中文
      } else if (this.culture === 13) {
        style.fontSize = '24px';
        style.position = 'absolute';
        style.right = '65px';
        style.top = '20px';
        // 日文
      } else if (this.culture === 3) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '30px';
        style.top = '15px';
        // 韓文
      } else if (this.culture === 4) {
        style.fontSize = '20px';
        style.position = 'absolute';
        style.right = '90px';
        style.top = '20px';
        // 西班牙語
      } else if (this.culture === 7) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '30px';
        style.top = '15px';
        // 泰語
      } else if (this.culture === 5) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '65px';
        style.top = '20px';
        // 越南語
      } else if (this.culture === 10) {
        style.fontSize = '18px';
        style.position = 'absolute';
        style.right = '35px';
        style.top = '15px';
      }

      return style;
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  },
  mounted: function() {
    // console.log('>>>[mounted] detail');
    if (this.hasCheckProperty()) {
      this.rows = kiosk.app.$data.invoiceNum;
      this.items = kiosk.app.$data.invoiceItems;
    } else {
      Swal.fire({
        type: 'error',
        title: '糟糕...',
        text: '發票格式錯誤!',
        footer: '<a href>請通知客服~</a>'
      });
    }
  },
  beforeDestroy: function() {
    // console.log('>>>[beforeDestroy] detail');
    kiosk.app.$data.invoiceNum = this.rows;
    kiosk.app.$data.invoiceItems = this.items;
  }
});
