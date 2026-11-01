(function () {
  "use strict";

  /* ---------- Configuración (edita aquí) ---------- */
  var SITE    = "";
  var YOUTUBE = "https://www.youtube.com/@VincentDantesGrey/videos";
  var DEFAULT_LANG = "en";

  var BONUSES = [
    { name: "Alliance Experience Gift", value: "Lv.12" },
    { name: "Fast Build 8",             value: "+20%" },
    { name: "Research Speedup 5",       value: "+12.5%", noteKey: "In Progress" },
    { name: "Crafting Speedup 4",       value: "+8%" },
    { name: "Fast Training 2",          value: "+1%" },
    { name: "Rally HP/ATK/DEF 2",       value: "+2%" },
    { name: "Shard Exchange Bank",      value: "Active", noteKey: "" }
  ];

  /* ---------- Páginas del menú ---------- */
  var PAGES = [
    { file: "actividades-diarias.html", key: "navDaily",  titleKey: "pageDailyTitle" },
    { file: "normas-uxm.html",          key: "navRules",  titleKey: "pageRulesTitle" },
    { file: "video-tutoriales.html",    key: "navTutorials", titleKey: "pageTutorialsTitle" },
    { file: "estrategia.html",          key: "navStrategy", titleKey: "pageStrategyTitle" },
    { file: "contacto.html",            key: "navContact", titleKey: "pageContactTitle" }
  ];

  /* ---------- Utilidades ---------- */
  function byId(id) { return document.getElementById(id); }

  function currentFile() {
    var path = window.location.pathname || "";
    var file = path.substring(path.lastIndexOf("/") + 1);
    return file || "index.html";
  }

  function withLang(href, lang) {
    return href + (href.indexOf("?") >= 0 ? "&" : "?") + "lang=" + lang;
  }

  function resolveLang() {
    var m = /[?&]lang=([a-zA-Z]{2})/.exec(window.location.search);
    if (m && window.I18N[m[1].toLowerCase()]) return m[1].toLowerCase();
    var base = ((navigator.language || navigator.userLanguage || "").toLowerCase().split("-"))[0];
    return window.I18N[base] ? base : DEFAULT_LANG;
  }

  var LANG = resolveLang();
  var T = window.I18N[LANG];

  document.documentElement.lang = LANG;
  document.documentElement.setAttribute("data-lang", LANG);

  /* ---------- Textos generales ---------- */
  function setText(id, text) {
    var el = byId(id);
    if (el) el.textContent = text;
  }

  setText("welcome", T.welcome);
  setText("join", T.join);
  setText("bonusTitle", T.bonuses);
  setText("copyright", T.copyright);
  setText("ytLabel", T.youtube);

  /* ---------- Texto propio de cada página ---------- */
  function applyPageContent() {
    var here = currentFile();
    var lead = byId("pageLead");
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].file !== here) continue;
      var title = T[PAGES[i].titleKey];
      var leadKey = PAGES[i].titleKey.replace("Title", "Lead");
      if (lead) lead.textContent = T[leadKey] || "";
      if (title) {
        var h1 = byId("heroTitle");
        if (h1) h1.textContent = title;
        document.title = title + " – UXM";
      }
      return;
    }
  }

  var bonusList = byId("bonuses");
  if (bonusList) {
    BONUSES.forEach(function (b) {
      var li = document.createElement("li");
      li.textContent = b.name + " — " + b.value + (b.noteKey ? " (" + b.noteKey + ")" : "");
      bonusList.appendChild(li);
    });
  }

  /* ---------- Menú lateral (Bootstrap Drawer) ---------- */
  var navPanel = byId("navPanel");
  var navList = byId("navList");
  var navToggle = byId("navToggle");
  var homeLink = byId("homeLink");

  function buildNav() {
    if (!navList) return;
    navList.innerHTML = "";
    var here = currentFile();
    PAGES.forEach(function (page) {
      var li = document.createElement("li");
      li.className = "nav-item";
      var a = document.createElement("a");
      a.className = "nav-link";
      a.href = withLang(page.file, LANG);
      a.textContent = T[page.key];
      if (page.file === here) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      navList.appendChild(li);
    });
    if (navToggle) navToggle.setAttribute("aria-label", T.menu);
    if (navPanel) navPanel.setAttribute("aria-label", T.menu);
    if (homeLink) homeLink.href = withLang("index.html", LANG);
  }

  /* Estado visual del icono hamburguesa mientras el drawer está abierto */
  function syncNavState() {
    var open = navPanel && navPanel.classList.contains("show");
    document.body.classList.toggle("nav-open", open);
  }

  if (navPanel) {
    navPanel.addEventListener("show.bs.drawer", function () {
      document.body.classList.add("nav-open");
    });
    navPanel.addEventListener("hidden.bs.drawer", function () {
      document.body.classList.remove("nav-open");
    });
    /* Cierre al navegar dentro del drawer */
    navPanel.addEventListener("click", function (e) {
      var link = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!link) return;
      var instance = window.bootstrap && window.bootstrap.Drawer
        ? window.bootstrap.Drawer.getInstance(navPanel)
        : null;
      if (instance) instance.hide();
    });
  }

  /* ---------- Selector de idiomas (Menu desplegable de Bootstrap) ---------- */
  var langsBox = byId("langs");
  function buildLangs() {
    if (!langsBox) return;
    langsBox.innerHTML = "";

    var toggle = document.createElement("button");
    toggle.id = "langToggle";
    toggle.type = "button";
    toggle.className = "btn-outline lang-toggle";
    toggle.setAttribute("data-bs-toggle", "menu");
    toggle.setAttribute("data-bs-placement", "top-end");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("lang", LANG);
    toggle.textContent = window.I18N[LANG].name;
    langsBox.appendChild(toggle);

    var menu = document.createElement("div");
    menu.className = "menu lang-menu";
    menu.setAttribute("aria-labelledby", "langToggle");

    Object.keys(window.I18N).forEach(function (code) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "menu-item" + (code === LANG ? " selected" : "");
      item.setAttribute("lang", code);
      item.setAttribute("data-lang", code);
      item.textContent = window.I18N[code].name;
      if (code === LANG) item.setAttribute("aria-current", "true");
      item.addEventListener("click", function () {
        window.location.href = withLang(currentFile(), code);
      });
      menu.appendChild(item);
    });

    langsBox.appendChild(menu);
  }

  /* ---------- Título animado ---------- */
  var heroTitle = byId("heroTitle");
  function buildHeroTitle() {
    if (!heroTitle) return;
    var text = heroTitle.textContent;
    heroTitle.setAttribute("aria-label", text);
    heroTitle.innerHTML = "";
    var chars = text.split("");
    var mid = (chars.length - 1) / 2;
    chars.forEach(function (ch, i) {
      var span = document.createElement("span");
      span.className = "ch";
      span.textContent = ch === " " ? "\u00a0" : ch;
      span.setAttribute("aria-hidden", "true");
      var delay = Math.abs(i - mid) * 55 + 120;
      span.style.animationDelay = delay + "ms";
      heroTitle.appendChild(span);
    });
  }

  /* ---------- Init ---------- */
  buildNav();
  buildLangs();
  applyPageContent();
  buildHeroTitle();
  syncNavState();
})();
