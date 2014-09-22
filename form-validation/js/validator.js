var Validator = {
  emailRegex: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
  passwordRegex: /^[a-z]+$/,
  numberRegex: /^[0-9]+$/,
  countryRegex:/[a-zA-Z]{2,}/,

  valid: function(validateMethod, given){
    return this[validateMethod+'Regex'].exec(given);
  },

  email_error_message: 'You need to provide a valid email address',
  password_error_message: 'Passwords must be all lowercase letters',
  number_error_message: 'Must be a number',
  country_error_message: 'Must be a country name',

  validate_field: function($el){
    var validateMethod = $el.data('validate-as') || $el.attr('type');
    console.log(validateMethod);
    var $errorMessage = $el.closest('.form-input').find('.error-msg');
    if(!this.valid(validateMethod, $el.val())) {
      $errorMessage.text(this[validateMethod + '_error_message']);
      return false;
    } else {
      $errorMessage.text('');
      return true;
    }
  }
};

$(function() {
  $('form').focusout(function(event){
    var $target = $(event.target)
    if($target.is('input') && $target.val()){
      Validator.validate_field($target);
    }
  });
  $('form').submit(function(event){
    var inputs = $(event.target).closest('form').find('input').not(':input[type=submit]');
    var numInvalid = $.grep(inputs, function( input, index ) {
      return !Validator.validate_field($(input));
    }).length;
    if(numInvalid > 0){
      event.preventDefault();
    }
  });
});