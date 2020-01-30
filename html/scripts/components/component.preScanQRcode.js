//Body
Vue.component('component-preScanQRcode-main', {
  template: '#template-preScanQRcode-main',
  props: ['model', 'culture'],

  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },

  computed: {
    wording: function() {
      return kiosk.wording[this.culture].preScanQRcode;
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    },
    titleFontSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 1:
        case 3:
        case 13:
        case 4:
        case 2:
          fontSize = 44;
          break;
      }
      return {
        fontSize: fontSize + 'px',
        marginTop: '20px'
      };
    },
    imgURL: function() {
      let url = 'img/';
      switch (this.culture) {
        case 1:
          url += 'Invoice-EN.gif';
          break;
        case 2:
          url += 'Invoice-TC.gif';
          break;
        case 13:
          url += 'Invoice-SC.gif';
          break;
        case 3:
          url += 'Invoice-JP.gif';
          break;
        default:
          url += 'Invoice-KR.gif';
      }
      return url;
    }
  }
});

//Head
Vue.component('component-preScanQRcode-navBar', {
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
      kiosk.API.goToNext('selectDoc');
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
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
