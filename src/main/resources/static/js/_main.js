
var checkApi = Vue.resource('/check');

Vue.component('check-form', {
    data : {},
    template: '<div>' +
        '<input type="text" placeholder="Write something..." />' +
        '<input type="button" value="Save"/>'
    +'</div>'

})

new Vue({
    el: '#row',
    methods: {
        checklistHandler: function (url) {
            window.location.href = url
        }
    }
})
const redirectString = "google.com"
Vue.component('check-row', {
    props: ['check'],
    template: '<div id="row" v-on:click="checklistHandler(redirectString)"> <i>{{check.id}}</i> {{check.checkerName}} {{check.checkTarget}} {{check.checkStatus}}</div>'
});


Vue.component('checks-list', {
    props : ['checks'],
    template: '<div>' +
        '<div>ID FIO</div>' +
        '<check-row v-for="check in checks" :key="check.id" :check="check"/></div>',
    created: function(){
        checkApi.get().then(result =>
            result.json().then(data =>
                data.forEach(check =>
                    this.checks.push(check))))
    }
});


var app = new Vue({
    el: '#app',
    template: '<div><checks-list :checks="checks"/></div>',
    data: {
        checks: []
    }
})