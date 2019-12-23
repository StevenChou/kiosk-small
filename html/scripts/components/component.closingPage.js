Vue.component('component-closingPage-main', {
  props: ['model', 'culture'],
  template: '#template-closingPage-main',
  data: function() {
    return {
      activeLang: this.culture,
      openingTimeList: {
        Sunday: { openingTime: '' },
        Monday: { openingTime: '14:24' },
        Tuesday: { openingTime: '' },
        Wednesday: { openingTime: '' },
        Thursday: { openingTime: '' },
        Friday: { openingTime: '' },
        Saturday: { openingTime: '' }
      },
      openingTimer: null
    };
  },
  methods: {
    restartSys: function() {
      const closingPageObj = this;
      closingPageObj.openingTimer = setInterval(function() {
        const curDateTime = moment()
          .format('dddd,HH:mm')
          .split(',');
        if (
          closingPageObj.openingTimeList[curDateTime[0]].openingTime ===
          curDateTime[1]
        ) {
          clearInterval(closingPageObj.openingTimer);
          kiosk.API.System.Reboot();
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
    this.restartSys();
  },
  beforeDestroy: function() {
    clearInterval(this.openingTimer);
  }
});
