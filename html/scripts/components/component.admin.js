Vue.component('component-admin-main', {
  props: ['model', 'culture'],
  template: '#template-admin-main',
  data: function() {
    return {};
  },
  methods: {
    scanStart: function() {},
    isFromQRCode: function(invData) {
      return invData.match(/^[a-zA-Z]{2}[-]?[0-9]{8}/g);
    },
    btnAct: function(actType) {
      const adminObj = this;
      switch (actType) {
        case 'CLOSE_APP':
          alert('CLOSE_APP');
          kiosk.API.System.ShotDownApp();
          break;
        case 'SHUT_DOWN':
          alert('SHUT_DOWN');
          kiosk.API.System.ShudDown();
          break;
        case 'REBOOT':
          alert('REBOOT');
          kiosk.API.System.Reboot();
          break;
        case 'SCAN_START':
          kiosk.API.Device.Scanner.startScanner(
            '',
            function(invData) {
              let invNo = null;
              if (adminObj.isFromQRCode(invData)) {
                invNo =
                  'rule1:' + invData.substr(0, 10) + invData.substr(17, 4);
                // alert('>>> qrcode:' + invNo);
              } else {
                invNo = 'rule2:' + invData.substr(5, 14);
                // alert('>>> barcode:' + invNo);
              }

              if (invData) {
                swal({
                  title: '<h3>掃描器測試，成功!</h3>',
                  text: invNo,
                  type: 'success',
                  customClass: 'swal-wide',
                  confirmButtonText: '確定'
                });
              }
            },
            function(err) {
              swal({
                title: '<h3>掃描器測試，發生錯誤!!</h3>',
                text: err,
                type: 'error',
                confirmButtonText: '確定',
                allowOutsideClick: false
              });
            }
          );

          break;
        case 'SCAN_STOP':
          kiosk.API.Device.Scanner.stopScanner(
            function(res) {
              swal({
                title: '<h3>掃描器關閉測試，成功!</h3>',
                text: res,
                type: 'success',
                customClass: 'swal-wide',
                confirmButtonText: '確定'
              });
            },
            function(err) {
              swal({
                title: '<h3>掃描器關閉測試，發生錯誤!</h3>',
                text: err,
                type: 'error',
                customClass: 'swal-wide',
                confirmButtonText: '確定'
              });
            }
          );

          break;
        case 'WEBCAM_CAPTURE':
          kiosk.API.Device.WEBCAM.Capture(
            function(res) {
              alert(JSON.stringify(res));
            },
            function() {},
            'C:\\WorkPath\\MyPhoto2019_0821_whalebro.jpg',
            ''
          );

          break;
        case 'WEBCAM_CLOSE':
          kiosk.API.Device.WEBCAM.Close(
            function(res) {
              alert(JSON.stringify(res));
            },
            function() {}
          );

          break;
        case 'WEBCAM_SETTING':
          kiosk.API.Device.WEBCAM.Setting(
            function(res) {
              alert(JSON.stringify(res));
            },
            function() {},
            '0'
          );

          break;
        case 'PASSPORT_START':
          kiosk.API.Device.MMM.GetData(
            function(res) {
              const jsonObj = JSON.parse(res['jsonStr']);

              swal({
                title: '<h3>護照掃描測試，成功!</h3>',
                text:
                  '國籍: ' +
                  jsonObj['nationality'] +
                  ' --- ' +
                  '護照號碼: ' +
                  jsonObj['documentNumber'],
                type: 'success',
                customClass: 'swal-wide',
                confirmButtonText: '確定'
              });
            },
            function(err) {
              swal({
                title: '<h3>護照掃描，發生錯誤!!</h3>',
                text: err,
                type: 'error',
                confirmButtonText: '確定',
                allowOutsideClick: false
              });
            }
          );

          break;
        case 'PASSPORT_END':
          kiosk.API.Device.MMM.StopGet(
            function(res) {
              swal({
                title: '<h3>關閉護照掃描，成功!</h3>',
                text: '',
                type: 'success',
                customClass: 'swal-wide',
                confirmButtonText: '確定'
              });
            },
            function(err) {
              swal({
                title: '<h3>關閉護照掃描，發生錯誤!!</h3>',
                text: err,
                type: 'error',
                confirmButtonText: '確定',
                allowOutsideClick: false
              });
            }
          );

          break;
        case 'PRINT_START':
          const data = {
            taxAppNo: '97162640108061810003',
            sign:
              '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1RjzSwIkQAIkQAIkQAIkQAIkQAIkQAIkQAIrSoCGqhWtWBaLBEiABEiABEiABEiABEiABEiABEiABJaNAA1Vy1ZjzC8JkAAJkAAJkAAJkAAJkAAJkAAJkAAJrCgBGqpWtGJZLBIgARIgARIgARIgARIgARIgARIgARJYNgI0VC1bjTG/JEACJEACJEACJEACJEACJEACJEACJLCiBGioWtGKZbFIgARIgARIgARIgARIgARIgARIgARIYNkI0FC1bDXG/JIACZAACZAACZAACZAACZAACZAACZDAihKgoWpFK5bFIgESIAESIAESIAESIAESIAESIAESIIFlI0BD1bLVGPNLAiRAAiRAAiRAAiRAAiRAAiRAAiRAAitKgIaqFa1YFosESIAESIAESIAESIAESIAESIAESIAElo0ADVXLVmPMLwmQAAmQAAmQAAmQAAmQAAmQAAmQAAmsKAEaqla0YlksEiABEiABEiABEiABEiABEiABEiABElg2AjRULVuNMb8kQAIkQAIkQAIkQAIkQAIkQAIkQAIksKIEaKha0YplsUiABEiABEiABEiABEiABEiABEiABEhg2QjQULVsNcb8kgAJkAAJkAAJkAAJkAAJkAAJkAAJkMCKEqChakUrlsUiARIgARIgARIgARIgARIgARIgARIggWUjQEPVstUY80sCJEACJEACJEACJEACJEACJEACJEACK0rgysl///tjRcvGYpEACZAACZAACZAACZAACZAACZAACZAACSwRARqqlqiymFUSIAESIAESIAESIAESIAESIAESIAESWGUCfPVvlWuXZSMBEiABEiABEiABEiABEiABEiABEiCBJSJAQ9USVRazSgIkQAIkQAIkQAIkQAIkQAIkQAIkQAKrTICGqlWuXZaNBEiABEiABEiABEiABEiABEiABEiABJaIAA1VS1RZzCoJkAAJkAAJkAAJkAAJkAAJkAAJkAAJrDIBGqpWuXZZNhIgARIgARIgARIgARIgARIgARIgARJYIgI0VC1RZTGrJEACJEACJEACJEACJEACJEACJEACJLDKBGioWuXaZdlIgARIgARIgARIgARIgARIgARIgARIYIkI0FC1RJXFrJIACZAACZAACZAACZAACZAACZAACZDAKhOgoWqVa5dlIwESIAESIAESIAESIAESIAESIAESIIElIkBD1RJVFrNKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAqtM4P8BcnxrqJykNM8AAAAASUVORK5CYII='
          };
          External.TradevanKioskCommon.CommonService.Sign(
            JSON.stringify(data),
            function(res) {
              swal({
                title: '<h3>印表機測試，成功!</h3>',
                text: '',
                type: 'success',
                customClass: 'swal-wide',
                confirmButtonText: '確定'
              });
              // TODO 狀態判斷
              // alert('>>> 成功開立:' + JSON.stringify(res));
              // this.handleMouseDown(this.wording.toSuccess);

              // TODO 何時導到錯誤頁面
            }.bind(this),
            function() {}
          );

          break;
        case 'PRINT_STATUS':
          const sendData = {};
          External.TradevanKioskCommon.CommonService.PrinterPaperStatus(
            JSON.stringify(sendData),
            function(res) {
              // alert(JSON.stringify(res) + '---' + JSON.parse(res).result.code);
              const resCode = JSON.parse(res).result.code;
              if (parseInt(resCode) < 0) {
                swal({
                  title: '<h3>>印表機狀態，錯誤!</h3>',
                  text: JSON.stringify(res),
                  type: 'error',
                  confirmButtonText: '確定',
                  allowOutsideClick: false
                });
              } else {
                swal({
                  title: '<h3>印表機狀態，成功!</h3>',
                  text:
                    parseInt(resCode) === 150
                      ? '印表機紙張數量過少'
                      : JSON.stringify(res),
                  type: 'success',
                  customClass: 'swal-wide',
                  confirmButtonText: '確定'
                });
              }
            },
            function() {}
          );

          break;
        case '101_API':
          break;
        case 'AUTH_API':
          //查詢移民署
          const postData = {
            passportNo: '012345678',
            country: 'UTO'
          };
          External.TradevanKioskCommon.CommonService.CallImm(
            JSON.stringify(postData),
            function(res) {
              const resObj = JSON.parse(res);
              // succ
              if (resObj && resObj.result['status'] === '000') {
                swal({
                  title: '<h3>移民署 API，連線成功!</h3>',
                  text: JSON.stringify(resObj),
                  type: 'success',
                  customClass: 'swal-wide',
                  confirmButtonText: '確定'
                });
              } else {
                swal({
                  title: '<h3>移民署 API，連線失敗!</h3>',
                  text: JSON.stringify(resObj),
                  type: 'error',
                  confirmButtonText: '確定',
                  allowOutsideClick: false
                });
              }
            },
            function() {}
          );

          break;
        case 'APPLY_API':
          const postData00 = {
            passportNo: '108670735170',
            country: 'CN',
            inDate: '20190617',
            idn: '321102199612261047',
            ename: 'WHALEBRO',
            applyMainList: []
          };

          External.TradevanKioskCommon.CommonService.Apply(
            JSON.stringify(postData00),
            function(res) {
              const resObj = JSON.parse(res);
              // alert(
              //   '>>> 回傳資訊:' +
              //     resObj.result['message'] +
              //     '---' +
              //     resObj.result['status']
              // );

              if (resObj && resObj.result['status'] === '000') {
                swal({
                  title: '<h3>開立 API，連線成功!</h3>',
                  text: JSON.stringify(resObj),
                  type: 'success',
                  customClass: 'swal-wide',
                  confirmButtonText: '確定'
                });
              } else {
                swal({
                  title: '<h3>開立 API，連線失敗!</h3>',
                  text: JSON.stringify(resObj),
                  type: 'error',
                  confirmButtonText: '確定',
                  allowOutsideClick: false
                });
              }
            },
            function() {}
          );

          break;
        case 'Clear':
          this.keyinValue = '';
          break;
        case 'space':
          this.keyinValue = this.keyinValue + ' ';
          break;
        default:
          this.keyinValue = this.keyinValue + '' + e;
          break;
      }
      kiosk.status.keyinValue = this.keyinValue;
    },
    spaceKeyin: function(e) {
      if (this.keyinValue) this.keyinValue = this.keyinValue + ' ';
    },
    handleMouseDown: function(action) {
      if (this.keyinValue === '01234567') {
        kiosk.API.goToNext('admin');
      } else {
        this.keyinValue = '';
        swal({
          title: '密碼錯誤！',
          text: '',
          type: 'error',
          confirmButtonText: '確定',
          allowOutsideClick: false
        });
      }
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  mounted: function() {
    kiosk.status.keyinValue = '';
    kiosk.status.CheckPassword = '';
  }
});
