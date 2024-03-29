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
      timer1: null,
      lockBlock: false,
      count: 0
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

      // [ 2020 新增 --- 退稅金額提醒 ]
      // 當日累計金額
      kiosk.app.$data.userData['dayAmtTotal'] =
        validationObj.result['dayAmtTotal'];
      // 年度累計金額
      kiosk.app.$data.userData['yearAmtTotal'] =
        validationObj.result['yearAmtTotal'];
      // 入境日累計金額
      kiosk.app.$data.userData['sumIndateAmt'] =
        validationObj.result['sumIndateAmt'];
    },
    keepScanData: function() {
      this.passportTimer = setInterval(this.getPassportData, 3000);
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
            // alert(
            //   '>>> 移民署回傳資訊:' +
            //     resObj.result['message'] +
            //     '---' +
            //     resObj.result['status']
            // );

            // succ
            if (resObj && resObj.result['status'] === '000') {
              try {
                scanPassportObj.isGet = true;
                scanPassportObj.megCode = 'passportCerted';

                // global data --- 儲存護照相關資訊
                scanPassportObj.storeUserData(passportData, resObj);

                if (scanPassportObj.varifyAmt()) {
                  scanPassportObj.timer1 = setTimeout(function() {
                    kiosk.API.goToNext(scanPassportObj.wording['toPreScanQR']);
                  }, 500);
                } else {
                  Swal.fire({
                    type: 'warning',
                    onClose: function() {
                      kiosk.API.goToNext('mainMenu');
                    },
                    width: 600,
                    // text: '此發票無法退稅，因為其中一筆品項不能退稅!',
                    html:
                      '<h3>' +
                      kiosk.wording[scanPassportObj.culture].scanPassport
                        .amtErr +
                      '</h3>',
                    showConfirmButton: false
                    // footer: '<a href>請通知客服~</a>'
                  });
                }
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
      // 打開 cb method
      kiosk.app.$data.passportBlock = false;

      if (scanPassportObj.isGet) {
        clearInterval(scanPassportObj.passportTimer);
        return;
      }
      // alert('>>>[檢查機制] timer 未關閉！！');
      if (!scanPassportObj.lockBlock) {
        scanPassportObj.lockBlock = true;
        // 護照掃描中...
        scanPassportObj.megCode = 'scanPassportLoading';
        // alert('>>>[檢查機制] count:' + ++this.count);

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
                if (!kiosk.app.$data.passportBlock) {
                  // alert('>>>[檢查機制] key1:' + kiosk.app.$data.passportBlock);
                  scanPassportObj.lockBlock = false;
                  if (cb) {
                    cb();
                  }

                  Swal.fire({
                    type: 'warning',
                    width: 600,
                    html:
                      '<h3 style="margin-bottom: 40px;">' +
                      kiosk.wording[scanPassportObj.culture].scanPassport
                        .errMeg1 +
                      '</h3>',
                    showConfirmButton: false
                  });
                }
              }
            } catch (err) {
              if (!kiosk.app.$data.passportBlock) {
                // alert('>>>[檢查機制] key2:' + kiosk.app.$data.passportBlock);
                scanPassportObj.lockBlock = false;

                Swal.fire({
                  type: 'warning',
                  width: 600,
                  html:
                    '<h3 style="margin-bottom: 40px;">' +
                    kiosk.wording[scanPassportObj.culture].scanPassport
                      .errMeg2 +
                    '</h3>',
                  showConfirmButton: false
                });

                if (cb) {
                  cb();
                }
              }
            }
          },
          function(res) {
            // alert('>>>$$keep error:' + JSON.stringify(res));
          }
        );
      }
    },
    varifyAmt: function() {
      //kiosk.app.$data.userData['sumIndateAmt'] = 777777;
      let isValid = true;
      isValid =
        isValid && parseFloat(kiosk.app.$data.userData['dayAmtTotal']) < 48000;
      isValid =
        isValid &&
        parseFloat(kiosk.app.$data.userData['sumIndateAmt']) < 120000;
      isValid =
        isValid &&
        parseFloat(kiosk.app.$data.userData['yearAmtTotal']) < 240000;
      return isValid;
    },
    startPassportScan: function() {
      const scanPassportObj = this;
      kiosk.API.Device.WFX.stopGet(
        function(res) {
          // alert('>>> closed first scan passport:' + JSON.stringify(res));
          scanPassportObj.getPassportData(scanPassportObj.keepScanData);
        },
        function() {}
      );
    },
    stopPassportScan: function() {
      kiosk.API.Device.WFX.stopGet(
        function(res) {
          // alert('>>> closed scan passport:' + JSON.stringify(res));
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
    },
    titleFontSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 3:
          fontSize = 54;
          break;
      }
      return this.culture === 3
        ? {
            fontSize: fontSize + 'px'
          }
        : {};
    },
    imgURL: function() {
      let url = 'img/';
      switch (this.culture) {
        case 1:
          url += 'Passport-EN.gif';
          break;
        case 2:
          url += 'Passport-TC.gif';
          break;
        case 13:
          url += 'Passport-SC.gif';
          break;
        case 3:
          url += 'Passport-JP.gif';
          break;
        default:
          url += 'Passport-KR.gif';
      }
      return url;
    }
  },
  mounted: function() {
    this.startPassportScan();
  },
  beforeDestroy: function() {
    clearInterval(this.passportTimer);
    clearInterval(this.timer1);
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
      kiosk.app.$data.passportBlock = true;
      kiosk.API.goToNext('selectDoc');
    },
    goHome: function() {
      kiosk.app.$data.passportBlock = true;
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
