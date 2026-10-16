(() => {
  'use strict';

  /* ---------- Header: fundo ao rolar ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', String(isHidden));
  };

  menuToggle.addEventListener('click', toggleMenu);

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Ano dinâmico no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Validação do formulário de contato ---------- */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitLabel = document.getElementById('submit-label');
  const submitSpinner = document.getElementById('submit-spinner');
  const successBox = document.getElementById('form-success');

  const fields = {
    name: {
      el: document.getElementById('name'),
      validate: (v) => v.trim().length >= 3,
      message: 'Informe seu nome completo (mínimo 3 caracteres).',
    },
    email: {
      el: document.getElementById('email'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Informe um e-mail válido.',
    },
    phone: {
      el: document.getElementById('phone'),
      validate: (v) => v.trim().replace(/\D/g, '').length >= 10,
      message: 'Informe um telefone válido com DDD.',
    },
    message: {
      el: document.getElementById('message'),
      validate: (v) => v.trim().length >= 10,
      message: 'Conte um pouco mais sobre seu projeto (mínimo 10 caracteres).',
    },
  };

  const showFieldError = (field, message) => {
    field.el.classList.add('field-invalid');
    field.el.classList.remove('field-valid');
    field.el.setAttribute('aria-invalid', 'true');
    const errorEl = field.el.closest('div').querySelector('.field-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  };

  const clearFieldError = (field) => {
    field.el.classList.remove('field-invalid');
    field.el.classList.add('field-valid');
    field.el.removeAttribute('aria-invalid');
    const errorEl = field.el.closest('div').querySelector('.field-error');
    if (errorEl) {
      errorEl.classList.add('hidden');
      errorEl.textContent = '';
    }
  };

  const validateField = (key) => {
    const field = fields[key];
    const value = field.el.value;
    if (!field.validate(value)) {
      showFieldError(field, field.message);
      return false;
    }
    clearFieldError(field);
    return true;
  };

  Object.keys(fields).forEach((key) => {
    const el = fields[key].el;
    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      if (el.classList.contains('field-invalid')) validateField(key);
    });
  });

  let isSubmitting = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot anti-spam: se preenchido, bot detectado — ignora silenciosamente.
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value.trim() !== '') {
      return;
    }

    const results = Object.keys(fields).map((key) => validateField(key));
    const isValid = results.every(Boolean);

    if (!isValid) {
      const firstInvalid = form.querySelector('.field-invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitLabel.textContent = 'Enviando...';
    submitSpinner.classList.remove('hidden');
    successBox.classList.add('hidden');
    successBox.classList.remove('flex');

    // Simulação de envio assíncrono. Substitua pela chamada real (fetch para
    // seu endpoint de backend, webhook do n8n, ou serviço de formulário).
    setTimeout(() => {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitLabel.textContent = 'Enviar mensagem';
      submitSpinner.classList.add('hidden');

      successBox.classList.remove('hidden');
      successBox.classList.add('flex');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      form.reset();
      Object.values(fields).forEach((field) => {
        field.el.classList.remove('field-valid', 'field-invalid');
      });

      setTimeout(() => {
        successBox.classList.add('hidden');
        successBox.classList.remove('flex');
      }, 6000);
    }, 1200);
  });
})();
