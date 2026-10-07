// ===== Config
const WHATSAPP_NUMBER = ""; // client's number with country code, no +
const EMAIL = "hello@rahulvarma.design";
document.getElementById("waContact").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Rahul! I'd like to discuss a project.")}`;

// Theme toggle (remembers choice)
const root = document.documentElement, toggle = document.getElementById("themeToggle");
const setTheme = t => { root.dataset.theme = t; toggle.textContent = t === "dark" ? "🌙" : "☀️"; localStorage.setItem("theme", t); };
setTheme(localStorage.getItem("theme") || "dark");
toggle.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

// Nav
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const burger = document.getElementById("burger"), links = document.getElementById("navLinks");
burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); links.classList.remove("open"); }));

// Active link highlighting
const sections = [...document.querySelectorAll("section[id]")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

// Typing effect
const words = ["websites", "mobile apps", "brands", "online stores", "dashboards"];
const el = document.getElementById("typed"); let wi = 0, ci = words[0].length, del = true;
setTimeout(function tick() {
  const w = words[wi];
  ci += del ? -1 : 1; el.textContent = w.slice(0, ci);
  let wait = del ? 55 : 95;
  if (!del && ci === w.length) { del = true; wait = 1800; }
  else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; wait = 300; }
  setTimeout(tick, wait);
}, 2200);

// Reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(n => io.observe(n));

// Project filter
document.querySelectorAll(".filter").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active")); b.classList.add("active");
  document.querySelectorAll(".project").forEach(p => p.classList.toggle("hide", b.dataset.filter !== "all" && p.dataset.cat !== b.dataset.filter));
}));

// Contact form: validates, then opens the visitor's email app with a pre-filled message
const form = document.getElementById("contactForm"), msg = document.getElementById("formMsg");
form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach(f => { const bad = !f.checkValidity(); f.classList.toggle("invalid", bad); if (bad) ok = false; });
  if (!ok) { msg.className = "form-msg err"; msg.textContent = "Please fill in your name, a valid email and a message."; return; }
  const f = Object.fromEntries(new FormData(form));
  const body = `Name: ${f.name}\nEmail: ${f.email}\nProject: ${f.type}\nBudget: ${f.budget}\n\n${f.message}`;
  msg.className = "form-msg ok";
  msg.textContent = `Thanks ${f.name.split(" ")[0]}! Opening your email app to send the message…`;
  setTimeout(() => { location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project enquiry: " + f.type)}&body=${encodeURIComponent(body)}`; }, 700);
  form.reset();
});
document.getElementById("year").textContent = new Date().getFullYear();
