// ===== Config: replace with the client's WhatsApp number (country code, no +). Empty = let user choose contact.
const WHATSAPP_NUMBER = "";
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Mobile menu
const burger = document.getElementById("burger"), links = document.getElementById("navLinks");
burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); links.classList.remove("open"); }));

// Menu tabs
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".menu-panel").forEach(p => p.classList.remove("active"));
  tab.classList.add("active");
  document.getElementById(tab.dataset.tab).classList.add("active");
}));

// Reveal on scroll
const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Lightbox
const lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
document.querySelectorAll(".g-item").forEach(a => a.addEventListener("click", e => { e.preventDefault(); lbImg.src = a.href; lbImg.alt = a.querySelector("img").alt; lb.classList.add("open"); }));
lb.addEventListener("click", e => { if (e.target !== lbImg) lb.classList.remove("open"); });
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });

// Open / closed status (IST)
(function () {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
  const [o, c] = d === 0 ? [660, 1380] : (d === 5 || d === 6) ? [690, 1410] : [690, 1350];
  const el = document.getElementById("openStatus"), open = m >= o && m < c;
  el.textContent = open ? "● Open now — walk in or call ahead" : "● Closed now — reserve for later";
  el.className = "open-status " + (open ? "open" : "closed");
})();

// Reservation form (front-end validation, hands off to WhatsApp)
const form = document.getElementById("reserveForm"), msg = document.getElementById("formMsg");
form.date.min = new Date().toISOString().split("T")[0];
form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach(f => { const bad = !f.checkValidity(); f.classList.toggle("invalid", bad); if (bad) ok = false; });
  if (!ok) { msg.className = "form-msg err"; msg.textContent = "Please fill in all required fields correctly."; return; }
  const f = Object.fromEntries(new FormData(form));
  const text = `Table reservation request\nName: ${f.name}\nPhone: ${f.phone}\nDate: ${f.date} at ${f.time}\nGuests: ${f.guests}\nNotes: ${f.notes || "-"}`;
  msg.className = "form-msg ok";
  msg.innerHTML = `Thank you, ${f.name.split(" ")[0]}! 🎉 Your request for ${f.guests} guests is received. <a href="${waLink(text)}" target="_blank" rel="noopener">Send it on WhatsApp</a> for instant confirmation.`;
  form.reset();
});
document.getElementById("year").textContent = new Date().getFullYear();
