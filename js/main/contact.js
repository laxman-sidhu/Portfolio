// contact.js — EmailJS contact form
(function () {
  var EMAIL_PUBLIC_KEY  = "UFj38gwbmlz4eqVpC";
  var EMAIL_SERVICE_ID  = "service_tz1g2pt";
  var EMAIL_TEMPLATE_ID = "template_o1ap064";

  if (window.emailjs) emailjs.init(EMAIL_PUBLIC_KEY);

  var form = document.getElementById('contactForm');
  if (!form) return;
  var status = document.getElementById('formStatus');
  var btn = document.getElementById('submitBtn');
  var btnText = btn ? btn.querySelector('span') : null;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = ''; status.className = 'form-status';
    if (btn) btn.disabled = true;
    if (btnText) {
      btnText.replaceChildren();
      var spin = document.createElement('span');
      spin.className = 'form-spin';
      btnText.appendChild(spin);
      btnText.appendChild(document.createTextNode(' Sending…'));
    }

    var data = {
      from_name: document.getElementById('from_name').value,
      from_contact: document.getElementById('from_contact').value,
      message: document.getElementById('message').value,
      reply_to: document.getElementById('from_contact').value
    };

    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, data)
      .then(function () {
        status.textContent = '✅ Message sent! I\'ll get back to you soon.';
        status.className = 'form-status success';
        form.reset();
      })
      .catch(function (err) {
        console.error('EmailJS error:', err);
        status.textContent = '⚠️ Something went wrong. Please try again or reach me directly.';
        status.className = 'form-status error';
      })
      .finally(function () {
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        setTimeout(function () { status.textContent = ''; status.className = 'form-status'; }, 6000);
      });
  });
})();
