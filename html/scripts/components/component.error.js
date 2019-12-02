//Body
Vue.component('component-error-main', {
  template: '#template-error-main',
  props: ['model', 'culture'],
  methods: {
    // Btn Click
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].error;
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    },
    btnFontSize: function() {
      let fontSize = null;
      let left = null;
      let top = null;
      switch (this.culture) {
        case 1:
          fontSize = 24;
          left = 85;
          break;
        case 2:
          fontSize = 28;
          left = 115;
          top = 26;
          break;
        case 3:
          fontSize = 20;
          left = 70;
          top = 30;
          break;
        case 4:
          fontSize = 24;
          left = 100;
          break;
        case 5:
          fontSize = 20;
          left = 95;
          top = 30;
          break;
        case 10:
          fontSize = 24;
          left = 75;
          break;
        case 7:
          fontSize = 20;
          left = 90;
          top = 17;
          break;
        case 13:
          fontSize = 28;
          left = 115;
          top = 26;
          break;
        default:
          fontSize = 28;
          left = 0;
          top = 0;
      }

      return {
        position: 'absolute',
        fontSize: fontSize + 'px',
        left: left + 'px',
        top: top + 'px'
      };
    }
  }
});

//Head
// Vue.component('component-error-navBar', {
//     props: ['culture', 'model'],
//     template: '#template-common-navBar',
//     methods:{
//         backBtn: function () {
//             kiosk.API.goToNext('selectDoc');
//         }
//     }
// });

//ªí§À
// Vue.component("component-test001-foot", {
//     template: '#template-common-foot',
//     props: ['culture', 'model'],
//     methods: {
//         cancelBtn: function () {
//         },
//         getAccountInfo: function () {
//         },
//         goToConfirm: function () {
//         },
//         nextBtn: function () {
//         },
//         backBtn: function () {
//             kiosk.API.goToNext('mainMenu');
//         }
//     },
//     data: function () {
//         var _data = {
//             showNext: true,
//             showBack: true,
//             showCancel: false,
//             enableNext: true,
//             enableBack: true,
//             enableCancel: false,
//             event: {
//                 nextBtn: undefined,
//                 backBtn: undefined,
//             }
//         };

//         kiosk.status.footModel = _data;
//         return _data;
//     },

//     computed: {
//         disableNext: function () {
//             return !this.enableNext
//         },
//         disableBack: function () {
//             return !this.enableBack
//         },
//         disableCancel: function () {
//             return !this.enableCancel;
//         }
//     }
// });
