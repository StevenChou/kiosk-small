Vue.component('component-process-navBar', {
    props: ['culture', 'model'],
    template: '#template-process-navBar',
});

Vue.component('component-process-main', {
    props: ['model'],
    template: '#template-process-main',

    data: function () {
        //var input = Kiosk.status.inputval;
        //kiosk.API.makeorder(input, function (res) {
        //    if (res.IsSuccess) {
        //        kiosk.status.result = res.Result;
        //        kiosk.API.goToNext('process');
        //    }
        //});

        setTimeout(function () {
            kiosk.API.goToNext('print');
        }, 3000);

        return {
            testMessage:"testMessage",
        };
    },
});