Vue.component('component-closingPage-main', {
  props: ['model', 'culture'],
  template: '#template-closingPage-main',
  data: function() {
    return {
      activeLang: this.culture,
      openingTimeList: {
        Sunday: { openingTime: '11:00:00' },
        Monday: { openingTime: '11:00:00' },
        Tuesday: { openingTime: '11:00:00' },
        Wednesday: { openingTime: '11:00:00' },
        Thursday: { openingTime: '11:00:00' },
        Friday: { openingTime: '09:30:00' },
        Saturday: { openingTime: '11:00:00' }
      },
      openingTimer: null
    };
  },
  methods: {
    restartSys: function() {
      const closingPageObj = this;

      closingPageObj.openingTimer = setInterval(function() {
        const now = new Date();
        const timeFormat = 'HH:mm:ss';
        const ymdFormat = 'YYYY-MM-DD';
        const dayOfWeekFormat = 'dddd';

        const curDateTime = moment(now)
          .format(ymdFormat + ',' + dayOfWeekFormat + ',' + timeFormat)
          .split(',');

        const beforeTime = moment(
          curDateTime[0] + ' ' + '17:20:00',
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
          console.log('>>>add one day dayInfo:', dayInfo[0], dayInfo[1]);
        } else {
          dayInfo = curDateTime;
          console.log('>>> dayInfo:', dayInfo[0], dayInfo[1]);
        }
        baseTimeStr = closingPageObj.openingTimeList[dayInfo[1]].openingTime;

        const baseTime = moment(baseTimeStr, timeFormat)
          .subtract(10, 'minutes')
          .format(timeFormat);

        console.log('>>> baseTime:', baseTime);
        const curTime = moment(curDateTime[2], timeFormat).format(timeFormat);
        console.log('>>> curTime:', curTime);

        if (
          moment(curDateTime[0] + ' ' + curTime).isAfter(
            dayInfo[0] + ' ' + baseTime
          )
        ) {
          clearInterval(closingPageObj.openingTimer);
          // kiosk.API.System.Reboot();
          console.log('>>>@@@' + curDateTime[0] + ' ' + curTime);
          console.log('>>>@@@' + dayInfo[0] + ' ' + baseTime);
          alert(
            '>>> 哈哈哈  ---> 重新開機吧！！' + curDateTime[0] + ' ' + curTime
          );
        } else {
          console.log('>>>' + curDateTime[0] + ' ' + curTime);
          console.log('>>>' + dayInfo[0] + ' ' + baseTime);
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
    this.restartSys();
  },
  beforeDestroy: function() {
    clearInterval(this.openingTimer);
  }
});
