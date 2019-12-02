var scannerPage = {
    waitSacnner: 1,
    showKeyboard: 2,
    showProcessing: 3
};

Vue.component("component-keyin-main", {
    props: ['culture', 'model'],
    template: "#template-keyin-main",
    name: "",

    // 初始化作業
    data: function () {
        var _data = {
            keyinValue: '',
            passViewModel: kiosk.currentModelKey,
            currentPage: scannerPage.showKeyboard,
        };

        return _data;
    },

    methods: {

        goToConfirm: function () {
            var input = {
                serviceProviderCode: this.model.product.serviceProvider.code,
                referenceNo1: this.refNo1,
                referenceNo2: this.refNo2,
            };
            kiosk.status.currentModel.serviceType = 3;
            kiosk.status.currentModel.currentPage = scannerPage.showProcessing;
            MOL.API.getAccount(input, function (res) {

                if (res.Valid) {
                    kiosk.status.currentModel.billInfo = res.Info;
                    kiosk.API.goToNext('process');
                } else {
                    kiosk.API.goToNext('Error');
                }

            });
        },

        shift: function () {
            this.isSHIFT = !this.isSHIFT;
        },

        keyin: function (e) {
            switch (e.target.innerHTML) {
                //case 'SHIFT':
                //    this.toUpperCase = true;
                //    break;
                case 'DEL':
                    if (this.keyinValue) {
                        this.keyinValue = this.keyinValue.slice(0, -1);
                    }
                    break;
                default:
                    this.keyinValue = this.keyinValue + '' + e.target.innerHTML;
                    break;
            }
        },

        backKeyin: function (e) {
            if (this.keyinValue)
                this.keyinValue = this.keyinValue.slice(0, -1);
        },

        showKeyboard: function () {
            kiosk.API.Device.Scanner.resetScanner();
            this.currentPage = scannerPage.showKeyboard;
            kiosk.status.footModel.showNext = true;
        },

        validateRefNo: function (settings, refNo) {
            var regRule = settings.validationRegex || '(?:)';
            return (new RegExp(regRule)).test(refNo);
        },
    },

    computed: {

        keyboardWord: function () {
            var label = "";
            if (this.inputTarget = 'refNo1') {
                label = this.serviceSettings.referenceNo1Setting.labal;
            } else if (this.inputTarget = 'refNo2') {
                label = this.serviceSettings.referenceNo2Setting.labal;
            }
            else {
                label = "Pay Amount "
            }
            return "Enter Your " + label;
        },

        isAmountValid: function () {
            return this.amount >= this.serviceSettings.minAmount && this.amount <= this.serviceSettings.maxAmount;
        },

        isRefNo1Valid: function () {

            return this.validateRefNo(this.serviceSettings.referenceNo1Setting, this.refNo1);
        },

        isRefNo2Valid: function () {
            return this.validateRefNo(this.serviceSettings.referenceNo1Setting, this.refNo2);
        },

        enableNext: function () {
            kiosk.status.footModel.enableNext = true;
            return true;
        },

        displayModel: function () {
            var refSetting = this.inputTarget == 'refNo1' ? this.serviceSettings.referenceNo1Setting : this.serviceSettings.referenceNo2Setting;
            this.keyboardType = refSetting.inputTypeId == 1 || refSetting.inputTypeId == 3 ? 'kekyboard' : "numraic";
            return {
                labal: refSetting.labal,
                markImg: 'img/' + this.model.product.serviceProvider.code + '.gif',
            };
        }
    },

    watch: {

        keyinValue: function (nVal) {
            this[this.inputTarget] = nVal;
        },

        inputTarget: function (nVal, oVal) {

            this.currentPage = scannerPage.showKeyboard;
            kiosk.status.footModel.showNext = true;
            this.keyinValue = '';
        }
    },
});

Vue.component("component-keyin-navBar", {
    template: '#template-multipleMenu-navBar',
    props: ['culture', 'model'],

    data: function () {
        return {}
    },

    computed: {
        root: function () {
            return this.model.navBar.breadcrumbs.root;
        },
        current: function () {
            return this.model.navBar.breadcrumbs.current;
        },
    },

    methods: {
        goToHome: function () {
            goToNext('mainMenu');
        },
    }
});

Vue.component("component-keyin-foot", {
    template: '#template-common-foot',
    props: ['culture', 'model'],

    data: function () {
        var _data = {
            showNext: true,
            showBack: true,
            showCancel: true,
            enableNext: true,
            enableBack: true,
            enableCancel: true,
            event: {
                nextBtn: undefined,
                backBtn: undefined,
            }
        };

        kiosk.status.footModel = _data;
        return _data;
    },

    methods: {
        cancelBtn: function () {
            kiosk.API.goToNext('mainMenu');
        },

        getAccountInfo: function () {
        },

        // 實際交易行為
        goToConfirm: function () {
            kiosk.API.goToNext('process');
        },

        nextBtn: function () {
            this.goToConfirm();
        },

        backBtn: function () {
            kiosk.API.goToNext('getTicket');
        }
    },

    computed: {
        disableNext: function () {
            return !this.enableNext
        },
        disableBack: function () {
            return !this.enableBack
        },
        disableCancel: function () {
            return !this.enableCancel;
        }
    }
});