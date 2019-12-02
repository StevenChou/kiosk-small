Vue.component("component-common-footer", {
    template: '#template-common-foot',
    props: ['culture', 'model'],

    data: function () {
        var _data = $.extend({
            loading:true,
            showNext: true,
            showBack: true,
            showCancel: true,
            enableNext: false,
            enableBack: false,
            enableCancel: false,
            callback: undefined,
        }, this.model);
        kiosk.app.currentFootModel = _data;
        return _data;
    },
    methods: {
        backHome: function () {
            swal({
                title: '您將返回首頁',
                text: '確定返回嗎？',
                type: 'info',
                cancelButtonText: '取消',
                showCancelButton: true,
                confirmButtonText: '返回',
            }).then(function (isConfirm) {
                if (isConfirm.value) {
                    kiosk.API.log.logInfo('點擊返回，目前在：' + kiosk.currentModelKey + '頁')
                    kiosk.API.goToNext("mainMenu");
                }
                else if (isConfirm.dismiss === "cancel") {
                    kiosk.API.log.logInfo('點擊取消')
                    return
                }
            })
        },
    },
    computed: {
        disableNext: function () {
            return !this.enableNext && this.directPage;
        },
        disableBack: function () {
            return !this.enableBack && this.backPage;
        },
        disableCancel: function () {
            return !this.enableCancel;
        }

    }
});

Vue.component("component-common-langmenu", {
    template: '#template-navbar-common-culture',
    props: ['culture'],
    data: function () {
        return {
            activeLang: this.culture
        };
    },
    methods: {
        handleMouseDown: function (nextId) {
            kiosk.API.goToNext(nextId);
        },
        changeCulture: function (el) {
            kiosk.API.changeCulture(kiosk.enum.culture[el]);
            // alert(kiosk.culture)
            kiosk.currentCulture = returnCulture[kiosk.culture];
            // alert(kiosk.currentCulture)
        },
        isActive: function (culture) {
            var result = this.culture == culture;
            return result;
        },
    },
    mounted: function () {
        
    }
});

Vue.component("component-common-loading", {
    template: '#template-common-loading',
    props: ['culture','loading'],
    data: function () {
        return {

        };
    },
    methods: {
        
    },
    mounted: function () {

    }
});