// Hanover Tecnologia — interações da página
const track = document.querySelector("#slides-track");
const slides = Array.from(document.querySelectorAll(".portfolio-slide"));
const dotsContainer = document.querySelector("#slider-dots");
const currentSlideLabel = document.querySelector("#current-slide");
let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "slider-dot" + (index === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Ir para o banner ${index + 1}`);
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dotsContainer.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
  });
  currentSlideLabel.textContent = String(currentSlide + 1).padStart(2, "0");
}
document.querySelector("#prev-slide").addEventListener("click", () => goToSlide(currentSlide - 1));
document.querySelector("#next-slide").addEventListener("click", () => goToSlide(currentSlide + 1));

// Menu responsivo
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Máscaras de CPF e telefone
const cpfInput = document.querySelector("#cpf");
const phoneInput = document.querySelector("#telefone");
cpfInput.addEventListener("input", () => {
  let value = cpfInput.value.replace(/\D/g, "").slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = value;
});
phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 10) value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  else if (value.length > 6) value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  else if (value.length > 2) value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
  else if (value.length > 0) value = value.replace(/^(\d*)/, "($1");
  phoneInput.value = value;
});

function isValidCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  return remainder === Number(digits[10]);
}

const form = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");
const fields = {
  cpf: { input: cpfInput, error: document.querySelector("#cpf-error") },
  nome: { input: document.querySelector("#nome"), error: document.querySelector("#nome-error") },
  email: { input: document.querySelector("#email"), error: document.querySelector("#email-error") },
  telefone: { input: phoneInput, error: document.querySelector("#telefone-error") }
};
function setError(key, message) {
  fields[key].error.textContent = message;
  fields[key].input.classList.toggle("invalid", Boolean(message));
  fields[key].input.setAttribute("aria-invalid", String(Boolean(message)));
}
Object.entries(fields).forEach(([key, field]) => field.input.addEventListener("input", () => {
  if (field.input.value.trim()) setError(key, "");
  feedback.textContent = "";
  feedback.className = "form-feedback";
}));

form.addEventListener("submit", event => {
  event.preventDefault();
  let valid = true;
  const cpf = cpfInput.value.trim();
  const nome = fields.nome.input.value.trim();
  const email = fields.email.input.value.trim();
  const telefone = phoneInput.value.replace(/\D/g, "");

  if (!cpf) { setError("cpf", "Informe seu CPF."); valid = false; }
  else if (!isValidCPF(cpf)) { setError("cpf", "Digite um CPF válido."); valid = false; }
  else setError("cpf", "");

  if (!nome) { setError("nome", "Informe seu nome completo."); valid = false; }
  else if (nome.split(/\s+/).filter(part => part.length > 0).length < 2) { setError("nome", "Digite nome e sobrenome."); valid = false; }
  else setError("nome", "");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) { setError("email", "Informe seu e-mail."); valid = false; }
  else if (!emailPattern.test(email)) { setError("email", "Digite um e-mail válido."); valid = false; }
  else setError("email", "");

  if (!telefone) { setError("telefone", "Informe seu telefone."); valid = false; }
  else if (telefone.length < 10 || telefone.length > 11) { setError("telefone", "Digite um telefone com DDD válido."); valid = false; }
  else setError("telefone", "");

  if (!valid) {
    feedback.textContent = "Confira os campos destacados e tente novamente.";
    feedback.className = "form-feedback failure";
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Exemplo didático: aqui entraria a integração com um back-end/API.
  feedback.textContent = "Validação concluída! Para enviar os dados, conecte este formulário a um servidor ou serviço de formulários.";
  feedback.className = "form-feedback success";
});
document.querySelector("#year").textContent = new Date().getFullYear();
