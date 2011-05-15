(function( $ ){
  var meows = [];
  var current_id = 0;

  function Meow() {
    this.id = 0;
    this.message = '';
    this.timestamp = Date.now();
    this.duration = 2400;

    this.draw = function() {
      that = this;
      console.log(this.message);
      $('#meows').append($('<div id="meow-' + this.id + '">' + this.message + '</div>').hide().fadeIn(400));
      setTimeout('that.destroy()', this.duration);
    };

    this.destroy = function( ) {
      console.log('removing');
      $('#meow-' + that.id).fadeOut(400, function() { $(this).remove() });
      that.delete;
    };
  }

  var methods = {
    createMessage: function( message ) {
      var meow = new Meow();
      meow.id = current_id;
      meow.message = message;
      meow.draw();
      meows.push(meow);
      current_id++;
    }
  }

  $.fn.meow = function( event, message ) {
    return this.each(function() {
      if ( event && message ) {
        var $this = $(this);
        if ( event === 'click' ) {
          $this.click(function() {
            methods.createMessage(message);
          });
        }
      }
    });

  };
})( jQuery );