var chinaWeek = ['日', '一', '二', '三', '四', '五', '六'];
var storage = window.localStorage;
var getId = function() {
  var random = parseInt(Math.random() * 1000);
  return '' + Date.now() + random;
}

var vm = new Vue({
  el: '#app',
  data: {
    company: storage['duty_company'] ? JSON.parse(storage['duty_company']) : [],
    members: staff,
    selmembers: []
  },
  methods: {
    save: function() {
      storage['duty_company'] = JSON.stringify(this.company);
    },
    addMember: function() {
      this.company.unshift({
        "id": getId(),
        "date": Date.now(),
        "members": this.selmembers
      });
      this.selmembers.forEach(function(name) {
        for (var num in vm.members) {
          var employee = vm.members[num];
          if (employee.name == name) {
            employee.dutytimes += 1;
          }
        }
      });
      this.save();
    },
    remove: function(id) {
      this.company.forEach(function(element, index) {
        console.log(this);
        if (id == element.id) {
          this.company.splice(index, 1);
        }
      }.bind(this));
      this.save();
    }
  },
  filters: {
    dutydate: function(val) {
      var dateObj = new Date(parseInt(val));
      var month = dateObj.getMonth() + 1;
      var date = dateObj.getDate();
      var weekNum = dateObj.getDate();
      var week = '日';
      if (weekNum >= 0 && weekNum <= 6) {
        var week = chinaWeek[weekNum];
      }
      return month + '月' + date + '日，周' + week;
    }
  }
})
