Vue.component('component-scanQRcode-main', {
  template: '#template-scanQRcode-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      //今日累積退稅金額
      refund: kiosk.app.$data.userData['dayAmtTotal'],
      //掃描發票的數量
      number: 0,
      //消費金額
      amount: 0,
      //退稅淨額
      netTaxRefund: 0,
      // 發票內品項
      invoiceItems: [],
      // 發票號碼
      invoiceNum: [],
      megCode: '',
      tempStr1: '',
      tempStr2: '',
      hiddenElRef: 'hiddenInput',
      enterConter: 0,
      timer: null,
      timer2: null
    };
  },
  methods: {
    // 發票品項物件
    createInvItem: function() {
      return {
        invNo: '',
        cname: '',
        brand: '',
        model: '',
        unitAmt: 0,
        qty: 0,
        unvAmt: 0
      };
    },
    clearScanData: function() {
      this.$refs[this.hiddenElRef].value = '';
    },
    focusScanData: function() {
      this.$refs[this.hiddenElRef].focus();
    },
    clearHiddenBarcode: function() {
      this.clearScanData();
      this.focusScanData();
      this.enterConter = 0;
      this.tempStr1 = '';
      this.tempStr2 = '';
    },
    getScanData: function() {
      return this.$refs[this.hiddenElRef].value;
    },
    handleKeyUp: function(event) {
      const scanQRcode = this;
      scanQRcode.megCode = 'scanQRcodeLoading';
      let key = event.keyCode || event.which;

      if (key === 13) {
        /* if (scanQRcode.enterConter === 0) {
          scanQRcode.tempStr1 = scanQRcode.getScanData();
        }

        if (++scanQRcode.enterConter === 2) {
          scanQRcode.tempStr2 = scanQRcode
            .getScanData()
            .replace(scanQRcode.tempStr1, '');

          try {
            scanQRcode.addInvItem(scanQRcode.generateInvoiceItems());
            scanQRcode.clearHiddenBarcode();
          } catch (e) {
            alert(JSON.stringify(e));
          }
        } */

        let orgStr = scanQRcode.getScanData();
        let tempArray = orgStr.split('**');

        scanQRcode.tempStr1 = tempArray[tempArray.length - 1].trim();
        scanQRcode.tempStr2 = orgStr.replace(scanQRcode.tempStr1, '').trim();

        scanQRcode.tempStr2 =
          scanQRcode.tempStr2.charAt(scanQRcode.tempStr2.length - 2) +
            scanQRcode.tempStr2.charAt(scanQRcode.tempStr2.length - 1) ===
          '**'
            ? scanQRcode.tempStr2
                .slice(0, scanQRcode.tempStr2.length - 2)
                .trim()
            : scanQRcode.tempStr2;

        try {
          scanQRcode.addInvItem(scanQRcode.generateInvoiceItems());
          scanQRcode.clearHiddenBarcode();
        } catch (e) {
          alert(JSON.stringify(e));
        }
      }
    },
    getLeftQRCode: function() {
      const pattern = new RegExp(/^[A-Za-z]{2}/);

      return this.tempStr1.match(pattern) ? this.tempStr1 : this.tempStr2;
    },
    getRightQRCode: function() {
      var pattern = new RegExp(/^[A-Za-z]{2}/);

      return !this.tempStr1.match(pattern) ? this.tempStr1 : this.tempStr2;
    },
    parseQRCode: function(leftText, rightText, curContext) {
      const invData = {
        items: [],
        isRefund: 'N',
        date: '',
        sellerUniNum: ''
      };
      // 發票品項
      let invItem = curContext.createInvItem();

      // left QRCode
      const leftStrArray = leftText.split(':');
      invItem.invNo = leftText.slice(0, 10);
      invItem.cname = leftStrArray[5];
      invItem.unitAmt = parseInt(leftStrArray[7]);
      invItem.qty = parseInt(leftStrArray[6]);
      invItem.unvAmt = invItem.unitAmt * invItem.qty;
      invData.date = leftText.slice(10, 17);
      invData.sellerUniNum = leftText.slice(45, 53);
      invData.items.push(invItem);

      // right QRCode
      rightText.split(':').forEach(function(item, index) {
        if (index % 3 === 0) {
          invItem = curContext.createInvItem();
          invItem.invNo = invData.items[0].invNo;
          invItem.cname = index === 0 ? item.replace('**', '') : item;
        } else if (index % 3 === 1) {
          invItem.qty = parseInt(item);
        } else {
          invItem.unitAmt = parseInt(item);
          invItem.unvAmt = invItem.unitAmt * invItem.qty;
          invData.items.push(invItem);
        }
      });

      return invData;
    },
    checkRefund: function(invData) {
      // for testing
      // invData.date = '1090211';
      // invData.sellerUniNum = '82901366';

      let isValid = true;
      const invNo = invData.items[0].invNo;
      isValid = isValid && !this.isDup(invNo);
      isValid = isValid && this.isValidNo(invNo);
      isValid =
        isValid &&
        invData.date ===
          (
            parseInt(moment(new Date()).format('YYYYMMDD')) - 19110000
          ).toString();
      isValid = isValid && invData.sellerUniNum === '82901366';
      invData.isRefund = isValid ? 'Y' : 'N';
      return isValid;
    },
    generateInvoiceItems: function() {
      const invData = this.parseQRCode(
        this.getLeftQRCode(),
        this.getRightQRCode(),
        this
      );
      this.checkRefund(invData);
      return invData;
    },
    // 千分位
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    handleMouseDown: function(nextId) {
      // alert('>>> btn name:' + this.wording.toDetail);
      // alert('>>> nextId:' + nextId + '---' + kiosk.app.$data.lockBtn);
      if (!kiosk.app.$data.lockBtn) {
        // btn --- 開立
        if (this.wording.toSign === nextId) {
          kiosk.app.$data.lockBtn = true;

          // const testData = [
          //   {
          //     unvAmt: 20000,
          //     qty: 2,
          //     itemCname: '筆電',
          //     brandCname: '宏碁',
          //     unvNo: 'SW08220018',
          //     modelCname: 'ACER'
          //   }
          // ];

          // 開立小額單
          const data = {
            // passportNo: '108670735170',
            passportNo: kiosk.app.$data.userData['passportNo'],
            // country: 'CN',
            country: kiosk.app.$data.userData['country'],
            inDate: kiosk.app.$data.userData['inDate'],
            idn: kiosk.app.$data.userData['idn'],
            ename: kiosk.app.$data.userData['ename'],
            applyMainList: this.transformItems()
            // applyMainList: testData
          };

          // ***** 最重要的資訊[Debug] *****
          // alert('>>> userdata' + kiosk.app.$data.userData['country']);
          // alert('>>> country' + kiosk.app.$data.userData['country']);
          // alert('>>> 開立小額單 sendData:' + JSON.stringify(data));
          // ***** 最重要的資訊[Debug] *****

          // [ TODO ] 沒有品項，lock btn!!

          // alert('>>> data.applyMainList.length:' + data.applyMainList.length);
          // alert('>>> data.applyMainList[0]:' + data.applyMainList[0].unvNo);

          Swal.fire({
            width: 500,
            title:
              '<span style="font-size: 24px;">' +
              kiosk.wording[this.culture].scanQRcode.dataProcess +
              '</span>',
            html:
              '<div style="margin-top: 15px; margin-left: 25px;" class="lds-dual-ring"></div>',
            showConfirmButton: false,
            allowOutsideClick: false
          });

          // for 測試使用
          // setTimeout(function() {
          //   kiosk.API.goToNext(nextId);
          //   Swal.close();
          // }, 3000);

          External.TradevanKioskCommon.CommonService.Apply(
            JSON.stringify(data),
            function(res) {
              // 開立小額 API 已回覆，關閉資料處理視窗!!
              Swal.close();

              // alert('>>> scanQRcode:' + res);
              const resObj = JSON.parse(res);

              if (resObj && resObj.result['status'] === '000') {
                // *** 儲存開立單號(taxAppNo)
                kiosk.app.$data.userData['taxAppNo'] =
                  resObj.result['taxAppNo'];
                kiosk.API.goToNext(nextId);
              } else {
                kiosk.app.$data.lockBtn = false;

                Swal.fire({
                  type: 'error',
                  width: 500,
                  title:
                    '<span style="font-size: 27px;">' + '糟糕...' + '</span>',
                  html:
                    '<span style="font-size: 24px; font-weight:bold;">' +
                    '回傳資訊:' +
                    resObj.result['message'] +
                    '---' +
                    resObj.result['status'] +
                    '</span>',
                  footer:
                    '<span style="font-size: 24px; color: red; font-weight:bold;">' +
                    '請通知客服' +
                    '</span>',
                  showConfirmButton: false
                });
                // 這邊要改阿
                // for testing  之後要刪掉!!
                // kiosk.API.goToNext(nextId);
              }
            },
            function() {}
          );
        } else {
          kiosk.API.goToNext(nextId);
        }
      }
    },
    getInvNoInfo: function(invNo) {
      const scanQRcode = this;
      this.megCode = 'scanQRcodeLoading';
      kiosk.app.$data.lockBtn = true;

      // 發票號碼
      const invNo_1 = invNo.substr(0, invNo.length - 4);
      // 隨機碼
      const invNo_2 = invNo.substr(invNo.length - 4, 4);

      // 掃描的發票號碼 + 隨機碼
      // alert('>>> 發票號碼:' + invNo_1 + ' --- 隨機碼:' + invNo_2);

      kiosk.app.axiosInstances.ap101
        .post('/wsChiefPOS.asmx', {
          Trans: {
            T0100: '0300',
            T0300: '220000',
            T1200: '154600',
            T1300: '20190919',
            T4200: '16095410',
            T5501: '154600',
            T5504: '123456',
            T5505: '154600',
            T5507: invNo_1,
            T5509: 'K',
            T5513: invNo_2
          }
        })
        .then(function(res) {
          if (scanQRcode.isValidInvItem(res.data, invNo_1)) {
            // scanQRcode.addInvItem(res.data, invNo);
            // scanQRcode.addInvNum(invNo);
            scanQRcode.addInvItem(res.data, invNo_1);
            // scanQRcode.addInvNum(invNo.substr(0, invNo.length - 4));
            // scanQRcode.number = scanQRcode.invoiceNum.length;
            // scanQRcode.amount = scanQRcode.calcuAmt();
          }
        })
        .catch(function(err) {
          kiosk.API.log.logInfo('>>> 錯誤紀錄:' + JSON.stringify(err));
          Swal.fire({
            type: 'error',
            width: 500,
            title: '<span style="font-size: 27px;">' + '糟糕...' + '</span>',
            html:
              '<span style="font-size: 24px; font-weight:bold;">' +
              '伺服器錯誤!' +
              '</span>',
            footer:
              '<span style="font-size: 24px; color: red; font-weight:bold;">' +
              '請通知客服' +
              '</span>',
            showConfirmButton: false
          });
        })
        .finally(function() {
          if (scanQRcode.megCode === 'scanQRcodeLoading') {
            scanQRcode.megCode = '';
          }

          kiosk.app.$data.lockBtn = false;
          scanQRcode.StartScanner();
        });
    },
    isValidInvItem: function(res, invNo) {
      // 驗證發票
      let isValid = true;
      isValid = isValid && this.isValidNo(invNo);
      isValid = isValid && !this.isDup(invNo);

      return isValid;
    },
    isFromQRCode: function(invData) {
      return invData.match(/^[a-zA-Z]{2}[-]?[0-9]{8}/g);
    },
    isValidNo: function(invNo) {
      return !!invNo.match(/^[a-zA-Z]{2}[-]?[0-9]{8}/g);
    },
    isDup: function(invNo) {
      const scanQRcode = this;
      let isValid = true;

      this.invoiceNum.forEach(function(invoice) {
        if (invoice.invNo === invNo) {
          isValid = false;
          scanQRcode.megCode = 'scanQRErrorDup';
        }
      });

      return !isValid;
    },
    calcuAmt: function() {
      let sum = 0;
      const args = arguments;
      this.invoiceItems.forEach(function(invoice) {
        if (args.length === 0) {
          sum += parseInt(invoice.unvAmt);
        } else {
          args[0] === invoice.invNo && (sum += parseInt(invoice.unvAmt));
        }
      });

      return this.formatNumber(sum);
    },
    addInvNum: function(invNo) {
      this.invoiceNum.push({
        invNo: invNo,
        check: false,
        unitAmt: this.calcuAmt(invNo)
      });
    },
    addInvItem: function(res) {
      const scanQRcode = this;
      const invoiceData = res;
      const invNo = invoiceData.items[0].invNo;

      scanQRcode.megCode === 'scanQRcodeLoading' && (scanQRcode.megCode = '');

      // **** 當有一筆不能退的時候 return
      // 此發票不能退稅，因為其中一筆品項不能退
      if (invoiceData.isRefund === 'N') {
        if (scanQRcode.megCode !== 'scanQRErrorDup') {
          Swal.fire({
            type: 'warning',
            width: 500,
            html:
              '<h3>' +
              kiosk.wording[this.culture].scanQRcode.scanQRError3 +
              '</h3>' +
              '<h3>' +
              kiosk.wording[this.culture].scanQRcode.scanQRError4 +
              '</h3>',
            showConfirmButton: false
          });
        }

        return;
      }

      const sendData = {
        rows: []
      };
      sendData.rows = sendData.rows.concat(invoiceData.items);
      sendData.rows = sendData.rows.concat(scanQRcode.invoiceItems);

      // 2020/01/05 --- 退稅額限制(發票金額)
      if (!scanQRcode.varifyAmt(sendData.rows)) {
        Swal.fire({
          type: 'warning',
          onClose: function() {},
          width: 500,
          html:
            '<h3>' +
            kiosk.wording[scanQRcode.culture].scanQRcode.amtErr +
            '</h3>',
          showConfirmButton: false
        });

        return;
      }

      External.TradevanKioskCommon.CommonService.CalRefund(
        JSON.stringify(sendData),
        function(res) {
          scanQRcode.netTaxRefund = JSON.parse(res).result.refundAmt;

          scanQRcode.invoiceItems = scanQRcode.invoiceItems.concat(
            invoiceData.items
          );

          // 處理非同步的問題
          scanQRcode.addInvNum(invNo);
          scanQRcode.number = scanQRcode.invoiceNum.length;
          scanQRcode.amount = scanQRcode.calcuAmt();
          // scanQRcode.megCode = '';
        },
        function() {}
      );
    },
    transDataFormat: function(res, invNo) {
      const tempData = { rows: [], isRefund: 'Y' };
      // 商品資料
      res.Trans.T5571.forEach(function(invoiceItem) {
        let combiData = {
          invNo: invNo,
          cname: invoiceItem['T557107'],
          brand: res.Trans['T4236'],
          model: invoiceItem['T557124'],
          unitAmt: invoiceItem['T557104'],
          qty: invoiceItem['T557102'],
          unvAmt: invoiceItem['T557103']
        };

        if (invoiceItem['T557113'] === 'N') {
          tempData.isRefund = 'N';
        }

        tempData.rows.push(combiData);
      });

      return tempData;
    },
    transformItems: function() {
      // console.log('>>> old data:', this.invoiceItems);
      return this.invoiceItems.map(function(item) {
        return {
          unvAmt: item.unitAmt,
          qty: item.qty,
          itemCname: item.cname,
          brandCname: item.brand,
          unvNo: item.invNo,
          modelCname: item.model
        };
      });
    },
    processInvoiceItem: function(invData) {
      let invNo = null;

      if (this.isFromQRCode(invData)) {
        invNo = invData.substr(0, 10) + invData.substr(17, 4);
        // alert('>>> qrcode:' + invNo);
      } else {
        invNo = invData.substr(5, 14);
        // alert('>>> barcode:' + invNo);
      }

      this.getInvNoInfo(invNo);
    },
    varifyAmt: function(tempInvoiceItems) {
      //kiosk.app.$data.userData['sumIndateAmt'] = 777777;
      let isValid = true;
      let sum = 0;
      // 整張發票的所有品項
      tempInvoiceItems.forEach(function(invoice) {
        sum += parseInt(invoice.unvAmt);
      });

      isValid =
        isValid &&
        parseFloat(kiosk.app.$data.userData['dayAmtTotal']) + sum < 48000;
      isValid =
        isValid &&
        parseFloat(kiosk.app.$data.userData['sumIndateAmt']) + sum < 120000;
      isValid =
        isValid &&
        parseFloat(kiosk.app.$data.userData['yearAmtTotal']) + sum < 240000;
      return isValid;
    },
    StartScanner: function() {
      const scanQRcode = this;

      kiosk.API.Device.Scanner.startScanner('', function(invData) {
        scanQRcode.processInvoiceItem(invData);
      });
    },
    StopScanner: function() {
      kiosk.API.Device.Scanner.stopScanner();
    },
    unitTest: function() {
      const invoice_number = 'UF191588983036';
      const invNo_1 = invoice_number.substr(0, invoice_number.length - 4);
      const invNo_2 = invoice_number.substr(invoice_number.length - 4, 4);
      // alert('>>> 發票號碼:' + invNo_1 + ' --- 隨機碼:' + invNo_2);

      this.invoiceNum.push({
        invNo: invNo_1,
        check: false,
        unitAmt: '10000'
      });
      const ans = this.isValidInvItem('', invNo_1);
      // alert('Unit Test:' + ans);

      // 模擬開始 IE AJAX 測試
      // this.getInvNoInfo(invoice_number);

      // 模擬 res 物件
      const mockResData = {
        Trans: {
          T5503: '勞力士',
          T5571: [
            {
              T557107: '綠水鬼',
              T557124: 'rodex_101_001',
              T557104: '300000',
              T557102: '2',
              T557103: '600000',
              T557113: 'Y'
            },
            {
              T557107: '黑水鬼',
              T557124: 'rodex_101_002',
              T557104: '250000',
              T557102: '3',
              T557103: '750000',
              T557113: 'Y'
            }
          ]
        }
      };

      this.addInvItem(mockResData, 'UA95234159');
    },
    keepFocusing: function() {
      const scanQRcodeObj = this;

      if (!scanQRcodeObj.isLock) {
        scanQRcodeObj.timer2 = setTimeout(function() {
          scanQRcodeObj.focusScanData();
        }, 1000);
      }
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanQRcode;
    },
    infoData: function() {
      return this.megCode !== ''
        ? kiosk.wording[this.culture].scanQRcode[this.megCode]
        : '';
    },
    taxRefund: function() {
      return this.netTaxRefund;
    },
    btnSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 3:
          fontSize = 40;
          break;
        case 5:
          fontSize = 40;
          break;
        case 7:
          fontSize = 36;
          break;
        case 10:
          fontSize = 36;
          break;
        default:
          fontSize = 48;
      }
      return {
        fontSize: fontSize + 'px'
      };
    },
    subTitle: function() {
      let fontSize = null;
      switch (this.culture) {
        case 3:
          fontSize = 26;
          break;
        case 5:
          fontSize = 26;
          break;
        case 6:
          fontSize = 26;
          break;
        case 7:
          fontSize = 22;
          break;
        default:
          fontSize = 32;
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
    // 啟動單元測試
    // this.unitTest();

    try {
      const scanQRcode = this;
      scanQRcode.invoiceItems = kiosk.app.$data.invoiceItems;
      scanQRcode.invoiceNum = kiosk.app.$data.invoiceNum;
      scanQRcode.number = scanQRcode.invoiceNum.length;
      scanQRcode.amount = scanQRcode.calcuAmt();

      const sendData = {
        rows: []
      };
      scanQRcode.invoiceItems.forEach(function(item) {
        sendData.rows.push(item);
      });
      External.TradevanKioskCommon.CommonService.CalRefund(
        JSON.stringify(sendData),
        function(res) {
          // alert('>>> refundAmt:' + JSON.parse(res).result.refundAmt);
          scanQRcode.netTaxRefund = JSON.parse(res).result.refundAmt;
        },
        function() {}
      );

      // 2020 不用開啟
      // this.StartScanner();
      // 2020 focus 到隱藏輸入欄位
      this.timer = setTimeout(function() {
        scanQRcode.focusScanData();
      }, 1000);
    } catch (e) {
      alert('>>> help me' + JSON.stringify(e));
    }
  },
  beforeDestroy: function() {
    kiosk.app.$data.invoiceItems = this.invoiceItems;
    kiosk.app.$data.invoiceNum = this.invoiceNum;
    clearTimeout(this.timer);
    clearTimeout(this.timer2);
    // this.StopScanner();
  }
});

//Head
Vue.component('component-scanQRcode-navBar', {
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
      if (!kiosk.app.$data.lockBtn) {
        kiosk.API.goToNext('preScanQRcode');
      }
    },
    goHome: function() {
      if (!kiosk.app.$data.lockBtn) {
        kiosk.API.goToNext('mainMenu');
      }
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
