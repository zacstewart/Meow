(function ($, window) {
  'use strict';
  // Meow queue
  var default_meow_area,
    meows = {
      queue: {},
      add: function (meow) {
        this.queue[meow.timestamp] = meow;
      },
      get: function (timestamp) {
        return this.queue[timestamp];
      },
      remove: function (timestamp) {
        delete this.queue[timestamp];
      },
      size: function () {
        var timestamp,
          size = 0;
        for (timestamp in this.queue) {
          if (this.queue.hasOwnProperty(timestamp)) { size += 1; }
        }
        return size;
      }
    },
    // Meow constructor
    Meow = function (options) {
      var that = this;

      this.timestamp = new Date().getTime();  // used to identify this meow and timeout
      this.hovered = false;                   // whether mouse is over or not

      if (typeof default_meow_area === 'undefined'
          && typeof options.container === 'undefined') {
        default_meow_area = $(window.document.createElement('div'))
            .attr({'id': ((new Date()).getTime()), 'class': 'meows'});
        $('body').prepend(default_meow_area);
      }

      if (meows.size() <= 0) {
        if (typeof options.beforeCreateFirst === 'function') {
          options.beforeCreateFirst.call(that);
        }
      }

      if (typeof options.container === 'string') {
        this.container = $(options.container);
      } else {
        this.container = default_meow_area;
      }


      if (typeof options.title === 'string') {
        this.title = options.title;
      }

      if (typeof options.message === 'string') {
        this.message = options.message;
      } else if (options.message instanceof $) {
        if (options.message.is('input,textarea,select')) {
          this.message = options.message.val();
        } else {
          this.message = options.message.text();
        }

        if (typeof this.title === 'undefined' && typeof options.message.attr('title') === 'string') {
          this.title = options.message.attr('title');
        }
      }

      if (typeof options.icon === 'string') {
        this.icon = options.icon;
      }
      if (options.sticky) {
        this.duration = Infinity;
      } else {
        this.duration = options.duration || 5000;
      }

      // Call callback if it's defined (this = meow object)
      if (typeof options.beforeCreate === 'function') {
        options.beforeCreate.call(that);
      }

      // Add the meow to the meow area
      this.container.append($(window.document.createElement('div'))
        .attr('id', 'meow-' + this.timestamp.toString())
        .addClass('meow')
        .html($(window.document.createElement('div')).addClass('inner').html(this.message))
        .hide()
        .fadeIn(400));

      this.manifest = $('#meow-' + this.timestamp.toString());

      // Add title if it's defined
      if (typeof this.title === 'string') {
        this.manifest.find('.inner').prepend(
          $(window.document.createElement('h1')).text(this.title)
        );
      }

      // Add icon if it's defined
      if (typeof that.icon === 'string') {
        this.manifest.find('.inner').prepend(
          $(window.document.createElement('div')).addClass('icon').html(
            $(window.document.createElement('img')).attr('src', this.icon)
          )
        );
      }

      // Add close button if the meow isn't uncloseable
      // TODO: this close button needs to be much prettier
      if (options.closeable !== false) {
        this.manifest.find('.inner').prepend(
          $(window.document.createElement('a'))
            .addClass('close')
            .html('&times;')
            .attr('href', '#close-meow-' + that.timestamp)
            .click(function (e) {
              e.preventDefault();
              that.destroy();
            })
        );
      }

      this.manifest.bind('mouseenter mouseleave', function (event) {
        if (event.type === 'mouseleave') {
          that.hovered = false;
          that.manifest.removeClass('hover');
          // Destroy the mow on mouseleave if it's timed out
          if (that.timestamp + that.duration <= new Date().getTime()) {
            that.destroy();
          }
        } else {
          that.hovered = true;
          that.manifest.addClass('hover');
        }
      });

      // Add a timeout if the duration isn't Infinity
      if (this.duration !== Infinity) {
        this.timeout = window.setTimeout(function () {
          // Make sure this meow hasn't already been destroyed
          if (typeof meows.get(that.timestamp) !== 'undefined') {
            // Call callback if it's defined (this = meow DOM element)
            if (typeof options.onTimeout === 'function') {
              options.onTimeout.call(that.manifest);
            }
            // Don't destroy if user is hovering over meow
            if (that.hovered !== true && typeof that === 'object') {
              that.destroy();
            }
          }
        }, that.duration);
      }

      this.destroy = function () {
        if (that.destroyed !== true) {
          // Call callback if it's defined (this = meow DOM element)
          if (typeof options.beforeDestroy === 'function') {
            options.beforeDestroy.call(that.manifest);
          }
          that.manifest.find('.inner').fadeTo(400, 0, function () {
            that.manifest.slideUp(function () {
              that.manifest.remove();
              that.destroyed = true;
              meows.remove(that.timestamp);
              if (typeof options.afterDestroy === 'function') {
                options.afterDestroy.call(null);
              }
              if (meows.size() <= 0) {
                if (default_meow_area instanceof $) {
                  default_meow_area.remove();
                  default_meow_area = undefined;
                }
                if (typeof options.afterDestroyLast === 'function') {
                  options.afterDestroyLast.call(null);
                }
              }
            });
          });
        }
      };
    };

  $.fn.meow = function (args) {
    var meow = new Meow(args);
    meows.add(meow);
    return meow;
  };
  $.meow = $.fn.meow;
}(jQuery, window));
