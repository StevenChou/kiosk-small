// MainPage
Vue.component('component-mainMenu-main', {
  props: ['model', 'culture'],
  template: '#template-mainMenu-main',
  data: function() {
    return {
      activeLang: this.culture,
      keyboardLock: {
        bottomLeftCount: 0,
        topRightCount: 0,
        keyboardLockOne: true,
        keyboardLockTwo: true
      },
      closingTimeList: {
        Sunday: { closingTime: '' },
        Monday: { closingTime: '14:23' },
        Tuesday: { closingTime: '' },
        Wednesday: { closingTime: '' },
        Thursday: { closingTime: '' },
        Friday: { closingTime: '' },
        Saturday: { closingTime: '' }
      },
      closingTimer: null
    };
  },
  methods: {
    openKeyboardOne: function() {
      if (++this.keyboardLock.bottomLeftCount === 5) {
        alert('第一階段解鎖!!');
        this.keyboardLock.bottomLeftCount = 0;
        this.keyboardLock.keyboardLockOne = false;
      }
    },
    openKeyboardTwo: function() {
      if (++this.keyboardLock.topRightCount === 7) {
        alert('第二階段解鎖!!');
        this.keyboardLock.topRightCount = 0;
        this.keyboardLock.keyboardLockTwo = false;
      }

      if (
        !this.keyboardLock.keyboardLockOne &&
        !this.keyboardLock.keyboardLockTwo
      ) {
        kiosk.API.goToNext('keyboard');
      }
    },
    toClosingPage: function() {
      const mainMenuObj = this;
      mainMenuObj.closingTimer = setInterval(function() {
        const curDateTime = moment()
          .format('dddd,HH:mm')
          .split(',');
        if (
          mainMenuObj.closingTimeList[curDateTime[0]].closingTime ===
          curDateTime[1]
        ) {
          clearInterval(mainMenuObj.closingTimer);
          kiosk.API.goToNext('closingPage');
        }
      }, 5000);
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].mainMenu;
    }
  },
  created: function() {
    kiosk.API.initStatus();
    kiosk.app.clearUserData();

    // 導到暫停服務頁面！！
    this.toClosingPage();
  },
  beforeDestroy: function() {
    clearInterval(this.closingTimer);
  }
});

Vue.component('component-common-langmenu', {
  template: '#template-navbar-common-culture',
  props: ['culture'],
  data: function() {
    return {
      rows: [
        [
          {
            next: 'remind',
            culture: 'ZHTW',
            name: kiosk.wording[this.culture].mainMenu.lang02
          },
          {
            next: 'remind',
            culture: 'ZHCH',
            name: kiosk.wording[this.culture].mainMenu.lang13
          },
          {
            next: 'remind',
            culture: 'ENUS',
            name: kiosk.wording[this.culture].mainMenu.lang01
          },
          {
            next: 'remind',
            culture: 'JAJP',
            name: kiosk.wording[this.culture].mainMenu.lang03
          },
          {
            next: 'remind',
            culture: 'KOKR',
            name: kiosk.wording[this.culture].mainMenu.lang04
          }
        ]
        // [
        //   {
        //     next: 'remind',
        //     culture: 'KOKR',
        //     name: kiosk.wording[this.culture].mainMenu.lang04
        //   },
        //   {
        //     next: 'remind',
        //     culture: 'ESES',
        //     name: kiosk.wording[this.culture].mainMenu.lang07
        //   },
        //   {
        //     next: 'remind',
        //     culture: 'THTH',
        //     name: kiosk.wording[this.culture].mainMenu.lang05
        //   },
        //   {
        //     next: 'remind',
        //     culture: 'VIVN',
        //     name: kiosk.wording[this.culture].mainMenu.lang10
        //   }
        // ]
        // [
        //   {
        //     next: 'remind',
        //     culture: '999',
        //     name: kiosk.wording[this.culture].mainMenu.lang09
        //   },
        //   {
        //     next: 'remind',
        //     culture: '000',
        //     name: kiosk.wording[this.culture].mainMenu.lang10
        //   },
        //   {
        //     next: 'remind',
        //     culture: '888',
        //     name: kiosk.wording[this.culture].mainMenu.lang08
        //   }
        // ]
      ]
    };
  },
  methods: {
    wording: function() {
      return kiosk.wording[this.culture].mainMenu;
    },
    changeCulture: function(el) {
      kiosk.API.changeCulture(kiosk.enum.culture[el]);
    },
    isActive: function(culture) {
      var result = this.culture == culture;
      return result;
    },
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },
  computed: {
    // wording: function() {
    //   return kiosk.wording[this.culture].mainMenu;
    // }
  }
});
