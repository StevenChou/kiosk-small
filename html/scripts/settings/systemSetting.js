var kiosk = kiosk || {};
(function() {
  kiosk.enum = kiosk.enum || {};
  kiosk.enum.WorkType = {
    SendRequest: 1,
    PostRequest: 2,
    ResetDevice: 3,
    ResetConnection: 4
  };
  kiosk.enum.ScannerAction = {
    Close: 0,
    Open: 1,
    Reset: 3,
    ScanningBarCode: 4,
    ScanningBitMap: 5
  };
  kiosk.enum.ThermalAction = {
    Open: 1,
    Reset: 2,
    CutPaper: 3,
    Close: 4,
    PrintText: 5,
    PrintBitmap: 6,
    PrintBarCode: 7,
    PrintQRCode: 8,
    CheckNearEnd: 9,
    GetReviceStatus: 10,
    TransactionPrint: 11,
    Rotation: 12,
    PrintTemplatePage: 13
  };
  kiosk.enum.culture = {
    ENUS: 1,
    ZHTW: 2,
    ZHCH: 13,
    JAJP: 3,
    KOKR: 4,
    THTH: 5,
    ARAE: 6,
    ESES: 7,
    '888': 8,
    '999': 9,
    VIVN: 10
  };
  returnCulture = {
    1: 'en',
    2: 'zh_TW',
    13: 'zh_CN',
    3: 'jp',
    4: 'ko',
    5: 'th',
    6: 'ar',
    7: 'es',
    8: '888',
    9: '999',
    10: 'vi-VN'
  };
  kiosk.wording = {
    //英文
    1: {
      common: {
        indexPage: 'Homepage',
        prePage: 'Back'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to Tax Refund Application Kiosk',
        mainMenuTitle3: 'Please select language to start',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: 'Reminder!',
        remindTitle2:
          'Please be sure you attain tax refund application form before leaving.',
        remindTitle3:
          'Please prepare your travel document (passport / exit & entry permit) and your invoices for tax refund application, then click "Start."',
        btTitle: 'Start',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle:
          'Select the travel document used for your entry into Taiwan this trip.',
        passport: 'Passport',
        permit: 'Exit & Entry Permit',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'Please scan your passport.',
        scanError: 'Recognition error, please scan your passport again.',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          'Scanning passport<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          'Verifying…<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted:
          '<div style="margin-top: 10px;">Verification success</div>'
      },
      scanPermit: {
        scanPermitTitle: 'Please scan barcode of your exit & entry permit.',
        scanError:
          'Recognition error, please scan barcode of your exit & entry permit again.',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit: 'Please target the barcode to infrared scanner.',
        permitCerting:
          'Verifying…<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted:
          '<div style="margin-top: 10px;">Verification success</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          'Please proceed to Tax Refund Center with your travel document and invoices issued by Taipei 101 for application, thank you!',
        toHomeText: 'Back to Homepage'
      },
      preScanQRcode: {
        preScanQRcodeTitle:
          'Prepare to scan your invoices issued by Taipei  101 Mall.',
        btScanQRcode: 'Start',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: 'Please scan barcode in your invoices.',

        scanQRcodeTitle2: 'Applied Tax Refund Amount Today ',
        scanQRcodeTitle4: ' ',

        scanQRcodeTitle5: 'Scanned Invoices',
        scanQRcodeTitle6: 'Subtotal Amount',
        scanQRcodeTitle7: 'Net Tax Refund',

        scanQRcodeTitle8: '&nbsp;',
        scanQRcodeTitle9: 'NTD',
        scanQRcodeTitle10: 'NTD',

        scanQRcodeTitle14: 'Detail',
        scanQRcodeTitle15: 'Confirm',

        scanQRError1:
          'This invoice is ineligible for tax refund application in Taipei 101 Mall，<br>please scan next invoice.',
        scanQRError2: 'please scan next invoice.',
        scanQRError3: 'This invoice is invalid for application',
        scanQRError4:
          'This invoice may contain non-refundable purchase; or this invoice is not issued today.',
        scanQRErrorDup: 'Verification success，<br>please scan next invoice.',
        scanQRcodeLoading:
          'Querying…<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: 'Processing, please wait.',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'You have scanned the following invoices',
        detailTitle2: 'Scroll down to see more',
        detailTitle3: 'Invoice No.：',
        detailTitle4: 'en品名/型號：',
        detailTitle5: 'en單價/數量：',
        detailTitle6: 'Amount (Incl. Tax)：',
        btDetail1: 'Confirm',
        btDetail2: 'Delete selected invoices',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: 'Please sign in below space.',
        signTitle2: ' Sec.',
        btSign1: 'Clear',
        btSign2: 'Confirm',
        toSuccess: 'success'
      },
      success: {
        successTitle1:
          'Your application form is being printed now, thank you for patience.',
        successTitle2:
          'Please proceed to counter 2 of Customer Service Center for final document verification.',
        successTitle3:
          "Reminder! You won't be able to claim tax refund if application process is unncompleted.",
        successTitle4: '',
        toHomeText: 'Back to Homepage'
      }
    },

    // 繁體中文
    2: {
      common: {
        indexPage: '首頁',
        prePage: '上一頁'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: '提醒您',
        remindTitle2: '離開退稅機前請務必取得退稅表單',
        remindTitle3:
          '請準備好您的正本入境文件(護照/入境證)及購物發票開始辦理退稅',
        btTitle: '確認，開始退稅',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: '請選擇本次入境臺灣所使用證件',
        passport: '護照',
        permit: '入出境許可證',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: '請掃描您的護照',
        scanError: '無法辨識，請重新掃描護照',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
      },
      scanPermit: {
        scanPermitTitle: '請掃描您的入境證條碼',
        scanError: '無法辨識，請重新掃描入境證',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit: '請將入境證左上方條碼對準紅外線掃描器',
        permitCerting:
          '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          '請攜帶您的入境文件及發票至退稅櫃檯，將有專人為您服務，謝謝!',
        toHomeText: '回服務首頁'
      },
      preScanQRcode: {
        preScanQRcodeTitle: '準備掃描購物發票明細條碼',
        btScanQRcode: '開始掃描',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: '請掃描您的購物發票明細條碼',

        scanQRcodeTitle2: '您今日已辦理退稅',
        scanQRcodeTitle4: '元',

        scanQRcodeTitle5: '發票掃描',
        scanQRcodeTitle6: '消費金額',
        scanQRcodeTitle7: '退稅淨額',

        scanQRcodeTitle8: '張',
        scanQRcodeTitle9: '新台幣',
        scanQRcodeTitle10: '新台幣',

        scanQRcodeTitle14: '詳細資訊',
        scanQRcodeTitle15: '確認',

        scanQRError1: '此發票明細無法退稅，<br>請掃描下一張',
        scanQRError2: '請掃描下一張',
        scanQRError3: '此發票無法退稅',
        scanQRError4: '發票中可能包含無法退稅商品或不是今日消費的發票',
        scanQRErrorDup: '發票重複輸入，<br>請掃描下一張',
        scanQRcodeLoading:
          '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: '作業中，請稍候',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: '您已輸入的購物發票',
        detailTitle2: '上下滑動看更多',
        detailTitle3: '發票號碼：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: '含稅金額：',
        btDetail1: '確認，回上一頁',
        btDetail2: '刪除勾選發票',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: '請於下方欄位簽名',
        signTitle2: ' 秒',
        btSign1: '清除簽名',
        btSign2: '確認簽名',
        toSuccess: 'success'
      },
      success: {
        successTitle1: '列印中，請稍後!',
        successTitle2: '請至 2 號櫃檯查驗文件',
        successTitle3: '未完成所有退稅手續會導致您無法領取稅金',
        successTitle4: '',
        toHomeText: '回服務首頁'
      }
    },
    // 簡體中文
    13: {
      common: {
        indexPage: '首页',
        prePage: '上一页'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: '提醒您',
        remindTitle2: '离开退税机前请务必取得退税表单',
        remindTitle3:
          '请准备好您的正本入境文件(护照/入境证)及购物发票开始办理退税',
        btTitle: '确认，开始退税',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: '请选择本次入境台湾所使用证件',
        passport: '护照',
        permit: '入出境许可证 (入境证)',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: '请扫描您的护照',
        scanError: '无法辨识，请重新扫描护照',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          '护照扫描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          '资料验证中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted: '<div style="margin-top: 10px;">验证成功</div>'
      },
      scanPermit: {
        scanPermitTitle: '请扫描您的入境证条码',
        scanError: '无法辨识，请重新扫描入境证',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit: '请将入境证左上方条码对准红外线扫描器',
        permitCerting:
          '资料验证中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">验证成功</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          '请携带您的入境文件及发票至退税柜台，将有专人为您服务，谢谢!',
        toHomeText: '回服务首页'
      },
      preScanQRcode: {
        preScanQRcodeTitle: '准备扫描购物发票明细条码',
        btScanQRcode: '开始扫描',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: '请扫描您的购物发票明细条码',

        scanQRcodeTitle2: '您今日已办理退税',
        scanQRcodeTitle4: '元',

        scanQRcodeTitle5: '发票扫描',
        scanQRcodeTitle6: '消费金额',
        scanQRcodeTitle7: '退税净额',

        scanQRcodeTitle8: '张',
        scanQRcodeTitle9: '新台币',
        scanQRcodeTitle10: '新台币',

        scanQRcodeTitle14: '详细资讯',
        scanQRcodeTitle15: '确认',

        scanQRError1: '此发票明细无法退税，<br>请扫描下一张',
        scanQRError2: '请扫描下一张',
        scanQRError3: '此发票无法退税',
        scanQRError4: '发票中可能包含无法退税商品或不是今日消费的发票',
        scanQRErrorDup: '发票资料重复输入，<br>请扫描下一张',
        scanQRcodeLoading:
          '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: '作业中，请稍候',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: '您已输入的购物发票',
        detailTitle2: '上下滑动看更多',
        detailTitle3: '发票号码：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: '含税金额：',
        btDetail1: '确认，回上一页',
        btDetail2: '删除勾选发票',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: '请於下方栏位签名',
        signTitle2: ' 秒',
        btSign1: '清除签名',
        btSign2: '确认签名',
        toSuccess: 'success'
      },
      success: {
        successTitle1: '列印中，请稍後!',
        successTitle2: '请至 2 号柜台查验文件',
        successTitle3: '未完成所有退税手续会导致您无法领取税金',
        successTitle4: '',
        toHomeText: '回服务首页'
      }
    },

    //日文
    3: {
      common: {
        indexPage: 'ホーム画面',
        prePage: '前の画面に戻る'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: '',
        remindTitle2:
          '税金還付機の前を離れる前に必ず税金還付明細書をお受け取りください',
        remindTitle3:
          '税金還付手続きを始める前に、ご自身の入国証明書類(パスポートまたは台湾出入国許可証)と商品購入レシートの原本をご用意ください',
        btTitle: '確認完了、税金還付手続きを開始する',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: '今回台湾に入国する際に使用した証明書類を選択してください',
        passport: 'パスポート',
        permit: '出入国許可証',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'あなたのパスポートをスキャンしてください',
        scanError:
          '認識できませんでしたもう一度パスポートをスキャンしてください',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          'パスポートをスキャン中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          'データを検証中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted: '<div style="margin-top: 10px;">検証成功</div>'
      },
      scanPermit: {
        scanPermitTitle: '台湾出入国許可証のバーコードをスキャンしてください',
        scanError:
          '認識できませんでした。もう一度、台湾出入国許可証をスキャンしてください',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit:
          '台湾出入国許可証左上のバーコードを赤外線スキャナの位置に合わせてください',
        permitCerting:
          'データを検証中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">検証成功</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          'ご自身の入国証明書類と商品購入レシートをもって税金還付受付カウンターへお越しください。専門スタッフが対応いたします。',
        toHomeText: 'サービスのホーム画面に戻る'
      },
      preScanQRcode: {
        preScanQRcodeTitle:
          '商品購入レシートのQRコードをスキャンする準備をしてください',
        btScanQRcode: 'スキャン開始',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: '商品購入レシートのQRコードをスキャンしてください',

        scanQRcodeTitle2: 'あなたが今日税金還付手続きをした金額は',
        scanQRcodeTitle4: '元です',

        scanQRcodeTitle5: 'スキャンしたレシート',
        scanQRcodeTitle6: '消費金額',
        scanQRcodeTitle7: '税金実質還付金額',

        scanQRcodeTitle8: '枚',
        scanQRcodeTitle9: '新台湾ドル',
        scanQRcodeTitle10: '新台湾ドル',

        scanQRcodeTitle14: '詳細内容',
        scanQRcodeTitle15: '確認完了',

        scanQRError1:
          'このレシートの内容は税金還付手続きができません<br>次のレシートをスキャンしてください',
        scanQRError2: '次のレシートをスキャンしてください',
        scanQRError3: 'このレシートは税金還付ができません',
        scanQRError4:
          '税金還付のできない商品が含まれているか、今日消費したレシートではない可能性があります。',
        scanQRErrorDup:
          '領収書情報はすでに入力済みです，<br>次のレシートをスキャンしてください',
        scanQRcodeLoading:
          'データを検索中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: 'お待ちください',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'あなたが入力した商品購入レシート',
        detailTitle2: '上下にスクロールしてもっと見る',
        detailTitle3: 'レシート番号：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: '税込み金額：',
        btDetail1: '確認完了、前の画面に<br/>戻る',
        btDetail2: 'チェックを入れたレシー<br/>トを削除する',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: '下の欄にご署名ください',
        signTitle2: ' 秒',
        btSign1: '署名をクリアする',
        btSign2: '署名を確定する',
        toSuccess: 'success'
      },
      success: {
        successTitle1: '印刷しています、しばらくお待ちください',
        successTitle2: '2 番カウンターで資料の検査を行ってください',
        successTitle3:
          '税金還付手続きが全て完了していないと、税金の還付が受けられなくなります',
        successTitle4: '',
        toHomeText: 'サービスのホーム画面に戻る'
      }
    },

    //韓文
    4: {
      common: {
        indexPage: '홈',
        prePage: '이전'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: '',
        remindTitle2:
          '주의 : 세금환급기를 떠나기 전에 반드시 세금환급증을 받으십시오.',
        remindTitle3:
          '귀하의 입국서류 원본(여권/타이완 입국증) 및 쇼핑 영수증을 준비하고 세금환급 절차를 시작하십시오.',
        btTitle: '확인, 세금환급 시작',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: '이번 타이완 입국 시에 사용하신 증명서를 선택하세요',
        passport: '여권',
        permit: '출입국 허가증',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: '여권을 스캔하세요',
        scanError: '인식할 수 없습니다. 여권을 다시 스캔하세요',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          '여권 스캔 중<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          '정보 인증 중<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted: '<div style="margin-top: 10px;">인증 성공</div>'
      },
      scanPermit: {
        scanPermitTitle: '타이완 입국증 바코드를 스캔하세요',
        scanError: '인식할 수 없습니다. 타이완 입국증을 다시 스캔하세요',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit:
          '타이완 입국증 왼쪽 상단의 바코드를 적외선 스캐너에 맞추세요.',
        permitCerting:
          '정보 인증 중<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">인증 성공</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          '입국 서류 및 영수증을 가지고 세금환급 카운터로 가시면 담당자가 서비스를 제공할 것입니다. 감사합니다!',
        toHomeText: '홈으로 돌아가기'
      },
      preScanQRcode: {
        preScanQRcodeTitle: '쇼핑 영수증 명세 바코드 스캔 준비',
        btScanQRcode: '스캔 시작',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: '쇼핑 영수증 명세 바코드를 스캔하세요',

        scanQRcodeTitle2: '금일 NT$ ',
        scanQRcodeTitle4: '이 환급 처리되었습니다',

        scanQRcodeTitle5: '영수증 스캔',
        scanQRcodeTitle6: '소비금액',
        scanQRcodeTitle7: '순 환급금',

        scanQRcodeTitle8: '장',
        scanQRcodeTitle9: 'NT$',
        scanQRcodeTitle10: 'NT$',

        scanQRcodeTitle14: '상세정보',
        scanQRcodeTitle15: '확인',

        scanQRError1:
          '세금을 환급할 수 없는 영수증 명세입니다.<br>다음 장을 스캔하세요',
        scanQRError2: '다음 장을 스캔하세요',
        scanQRError3: '세금을 환급할 수 없는 영수증입니다.',
        scanQRError4:
          '영수증에 세금을 환급할 수 없는 상품이 포함되어 있거나, 금일 구매하신 영수증이 아닙니다.',
        scanQRErrorDup: '영수증 정보 중복 입력，<br>다음 장을 스캔하세요',
        scanQRcodeLoading:
          '정보 조회 중<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: '기다려주세요',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: '이미 입력하신 쇼핑 영수증입니다',
        detailTitle2: '더 보려면 위아래로 스와이프 하세요',
        detailTitle3: '영수증번호：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: '세금 포함 금액：',
        btDetail1: '확인, 이전',
        btDetail2: '영수증 체크 표시 삭제',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: '아래 칸에 서명하세요',
        signTitle2: ' 초',
        btSign1: '서명 지우기',
        btSign2: '서명 확인',
        toSuccess: 'success'
      },
      success: {
        successTitle1: '인쇄 중, 잠시만 기다려 주세요!',
        successTitle2: '2 번 카운터에서 서류를 확인하세요',
        successTitle3:
          '모든 세금환급 절차가 아직 완료되지 않아 환급금을 수령할 수 없습니다.',
        successTitle4: '',
        toHomeText: '홈으로 돌아가기'
      }
    },

    ///////////////////////////
    // 泰文
    5: {
      common: {
        indexPage: 'หน้าแรก',
        prePage: 'หน้าที่แล้ว'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: 'โปรดทราบ',
        remindTitle2:
          'ก่อนที่จะเดินออกจากเครื่องคืนภาษี โปรดสำรวจว่าท่านได้รับแบบฟอร์มขอคืนภาษีแล้ว',
        remindTitle3:
          'โปรดเตรียมเอกสารขาเข้าฉบับเดิมของคุณ (หนังสือเดินทาง / บัตรผู้โดยสาร) และใบแจ้งหนี้การซื้อเพื่อเริ่มยื่นเรื่องการคืนภาษี',
        btTitle: 'ยืนยัน เริ่มคืนเงินภาษี',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: 'โปรดเลือกเอกสารที่ใช้ในการเดินทางเข้าไต้หวันในครั้งนี้',
        passport: 'หนังสือเดินทาง',
        permit: 'ใบอนุญาตขาเข้าและขาออก',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'โปรดสแกนหนังสือเดินทางของคุณ',
        scanError: 'ไม่สามารถระบุได้ โปรดสแกนหนังสือเดินทางของคุณใหม่อีกครั้ง',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          'กำลังสแกนหนังสือเดินทาง<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          'กำลังยืนยันข้อมูล<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted: '<div style="margin-top: 10px;">ยืนยันสำเร็จ</div>'
      },
      scanPermit: {
        scanPermitTitle: 'โปรดสแกนบาร์โค้ดใบบันทึกข้อมูลขาเข้าของคุณ',
        scanError: 'ไม่สามารถสแกนได้ โปรดสแกนใบอนุญาตขาเข้าของคุณอีกครั้ง',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit:
          'โปรดวางบาร์โค้ดที่มุมด้านซ้ายบนของใบบันทึกขาเข้าตรงเครื่องสแกนเนอร์อินฟราเรด',
        permitCerting:
          'กำลังยืนยันข้อมูล<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">ยืนยันสำเร็จ</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          'โปรดนำเอกสารที่คุณสำแดงตอนเข้ามาในไต้หวันและใบแจ้งหนี้ของคุณไปที่เคาน์เตอร์ขอคืนภาษี จะมีคนคอยให้บริการท่าน ขอบคุณครับ!',
        toHomeText: 'กลับไปที่บริการหน้าแรก'
      },
      preScanQRcode: {
        preScanQRcodeTitle:
          'เตรียมที่จะสแกนบาร์โค้ดรายละเอียดใบแจ้งหนี้ช้อปปิ้ง',
        btScanQRcode: 'เริ่มสแกน',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: 'โปรดสแกนบาร์โค้ดรายละเอียดใบแจ้งหนี้การซื้อของคุณ',

        scanQRcodeTitle2: 'วันนี้คุณได้ยื่นขอเงินภาษีคืนแล้ว รวมเป็นเงิน ',
        scanQRcodeTitle4: 'หรียญ',

        scanQRcodeTitle5: 'สแกนใบแจ้งหนี้',
        scanQRcodeTitle6: 'รวมยอดเงินในการจับจ่าย',
        scanQRcodeTitle7: 'จำนวนเงินภาษีคืนสุทธิ',

        scanQRcodeTitle8: 'ใบ',
        scanQRcodeTitle9: 'ดาลลาร์ไต้หวัน',
        scanQRcodeTitle10: 'ดาลลาร์ไต้หวัน',

        scanQRcodeTitle14: 'รายละเอียดข้อมูล',
        scanQRcodeTitle15: 'ยืนยัน',

        scanQRError1:
          'รายละเอียดใบแจ้งหนี้ฉบับนี้ไม่สามารถยื่นเงินภาษีคืนได้<br>โปรดสแกนหน้าถัดไป',
        scanQRError2: 'โปรดสแกนหน้าถัดไป',
        scanQRError3: 'ใบแจ้งหนี้ฉบับนี้ไม่สามารถคืนเงินภาษี',
        scanQRError4:
          'ใบแจ้งหนี้อาจหมายถึงสินค้าที่ไม่สามารถคืนเงินภาษีหรือเป็นใบแจ้งหนี้ที่ไม่ได้ใช้บริโภคภายในวันนั้นๆ',
        scanQRErrorDup: 'ป้อนข้อมูลใบแจ้งหนี้ซ้ำ <br>โปรดสแกนหน้าถัดไป',
        scanQRcodeLoading:
          'กำลังตรวจสอบข้อมูล<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: 'กรุณารอสักครู่',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'ใบแจ้งหนี้การซื้อของที่คุณได้ป้อน',
        detailTitle2: 'เลื่อนขึ้นและเลื่อนลงเพื่อดูเพิ่มเติม',
        detailTitle3: 'หมายเลขใบแจ้งหนี้：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: 'ยอดเงินรวมภาษี：',
        btDetail1: 'ยืนยัน กลับไปยังหน้าก่<br/>อนหน้านี้',
        btDetail2: 'ลบช่องที่เลือกเพื่อลบใ<br/>บแจ้งหนี้',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: 'กรุณาลงชื่อในช่องด้านล่าง',
        signTitle2: ' วินาที',
        btSign1: 'ลบลายเซ็น',
        btSign2: 'ยืนยันลายเซ็น',
        toSuccess: 'success'
      },
      success: {
        successTitle1: 'กำลังพิมพ์ โปรดรอสักครู่!',
        successTitle2: 'โปรดไปที่เคาน์เตอร์หมายเลข 2 เพื่อตรวจสอบเอกสาร',
        successTitle3:
          'การดำเนินการตามขั้นตอนการขอคืนภาษีทั้งหมดยังไม่แสร็จสิ้น อาจทำให้คุณไม่สามารถขอรับเงินภาษีคืนได้',
        successTitle4: '',
        toHomeText: 'กลับไปที่หน้าแรกของบริการ'
      }
    },

    // 阿拉伯語系
    6: {
      common: {
        indexPage: 'الصفحة الرئيسية',
        prePage: 'الصفحة السابقة'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: 'انتبه',
        remindTitle2:
          'يجب عليك أن تحصل على الأوراق لاسترداد الضريبة قبل مغادرة آلة استرداد الضريبة',
        remindTitle3:
          'يرجى الاستعداد لوثائقك الأصلية للدخول(جواز السفر، وأذون الدخول لجمهورية الصين) وفاتورات البضائع لإجراء استرداد الضريبة',
        btTitle: 'التأكد، ابدأ بإجراء استرداد الضريبة',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle:
          'يرجى الاختيار وثائقك التي تستخدمها لدخول تايوان في هذه المرة',
        passport: 'جواز السفر',
        permit: 'أذون الدخول والخروج',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'يرجى إجراء المسح الضوئي لجواز السفر لك',
        scanError:
          'لا نستطيع تحديد هذا جواز السفر، يرجى إجراء المسح الضوئي مرة أخرى',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
      },
      scanPermit: {
        scanPermitTitle:
          'يرجى  إجراء المسح الضوئي للشفرة الشريطية على أذون الدخول لجمهورية الصين',
        scanError:
          'لا نستطيع تحديد هذه أذون الدخول لجمهورية الصين، يرجى إجراء المسح الضوئي مرة أخرى',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit: '請放置入臺證',
        permitCerting:
          '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
      },
      error: {
        errorTitle:
          'يرجى إحضار وثائق الدخول لك والفاتورات إلى الاستقبال لاسترداد الضريبة، سنعين الموظف المتخصص ليخدمك، شكرا!',
        errorTitle2: '',
        toHomeText: 'العودة إلى الصفحة الرئيسية للخدمة'
      },
      preScanQRcode: {
        preScanQRcodeTitle:
          'الاستعداد للمسح الضوئي لشفرة الشريطية على قاتورات البضائع',
        btScanQRcode: 'ابدأ المسح الضوئي',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1:
          'يرجى إجراء المسح الضوئي لشفرة الشريطية على قاتورات البضائع لك',

        scanQRcodeTitle2: 'قد أجريت استرداد الضريبة',
        scanQRcodeTitle4: ' دولار تايواني جديد اليوم',

        scanQRcodeTitle5: 'المسح الضوئي للفاتورات',
        scanQRcodeTitle6: 'مبلغ الاستهلاك',
        scanQRcodeTitle7: 'القيمة الصافية لاسترداد الضريبة',

        scanQRcodeTitle8: 'عدد',
        scanQRcodeTitle9: 'الدولار التايواني الجديد',
        scanQRcodeTitle10: 'الدولار التايواني الجديد',

        scanQRcodeTitle14: 'المعلومات المفصلة',
        scanQRcodeTitle15: 'التأكد',

        scanQRError1:
          'لا يمكن استرداد الضريبة باستخدام هذه الفاتورة، يرجى إجراء المسح الضوئي للفاتورات الأخرى',
        scanQRError2: '請掃描下一張',
        scanQRErrorDup: '發票重複輸入，<br>請掃描下一張',
        scanQRcodeLoading:
          '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'فاتورات البضائع التي قد أدخلتها',
        detailTitle2: 'قم بالتمرير لأعلى وأسفل لمشاهدة مزيد من التفاصيل',
        detailTitle3: 'رقم الفاتورة：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: 'المبلغ الذي يشمل الضريبة：',
        btDetail1: 'التأكد، العودة إلى الصفحة السابقة',
        btDetail2: 'حذف الفاتورات التي تضع العلامة فيها',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: 'يرجى القيام بالتوقيع في الفراغ السفلي',
        signTitle2: ' ثانية',
        btSign1: 'حذف التوقيع',
        btSign2: 'تأكد التوقيع',
        toSuccess: 'success'
      },
      success: {
        successTitle1: 'جاري الطباعة، انتظر قليلا!',
        successTitle2: 'يرجى الذهاب إلى استقبال رقم_____لتحقق الوثائق',
        successTitle3:
          'إذا لا تكمل كل الإجراءات لاسترداد الضريبة، لا يمكنك أن تستلم الأموال التي تم الاسترداد',
        successTitle4: '',
        toHomeText: 'العودة إلى الصفحة الرئيسية للخدمة'
      }
    },
    // 西班牙語系
    7: {
      common: {
        indexPage: 'Página principal',
        prePage: 'Página anterior'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: '',
        remindTitle2:
          'Le recordamos que antes de abandonar la máquina de devolución de impuestos debe recoger la factura de devolución',
        remindTitle3:
          'Tenga a mano su documento original de entrada al país (pasaporte/certificado de entrada a Taiwán) y la factura de compra para iniciar la devolución de impuestos',
        btTitle: 'Confirmar inicio de devolución de impuestos',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle:
          'Seleccione el tipo de documento con el que ha entrado en Taiwán',
        passport: 'Pasaporte',
        permit: 'Permiso de entrada y salida',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'Escanee su pasaporte',
        scanError: 'Fallo de reconocimiento. Vuelva a escanear su pasaporte.',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          'Escaneando pasaporte<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          'Verificando<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted:
          '<div style="margin-top: 10px;">Verificado con éxito</div>'
      },
      scanPermit: {
        scanPermitTitle:
          'Escanee el código de barras de su certificado de entrada a Taiwán',
        scanError:
          'Fallo de reconocimiento. Vuelva a escanear su certificado de entrada a Taiwán.',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit:
          'Alinee el código de barras de la parte superior izquierda del certificado de entrada a Taiwán con la línea roja del escáner',
        permitCerting:
          'Verificando<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted:
          '<div style="margin-top: 10px;">Verificado con éxito</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          'Lleve consigo el documento de entrada y la factura al mostrador de devolución de impuestos, y una persona especializada le atenderá. ¡Muchas gracias!',
        toHomeText: 'Regresar a la página<br> principal del servicio'
      },
      preScanQRcode: {
        preScanQRcodeTitle:
          'Prepare escaneado de código de barras de la factura de compra',
        btScanQRcode: 'Iniciar escaneado',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: 'Escanee el código de barras de su factura de compra',

        scanQRcodeTitle2: 'Hoy ha tramitado ',
        scanQRcodeTitle4: ' TWD en devolución de impuestos',

        scanQRcodeTitle5: 'Escaneado de factura',
        scanQRcodeTitle6: 'Cantidad',
        scanQRcodeTitle7: 'Devolución neta de impuestos',

        scanQRcodeTitle8: 'Factura',
        scanQRcodeTitle9: 'Nuevo Dólar taiwanés',
        scanQRcodeTitle10: 'Nuevo Dólar taiwanés',

        scanQRcodeTitle14: 'Información detallada',
        scanQRcodeTitle15: 'Confimar',

        scanQRError1:
          'No se pueden devolver los impuestos de esta factura.<br>Escanee la siguiente factura',
        scanQRError2: 'Escanee la siguiente factura',
        scanQRError3: 'No es posible devolver impuestos de este recibo.',
        scanQRError4:
          'Posiblemente el recibo contenga un artículo no sujeto a devolución de impuestos o el recibo no se corresponde a un compra realizada hoy.',
        scanQRErrorDup:
          'Datos de factura ya introducidos.<br>Escanee la siguiente factura',
        scanQRcodeLoading:
          'Consultando…<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: 'Por favor espera',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'Facturas de compra que ya ha introducido',
        detailTitle2: 'Deslizar arriba y abajo para ver más información',
        detailTitle3: 'Número de factura：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: 'Cantidad con impuestos：',
        btDetail1: 'Confirmar y regresar a <br/>la página anterior',
        btDetail2: 'Borrar factura <br/>seleccionada',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: 'Firme en el espacio de la parte inferior',
        signTitle2: ' Segundos',
        btSign1: 'Borrar firmar',
        btSign2: 'Confirmar firma',
        toSuccess: 'success'
      },
      success: {
        successTitle1: 'Imprimiendo. Por favor, espere.',
        successTitle2: 'Acuda al mostrador Nº 2 para comprobar los documentos',
        successTitle3:
          'No completar el procedimiento de devolución de impuestos podría impedirle recoger la cantidad a devolver',
        successTitle4: '',
        toHomeText: 'Regresar a la página <br/>principal del servicio'
      }
    },

    8: {
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk.',
        mainMenuTitle3: 'Please select language',

        lang02: '中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'हिन्दी',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: '한국어提醒您',
        remindTitle2: '한국어離開退稅機前務必取得退稅表單',
        remindTitle3: '한국어請準備好您的護照/入臺證、購物發票開始辦理退稅',
        btTitle: '한국어開始退稅',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: '한국어請選擇本次入境臺灣所使用證照',
        passport: '한국어護照',
        permit: '한국어許可證',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: '한국어請掃描您的護照',
        scanError: '한국어掃描錯誤，請重新操作',
        toError: 'error',
        toPreScanQR: 'preScanQRcode'
      },
      scanPermit: {
        scanPermitTitle: '한국어請掃描您的入臺證條碼',
        scanError: '한국어掃描錯誤，請重新操作',
        toError: 'error',
        toPreScanQR: 'preScanQRcode'
      },
      error: {
        errorTitle: '한국어的身分資料及發票至服務中心101號櫃台，',
        errorTitle2: '한국어將有專人為您服務，謝謝',
        toHomeText: '한국어服務首頁'
      },
      preScanQRcode: {
        preScanQRcodeTitle: '한국어準備掃描購物發票QR Code',
        btScanQRcode: '한국어開始掃描',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle: '한국어請掃描您的購物發票',

        scanQRcodeTitle2: '한국어您今日已辦理退稅',
        scanQRcodeTitle3: '245',
        scanQRcodeTitle4: '元',

        scanQRcodeTitle5: '發票掃描',
        scanQRcodeTitle6: '消費金額',
        scanQRcodeTitle7: '退稅淨額',

        scanQRcodeTitle8: '張',
        scanQRcodeTitle9: '新台幣',
        scanQRcodeTitle10: '新台幣',
        scanQRcodeTitle11: '1',
        scanQRcodeTitle12: '1,000,000',
        scanQRcodeTitle13: '19,047',

        scanQRcodeTitle14: '詳細資訊',
        scanQRcodeTitle15: '確認',

        scanQRError1: '한국어非本日發票無法申請退稅，',
        scanQRError2: '請掃描下一張發票',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: '한국어您已輸入的購物發票',
        detailTitle2: '上下滑動看更多',
        detailTitle3: '한국어發票號碼：MT 57302841',
        detailTitle4: '한국어品名/型號：',
        detailTitle5: '한국어單價/數量：',
        detailTitle6: '한국어含稅金額：',
        btDetail1: '確認，回上一頁',
        btDetail2: '刪除',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: '한국어請於下方欄位簽名',
        signTitle2: ' 秒',
        btSign1: '清除簽名',
        btSign2: '確認簽名',
        toSuccess: 'success'
      },
      success: {
        successTitle1: '한국어申請成功，明細表列印中，請稍後！',
        successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
        successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
        successTitle4: '或洽101館內市區特約退稅櫃檯。',
        toHomeText: '한국어服務首頁'
      }
    },

    9: {
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk.',
        mainMenuTitle3: 'Please select language',

        lang01: '中文',
        lang02: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'हिन्दी',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: 'にほんご提醒您',
        remindTitle2: 'にほんご離開退稅機前務必取得退稅表單',
        remindTitle3: 'にほんご請準備好您的護照/入臺證、購物發票開始辦理退稅',
        btTitle: 'にほんご開始退稅',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle: 'にほんご請選擇本次入境臺灣所使用證照',
        passport: 'にほんご護照',
        permit: 'にほんご許可證',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'にほんご請掃描您的護照',
        scanError: 'にほんご掃描錯誤，請重新操作',
        toError: 'error',
        toPreScanQR: 'preScanQRcode'
      },
      scanPermit: {
        scanPermitTitle: 'にほんご請掃描您的入臺證條碼',
        scanError: 'にほんご掃描錯誤，請重新操作',
        toError: 'error',
        toPreScanQR: 'preScanQRcode'
      },
      error: {
        errorTitle: 'にほんご請攜帶您的身分資料及發票至服務中心101號櫃台，',
        errorTitle2: 'にほんご將有專人為您服務，謝謝',
        toHomeText: 'にほんご首頁'
      },
      preScanQRcode: {
        preScanQRcodeTitle: 'にほんご準備掃描購物發票QR Code',
        btScanQRcode: 'にほんご開始掃描',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle: 'にほんご請掃描您的購物發票',

        scanQRcodeTitle2: '您今日已辦理退稅',
        scanQRcodeTitle3: '245',
        scanQRcodeTitle4: '元',

        scanQRcodeTitle5: '發票掃描',
        scanQRcodeTitle6: '消費金額',
        scanQRcodeTitle7: '退稅淨額',

        scanQRcodeTitle8: '張',
        scanQRcodeTitle9: '新台幣',
        scanQRcodeTitle10: '新台幣',
        scanQRcodeTitle11: '1',
        scanQRcodeTitle12: '1,000,000',
        scanQRcodeTitle13: '19,047',

        scanQRcodeTitle14: '詳細資訊',
        scanQRcodeTitle15: '確認',

        scanQRError1: 'にほんご非本日發票無法申請退稅，',
        scanQRError2: 'にほんご請掃描下一張發票',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'にほんご您已輸入的購物發票',
        detailTitle2: '上下滑動看更多',
        detailTitle3: 'にほんご：MT 57302841',
        detailTitle4: 'にほんご品名/型號：',
        detailTitle5: 'にほんご單價/數量：',
        detailTitle6: 'にほんご含稅金額：',
        btDetail1: '確認，回上一頁',
        btDetail2: '刪除',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: 'にほんご請於下方欄位簽名',
        signTitle2: ' にほんご',
        btSign1: '清除簽名',
        btSign2: '確認簽名',
        toSuccess: 'success'
      },
      success: {
        successTitle1: 'にほんご，明細表列印中，請稍後！',
        successTitle2: 'にほんご者請持明細表至服務櫃檯領取退稅款現金。',
        successTitle3: 'にほんご請至出境機場/港口領取您的退稅款，',
        successTitle4: 'にほんご館內市區特約退稅櫃檯。',
        toHomeText: '한국어服務首頁'
      }
    },
    // 越南文
    10: {
      common: {
        indexPage: 'Trang chủ',
        prePage: 'Trang trước'
      },
      mainMenu: {
        mainMenuTitle1: '歡迎使用自助退稅服務，請選擇語言',
        mainMenuTitle2: 'Welcome to tax refund self-service kiosk.',
        mainMenuTitle3: 'Please select language',
        lang02: '繁體中文',
        lang13: '简体中文',
        lang01: 'English',
        lang03: '日本語',
        lang04: '한국어',
        lang05: 'ไทย',
        lang06: 'العربية',
        lang07: 'Español',
        lang08: 'Le français',
        lang09: 'русский',
        lang10: 'Tiếng việt'
      },
      remind: {
        remindTitle1: 'Nhắc nhở bạnS',
        remindTitle2: 'Trước khi rời đi bắt buộc phải lấy phiếu hoàn thuế',
        remindTitle3:
          'Vui lòng chuẩn bị tài liệu nhập cảnh(hộ chiếu/giấy nhập cảnh Đài Loan) và hóa đơn mua hàng để bắt đầu hoàn thuế',
        btTitle: 'Xác nhận,Bắt đầu hoàn thuế',
        toSelectDoc: 'selectDoc'
      },
      selectDoc: {
        selectTitle:
          'Vui lòng chọn những giấy tờ liên quan trong lần nhập cảnh tới Đài Loan',
        passport: 'Hộ chiếu',
        permit: 'Giấy phép xuất nhập cảnh',
        toScanPassport: 'scanPassport',
        toScanPermit: 'scanPermit'
      },
      scanPassport: {
        scanPassportTitle: 'Vui lòng quét hộ chiếu của bạn',
        scanError: 'Không thể xác nhận , vui lòng quét lại hộ chiếu của bạn',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        scanPassportLoading:
          'Đang quét hộ chiếu<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerting:
          'Đang xác minh dữ liệu<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        passportCerted:
          '<div style="margin-top: 10px;">Xác minh thành công</div>'
      },
      scanPermit: {
        scanPermitTitle: 'Vui lòng quét mã vạch thẻ nhập cảnh của bạn',
        scanError:
          'Không thể xác nhận , vui lòng quét lại thẻ nhập cảnh của bạn',
        toError: 'error',
        toPreScanQR: 'preScanQRcode',
        putPermit:
          'Vui lòng căn chỉnh mã vạch ở phía trên bên trái của thẻ nhập cảnh với máy quét hồng ngoại.',
        permitCerting:
          'Đang xác minh dữ liệu<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        permitCerted: '<div style="margin-top: 10px;">Xác minh thành công</div>'
      },
      error: {
        errorTitle: '',
        errorTitle2:
          'Vui lòng mang theo giấy tờ nhập cảnh và hóa đơn của bạn đến quầy hoàn thuế, sẽ có người phục vụ bạn , cảm ơn!',
        toHomeText: 'Trở về trang chủ chính'
      },
      preScanQRcode: {
        preScanQRcodeTitle: 'Chuẩn bị quét mã vạch hóa đơn mua sắm',
        btScanQRcode: 'Bắt đầu quét',
        toScanQR: 'scanQRcode'
      },
      scanQRcode: {
        scanQRcodeTitle1: 'Vui lòng quét mã vạch hóa đơn mua hàng của bạn',
        scanQRcodeTitle2: 'Bạn đã nộp đơn xin hoàn thuế hôm nay ',
        scanQRcodeTitle4: ' Đài tệ',
        scanQRcodeTitle5: 'Quét hóa đơn',
        scanQRcodeTitle6: 'Chi tiết tiêu',
        scanQRcodeTitle7: 'Tiền hoàn thuế',

        scanQRcodeTitle8: 'Trang',
        scanQRcodeTitle9: 'Đài tệ',
        scanQRcodeTitle10: 'Đài tệ',

        scanQRcodeTitle14: 'Nội dung chi tiết',
        scanQRcodeTitle15: 'Xác nhận',

        scanQRError1:
          'Hóa đơn này không được hoàn thuế.<br>Vui lòng quét trang tiếp theo',
        scanQRError2: 'Vui lòng quét trang tiếp theo',
        scanQRError3: 'Hóa đơn này không được hoàn thuế.',
        scanQRError4:
          'Trong hóa đơn có thể bao gồm sản phẩm không được hoàn thuế hoặc không phải hóa đơn tiêu dùng trong ngày hôm nay .',
        scanQRErrorDup: 'Hóa đơn bị lặp lại.<br>Vui lòng quét trang tiếp theo',
        scanQRcodeLoading:
          'Đang tra tìm dữ liệu<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
        dataProcess: 'Xin vui lòng chờ',
        toDetail: 'detail',
        toSign: 'sign'
      },
      detail: {
        detailTitle1: 'Bạn đã nhập hóa đơn mua hàng',
        detailTitle2: 'Vuốt lên và xuống để xem chi tiết',
        detailTitle3: 'Mã số hóa đơn：',
        detailTitle4: '品名/型號：',
        detailTitle5: '單價/數量：',
        detailTitle6: 'Bao gồm thuế：',
        btDetail1: 'Xác nhận , trở về trang<br> trước',
        btDetail2: 'Xóa hóa đơn được đánh<br> dấu',
        toScanQR: 'scanQRcode'
      },
      sign: {
        signTitle1: 'Mời ký tên vào ô bên dưới',
        signTitle2: ' Giây',
        btSign1: 'Xóa ký tên',
        btSign2: 'Xác nhận ký tên',
        toSuccess: 'success'
      },
      success: {
        successTitle1: 'Đang in , xin chờ chút !',
        successTitle2: 'Vui lòng đến quầy số 2 để kiểm tra giấy tờ',
        successTitle3:
          'Không hoàn thành tất cả các thủ tục hoàn thuế sẽ dẫn đến việc bạn không thể lĩnh tiền thuế',
        successTitle4: '',
        toHomeText: 'Trở về trang chủ chính'
      }
    }
  };

  kiosk.cultureMap = {
    'en-US': kiosk.enum.culture.ENUS,
    'zh-TW': kiosk.enum.culture.ZHTW,
    'ja-JP': kiosk.enum.culture.JAJP,
    'ko-KR': kiosk.enum.culture.KOKR,
    'zh-CN': kiosk.enum.culture.ZHCN,
    1: 'en-US',
    2: 'zh-TW',
    3: 'ja-rJP',
    4: 'ko-rKR',
    5: 'zh-rCN'
  };
  kiosk.cultureArry = [1, 2, 3, 4, 5];

  kiosk.secondMideaType = 'Video';
})();
