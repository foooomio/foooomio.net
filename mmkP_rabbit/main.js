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
  const text = $('textarea').value;

  const url = new URL('https://foooomio.net/mmkP_rabbit/');
  if ($('decodable').checked) {
    url.searchParams.set('p', Base64.encodeURI(text));
  }

  const tweet = new URL('https://twitter.com/intent/tweet');
  tweet.searchParams.set('url', url);
  tweet.searchParams.set('text', convert(text));
  location.href = tweet;
});

new ClipboardJS('#copy', {
  text: () => convert($('textarea').value)
}).on('success', e => {
  e.trigger.textContent = '完了！';
  setTimeout(() => e.trigger.textContent = 'コピー', 300);
});

const params = new URLSearchParams(location.search);
if (params.has('p')) {
  const text = Base64.decode(params.get('p'));
  $('input').textContent = convert(text);
  $('output').textContent = text;
  $('decode').classList.remove('hidden');
}
