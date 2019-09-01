'use strict';

const $ = document.getElementById.bind(document);

const regexp = /[A-Za-zぁ-ゖァ-ヺ\u3400-\u9FFF\uF900-\uFAFF]/g;
const convert = text => text.replace(regexp, '✿');

if ($('textarea').value) {
  $('tweet').disabled = false;
  $('copy').disabled = false;
}

$('textarea').addEventListener('input', e => {
  $('tweet').disabled = !e.target.value;
  $('copy').disabled = !e.target.value;
});

$('tweet').addEventListener('click', () => {
  const url = new URL('https://twitter.com/intent/tweet');
  url.searchParams.set('url', location.href);
  url.searchParams.set('text', convert($('textarea').value));
  location.href = url;
});

new ClipboardJS('#copy', {
  text: () => convert($('textarea').value)
}).on('success', e => {
  e.trigger.textContent = '完了！';
  setTimeout(() => e.trigger.textContent = 'コピー', 300);
});
