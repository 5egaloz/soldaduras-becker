// Arma los links de WhatsApp a partir de data-wa (número) y data-msg (mensaje).
// Así solo cambias el número en el HTML y todos los botones funcionan.
document.querySelectorAll('[data-wa]').forEach(function (el) {
  var num = el.getAttribute('data-wa');
  var msg = encodeURIComponent(el.getAttribute('data-msg') || 'Hola, quiero más información.');
  el.setAttribute('href', 'https://wa.me/' + num + '?text=' + msg);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

// Año automático en el footer
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
