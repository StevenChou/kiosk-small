//Body
Vue.component('component-getTicket-main', {
    props: ['model'],
    template: '#template-getTicket-main',
    methods: {

        handleMouseDown: function (nextId) {
            kiosk.API.goToNext(nextId);
        },

        splitForRow: function (btns) {
            var result = [[]],
                r = 0,
                ri = 0;

            btns.forEach(function (element, index) {

                if (ri == 7) {
                    r++;
                    ri = 0;
                    result[r] = [];
                }

                result[r].push(element);
                ri++;
            });

            return result;
        }
    },

    data: function () {
        kiosk.API.initStatus();
        return {};
    },

    computed: {
        billList: function () {
            var result = this.splitForRow(this.model.btns.trans);
            return result;
        },
    },
});

//Head
Vue.component('component-getTicket-navBar', {
    props: ['culture', 'model'],
    template: '#template-common-navBar',
});

//ªí§À
Vue.component("component-getTicket-foot", {
    template: '#template-common-foot',
    props: ['culture', 'model'],
    methods: {
        cancelBtn: function () {
        },
        getAccountInfo: function () {
        },
        goToConfirm: function () {
        },
        nextBtn: function () {
        },
        backBtn: function () {
            kiosk.API.goToNext('mainMenu');
        }
    },
    data: function () {
        var _data = {
            showNext: false,
            showBack: true,
            showCancel: false,
            enableNext: false,
            enableBack: true,
            enableCancel: false,
            event: {
                nextBtn: undefined,
                backBtn: undefined,
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