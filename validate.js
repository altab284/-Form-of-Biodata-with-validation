const form = document.getElementById("biodataForm");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  mobile: document.getElementById("mobile"),
  age: document.getElementById("age"),
  gender: document.getElementById("gender"),
};

const errors = {
  name: document.getElementById("err-name"),
  email: document.getElementById("err-email"),
  mobile: document.getElementById("err-mobile"),
  age: document.getElementById("err-age"),
  gender: document.getElementById("err-gender"),
};

function showError(field, msg) {
  errors[field].textContent = msg || "";
}

function validateName() {
  const v = fields.name.value.trim();
  if (v.length < 2) return showError("name", "Please enter your full name.");
  showError("name");
  return true;
}

function validateEmail() {
  const v = fields.email.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
  if (!ok) return showError("email", "Enter a valid email address.");
  showError("email");
  return true;
}

function validateMobile() {
  const v = fields.mobile.value.trim();
  const ok = /^\d{10}$/.test(v);
  if (!ok) return showError("mobile", "Mobile must be 10 digits.");
  showError("mobile");
  return true;
}

function validateAge() {
  const n = Number(fields.age.value);
  if (!Number.isFinite(n) || n < 18 || n > 80) {
    return showError("age", "Age must be between 18 and 80.");
  }
  showError("age");
  return true;
}

function validateGender() {
  if (!fields.gender.value) return showError("gender", "Please select your gender.");
  showError("gender");
  return true;
}

// live validation
fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.mobile.addEventListener("input", () => {
  // keep only digits
  fields.mobile.value = fields.mobile.value.replace(/\D/g, "").slice(0, 10);
  validateMobile();
});
fields.age.addEventListener("input", validateAge);
fields.gender.addEventListener("change", validateGender);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allOk = [validateName(), validateEmail(), validateMobile(), validateAge(), validateGender()].every(Boolean);

  const success = document.getElementById("success");
  if (allOk) {
    success.hidden = false;

    // Example: collect data (you can send this to a server)
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Biodata payload:", data);

    // Optionally reset after a short delay
    // setTimeout(() => form.reset(), 1000);
  } else {
    success.hidden = true;
  }
});
