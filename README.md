jQuery Meow
===========

A plugin to provide Growl-like notifications. Will support bindings for various jQuery events and ability to 'meow' the content of a bound element (e.g. a Rails flash on load) or a message passed as an argument (e.g. button clicks).

[![endorse](http://api.coderwall.com/zacstewart/endorsecount.png)](http://coderwall.com/zacstewart)

## Usage example

```javascript
var options = {
  title: 'Meow Example',
  message: 'Hello, World!',
};

$.meow(options);
```
See more [examples](http://zacstewart.github.com/Meow/).

## Options
<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>message</td>
    <td>String, Object</td>
    <td>null</td>
    <td>Either a string or a jQuery selected element. If it's an element, Meow will use its value, innerHTML or innerText depending on its type.</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>null</td>
    <td>If a string is given, the meow's title will reflect it. However, if you do no set this and use a selector element in <code>message</code>, it will default to the <code>title</code> attribute of that element if available.</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>String</td>
    <td>null</td>
    <td>Sets the image URL for the icon</td>
  </tr>
  <tr>
    <td>duration</td>
    <td>Number</td>
    <td>5000</td>
    <td>Sets the duration of of the meow in milliseconds. Any positive, numeric value (including <code>Infinity</code>) is acceptable.</td>
  </tr>
  <tr>
    <td>sticky</td>
    <td>Boolean</td>
    <td>false</td>
    <td>Sets the meow to never time out. Has the same effect as setting duration to <code>Infinity</code>.</td>
  </tr>
  <tr>
    <td>closeable</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Determines whether the meow will have a close (&times;) button. If <code>false</code>, yout must rely on the duration timeout to remove the meow.</td>
  </tr>
  <tr>
    <td>container</td>
    <td>String</td>
    <td>null</td>
    <td>Sets the root element the meow should be contained within. Be default, meows will be put in an auto-generated container.</td>
  </tr>
  <tr>
    <td>beforeCreateFirst</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called just before the first meow on the screen is created.</td>
  </tr>
  <tr>
    <td>beforeCreate</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called just before any meow is created.</td>
  </tr>
  <tr>
    <td>afterCreate</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called right after a meow is created.</td>
  </tr>
  <tr>
    <td>onTimeout</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called whenever a meow times out.</td>
  </tr>
  <tr>
    <td>beforeDestroy</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called just before a meow gets destroyed.</td>
  </tr>
  <tr>
    <td>afterDestroy</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called right after a meow gets destroyed.</td>
  </tr>
  <tr>
    <td>afterDestroyLast</td>
    <td>Function</td>
    <td>null</td>
    <td>Gets called after the last meow on the screen is destroyed.</td>
  </tr>
</table>
