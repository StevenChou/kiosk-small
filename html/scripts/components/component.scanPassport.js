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
      fixedCount: 5
    };
  },
  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    doInterval: function() {
      const scanPassportObj = this;
      if (!scanPassportObj.lock) {
        // 護照掃描中...
        scanPassportObj.megCode = 'scanPassportLoading';

        kiosk.API.Device.MMM.GetData(
          function(res) {
            if (!scanPassportObj.lock) {
              // alert('>>> 第 ' + (scanPassportObj.scanCount + 1) + '次掃描護照');
              scanPassportObj.lock = true;

              const jsonObj = JSON.parse(res['jsonStr']);
              if (
                jsonObj['nationality'] !== '' &&
                jsonObj['documentNumber'] !== ''
              ) {
                // 資料驗證中...
                scanPassportObj.megCode = 'passportCerting';

                // alert(
                //   '掃描成功!! >>>nationality:' +
                //     jsonObj['nationality'] +
                //     '--->>>documentNumber' +
                //     jsonObj['documentNumber']
                // );

                //查詢移民署
                const postData = {
                  passportNo: jsonObj['documentNumber'],
                  country: jsonObj['nationality']
                };
                External.TradevanKioskCommon.CommonService.CallImm(
                  JSON.stringify(postData),
                  function(res) {
                    //alert('>>> json string:' + res);
                    const resObj = JSON.parse(res);
                    // alert(
                    //   '>>> 回傳資訊:' +
                    //     resObj.result['message'] +
                    //     '---' +
                    //     resObj.result['status']
                    // );

                    // succ
                    if (resObj && resObj.result['status'] === '000') {
                      // alert('>>> api成功');
                      // scanPassportObj.lock = true;

                      scanPassportObj.megCode = 'passportCerted';

                      // global data --- 儲存護照相關資訊
                      scanPassportObj.storeUserData(jsonObj, resObj);

                      setTimeout(function() {
                        kiosk.API.goToNext(
                          scanPassportObj.wording['toPreScanQR']
                        );
                      }, 1500);
                    } else {
                      // alert('>>> 重新掃描');
                      scanPassportObj.lock = false;

                      scanPassportObj.scanCount++;

                      if (
                        scanPassportObj.scanCount === scanPassportObj.fixedCount
                      ) {
                        kiosk.API.goToNext('error');
                        scanPassportObj.lock = true;
                        return;
                      }

                      // setTimeout(function() {
                      //   kiosk.API.goToNext(
                      //     scanPassportObj.wording['toPreScanQR']
                      //   );
                      // }, 1000);
                    }
                  },
                  function() {
                    alert('>>> 移民署連線錯誤!!');
                  }
                );
              } else {
                // 掃描不到 ---> 要重新啟動護照機!!
                scanPassportObj.lock = false;
                scanPassportObj.scanCount++;
                if (scanPassportObj.scanCount === scanPassportObj.fixedCount) {
                  kiosk.API.goToNext('error');
                  scanPassportObj.lock = true;
                  return;
                }
              }
            }
          },
          function() {
            alert('關閉 passport !!');
          }
        );
      }
    },
    storeUserData: function(passportObj, validationObj) {
      kiosk.app.$data.userData['passportNo'] = passportObj['documentNumber'];
      kiosk.app.$data.userData['country'] = passportObj['nationality'];
      kiosk.app.$data.userData['inDate'] = validationObj.result['inDate']
        .split(' ')[0]
        .split('-')
        .join('');
      kiosk.app.$data.userData['idn'] = validationObj.result['idn'];
      kiosk.app.$data.userData['ename'] = validationObj.result['ename'];
      kiosk.app.$data.userData['dayAmtTotal'] =
        validationObj.result['dayAmtTotal'];
    },
    startPassportScan: function() {
      const scanPassportObj = this;
      this.doInterval();
      this.myInterval = setInterval(scanPassportObj.doInterval, 6000);
    },
    stopPassportScan: function() {
      kiosk.API.Device.MMM.StopGet(
        function(res) {
          // alert('關閉護照機');
          // alert(JSON.stringify(res));
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
    clearInterval(this.myInterval);
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
