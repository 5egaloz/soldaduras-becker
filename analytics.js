/* Google Analytics 4
   ====== EDITA: reemplaza G-XXXXXXXXXX por tu ID de medición de GA4 ======
   Mientras el ID sea el placeholder, este archivo no hace nada. */
(function () {
  var GA_ID = 'G-XXXXXXXXXX';
  if (GA_ID.indexOf('XXXX') !== -1) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
})();
