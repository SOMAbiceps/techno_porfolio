const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const scrollProgress = document.getElementById("scrollProgress");

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const selectedTicket = document.getElementById("selectedTicket");
const ticketForm = document.getElementById("ticketForm");

function setBurgerState(open) {
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  mobileMenu.classList.toggle("show", open);
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
}

burger.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") !== "true";
  setBurgerState(open);
});

mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => setBurgerState(false));
});

// Scroll progress
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${p}%`;
});

// Ticket modal
document.querySelectorAll("[data-buy]").forEach(btn => {
  btn.addEventListener("click", () => {
    const ticket = btn.getAttribute("data-buy");
    selectedTicket.textContent = ticket;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(ticketForm);
  const name = data.get("name");
  const email = data.get("email");

  ticketForm.reset();

  selectedTicket.textContent = "—";
  closeModal();

  alert(`Dzięki, ${name}! 🎟️\n\nTo demo portfolio.\nPotwierdzenie wysłane na: ${email}`);
});
