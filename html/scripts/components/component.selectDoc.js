//Body
Vue.component('component-selectDoc-main', {
  template: '#template-selectDoc-main',
  props: ['model', 'culture'],
  data: function() {
    return { timer: null };
  },
  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].selectDoc;
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
        case 7:
        case 10:
          fontSize = 36;
          break;
        default:
          fontSize = 36;
      }
      return {
        fontSize: fontSize + 'px',
        marginTop: '20px'
      };
    },
    passportFontSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 10:
          fontSize = 27;
          break;
        default:
          fontSize = 32;
      }
      return {
        fontSize: fontSize + 'px'
      };
    },
    entryPermitFontSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 10:
          fontSize = 27;
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
  created: function() {
    kiosk.app.clearUserData();
    this.timer = kiosk.app.autoHomePage(20000);
  },
  destroyed: function() {
    clearTimeout(this.timer);
  }
});

//Head
Vue.component('component-selectDoc-navBar', {
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
      kiosk.API.goToNext('mainMenu');
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
        nav__bar__ae: this.culture === 6 ? true : false,
        nav__bar__vi: this.culture === 10 ? true : false
      };
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  }
});
