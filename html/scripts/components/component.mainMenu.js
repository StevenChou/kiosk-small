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
      openingTimeList: {
        Sunday: { openingTime: '08:00:00' },
        Monday: { openingTime: '08:00:00' },
        Tuesday: { openingTime: '08:00:00' },
        Wednesday: { openingTime: '08:00:00' },
        Thursday: { openingTime: '08:00:00' },
        Friday: { openingTime: '08:00:00' },
        Saturday: { openingTime: '08:00:00' }
      },
      openingTimer: null
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
    settingBackgroundImage: function(imgURL) {
      const x = document.getElementsByTagName('BODY')[0];
      x.style.backgroundImage = imgURL;
    },
    toAdPage: function(unitTestTime) {
      const closingPageObj = this;

      closingPageObj.openingTimer = setInterval(function() {
        kiosk.API.goToNext('adPage');
      }, 5000);
    },
    restartSys: function(unitTestTime) {
      const closingPageObj = this;

      closingPageObj.openingTimer = setInterval(function() {
        const now = !unitTestTime ? new Date() : unitTestTime;
        const timeFormat = 'HH:mm:ss';
        const ymdFormat = 'YYYY-MM-DD';
        const dayOfWeekFormat = 'dddd';

        const curDateTime = moment(now)
          .format(ymdFormat + ',' + dayOfWeekFormat + ',' + timeFormat)
          .split(',');

        const beforeTime = moment(
          curDateTime[0] + ' ' + '21:20:00',
          ymdFormat + ' ' + timeFormat
        );
        const afterTime = moment(
          curDateTime[0] + ' ' + '24:00:00',
          ymdFormat + ' ' + timeFormat
        );

        let baseTimeStr;
        let dayInfo;
        if (
          moment(now, ymdFormat + ' ' + timeFormat).isBetween(
            beforeTime,
            afterTime
          )
        ) {
          // add one day --- 未過 12 點前
          dayInfo = moment(curDateTime[0], ymdFormat)
            .add(1, 'day')
            .format(ymdFormat + ',' + dayOfWeekFormat)
            .split(',');
          // console.log('>>>add one day dayInfo:', dayInfo[0], dayInfo[1]);
        } else {
          dayInfo = curDateTime;
          // console.log('>>> dayInfo:', dayInfo[0], dayInfo[1]);
        }
        baseTimeStr = closingPageObj.openingTimeList[dayInfo[1]].openingTime;

        const baseTime = moment(baseTimeStr, timeFormat)
          .subtract(10, 'minutes')
          .format(timeFormat);

        // console.log('>>> baseTime:', baseTime);
        const curTime = moment(curDateTime[2], timeFormat).format(timeFormat);
        // console.log('>>> curTime:', curTime);

        if (
          moment(curDateTime[0] + ' ' + curTime).isAfter(
            dayInfo[0] + ' ' + baseTime
          ) &&
          moment(curDateTime[0] + ' ' + curTime).isBefore(
            dayInfo[0] + ' 07:52:00'
          )
        ) {
          clearInterval(closingPageObj.openingTimer);
          kiosk.API.System.Reboot();
          // console.log('>>>@@@' + curDateTime[0] + ' ' + curTime);
          // console.log('>>>@@@' + dayInfo[0] + ' ' + baseTime);
          /* console.log(
            '>>> 哈哈哈  ---> 重新開機吧！！' + curDateTime[0] + ' ' + curTime
          ); */
        } else {
          // console.log('>>>' + curDateTime[0] + ' ' + curTime);
          // console.log('>>>' + dayInfo[0] + ' ' + baseTime);
        }
      }, 10000);
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
    this.restartSys();
    // this.toAdPage();
    // this.restartSys(moment('2020-02-07 07:51:01', 'YYYY-MM-DD HH:mm:ss'));
  },
  mounted: function() {
    this.settingBackgroundImage("url('img/wallpaper.png')");
  },
  beforeDestroy: function() {
    this.settingBackgroundImage('none');
    clearInterval(this.openingTimer);
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
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },
  computed: {}
});
