(function () {
  const D = PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

 
  const socials = D.social.map((s) =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}"><i class="ph ${s.icon}"></i></a>`).join("");
  $("#social-home").innerHTML = socials;
  $("#social-contact").innerHTML = socials;

  $("#service-list").innerHTML = D.services.map((s) => `
    <article class="box">
      <div class="head-icons"><i class="ph ${s.icon}"></i></div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
    </article>`).join("");

  const timeline = (list) => list.map((e) => `
    <article class="experience-box">
      <h4>${esc(e.date)}</h4>
      <h3>${esc(e.title)}</h3>
      <div class="company-name"><span></span><p>${esc(e.place)}</p></div>
      <p>${esc(e.text)}</p>
    </article>`).join("");
  $("#experience-list").innerHTML = timeline(D.experience);
  $("#education-list").innerHTML = timeline(D.education);

  $("#skill-list").innerHTML = D.skills.map((s) => `
    <div class="skill-box"><img src="${esc(s.icon)}" alt="" width="64" height="64" loading="lazy"><span>${esc(s.name)}</span></div>`).join("");

  $("#my-info").innerHTML = D.info.map((i) => `
    <div class="info-box"><span>${esc(i.key)}</span><span>${esc(i.value)}</span></div>`).join("");

  $("#project-list").innerHTML = D.projects.map((p) => `
    <article class="project">
      <img src="${esc(p.img)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="1504" height="1128">
      <div class="project-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="project-links">
          ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live site <i class="ph ph-arrow-up-right"></i></a>` : ""}
          ${p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">Source code <i class="ph ph-github-logo"></i></a>` : ""}
        </div>
      </div>
    </article>`).join("");

  const cv = $("#cv-btn");
  if (D.cv) { cv.href = D.cv; cv.setAttribute("download", ""); cv.textContent = "Download CV"; }

  $("#mail-link").href = "mailto:" + D.email;
  $("#mail-text").textContent = D.email;

 
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get("message")}\n\nFrom: ${f.get("name")} (${f.get("email")})`;
    location.href = `mailto:${D.email}?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
  });

  / - navigation  page - /
  const header = $("#site-header");
  const menuBtn = $("#menu-btn");
  const pages = $$(".content");
  const links = $$(".navlink");

  function setMenu(open) {
    header.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.firstElementChild.className = open ? "ph ph-x" : "ph ph-list";
  }
  menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("open")));

  function show() {
    const id = location.hash.slice(1);
    const tab = pages.some((p) => p.id === id) ? id : "home";
    pages.forEach((p) => p.classList.toggle("active", p.id === tab));
    links.forEach((l) => {
      const on = l.dataset.tab === tab;
      l.classList.toggle("active", on);
      on ? l.setAttribute("aria-current", "page") : l.removeAttribute("aria-current");
    });
    setMenu(false);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", show);
  show();


  const tabs = $$(".tab");
  const panels = $$(".tab-content");
  function openTab(name) {
    tabs.forEach((t) => {
      const on = t.dataset.section === name;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", String(on));
    });
    panels.forEach((p) => p.classList.toggle("active", p.id === name));
  }
  tabs.forEach((t) => t.addEventListener("click", () => openTab(t.dataset.section)));
  openTab("experience");


  const out = $("#typing-span");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    out.textContent = D.roles[0];
  } else {
    let w = 0, c = 0, del = false;
    (function type() {
      const word = D.roles[w];
      c += del ? -1 : 1;
      out.textContent = word.slice(0, c);
      let wait = 100;
      if (!del && c === word.length) { del = true; wait = 1200; }
      else if (del && c === 0) { del = false; w = (w + 1) % D.roles.length; wait = 400; }
      setTimeout(type, wait);
    })();
  }
})();
