(function ($) {
  'use strict';

  var meows = {},
    methods = {};

  function Meow(message, icon) {
    var that = this;
    this.message = message;
    this.icon = icon;
    this.timestamp = Date.now();
    this.duration = 2400;
    this.hovered = false;
    this.dead = false;
    this.manifest = {};
    $('#meows').append($(document.createElement('div'))
      .attr('id', 'meow-' + that.timestamp)
      .addClass('meow')
      .html($(document.createElement('div')).addClass('inner').text(that.message))
      .hide()
      .fadeIn(400));


    that.manifest = $('#meow-' + that.timestamp);

    if (typeof that.icon === 'string') {
      that.manifest.find('.inner').prepend(
        $(document.createElement('div')).addClass('icon').html(
          $(document.createElement('img')).attr('src', icon)
        )
      );
    }

    that.manifest.bind('mouseenter mouseleave', function (event) {
      if (event.type === 'mouseleave') {
        that.hovered = false;
        that.manifest.removeClass('hover');
       if (that.timestamp + that.duration <= Date.now()) {
          that.destroy();
        };
      } else {
        that.hovered = true;
        that.manifest.addClass('hover');
      }
    });

    that.timeout = setTimeout(function () {
      if (that.hovered !== true && typeof that === 'object' && that.dead !== true) {
        that.destroy();
      }
    }, that.duration);

    this.destroy = function () {
      that.manifest.find('.inner').fadeTo(400, 0, function () {
        that.manifest.slideUp(function () {
          that.manifest.remove();
          that.dead = true;
          delete meows[that.timestamp];
        });
      });
    };
  }

  methods = {
    createMessage: function (message, icon) {
      var meow = new Meow(message, icon);
      meows[meow.timestampe] = meow;
    }
  };

  $.fn.meow = function (event, options) {
    var message,
      icon;
    return this.each(function () {
      if (typeof options === 'object') {
        if (typeof options.message === 'string') {
          message = options.message;
        } else if (typeof options.message === 'object') {
          var type = options.message[0].nodeName;
          if ($.inArray(type, ['INPUT', 'SELECT', 'TEXTAREA']) !== -1) {
            message = options.message.attr('value');
          } else {
            message = options.message.text();
          }
        }
        if (typeof options.icon === 'string') {
          icon = options.icon;
        }
      } else if (typeof options === 'string') {
        message = options;
      }
      if (event && message) {
        $(this).bind(event, function () {
          methods.createMessage(message, icon);
        });
      }
    });
  };
}(jQuery));