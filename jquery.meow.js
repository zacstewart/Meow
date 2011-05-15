(function( $ ){
  var meows = [];
  var current_id = 0;

  function Meow() {
    var that = this;
    this.id = 0;
    this.message = '';
    this.timestamp = Date.now();
    this.duration = 2400;

    this.draw = function() {
      console.log(that.message);
      $('#meows').append($('<div id="meow-' + that.id + '" class="meow">' + that.message + '</div>').hide().fadeIn(400));
      that.timeout = setTimeout(function() { that.destroy(); }, that.duration);
    };

    this.destroy = function( ) {
      console.log('removing');
      console.log(that);
      $('#meow-' + that.id).fadeOut(400, function() { $(that).remove(); });
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
  };

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
}( jQuery ));