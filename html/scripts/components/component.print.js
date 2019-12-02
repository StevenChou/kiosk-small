Vue.component("component-print-main", {
    template: '#template-print-main',
    props: ['culture'],
    // data: function () {
    //     $('body').attr('class', 'var1 thankyou');

        //// 列印語法，目前沒有正式接上Thermal Print，所以進行註解
        //var printData = {
        //    id: 50041325,
        //    name: '測試商品名稱',
        //    price: 100
        //};

        //try {
        //    kiosk.API.Device.Thermal.PrintTemplatePage("digitalPin", printData);
        //} catch (e) {
        //    var msg = '';
        //    $.each(e, function (i, v) { msg += i + ':' + v + '\r\n'; });
        //}

    //     setTimeout(function () {
    //         kiosk.API.goToNext('mainMenu');
    //     }, 5000);

    //     return {};
    // },

    computed: {
        wording: function () {
            return kiosk.wording[this.culture].PrintPage;
        },
    }
});