/* MASAR — masar-sections.js */
/* =========================================================================
   MASAR v5 — أقسام قابلة للتحكم + مدخل مالك سرّي + الشعار الرسمي
   يعمل فوق الملف الأصلي دون تغيير بنيته
   ========================================================================= */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var KEY = 'masar-owner-9k7';

  var SEC_DEFS = [
    { k: 'dash',      i: '🏠', t: 'الرئيسية',            g: 0, show: true, roles: [],                                   lock: false },
    { k: 'sched',     i: '🗓️', t: 'منظّم المذاكرة',        g: 0, show: true, roles: [],                                   lock: false },
    { k: 'tasks',     i: '✅', t: 'مهام اليوم',           g: 0, show: true, roles: [],                                   lock: false },
    { k: 'faith',     i: '🌱', t: 'الجرعة الإيمانية',      g: 0, show: true, roles: [],                                   lock: false },
    { k: 'summ',      i: '📚', t: 'مكتبة الملخصات',       g: 0, show: true, roles: [],                                   lock: false },
    { k: 'ai',        i: '🤖', t: 'مساعد مسار الذكي',     g: 0, show: true, roles: [],                                   lock: false },
    { k: 'subs',      i: '💎', t: 'الاشتراكات والأسعار',  g: 0, show: true, roles: [],                                   lock: false },
    { k: 'city',      i: '🏙️', t: 'مدينة مسار',           g: 0, show: true, roles: [],                                   lock: false },
    { k: 'studyland', i: '🎮', t: 'مسار سيتي',            g: 0, show: true, roles: [],                                   lock: false },
    { k: 'plat',      i: '🇴🇲', t: 'المنصات التعليمية',    g: 1, show: true, roles: [],                                   lock: false },
    { k: 'school',    i: '🏫', t: 'بوابة المدرسة',        g: 2, show: true, roles: [],                                   lock: false },
    { k: 'admin',     i: '🛡️', t: 'لوحة الإدارة',         g: 2, show: true, roles: ['admin', 'owner'],                 lock: true },
    { k: 'teacher',   i: '👩‍🏫', t: 'لوحة المعلم',         g: 2, show: true, roles: ['teacher', 'owner'],               lock: true },
    { k: 'parents',   i: '👨‍👩‍👧', t: 'لوحة ولي الأمر',     g: 2, show: true, roles: ['parent', 'owner'],                lock: true },
    { k: 'students',  i: '🎓', t: 'بوابة الطالب',         g: 2, show: true, roles: ['student', 'owner'],               lock: true }
  ];
  var GRP_DEFS = ['🏠 مسار الرئيسية', '📢 المنصات والإعلانات', '🏫 مساري في مدرسة المتنبي'];

  /* ---------------- الدور ---------------- */
  function effRole() {
    try { if (sessionStorage.getItem('m_owner') === '1') return 'owner'; } catch (e) {}
    return (typeof role === 'function') ? role() : '';
  }
  function isOwner() { return effRole() === 'owner'; }
  window.mnIsOwner = isOwner;

  /* ---------------- إعداد الإعدادات الافتراضية ---------------- */
  function ensureUI() {
    var st = null;
    try { st = (typeof S !== 'undefined' && S) ? S : null; } catch (e) { st = null; }
    if (!st || typeof st !== 'object') return { groups: [], secs: [], home: 'dash' };
    if (!S.ui || typeof S.ui !== 'object') S.ui = {};
    var ui = S.ui;
    if (!Array.isArray(ui.groups) || !ui.groups.length) {
      ui.groups = GRP_DEFS.map(function (t) { return { t: t }; });
    } else {
      ui.groups = ui.groups.map(function (g, i) {
        return (typeof g === 'string') ? { t: g } : { t: (g && g.t) || GRP_DEFS[i] || ('مجموعة ' + (i + 1)) };
      });
    }
    if (!Array.isArray(ui.secs) || !ui.secs.length) {
      ui.secs = SEC_DEFS.map(function (x) { return JSON.parse(JSON.stringify(x)); });
    } else {
      SEC_DEFS.forEach(function (d) {
        var found = false;
        ui.secs.forEach(function (x) { if (x && x.k === d.k) found = true; });
        if (!found) ui.secs.push(JSON.parse(JSON.stringify(d)));
      });
      ui.secs = ui.secs.filter(function (x) { return x && x.k; });
      ui.secs.forEach(function (x) {
        var d = null;
        SEC_DEFS.forEach(function (y) { if (y.k === x.k) d = y; });
        if (!d) return;
        if (typeof x.t !== 'string' || !x.t) x.t = d.t;
        if (typeof x.i !== 'string' || !x.i) x.i = d.i;
        if (typeof x.g !== 'number') x.g = d.g;
        if (typeof x.show !== 'boolean') x.show = d.show;
        if (!Array.isArray(x.roles) || !x.roles.length) x.roles = d.roles.slice();
        if (typeof x.lock !== 'boolean') x.lock = !!d.lock;
      });
    }
    if (!ui.home || !ui.secs.some(function (x) { return x.k === ui.home; })) ui.home = 'dash';
    if (typeof S.ownerPath !== 'string' || !S.ownerPath.trim()) S.ownerPath = KEY;
    return ui;
  }
  window.mnEnsureUI = ensureUI;

  function secCfg(k) {
    var ui = ensureUI();
    for (var i = 0; i < ui.secs.length; i++) if (ui.secs[i].k === k) return ui.secs[i];
    return null;
  }
  function canSee(x) {
    if (!x || x.show === false) return false;
    var r = effRole();
    if (x.roles && x.roles.length) return x.roles.indexOf(r) >= 0;
    return true;
  }
  window.mnShow = function (k) { var x = secCfg(k); return x ? canSee(x) : true; };

  /* ---------------- بناء القائمة الجانبية ---------------- */
  function renderNav() {
    var ui = ensureUI();
    var nav = document.getElementById('nav');
    if (!nav) return;
    var byG = {};
    ui.secs.forEach(function (x) { var g = (typeof x.g === 'number') ? x.g : 0; (byG[g] = byG[g] || []).push(x); });
    var html = '';
    ui.groups.forEach(function (g, gi) {
      var list = byG[gi] || [];
      if (!list.length) return;
      if (g.t) html += '<div class="nav-group">' + escT(g.t) + '</div>';
      list.forEach(function (x) {
        if (!canSee(x)) return;
        html += '<button data-s="' + x.k + '" data-roles="' + (x.roles || []).join(',') + '">' +
                '<span class="ico">' + escT(x.i || '•') + '</span> ' + escT(x.t || x.k) + '</button>';
      });
    });
    nav.innerHTML = html;
    var cur = (window.MC && MC.curSec) ? MC.curSec : 'dash';
    $$('#nav button').forEach(function (b) { b.classList.toggle('active', b.dataset.s === cur); });
  }
  window.mnRenderNav = renderNav;

  function homeSec() {
    var ui = ensureUI();
    var c = secCfg(ui.home);
    if (c && canSee(c)) return c.k;
    var seen = ui.secs.filter(canSee);
    return seen.length ? seen[0].k : 'dash';
  }
  function guard(s) {
    if (s === 'owner' && !isOwner()) return homeSec();
    var c = secCfg(s);
    if (c && !canSee(c)) return homeSec();
    return s;
  }
  function label(s) {
    var c = secCfg(s);
    if (c && c.t) return c.t;
    if (typeof titles !== 'undefined' && titles[s]) return titles[s];
    return 'مسار';
  }
  window.mnGuard = guard; window.mnLabel = label; window.mnHome = homeSec;

  /* ---------------- الشعار ---------------- */
  function logoURI() {
    try { if (S && S.ui && S.ui.logo) return S.ui.logo; } catch (e) {}
    return window.MASAR_LOGO || '';
  }
  function applyLogo() {
    var u = logoURI();
    if (!u) return;
    $$('img[data-logo]').forEach(function (im) { im.src = u; });
    var f = document.getElementById('favicon') || document.querySelector('link[rel="icon"]');
    if (f) f.href = u;
    var apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (!apple) {
      apple = document.createElement('link'); apple.rel = 'apple-touch-icon';
      document.head.appendChild(apple);
    }
    apple.href = u;
    $$('.auth-m, #studyland-section .logo-badge').forEach(function (el) {
      el.style.backgroundImage = 'url("' + u + '")';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.innerHTML = '';
    });
  }
  window.mnApplyLogo = applyLogo;

  /* ---------------- لوحة تحكم الأقسام ---------------- */
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  function renderNavCfg() {
    var box = document.getElementById('ot-navcfg');
    if (!box) return;
    var ui = ensureUI();
    var homeOpt = ui.secs.map(function (x) {
      return '<option value="' + x.k + '"' + (ui.home === x.k ? ' selected' : '') + '>' + escT(x.i + ' ' + x.t) + '</option>';
    }).join('');
    var rows = '';
    ui.secs.forEach(function (x, i) {
      var gsel = ui.groups.map(function (g, gi) {
        return '<option value="' + gi + '"' + (x.g === gi ? ' selected' : '') + '>' + escT(g.t || ('مجموعة ' + (gi + 1))) + '</option>';
      }).join('');
      rows += '<div class="nv-row">' +
        '<input class="nv-ico" data-nv="i" data-i="' + i + '" value="' + escQ(x.i || '') + '" maxlength="4" title="الأيقونة">' +
        '<input class="nv-label" data-nv="t" data-i="' + i + '" value="' + escQ(x.t || '') + '" placeholder="اسم القسم">' +
        '<select data-nv="g" data-i="' + i + '" title="المجموعة">' + gsel + '</select>' +
        '<label class="nv-sw"><input type="checkbox" data-nv="show" data-i="' + i + '"' + (x.show ? ' checked' : '') + '> ظاهر</label>' +
        '<button class="chip" onclick="nvMove(' + i + ',-1)" title="أعلى">▲</button>' +
        '<button class="chip" onclick="nvMove(' + i + ',1)" title="أسفل">▼</button>' +
        (x.lock ? '<span class="nv-tag">صلاحية مقيدة</span>' : '') +
        '</div>';
    });
    var grpRows = '';
    ui.groups.forEach(function (g, i) {
      grpRows += '<div class="nv-row"><input class="nv-label" data-gn="' + i + '" value="' + escQ(g.t || '') + '" placeholder="اسم المجموعة">' +
        '<button class="chip" onclick="nvDelGroup(' + i + ')" title="حذف المجموعة">🗑</button></div>';
    });
    box.innerHTML =
      '<div class="panel"><h4>🎛️ الأقسام: الاسم والترتيب والظهور</h4>' +
      '<div class="field"><label>القسم الذي يفتح أولاً عند الدخول</label><select id="nvHome">' + homeOpt + '</select></div>' +
      '<p class="mini">عدّل الاسم أو الأيقونة، بدّل «ظاهر»، ورتّب بالأزرار ▲▼ — ثم اضغط حفظ. الترتيب هنا هو ترتيب الشريط الجانبي، والقسم الأول في القائمة يظهر أولاً لمن يدخل الموقع (يمكنك اختيار قسم آخر كصفحة افتتاحية من القائمة أعلاه).</p>' +
      '<div class="nv-list">' + rows + '</div>' +
      '<div class="btn-row"><button class="btn primary" onclick="nvSave()">💾 حفظ الأقسام</button>' +
      '<button class="btn ghost" onclick="nvReset()">↺ استعادة الافتراضي</button></div>' +
      '<p class="mini">الأقسام ذات «صلاحية مقيدة» لا تظهر إلا لأصحابها (الإدارة/المعلم/ولي الأمر/الطالب/المالك) ولا يمكن فتحها للعامة.</p></div>' +
      '<div class="panel"><h4>🗂️ مجموعات القائمة</h4>' + grpRows +
      '<div class="btn-row"><button class="btn ghost" onclick="nvAddGroup()">➕ مجموعة</button>' +
      '<button class="btn primary" onclick="nvSave()">💾 حفظ</button></div>' +
      '<p class="mini">المجموعة هي العنوان الفاصل في الشريط الجانبي مثل «مسار الرئيسية».</p></div>';
  }
  window.mnRenderNavCfg = renderNavCfg;

  function readCfg() {
    var ui = ensureUI();
    $$('[data-nv]').forEach(function (el) {
      var i = +el.dataset.i, k = el.dataset.nv, x = ui.secs[i];
      if (!x) return;
      if (k === 'show') x.show = el.checked;
      else if (k === 'g') x.g = +el.value;
      else x[k] = el.value;
    });
    $$('[data-gn]').forEach(function (el) { var i = +el.dataset.gn; if (ui.groups[i]) ui.groups[i].t = el.value; });
    var h = document.getElementById('nvHome');
    if (h) ui.home = h.value;
  }
  window.nvSave = function () {
    readCfg();
    try { save(); } catch (e) {}
    renderNav(); applyLogo();
    try { renderDash(); } catch (e) {}
    try { renderNavCfg(); } catch (e) {}
    toast('💾 حُفظت الأقسام والترتيب');
  };
  window.nvReset = function () {
    if (!confirm('استعادة ترتيب وأسماء الأقسام الافتراضية؟ (لن تُحذف بياناتك)')) return;
    S.ui.secs = SEC_DEFS.map(function (x) { return JSON.parse(JSON.stringify(x)); });
    S.ui.home = 'dash';
    S.ui.groups = GRP_DEFS.map(function (t) { return { t: t }; });
    try { save(); } catch (e) {}
    renderNav(); renderNavCfg();
    try { renderDash(); } catch (e) {}
    toast('↺ استُعيدت الأقسام الافتراضية');
  };
  window.nvMove = function (i, d) {
    var ui = ensureUI(), a = ui.secs, j = i + d;
    if (j < 0 || j >= a.length) return;
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    try { save(); } catch (e) {}
    renderNav(); renderNavCfg();
    try { renderDash(); } catch (e) {}
  };
  window.nvAddGroup = function () {
    var ui = ensureUI();
    ui.groups.push({ t: 'مجموعة جديدة' });
    try { save(); } catch (e) {}
    renderNavCfg();
  };
  window.nvDelGroup = function (i) {
    var ui = ensureUI();
    if (ui.groups.length <= 1) { toast('⚠️ لا يمكن حذف كل المجموعات'); return; }
    if (!confirm('حذف هذه المجموعة؟ ستنتقل أقسامها إلى المجموعة الأولى.')) return;
    ui.secs.forEach(function (x) {
      if (x.g === i) x.g = 0;
      else if (x.g > i) x.g = x.g - 1;
    });
    ui.groups.splice(i, 1);
    try { save(); } catch (e) {}
    renderNav(); renderNavCfg();
  };
  window.ownerTab = function (k) {
    $$('#ownerTabs .tab-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.ot === k); });
    $$('.owner-pane').forEach(function (p) { p.style.display = 'none'; });
    var t = document.getElementById('ot-' + k);
    if (t) t.style.display = '';
    if (k === 'navcfg') renderNavCfg();
  };

  /* ---------------- المدخل السرّي ---------------- */
  function normPath(p) {
    return String(p || '').toLowerCase().replace(/^#/, '').replace(/^\/+/, '').trim();
  }
  function gate() {
    try { if (window.MC && MC.closeAuth) MC.closeAuth(); } catch (e) {}
    var open = function (id) { try { openModal(id); } catch (e) {} };
    open('ownerModal');
  }
  window.mnGate = gate;

  function checkHash() {
    var cur = normPath(location.hash);
    var key = normPath((S && S.ownerPath) || KEY);
    if (!cur) return;
    if (cur === key || cur === 'm/' + key) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      gate();
    }
  }
  window.addEventListener('hashchange', checkHash);

  /* خمس نقرات على الشعار */
  (function () {
    var taps = [];
    var brand = document.getElementById('brandLogo');
    if (!brand) return;
    brand.addEventListener('click', function () {
      var t = Date.now();
      taps = taps.filter(function (x) { return t - x < 2600; });
      taps.push(t);
      if (taps.length >= 3) { taps = []; (window.masarOpenOwnerGate || gate)(); }
    });
  })();

  /* كلمة سر المالك: يقبل حساب السحابة أو البيانات المحفوظة */
  var tries = 0, lockUntil = 0;
  function bad() {
    tries++;
    if (tries >= 4) { lockUntil = Date.now() + 20000; tries = 0; toast('🚫 محاولات كثيرة — انتظر ٢٠ ثانية'); }
    else toast('❌ بيانات غير صحيحة');
  }
  function unlock() {
    try { sessionStorage.setItem('m_owner', '1'); } catch (e) {}
    try { if (typeof setRole === 'function') setRole('owner'); } catch (e) {}
    try { closeModal('ownerModal'); } catch (e) {}
    try { applyRoleUI(); } catch (e) {}
    try { go('owner'); } catch (e) {}
    try { toast('👑 أهلاً بك — منطقة التحكم الكاملة'); } catch (e) {}
  }
  function ownerLogin() {
    if (Date.now() < lockUntil) { toast('⏳ انتظر قليلاً قبل المحاولة'); return; }
    var u = ($('#ownerUser') && $('#ownerUser').value || '').trim();
    var p = ($('#ownerPass') && $('#ownerPass').value || '');
    if (!u || !p) { toast('⚠️ أدخل المستخدم وكلمة المرور'); return; }
    if (u === (S.ownerUser || '') && p === (S.ownerPass || '')) { tries = 0; unlock(); return; }
    if (window.MC && MC.login) {
      MC.login(u, p).then(function (acc) {
        if (acc && acc.role === 'owner') { tries = 0; unlock(); }
        else bad();
      }).catch(function () { bad(); });
    } else bad();
  }
  function bindGate() {
    /* v4.2: تم تعطيل الدخول القديم (مستخدم/كلمة مرور) — البوابة الآن برمز مشفّر عبر masarOpenOwnerGate */
    if (typeof window.masarBindGate === 'function') { try { window.masarBindGate(); } catch (e) {} }
    return;
    var d = document.getElementById('doOwnerLogin');
    if (d) { d.onclick = null; d.onclick = ownerLogin; }
    ['ownerUser', 'ownerPass'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.dataset.bound) {
        el.dataset.bound = '1';
        el.addEventListener('keydown', function (e) { if (e.key === 'Enter') ownerLogin(); });
      }
    });
  }

  /* ---------------- لصق الألواح الجديدة في لوحة المالك ---------------- */
  function wrapOwner() {
    var rSec = window.renderOSec;
    window.renderOSec = function () {
      try { rSec.apply(null, arguments); } catch (e) {}
      var box = document.getElementById('ot-security');
      if (!box || box.querySelector('.nv-secret')) return;
      var d = document.createElement('div');
      d.className = 'panel nv-secret';
      d.innerHTML = '<h4>🔒 المدخل السرّي لمنطقة المالك</h4>' +
        '<div class="field"><label>الرابط السرّي (يُفتح بإضافته لنهاية عنوان الموقع)</label>' +
        '<input id="oPath" dir="ltr" value="' + escQ('#' + (S.ownerPath || KEY)) + '"></div>' +
        '<div class="btn-row"><button class="btn primary" onclick="savePath()">💾 حفظ الرابط السرّي</button></div>' +
        '<p class="mini">طرق الدخول: أضف <span dir="ltr">' + escQ('#' + (S.ownerPath || KEY)) + '</span> لنهاية العنوان، أو اضغط شعار مسار في القائمة الجانبية <b>خمس نقرات سريعة</b>. بعدها تظهر نافذة المستخدم وكلمة المرور. لا يوجد أي زر ظاهر لمنطقة المالك في الموقع.</p>' +
        '<p class="mini">⚠️ الحماية هنا تعمل داخل المتصفح (ملف ثابت بلا خادم) — تمنع الوصول العابر ولا تُعدّ تشفيراً. للنشر الرسمي استخدم قواعد Firestore المرفقة مع Firebase.</p>';
      box.appendChild(d);
    };
    var rSections = window.renderOSections;
    window.renderOSections = function () {
      try { rSections.apply(null, arguments); } catch (e) {}
      var os = document.getElementById('osSchool');
      if (os) {
        var p = os.closest('.panel');
        if (p) {
          p.innerHTML = '<h4>🏛️ أسماء الأقسام والترتيب</h4>' +
            '<p class="mini">أصبح التحكم الكامل في تبويب مستقل: تغيير اسم أي قسم، أيقونته، إظهاره أو إخفاؤه، ترتيبه، ومجموعته، وتحديد القسم الذي يفتح أولاً.</p>' +
            '<div class="btn-row"><button class="btn primary" onclick="ownerTab(\'navcfg\')">🎛️ فتح «الأقسام والترتيب»</button></div>';
        }
      }
    };
    var rOwner = window.renderOwner;
    window.renderOwner = function () {
      try { rOwner.apply(null, arguments); } catch (e) {}
      try { renderNavCfg(); } catch (e) {}
    };
  }
  window.savePath = function () {
    var v = ($('#oPath') && $('#oPath').value || '').trim();
    v = normPath(v) || KEY;
    v = v.replace(/[^a-z0-9_\-\/]/gi, '');
    S.ownerPath = v || KEY;
    try { save(); } catch (e) {}
    try { renderOSec(); } catch (e) {}
    toast('🔒 الرابط السرّي: #' + S.ownerPath);
  };

  /* ---------------- الإقلاع ---------------- */
  function boot() {
    try { ensureUI(); } catch (e) {}
    try { applyLogo(); } catch (e) {}
    try { brandStrip(); } catch (e) {}
    try { renderNav(); } catch (e) {}
    try { wrapOwner(); } catch (e) {}
    try { applyRoleUI(); } catch (e) {}
    try { checkHash(); } catch (e) {}
    try { bindGate(); } catch (e) {}
  }
  var _aru = window.applyRoleUI;
  window.applyRoleUI = function () {
    if (typeof _aru === 'function') { try { _aru.apply(null, arguments); } catch (e) {} }
    try { renderNav(); } catch (e) {}
  };

  /* الشعار العريض أعلى الصفحة الرئيسية */
  function brandStrip() {
    var sec = document.getElementById('s-dash');
    if (!sec || sec.querySelector('.sec-logo')) return;
    var wide = window.MASAR_LOGO_WIDE || logoURI();
    if (!wide) return;
    var d = document.createElement('div');
    d.className = 'sec-logo';
    d.innerHTML = '<img src="' + wide + '" alt="MASAR | مسار">';
    sec.insertBefore(d, sec.firstChild);
  }
  window.mnBrandStrip = brandStrip;

  boot();
  window.addEventListener('load', function () {
    boot();
    setTimeout(boot, 400);
    setTimeout(function () { try { go(homeSec()); } catch (e) {} }, 700);
    setTimeout(bindGate, 1200);
  });
  /* إعادة البناء بعد أي مزامنة سحابية */
  if (window.MC) {
    var onS = MC.onState;
    MC.onState = function () {
      try { ensureUI(); } catch (e) {}
      try { renderNav(); } catch (e) {}
      try { applyLogo(); } catch (e) {}
      if (typeof onS === 'function') try { onS.apply(null, arguments); } catch (e) {}
    };
  }
})();
