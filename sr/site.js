/* ==== EDIT THESE LINKS BEFORE GOING LIVE ==== */
const TICKETS_URL = "https://ticketscandy.com/e/zlatni-vez-drugi-humanitarni-koncert-od-korena-do-cikaga-tradicionalno-vece-pesme-u-susret-bozicu-22203";        // paste the TicketsCandy event link for Dec 20
const STRIPE_LINKS = {                                       // Stripe Payment Links (Zlatni Vez Stripe account)
  once:    { "25":"https://donate.stripe.com/9B68wIgcf5kZ6Ut9mi6Na00", "50":"https://donate.stripe.com/eVq4gs7FJeVz0w56a66Na01", "100":"https://donate.stripe.com/28EcMY8JN9Bfa6FeGC6Na02", "other":"https://donate.stripe.com/6oU5kwe476p3ceN41Y6Na03" },
  monthly: { "25":"https://buy.stripe.com/fZu28k3pt14J6Ut6a66Na04", "50":"https://buy.stripe.com/6oUeV67FJfZD0w5aqm6Na05", "100":"https://buy.stripe.com/5kQ14gbVZfZD5QpfKG6Na06" }
};
const CONCERT = new Date(2026, 11, 20);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

$$("[data-tickets]").forEach(a => { a.href = TICKETS_URL; a.target = "_blank"; a.rel = "noopener"; });

// mobile menu
const menuBtn = $("#menuBtn"), links = $("#links");
if (menuBtn) menuBtn.addEventListener("click", () => { const o = links.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); });

// countdown
if ($("#cDays")) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const d = Math.max(0, Math.round((CONCERT - now) / 864e5));
  $("#cDays").textContent = d; $("#cWeeks").textContent = Math.floor(d / 7);
}

// copy buttons
$$(".copy").forEach(b => b.addEventListener("click", () => {
  const done = () => { b.textContent = "Kopirano"; setTimeout(() => b.textContent = "Kopirajte", 1600); };
  const sel = () => { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
  try { navigator.clipboard.writeText(b.dataset.copy).then(done, sel); } catch (e) { sel(); }
}));

// blog filter
$$(".chip").forEach(c => c.addEventListener("click", () => {
  $$(".chip").forEach(x => x.setAttribute("aria-pressed", x === c));
  const f = c.dataset.f;
  $$(".post-item").forEach(p => { p.hidden = !(f === "all" || p.dataset.cat.split(" ").includes(f)); });
}));

// donate
const donateBtn = $("#donateBtn");
if (donateBtn) {
  let freq = "once", amt = "50";
  const upd = () => {
    donateBtn.href = STRIPE_LINKS[freq][amt]; donateBtn.target = "_blank"; donateBtn.rel = "noopener";
    donateBtn.textContent = "Donirajte" + (amt === "other" ? "" : " $" + amt) + (freq === "monthly" ? " mesečno" : "") + " preko Stripe-a";
  };
  $$("[data-amt]").forEach(b => b.addEventListener("click", () => { amt = b.dataset.amt; $$("[data-amt]").forEach(x => x.setAttribute("aria-pressed", x === b)); upd(); }));
  const otherBtn = $('[data-amt="other"]');
  $$("[data-freq]").forEach(b => b.addEventListener("click", () => {
    freq = b.dataset.freq; $$("[data-freq]").forEach(x => x.setAttribute("aria-pressed", x === b));
    if (otherBtn) { otherBtn.hidden = freq === "monthly"; if (freq === "monthly" && amt === "other") { const d = $('[data-amt="50"]'); if (d) d.click(); return; } }
    upd(); }));
  upd();
}

// gallery lightbox
const lb = $("#lightbox"), lbImg = $("#lbImg");
$$(".gallery button").forEach(b => b.addEventListener("click", () => { const i = $("img", b); lbImg.src = i.src; lbImg.alt = i.alt; lb.hidden = false; $("#lbClose").focus(); }));
if (lb) {
  const close = () => { lb.hidden = true; };
  $("#lbClose").addEventListener("click", close);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

// contact form (FormSubmit -> info@zlatnivez.org)
const form = $("#contactForm"), status = $("#status");
if (form) form.addEventListener("submit", async e => {
  e.preventDefault();
  status.textContent = "Šalje se…";
  try {
    const fd = new FormData(form); fd.set("_language", document.documentElement.lang || "en");
    const res = await fetch("https://formsubmit.co/ajax/info@zlatnivez.org", { method: "POST", headers: { "Accept": "application/json" }, body: fd });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || String(out.success) === "false") throw 0;
    form.reset(); status.textContent = "Poruka je poslata. Hvala! Odgovorićemo uskoro.";
  } catch (err) {
    status.innerHTML = "Izvinite, poruka nije poslata. Pišite nam na <a href=\"mailto:info@zlatnivez.org\">info@zlatnivez.org</a>.";
  }
});
