// ===== Config: client's WhatsApp number (country code, no +). Empty = user picks a contact.
const WHATSAPP_NUMBER = "";
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

const burger = document.getElementById("burger"), links = document.getElementById("navLinks");
burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); links.classList.remove("open"); }));

// Reveal + counters
const countUp = el => {
  const target = +el.dataset.count, dur = 1400, start = performance.now();
  const step = t => { const p = Math.min((t - start) / dur, 1); el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN") + (p === 1 ? "+" : ""); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("visible");
  e.target.querySelectorAll("[data-count]").forEach(countUp);
  io.unobserve(e.target);
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Department -> doctor mapping
const doctors = {
  "General Medicine": ["Dr. Lakshmi Prasanna"],
  "Paediatrics": ["Dr. Arjun Rao"],
  "Diabetology": ["Dr. Kiran Kumar"],
  "Obstetrics & Gynaecology": ["Dr. Sujatha Reddy"],
  "Lab Test Only": []
};
const deptToDoc = Object.fromEntries(Object.entries(doctors).flatMap(([d, ds]) => ds.map(n => [n, d])));
const dept = document.getElementById("dept"), doc = document.getElementById("doctor");
const fillDocs = (selected) => {
  doc.innerHTML = '<option>Any available doctor</option>' + (doctors[dept.value] || []).map(n => `<option${n === selected ? " selected" : ""}>${n}</option>`).join("");
};
dept.addEventListener("change", () => fillDocs());
document.querySelectorAll(".d-btn").forEach(b => b.addEventListener("click", () => { dept.value = deptToDoc[b.dataset.doc]; fillDocs(b.dataset.doc); }));

// Appointment form
const form = document.getElementById("apptForm"), msg = document.getElementById("formMsg");
form.date.min = new Date().toISOString().split("T")[0];
form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach(f => { const bad = !f.checkValidity(); f.classList.toggle("invalid", bad); if (bad) ok = false; });
  if (!ok) { msg.className = "form-msg err"; msg.textContent = "Please check the highlighted fields."; return; }
  const f = Object.fromEntries(new FormData(form));
  const ref = "CP" + Math.floor(100000 + Math.random() * 900000);
  const text = `Appointment request (${ref})\nPatient: ${f.name}${f.age ? ", " + f.age + " yrs" : ""} (${f.gender})\nMobile: ${f.phone}\nDepartment: ${f.dept}\nDoctor: ${f.doctor}\nDate: ${f.date}, ${f.slot}\nReason: ${f.reason || "-"}`;
  msg.className = "form-msg ok";
  msg.innerHTML = `✅ Request received! Reference <strong>${ref}</strong>. Our team will call you shortly — or <a href="${waLink(text)}" target="_blank" rel="noopener">confirm instantly on WhatsApp</a>.`;
  form.reset(); fillDocs();
});
form.querySelectorAll("input,select").forEach(f => f.addEventListener("input", () => f.classList.remove("invalid")));
document.getElementById("year").textContent = new Date().getFullYear();
