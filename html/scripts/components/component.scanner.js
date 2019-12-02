Vue.component("component-scanner-main", {
    props: ['culture', 'model'],
    template: "#template-scanner-main",

    data: function () {
        kiosk.API.Device.Scanner.startScanner(this.model.validationRegex, function (res) {
            if (res.IsSuccess) {
                kiosk.status.inputval = res.Result;
                kiosk.API.goToNext('process');
            }
        });

        return {};
    },
});

Vue.component("component-scanner-navBar", {
    template: '#template-multipleMenu-navBar',
    props: ['culture', 'model'],

    data: function () {
        return {};
    },
    computed: {
        root: function () {
            return this.model.navBar.breadcrumbs.root;
        },
        current: function () {
            return this.model.navBar.breadcrumbs.current;
        },
    }
});

Vue.component("component-scanner-foot", {
    template: '#template-common-foot',
    props: ['culture', 'model'],
    methods: {
        cancelBtn: function () {
            kiosk.API.Device.Scanner.resetScanner();
            kiosk.API.goToNext('mainMenu');
        },

        getAccountInfo: function () {
        },

        goToConfirm: function () {
        },

        nextBtn: function () {
        },

        backBtn: function () {
            kiosk.API.Device.Scanner.resetScanner();
            kiosk.API.goToNext('getTicket');
        }
    },

    data: function () {
        var _data = {
            showNext: false,
            showBack: true,
            showCancel: true,
            enableNext: false,
            enableBack: true,
            enableCancel: true,
            event: {
            }
        };

        kiosk.status.footModel = _data;
        return _data;
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