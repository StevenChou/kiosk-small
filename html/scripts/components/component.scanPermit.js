//Body
Vue.component('component-scanPermit-main', {
  template: '#template-scanPermit-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      megCode: 'putPermit',
      scanCount: 0,
      fixedCount: 5,
      enterCounter: 0,
      hiddenElRef: 'hiddenInput'
    };
  },
  methods: {
    clearScanData: function() {
      this.$refs[this.hiddenElRef].value = '';
    },
    focusScanData: function() {
      this.$refs[this.hiddenElRef].focus();
    },
    getScanData: function() {
      return this.$refs[this.hiddenElRef].value;
    },
    handleKeyUp: function() {
      let key = event.keyCode || event.which;

      if (key === 13) {
        if (++this.enterCounter === 2) {
          this.enterCounter = 0;
          this.validScanData() && this.showBarcode();
          // this.validScanData() && this.getPermitData();
        }
      }
    },
    validScanData: function() {
      // 判斷 SCAN 資料正確性
      // TODO 解析 this.getScanData()
      alert('>>> scan succ !!');
      return true;
    },
    showBarcode: function() {
      // for testing
      alert(this.getScanData());
      this.clearScanData();
      this.focusScanData();
    },
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    getPermitData: function() {
      this.scanCount++;

      if (this.scanCount === this.fixedCount) {
        kiosk.API.goToNext('error');
        return;
      }

      const scanPermit = this;
      //查詢移民署
      const postData = {
        passportNo: this.getScanData(),
        country: 'CN'
      };

      External.TradevanKioskCommon.CommonService.CallImm(
        JSON.stringify(postData),
        function(res) {
          // alert('>>> json string:' + res);
          const resObj = JSON.parse(res);
          // alert(
          //   '>>> 回傳資訊:' +
          //     resObj.result['message'] +
          //     '---' +
          //     resObj.result['status']
          // );

          // succ
          if (resObj && resObj.result['status'] === '000') {
            // [TESTING] 測試訊息
            // alert('>>> api成功');

            // scanPassportObj.lock = true;

            scanPermit.megCode = 'passportCerted';

            // global data --- 儲存護照相關資訊
            scanPermit.storeUserData(postData, resObj);
            // alert(
            //   '>>> 入境證旅客資訊:' + JSON.stringify(kiosk.app.$data.userData)
            // );

            scanPermit.megCode = 'permitCerting';
            setTimeout(function() {
              scanPermit.megCode = 'permitCerted';
              setTimeout(function() {
                kiosk.API.goToNext(scanPermit.wording['toPreScanQR']);
              }, 1000);
            }, 1000);
          } else {
            Swal.fire({
              type: 'error',
              title: '糟糕...',
              text: '移民署伺服器錯誤!',
              footer: '<a href>請通知客服~</a>'
            });
          }
        },
        function() {}
      );
    },
    storeUserData: function(passportObj, validationObj) {
      kiosk.app.$data.userData['passportNo'] = passportObj['passportNo'].split(
        '\r'
      )[0];
      kiosk.app.$data.userData['country'] = passportObj['country'];
      kiosk.app.$data.userData['inDate'] = validationObj.result['inDate']
        .split(' ')[0]
        .split('-')
        .join('');
      kiosk.app.$data.userData['idn'] = validationObj.result['idn'];
      kiosk.app.$data.userData['ename'] = validationObj.result['ename'];
      kiosk.app.$data.userData['dayAmtTotal'] =
        validationObj.result['dayAmtTotal'];
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanPermit;
    },
    infoData: function() {
      return this.megCode !== ''
        ? kiosk.wording[this.culture].scanPermit[this.megCode]
        : '';
    },
    btnSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 3:
          fontSize = 40;
          break;
        case 6:
          fontSize = 40;
          break;
        case 7:
          fontSize = 36;
          break;
        default:
          fontSize = 48;
      }
      return {
        fontSize: fontSize + 'px'
      };
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  },
  mounted: function() {
    this.focusScanData();
  },
  beforeDestroy: function() {},
  created: function() {
    kiosk.app.clearUserData();
  }
});

//Head
Vue.component('component-scanPermit-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  data: function() {
    return {
      cssRightBtn: {
        class1: 'nav',
        class2: 'navbar-nav',
        class3: 'navbar-right'
      },
      cssLeftBtn: {
        class1: 'nav',
        class2: 'navbar-nav',
        class3: 'navbar-left'
      }
    };
  },
  methods: {
    backBtn: function() {
      kiosk.API.goToNext('selectDoc');
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].common;
    },
    navHomeBtn: function() {
      return {
        textHome__en: this.culture === 1 ? true : false,
        textHome__tw: this.culture === 2 ? true : false,
        textHome__cn: this.culture === 13 ? true : false,
        textHome__jp: this.culture === 3 ? true : false,
        textHome__ko: this.culture === 4 ? true : false,
        textHome__es: this.culture === 7 ? true : false,
        textHome__th: this.culture === 5 ? true : false,
        textHome__vi: this.culture === 10 ? true : false
      };
    },
    navBtnSize: function() {
      return {
        nav__bar__en: this.culture === 1 ? true : false,
        nav__bar__tw: this.culture === 2 ? true : false,
        nav__bar__cn: this.culture === 13 ? true : false,
        nav__bar__jp: this.culture === 3 ? true : false,
        nav__bar__ko: this.culture === 4 ? true : false,
        nav__bar__es: this.culture === 7 ? true : false,
        nav__bar__th: this.culture === 5 ? true : false,
        nav__bar__vi: this.culture === 10 ? true : false
      };
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  }
});
