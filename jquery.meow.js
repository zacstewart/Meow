// jQuery Meow by Zachary Stewart (zacstewart.com)
//
// Copyright (c) 2011 Zachary Stewart
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function ($) {
  'use strict';

  var meows = {},
    methods = {};

  function Meow(options) {
    var that = this;
    this.title = options.title
    this.message = options.message;
    this.icon = options.icon;
    this.timestamp = Date.now();
    this.duration = options.duration || 2400;
    this.hovered = false;
    this.manifest = {};
    $('#meows').append($(document.createElement('div'))
      .attr('id', 'meow-' + this.timestamp)
      .addClass('meow')
      .html($(document.createElement('div')).addClass('inner').html(this.message))
      .hide()
      .fadeIn(400));

    this.manifest = $('#meow-' + this.timestamp);

    if (typeof this.title === 'string') {
      this.manifest.find('.inner').prepend(
        $(document.createElement('h1')).text(this.title)
      );
    }

    if (typeof that.icon === 'string') {
      this.manifest.find('.inner').prepend(
        $(document.createElement('div')).addClass('icon').html(
          $(document.createElement('img')).attr('src', this.icon)
        )
      );
    }

    this.manifest.bind('mouseenter mouseleave', function (event) {
      if (event.type === 'mouseleave') {
        that.hovered = false;
        that.manifest.removeClass('hover');
        if (that.timestamp + that.duration <= Date.now()) {
          that.destroy();
        }
      } else {
        that.hovered = true;
        that.manifest.addClass('hover');
      }
    });

    this.timeout = setTimeout(function () {
      if (that.hovered !== true && typeof that === 'object') {
        that.destroy();
      }
    }, that.duration);

    this.destroy = function () {
      that.manifest.find('.inner').fadeTo(400, 0, function () {
        that.manifest.slideUp(function () {
          that.manifest.remove();
          delete meows[that.timestamp];
        });
      });
    };
  }

  methods = {
    configMessage: function (options) {
      var trigger,
        title,
        message,
        icon,
        message_type,
        duration;

      if (typeof options.title === 'string') {
        title = options.title;
      }
      if (typeof options.message === 'string') {
        message_type = 'string';
      } else if (typeof options.message === 'object') {
        message_type = options.message.get(0).nodeName;
        if (typeof title === 'undefined' && typeof options.message.attr('title') === 'string') {
          title = options.message.attr('title');
        }
      }

      switch (message_type) {
      case 'string':
        message = options.message;
        break;
      case 'INPUT':
      case 'SELECT':
      case 'TEXTAREA':
        message = options.message.attr('value');
        break;
      default:
        message = options.message.text();
        break;
      }

      if (typeof options.icon === 'string') {
        icon = options.icon;
      }

      duration = options.duration;

      return {
        trigger: trigger,
        message: message,
        icon: icon,
        title: title,
        duration: duration,
        message_type: message_type
      }
    },
    createMessage: function (options) {
      var meow = new Meow(options);
      meows[meow.timestampe] = meow;
    }
  };

  $.fn.meow = function (args) {
    var options,
      trigger;
    return this.each(function () {
      if (typeof args === 'string') {
        trigger = options;
      } else if (typeof args === 'object') {
        // set the event
        if (typeof args.trigger === 'string') {
          trigger = args.trigger;
        }
      }
      if (typeof trigger === 'string') {
        $(this).bind(trigger, function () {
          options = methods.configMessage(args);
          methods.createMessage(options);
        });
      } else if (typeof trigger === 'undefined') {
        options = methods.configMessage(args);
        methods.createMessage(options);
      }
    });
  };
}(jQuery));