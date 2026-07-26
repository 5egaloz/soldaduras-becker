// ====== Datos de contacto (un solo lugar para editarlos) ======
var TELEFONO = '+56953910713';

// ====== Links de WhatsApp ======
function updateWhatsAppLinks(lang) {
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var num = el.getAttribute('data-wa');
    var msgAttr = (lang === 'en' && el.getAttribute('data-msg-en')) ? 'data-msg-en' : 'data-msg';
    var defaultMsg = (lang === 'en') ? 'Hello, I would like to get a custom quote.' : 'Hola, quiero más información.';
    var msg = encodeURIComponent(el.getAttribute(msgAttr) || defaultMsg);
    el.setAttribute('href', 'https://wa.me/' + num + '?text=' + msg);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
}
updateWhatsAppLinks(localStorage.getItem('lang') || 'es');

// ====== Año automático en el footer ======
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ====== Aparición suave al entrar en pantalla ======
// Solo se activa si el navegador lo soporta y el usuario no pidió menos
// movimiento. El estado "oculto" vive en CSS bajo `.js-reveal`, así que si
// este bloque no corre, el contenido se ve normal: nunca queda invisible.
(function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var selector = '.card, .why__item, .svc__item, .gallery__item, .about__stat, .faq details';
  var elementos = document.querySelectorAll(selector);
  if (!elementos.length) return;

  document.documentElement.classList.add('js-reveal');

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      observador.unobserve(entrada.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  elementos.forEach(function (el) { observador.observe(el); });

  // Red de seguridad: pase lo que pase, a los 3 s todo queda visible
  window.setTimeout(function () {
    elementos.forEach(function (el) { el.classList.add('is-visible'); });
  }, 3000);
})();

// ====== Barra superior: se "asienta" al hacer scroll ======
(function initNavScroll() {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  var ticking = false;
  function actualizar() {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(actualizar);
  }, { passive: true });
  actualizar();
})();

// ====== Menú móvil (hamburguesa) ======
var navToggle = document.querySelector('.nav__toggle');
var navMenu = document.getElementById('menu');
if (navToggle && navMenu) {
  var cerrarMenu = function () {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  navToggle.addEventListener('click', function () {
    var abierto = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', abierto);
  });

  // Cerrar al elegir un enlace
  navMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', cerrarMenu);
  });

  // Cerrar con Escape y devolver el foco al botón
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      cerrarMenu();
      navToggle.focus();
    }
  });

  // Cerrar al tocar fuera del menú
  document.addEventListener('click', function (e) {
    if (!navMenu.classList.contains('is-open')) return;
    if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
    cerrarMenu();
  });
}

// ====== Selector de Idioma (Español / Inglés) ======
(function initLanguageSelector() {
  var currentLang = localStorage.getItem('lang') || 'es';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // Actualizar textos con atributo data-i18n-en / data-i18n-es
    document.querySelectorAll('[data-i18n-en]').forEach(function (el) {
      if (lang === 'en') {
        if (!el.hasAttribute('data-i18n-es')) el.setAttribute('data-i18n-es', el.textContent.trim());
        el.textContent = el.getAttribute('data-i18n-en');
      } else if (el.hasAttribute('data-i18n-es')) {
        el.textContent = el.getAttribute('data-i18n-es');
      }
    });

    // Actualizar estado activo de los botones de idioma
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var activo = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', activo);
      btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });

    updateWhatsAppLinks(lang);
    actualizarBarraAccion(lang);
  }

  // Insertar selector en la barra de navegación si existe el menú
  if (navMenu) {
    var selector = document.createElement('div');
    selector.className = 'lang-selector';
    selector.setAttribute('role', 'group');
    selector.setAttribute('aria-label', 'Idioma / Language');
    selector.innerHTML =
      '<button type="button" class="lang-btn" data-lang="es" aria-pressed="false">ES</button>' +
      '<button type="button" class="lang-btn" data-lang="en" aria-pressed="false">EN</button>';
    navMenu.appendChild(selector);

    selector.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(this.getAttribute('data-lang'));
      });
    });
  }

  applyLanguage(currentLang);
})();

// ====== Barra de acción fija en móvil (WhatsApp + Llamar) ======
// En un celular, las dos acciones que importan deben estar siempre a un pulgar
// de distancia. Reemplaza a la burbuja flotante en pantallas chicas.
var barraAccion = null;
function actualizarBarraAccion(lang) {
  if (!barraAccion) return;
  barraAccion.querySelector('.accion--tel .accion__texto').textContent =
    (lang === 'en') ? 'Call' : 'Llamar';
}

(function initBarraAccion() {
  var refWa = document.querySelector('.wa-float[data-wa]');
  if (!refWa) return;

  barraAccion = document.createElement('div');
  barraAccion.className = 'barra-accion';
  barraAccion.innerHTML =
    '<a class="accion--wa" data-wa="' + refWa.getAttribute('data-wa') + '"' +
      ' data-msg="Hola, vi su página y quiero un presupuesto."' +
      ' data-msg-en="Hello, I saw your site and want a quote."' +
      ' href="#"><span aria-hidden="true">💬</span>' +
      '<span class="accion__texto">WhatsApp</span></a>' +
    '<a class="accion--tel" href="tel:' + TELEFONO + '">' +
      '<span aria-hidden="true">📞</span>' +
      '<span class="accion__texto">Llamar</span></a>';
  document.body.appendChild(barraAccion);

  // La barra nace después del selector de idioma: hay que sincronizarla a mano
  var idioma = localStorage.getItem('lang') || 'es';
  updateWhatsAppLinks(idioma);
  actualizarBarraAccion(idioma);
})();

// ====== Lightbox (flechas + teclado + contador + gesto táctil) ======
var gallery = document.querySelector('.gallery');
if (gallery) {
  var items = Array.from(gallery.querySelectorAll('img'));
  var currentIndex = 0;
  var ultimoFoco = null;

  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Galería de trabajos');
  lb.innerHTML = '<div class="lightbox__content">' +
    '<button class="lightbox__close" type="button" aria-label="Cerrar">×</button>' +
    '<img alt="">' +
    '<div class="lightbox__nav">' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Anterior">❮</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Siguiente">❯</button>' +
    '</div>' +
    '<div class="lightbox__counter" aria-live="polite"></div>' +
  '</div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('img');
  var lbCounter = lb.querySelector('.lightbox__counter');
  var lbClose = lb.querySelector('.lightbox__close');

  function showImage(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;
    var targetImg = items[currentIndex];
    lbImg.setAttribute('src', targetImg.getAttribute('src'));
    lbImg.setAttribute('alt', targetImg.getAttribute('alt') || '');
    lbCounter.textContent = (currentIndex + 1) + ' / ' + items.length;
  }

  function abrirLightbox(idx, origen) {
    ultimoFoco = origen || document.activeElement;
    showImage(idx);
    lb.classList.add('is-open');
    document.body.classList.add('no-scroll');
    lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') ultimoFoco.focus();
  }

  // Cada foto es accionable con mouse Y con teclado
  items.forEach(function (img, idx) {
    var contenedor = img.closest('.gallery__item') || img;
    contenedor.setAttribute('tabindex', '0');
    contenedor.setAttribute('role', 'button');
    contenedor.setAttribute('aria-label', 'Ampliar: ' + (img.getAttribute('alt') || 'foto del trabajo'));

    contenedor.addEventListener('click', function () { abrirLightbox(idx, contenedor); });
    contenedor.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirLightbox(idx, contenedor);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox__prev').addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  lb.querySelector('.lightbox__next').addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lightbox__content')) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);

    // Trampa de foco: el tabulador no debe salirse del diálogo
    if (e.key === 'Tab') {
      var focosables = lb.querySelectorAll('button');
      var primero = focosables[0];
      var ultimo = focosables[focosables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }
  });

  // Deslizar con el dedo para cambiar de foto
  var xInicio = null;
  lb.addEventListener('touchstart', function (e) {
    xInicio = e.changedTouches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (xInicio === null) return;
    var delta = e.changedTouches[0].clientX - xInicio;
    if (Math.abs(delta) > 50) showImage(currentIndex + (delta < 0 ? 1 : -1));
    xInicio = null;
  }, { passive: true });
}
