const $ = document.getElementById.bind(document);

$('extver').value = new URLSearchParams(location.search).get('extver');
$('ua').value = navigator.userAgentData ? JSON.stringify(navigator.userAgentData.brands) : navigator.userAgent;

$('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const submit = $('submit');
  submit.disabled = true;
  submit.value = 'Sending...';

  console.log(e);
});
