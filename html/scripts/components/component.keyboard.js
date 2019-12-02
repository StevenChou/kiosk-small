Vue.component('component-keyboard-main', {
  props: ['model', 'culture'],
  template: '#template-keyboard-main',
  data: function() {
    var _data = {
      keyinValue: '',
      btnRows: [
        ['$', '%', '?', ':', ';', '/', '*', '-', '+', '@'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '.'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '(', ')', '_'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      ]
    };
    return _data;
  },
  methods: {
    keyin: function(e) {
      // switch (e.target.innerHTML) {
      switch (e) {
        //case 'SHIFT':
        //    this.toUpperCase = true;
        //    break;
        case '←':
          if (this.keyinValue) {
            this.keyinValue = this.keyinValue.slice(0, -1);
          }
          break;
        case 'Clear':
          this.keyinValue = '';
          break;
        case 'space':
          this.keyinValue = this.keyinValue + ' ';
          break;
        default:
          this.keyinValue = this.keyinValue + '' + e;
          break;
      }
      kiosk.status.keyinValue = this.keyinValue;
    },
    spaceKeyin: function(e) {
      if (this.keyinValue) this.keyinValue = this.keyinValue + ' ';
    },
    handleMouseDown: function(action) {
      if (this.keyinValue === '01234567') {
        kiosk.API.goToNext('admin');
      } else {
        this.keyinValue = '';
        swal({
          title: '密碼錯誤！',
          text: '',
          type: 'error',
          confirmButtonText: '確定',
          allowOutsideClick: false
        });
      }
    }
  },
  mounted: function() {
    kiosk.status.keyinValue = '';
    kiosk.status.CheckPassword = '';
  }
});
