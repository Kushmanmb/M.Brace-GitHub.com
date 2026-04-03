/* email.js – handles the contact form mailto interaction */
(function () {
  "use strict";

  // Guard: config.js must be loaded first
  if (typeof EMAIL_CONFIG === "undefined") {
    console.error("email.js: EMAIL_CONFIG not found. Ensure config.js is loaded before email.js.");
    return;
  }

  // Import email config values set in config.js
  var address = EMAIL_CONFIG.address;
  var defaultSubject = EMAIL_CONFIG.subject;

  // Keep the displayed mailto link in sync with config
  var mailtoLink = document.getElementById("mailto-link");
  if (mailtoLink) {
    mailtoLink.href = "mailto:" + address;
    mailtoLink.textContent = address;
  }

  // Form submission → open mailto: in the user's mail client
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var fromName = form.elements["name"].value.trim();
    var fromEmail = form.elements["email"].value.trim();
    var subject = form.elements["subject"].value.trim() || defaultSubject;
    var message = form.elements["message"].value.trim();

    // Basic validation – check presence and email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fromEmail || !emailPattern.test(fromEmail)) {
      setStatus("Please enter a valid email address.", "error");
      return;
    }
    if (!message) {
      setStatus("Please enter a message.", "error");
      return;
    }

    var body =
      "From: " + (fromName || fromEmail) + " <" + fromEmail + ">\n\n" + message;

    var mailtoUrl =
      "mailto:" +
      encodeURIComponent(address) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    // Open mailto: via a temporary anchor for broad browser compatibility
    var tempAnchor = document.createElement("a");
    tempAnchor.href = mailtoUrl;
    tempAnchor.target = "_blank";
    tempAnchor.rel = "noopener";
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
    setStatus("Opening your mail client…", "success");
    form.reset();
  });

  function setStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = type;
  }
})();
