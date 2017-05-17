/**
 * foooomio.js
 * 
 * author:  foooomio
 * website: https://foooomio.net/
 * license: MIT License
 * require: jQuery v2.1.4
 */

function license() {
  [
    'The MIT License (MIT)',
    ' ',
    'Copyright (c) 2013-2015 foooomio',
    ' ',
    'Permission is hereby granted, free of charge, to any person obtaining a copy',
    'of this software and associated documentation files (the "Software"), to deal',
    'in the Software without restriction, including without limitation the rights',
    'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
    'copies of the Software, and to permit persons to whom the Software is',
    'furnished to do so, subject to the following conditions:',
    ' ',
    'The above copyright notice and this permission notice shall be included in',
    'all copies or substantial portions of the Software.',
    ' ',
    'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
    'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
    'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
    'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
    'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
    'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
    'THE SOFTWARE.'
  ]
  .forEach(print);
}

var evaluate = eval;

var PS1, hist = [],
    REG_URL = /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?)/g,
    REG_EMAIL = /([\w\d_-]+@[\w\d_-]+\.[\w\d._-]+)/g,
    message_line = $('<div>', {class: 'message'});

var foooomio = {
  aboutme: 'https://about.me/foooomio',
  blog: 'http://foooomio.hatenablog.com/',
  booklog: 'http://booklog.jp/users/foooomio',
  email: email(),
  flickr: 'https://www.flickr.com/photos/foooomio/',
  github: 'https://github.com/foooomio',
  hometown: 'Kyoto, Japan',
  job: 'Web Engineer',
  jsdoit: 'http://jsdo.it/foooomio',
  lang: ['Japanese', 'English', 'JavaScript', 'Ruby', 'PHP'],
  location: 'Tokyo, Japan',
  tumblr: 'http://foooomio.tumblr.com/',
  twitter: 'https://twitter.com/foooomio',
  univ: 'Shiga University'
};

function email() {
  return [
    [15, 24, 24, 24, 24, 22, 18, 24].map(function(x){return x.toString(36);}).join(''),
    ['gmail', 'com'].join('.')
  ].join('@');
}

function alphabet() {
  for(var i = 10, c = []; i < 36; i++) {
    c.push(i.toString(36).toUpperCase());
  }
  return c;
}

function print(text) {
  message_line.clone().text(text).appendTo('#output');
}

function help() {
  [
    'Type the command below.',
    ' ',
    'foooomio:  About the author.',
    'license(): Display the license of this software.',
    ' ',
    'And some hidden commands exist.',
    ' '
  ]
  .forEach(print);
}

$(function() {

  PS1 = $('#prompt').text();

  $('#command').on('keydown', function(e) {
    switch(e.which) {
      case 9:
        e.preventDefault();
        this.value += '  ';
        break;
      case 13:
        if(e.ctrlKey) {
          var ch = $('#command').height();
          $('#command').height(ch + $('#prompt').height());
        } else {
          e.preventDefault();
          run();
        }
        break;
      default:
        break;
    }
  }).on('keyup', function(e) {
    $('#copy').html(' ' + e.target.value.replace(/[\n$]/mg,'<br/>') + ' ');
    $('#command').height($('#copy').height() || $('#prompt').height());
  });

  $('#console').on('click', function() {
    $('#command').focus();
  });

  $('#prompt').width( $('#prompt').width() );
  $('#command-wrap').width( $('#console').width() - $('#prompt').width() );

  print('Welcome to foooomio.net!');
  print('This is a JavaScript Console.');
  print('Type "help()" for more information.');


  function run() {
    var result, command = $('#command').val();

    if(command === '') {
      return;
    }

    print(PS1 + command);
    /*print(command.split('\n').map(function(line, index) {
      var text, message = message_line.clone();
      if(index === 0) {
        text = PS1 + line;
      } else {
        var l = PS1.length, space = "";
        for(; space.length < l; space += " ");
        text = space + line;
      }
      return message.text(text);
    }).wrapAll(message_line.clone()));*/

    try {
      result = evaluate(command);
    } catch(error) {
      result = error;
    }

    format(result).addClass('return').appendTo('#output');

    hist.push(command);
    $('#command').val('').height($('#prompt').height());

    $('#console').scrollTop($('#console-scroll').height());
  }

  function format(data) {
    var type = $.type(data),
        message = message_line.clone().addClass(type);
    switch(type) {
      case 'undefined':
        return message.text('undefined');
      case 'null':
        return message.text('null');
      case 'string':
        data = data.toString();
        data = data.replace(REG_URL,'<a href="$1" target="_blank">$1</a>');
        data = data.replace(REG_EMAIL, '<a href="mailto:$1">$1</a>');
        return message.html('"' + data + '"');
      case 'array':
        message.append('[');
        message.append(data.map(format));
        message.append(']');
        return message;
      case 'object':
        message.append('{');
        message.append(Object.keys(data).map(function(key) {
          return message_line.clone().text(key);
        }));
        message.append('}');
        return message;
      default:
        return message.text(data.toString());
    }
  }
});
