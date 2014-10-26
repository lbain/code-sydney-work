var app = app || {};

app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
    ordinal: 0
  },
  toggle: function(){
    this.save({ completed: !this.get('completed')});
  }
});