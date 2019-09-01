'use strict';

document.getElementById('donokon').addEventListener('click', () => {
  const url = new URL('https://twitter.com/intent/tweet');
  url.searchParams.set('url', location.href);
  url.searchParams.set('text', 'ドノカさんこんばんは！ #donokon');
  location.href = url;
});
