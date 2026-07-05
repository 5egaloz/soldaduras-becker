/* Google Analytics 4 — propiedad de Soldaduras Becker (activa desde 2026-07-05)
   OJO: el G-LCMBXQPK93 es de la app de venta de sacos, NO mezclar.
   Si algún día se crea una etiqueta GA4 dentro de GTM (GTM-TWC8D49J),
   eliminar este archivo para no contar las visitas dos veces. */
(function () {
  var GA_ID = 'G-NY1VYG1CF2';
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
