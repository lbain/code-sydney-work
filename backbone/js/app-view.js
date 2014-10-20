var app = app || {};
app.AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo');
    // when new elements are added to the collection render then with addOne
    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch(); // Loads list from local storage
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter',
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      return;
    }
    app.todoList.create(this.newAttributes());
    this.input.val(''); // clean input box
  },
  addOne: function(todo){
    var view = new app.TodoView({model: todo});
    var element = view.render().$el;
    element.data("model", todo);
    $('#todo-list').append(element);
  },
  addAll: function(){
    this.$('#todo-list').html(''); // clean the todo list
    app.todoList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});

//--------------
// Initializers
//--------------

app.appView = new app.AppView();