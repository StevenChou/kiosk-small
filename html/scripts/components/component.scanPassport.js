//Body
Vue.component('component-scanPassport-main', {
  template: '#template-scanPassport-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      lock: false,
      myInterval: null,
      megCode: '',
      scanCount: 0,
      fixedCount: 5,
      isGet: false,
      openTimer: null,
      passportTimer: null,
      lockBlock: false
    };
  },
  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    storeUserData: function(passportObj, validationObj) {
      kiosk.app.$data.userData['passportNo'] = passportObj['DocumentNo'];
      kiosk.app.$data.userData['country'] = passportObj['Nationality'];
      kiosk.app.$data.userData['inDate'] = validationObj.result['inDate']
        .split(' ')[0]
        .split('-')
        .join('');
      kiosk.app.$data.userData['idn'] = validationObj.result['idn'];
      kiosk.app.$data.userData['ename'] = validationObj.result['ename'];
      kiosk.app.$data.userData['dayAmtTotal'] =
        validationObj.result['dayAmtTotal'];
    },
    keepScanData: function() {
      this.passportTimer = setInterval(this.getPassportData, 4000);
    },
    callImmigration: function(passportData) {
      const scanPassportObj = this;
      //查詢移民署
      const postData = {
        passportNo: passportData['DocumentNo'],
        country: passportData['Nationality']
      };

      try {
        External.TradevanKioskCommon.CommonService.CallImm(
          JSON.stringify(postData),
          function(res) {
            //alert('>>> json string:' + res);
            const resObj = JSON.parse(res);
            alert(
              '>>> 移民署回傳資訊:' +
                resObj.result['message'] +
                '---' +
                resObj.result['status']
            );

            // succ
            if (resObj && resObj.result['status'] === '000') {
              try {
                scanPassportObj.isGet = true;
                scanPassportObj.megCode = 'passportCerted';

                // global data --- 儲存護照相關資訊
                scanPassportObj.storeUserData(passportData, resObj);

                setTimeout(function() {
                  kiosk.API.goToNext(scanPassportObj.wording['toPreScanQR']);
                }, 1500);
              } catch (error) {
                alert('>>> 移民署無法導頁' + error);
              }
            } else {
              scanPassportObj.scanCount++;
              scanPassportObj.lockBlock = false;

              if (scanPassportObj.scanCount === scanPassportObj.fixedCount) {
                kiosk.API.goToNext('error');
                return;
              }
            }
          },
          function() {
            alert('>>> 移民署連線錯誤!!');
          }
        );
      } catch (err) {
        alert('>>> 移民署資料查詢失敗：' + err);
      }
    },
    getPassportData: function(cb) {
      const scanPassportObj = this;

      if (scanPassportObj.isGet) {
        return clearInterval(scanPassportObj.passportTimer);
      }

      if (!scanPassportObj.lockBlock) {
        // 護照掃描中...
        scanPassportObj.megCode = 'scanPassportLoading';
        scanPassportObj.lockBlock = true;
        kiosk.API.Device.WFX.getData(
          function(res) {
            try {
              const passportData = JSON.parse(res['dataStr']);
              if (res['IsSuccess'] && passportData !== '') {
                // alert(
                //   '>>>keep passport data: ' +
                //     'DocumentNo:' +
                //     passportData['DocumentNo'] +
                //     ' --- ' +
                //     'Nationality:' +
                //     passportData['Nationality']
                // );

                //查詢移民署
                scanPassportObj.callImmigration(passportData);
              } else {
                scanPassportObj.lockBlock = false;
                if (cb) {
                  cb();
                }

                alert('>>>???keep 無法解析，重新呼叫取資料 API');
              }
            } catch (err) {
              scanPassportObj.lockBlock = false;
              alert(
                '>>>##keep err:' +
                  err +
                  ' --- ' +
                  '無法解析，重新呼叫取資料 API'
              );
              if (cb) {
                cb();
              }
            }
          },
          function(res) {
            alert('>>>$$keep error:' + JSON.stringify(res));
          }
        );
      }
    },
    startPassportScan: function() {
      this.getPassportData(this.keepScanData);
    },
    stopPassportScan: function() {
      kiosk.API.Device.WFX.stopGet(
        function(res) {
          alert('>>> closed scan passport:' + JSON.stringify(res));
        },
        function() {}
      );
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanPassport;
    },
    infoData: function() {
      return this.megCode !== ''
        ? kiosk.wording[this.culture].scanPassport[this.megCode]
        : '';
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  },
  mounted: function() {
    this.startPassportScan();
  },
  beforeDestroy: function() {
    // alert('釋放資源!!');
    this.stopPassportScan();
    //clearInterval(this.myInterval);
  },
  created: function() {
    kiosk.app.clearUserData();
  }
});

//Head
Vue.component('component-scanPassport-navBar', {
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
