/* MASAR — masar-patch43.js */
/* ===== MASAR v4.3 patch ===== */
/* ================= MASAR v4.3 — تنبيهات الجدول + تصدير/طباعة + مقارنة الأنواع + إحصائيات المالك ================= */
(function () {
  'use strict';

  var DAYS = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  var JSDAY = { 'السبت': 6, 'الأحد': 0, 'الإثنين': 1, 'الثلاثاء': 2, 'الأربعاء': 3, 'الخميس': 4, 'الجمعة': 5 };
  var MODE_T = { daily: 'الجدول اليومي', weekly: 'الجدول الأسبوعي', monthly: 'الجدول الشهري' };

  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function ST() {
    try { return (typeof S !== 'undefined' && S && typeof S === 'object') ? S : null; } catch (e) { return null; }
  }
  function PL() {
    var st0 = ST();
    if (!st0) return { mode: 'daily', items: {}, notif: { on: true, lead: 15, sound: true } };
    if (!st0.planner || typeof st0.planner !== 'object') st0.planner = { mode: 'daily', items: {} };
    S = st0;
    var p = S.planner;
    if (!p.items || typeof p.items !== 'object') p.items = {};
    ['daily', 'weekly', 'monthly'].forEach(function (k) { if (!Array.isArray(p.items[k])) p.items[k] = []; });
    return p;
  }
  function saveIt() { try { save(); } catch (e) {} }
  function mins(t) {
    var m = /^(\d{1,2})\s*[:.٫]\s*(\d{1,2})/.exec(String(t || '').trim());
    if (!m) return -1;
    var h = +m[1], mi = +m[2];
    if (h > 23 || mi > 59) return -1;
    return h * 60 + mi;
  }
  function toHM(m) {
    var h = Math.floor(m / 60), mi = m % 60;
    return (h < 10 ? '0' : '') + h + ':' + (mi < 10 ? '0' : '') + mi;
  }

  /* ================= 1) إعدادات التنبيه ================= */
  function notifCfg() {
    var p = PL();
    if (!p.notif || typeof p.notif !== 'object') p.notif = { on: true, lead: 15, sound: true };
    if (typeof p.notif.on !== 'boolean') p.notif.on = true;
    if ([5, 10, 15, 30, 60].indexOf(+p.notif.lead) < 0) p.notif.lead = 15;
    if (typeof p.notif.sound !== 'boolean') p.notif.sound = true;
    return p.notif;
  }
  window.masarNotifCfg = notifCfg;

  function notifySupported() {
    try { return typeof window.Notification !== 'undefined'; } catch (e) { return false; }
  }
  function permState() {
    try { return notifySupported() ? Notification.permission : 'unsupported'; } catch (e) { return 'unsupported'; }
  }

  window.masarPlannerNotifAsk = function () {
    var c = notifCfg();
    c.on = true; saveIt();
    if (!notifySupported()) {
      toast('🔔 التنبيهات تعمل داخل الصفحة فقط (متصفحك لا يدعم إشعارات النظام)');
      renderNotifBar(); return;
    }
    if (Notification.permission === 'granted') {
      toast('🔔 التنبيهات مفعّلة — سننبّهك قبل الموعد');
      renderNotifBar(); return;
    }
    if (Notification.permission === 'denied') {
      toast('🚫 الإشعارات مرفوضة من إعدادات المتصفح — التنبيه سيظهر داخلياً فقط');
      renderNotifBar(); return;
    }
    Notification.requestPermission().then(function (r) {
      toast(r === 'granted' ? '🔔 تم تفعيل إشعارات المتصفح' : 'ℹ️ سننبّهك داخل الصفحة فقط');
      renderNotifBar();
    }).catch(function () { renderNotifBar(); });
  };

  window.masarPlannerNotifToggle = function (v) {
    var c = notifCfg();
    c.on = !!v; saveIt(); toast(c.on ? '🔔 التنبيهات مفعّلة' : '🔕 التنبيهات موقوفة'); renderNotifBar();
  };
  window.masarPlannerLead = function (v) {
    var c = notifCfg();
    c.lead = +v || 15; saveIt(); toast('⏱️ التنبيه قبل الموعد بـ ' + c.lead + ' دقيقة'); renderNotifBar();
  };
  window.masarPlannerSoundToggle = function (v) {
    var c = notifCfg(); c.sound = !!v; saveIt(); renderNotifBar();
  };

  /* ---------- حساب المواعيد القادمة ---------- */
  function upcoming(from, horizonMs) {
    var p = PL(), out = [], now = from || new Date();
    var base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var horizon = horizonMs || 3 * 864e5;

    (p.items.daily || []).forEach(function (it, i) {
      var mm = mins(it.time);
      if (mm < 0 || !String(it.text || '').trim()) return;
      for (var d = 0; d < 3; d++) {
        var dt = new Date(base.getTime() + d * 864e5); dt.setHours(Math.floor(mm / 60), mm % 60, 0, 0);
        if (dt.getTime() < now.getTime() - 6e4) continue;
        if (dt.getTime() - now.getTime() > horizon) break;
        out.push({ mode: 'daily', idx: i, text: it.text, ts: dt.getTime(), time: it.time, label: 'يومي', key: 'd' + i + '-' + dt.toDateString() });
        break;
      }
    });

    (p.items.weekly || []).forEach(function (it, i) {
      var mm = mins(it.time);
      if (mm < 0 || !String(it.text || '').trim()) return;
      var target = JSDAY[it.day];
      if (typeof target !== 'number') return;
      for (var d = 0; d < 8; d++) {
        var dt = new Date(base.getTime() + d * 864e5); dt.setHours(Math.floor(mm / 60), mm % 60, 0, 0);
        if (dt.getDay() !== target) continue;
        if (dt.getTime() < now.getTime() - 6e4) continue;
        if (dt.getTime() - now.getTime() > horizon) break;
        out.push({ mode: 'weekly', idx: i, text: it.text, ts: dt.getTime(), time: it.time, day: it.day, label: 'أسبوعي', key: 'w' + i + '-' + dt.toDateString() });
        break;
      }
    });

    out.sort(function (a, b) { return a.ts - b.ts; });
    return out;
  }
  window.masarPlannerUpcoming = function () { return upcoming(new Date(), 7 * 864e5); };

  /* ---------- سجل التنبيهات المُطلقة (لمنع التكرار) ---------- */
  var FIRED_KEY = 'MASAR_PLANNER_FIRED';
  function firedMap() {
    try { var o = JSON.parse(localStorage.getItem(FIRED_KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; }
  }
  function wasFired(k) { return !!firedMap()[k]; }
  function markFired(k) {
    var m = firedMap(), now = Date.now();
    m[k] = now;
    Object.keys(m).forEach(function (x) { if (now - m[x] > 7 * 864e5) delete m[x]; });
    try { localStorage.setItem(FIRED_KEY, JSON.stringify(m)); } catch (e) {}
  }

  function beep() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!window.__masarAC) window.__masarAC = new AC();
      var ctx = window.__masarAC, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = 880;
      g.gain.value = 0.06;
      o.connect(g); g.connect(ctx.destination);
      o.start(); setTimeout(function () { try { o.stop(); } catch (e) {} }, 260);
    } catch (e) {}
  }

  function fireAlert(x, diffMs) {
    var minsLeft = Math.round(diffMs / 60000);
    var when = minsLeft > 1 ? ('بعد ' + minsLeft + ' دقيقة') : (minsLeft === 1 ? 'بعد دقيقة' : 'الآن');
    var body = '⏰ ' + x.text + ' — ' + (x.time || '') + ' (' + when + ')';
    try { pushNote('⏰ ' + x.text + ' — الموعد ' + (x.time || '') + ' (' + when + ')'); } catch (e) {}
    try { toast(body); } catch (e) {}
    if (notifCfg().sound) beep();
    if (permState() === 'granted') {
      try {
        var n = new Notification('مسار — تنبيه جدولك', {
          body: x.text + '\nالموعد: ' + (x.time || '') + ' · ' + when,
          tag: 'masar-' + x.key,
          dir: 'rtl', lang: 'ar',
          icon: (window.MASAR_LOGO || 'icon.png')
        });
        n.onclick = function () { try { window.focus(); go('planner'); n.close(); } catch (e) {} };
      } catch (e) {}
    }
    renderNotifBar();
  }
  window.masarPlannerTestAlert = function () {
    var c = notifCfg();
    if (permState() === 'default') { window.masarPlannerNotifAsk(); }
    fireAlert({ text: 'تجربة تنبيه — مراجعة الرياضيات', time: toHM(new Date().getHours() * 60 + new Date().getMinutes()), key: 'test-' + Date.now() }, 5 * 60000);
    if (!notifySupported()) toast('ℹ️ هذا تنبيه تجريبي داخل الصفحة (إشعارات النظام غير مدعومة)');
  };

  /* ---------- المحرك ---------- */
  function checkAlerts() {
    var c = notifCfg();
    if (!c.on) { renderNotifBar(); return; }
    var now = Date.now(), leadMs = c.lead * 60000;
    var list = upcoming(new Date(), 2 * 864e5);
    for (var i = 0; i < list.length; i++) {
      var x = list[i], diff = x.ts - now;
      if (diff <= leadMs && diff > -90000) {
        if (wasFired(x.key)) continue;
        markFired(x.key);
        fireAlert(x, diff);
        break;
      }
    }
    renderNotifBar();
  }

  /* ---------- شريط حالة التنبيه داخل القسم ---------- */
  function renderNotifBar() {
    var box = document.getElementById('plannerNotifyBar');
    if (!box) return;
    var c = notifCfg(), st = permState();
    var stTxt = st === 'granted' ? '✅ إشعارات المتصفح مفعّلة' : st === 'denied' ? '🚫 إشعارات المتصفح مرفوضة' : st === 'unsupported' ? 'ℹ️ متصفحك لا يدعم إشعارات النظام' : '⚠️ إشعارات المتصفح غير مفعّلة بعد';
    var nx = upcoming(new Date(), 7 * 864e5)[0];
    var nextTxt = 'لا مواعيد قادمة — أضف صفاً بوقت في الجدول اليومي أو الأسبوعي.';
    if (nx) {
      var d = new Date(nx.ts), diff = nx.ts - Date.now();
      var dl = diff > 36e5 ? Math.round(diff / 36e5) + ' ساعة' : Math.max(1, Math.round(diff / 60000)) + ' دقيقة';
      var dayTxt = nx.mode === 'weekly' ? (nx.day + ' ') : (d.toDateString() === new Date().toDateString() ? 'اليوم ' : d.toLocaleDateString('ar-OM') + ' ');
      nextTxt = 'القادم: <b>' + esc(nx.text) + '</b> · ' + dayTxt + '<b>' + esc(nx.time) + '</b> — بعد <b>' + dl + '</b>';
    }
    box.innerHTML =
      '<h4>🔔 تنبيهات جدولي</h4>' +
      '<div class="pn-row">' +
      '<label class="pn-sw"><input type="checkbox" ' + (c.on ? 'checked' : '') + ' onchange="masarPlannerNotifToggle(this.checked)"> التنبيهات مفعّلة</label>' +
      '<label class="pn-sw">التنبيه قبل الموعد بـ ' +
      '<select onchange="masarPlannerLead(this.value)">' +
      [5, 10, 15, 30, 60].map(function (v) { return '<option value="' + v + '"' + (c.lead === v ? ' selected' : '') + '>' + v + ' دقيقة</option>'; }).join('') +
      '</select></label>' +
      '<label class="pn-sw"><input type="checkbox" ' + (c.sound ? 'checked' : '') + ' onchange="masarPlannerSoundToggle(this.checked)"> صوت تنبيه</label>' +
      '<button class="chip" onclick="masarPlannerNotifAsk()">🔔 تفعيل إشعارات المتصفح</button>' +
      '<button class="chip" onclick="masarPlannerTestAlert()">🧪 تنبيه تجريبي</button>' +
      '</div>' +
      '<p class="pn-next">' + nextTxt + '</p>' +
      '<p class="mini">' + stTxt + ' — التنبيه يظهر كإشعار نظام (إن سمح المتصفح) + إشعار داخل الموقع + جرس الإشعارات + صوت قصير. ' +
      '<b>مهم:</b> التنبيه يعمل فقط أثناء فتح الموقع أو بقاء التبويب مفتوحاً؛ لا يوجد خادم إشعارات خلفي في نسخة الملف الثابت. التنبيهات تعتمد على عمود «الوقت» في الجدولين اليومي والأسبوعي (الجدول الشهري تواريخ بلا ساعات).</p>';
  }
  window.masarRenderNotifBar = renderNotifBar;

  /* ================= 2) مقارنة أنواع الجداول ================= */
  var CMP = {
    title: '📊 مقارنة أنواع الجداول — أيّها يناسبك؟',
    intro: 'كل نوع جدول يخدم هدفاً مختلفاً. يمكنك استخدام الثلاثة معاً: اليومي للتنفيذ، الأسبوعي للتوزيع، والشهري للأهداف الكبيرة.',
    rows: [
      { k: '☀️ يومي', best: 'التنفيذ اليومي وساعات المراجعة', unit: 'ساعة ← ساعة', pros: ['أعلى دقة زمنية: تعرف ماذا تفعل الآن بالضبط', 'يُظهر الفجوات في يومك بسرعة', 'مثالي للتنبيهات قبل الحصة/جلسة الدراسة', 'سهل التعديل عند طارئ في اليوم'], cons: 'يحتاج تحديثاً يومياً وإلا فقد قيمته', use: 'أيام الدراسة والاختبارات القريبة' },
      { k: '📅 أسبوعي', best: 'توزيع المواد والواجبات على الأيام', unit: 'يوم ← مادة', pros: ['يوازن المواد فلا تتراكم مادة على أخرى', 'يكشف الأيام المزدحمة قبل حدوثها', 'يضمن وقتاً للراحة والاستدراك', 'يصلح كخطة ثابتة تتكرر كل أسبوع'], cons: 'أقل دقة في الساعات داخل اليوم', use: 'خطة الفصل الدراسي الأسبوعية' },
      { k: '🗓️ شهري', best: 'الأهداف الكبيرة والمواعيد النهائية', unit: 'تاريخ ← هدف', pros: ['يرى الصورة الكاملة للشهر في شاشة واحدة', 'مناسب للمشاريع والتسليمات والاختبارات', 'يساعد على قياس التقدم أسبوعاً بأسبوع', 'يحافظ على التوازن بين الدراسة والحياة'], cons: 'لا يصلح للتنفيذ اللحظي ولا للتنبيهات الزمنية', use: 'بداية الشهر وتخطيط المشاريع' }
    ],
    combo: ['ابدأ بالشهري: اكتب أهداف الشهر ومواعيد التسليم.', 'حوّلها إلى أسبوعي: وزّع الأهداف على أيام الأسبوع.', 'أخيراً اليومي: حدّد ساعات التنفيذ وفعّل التنبيهات.', 'راجع جدولك كل يوم بعد صلاة العشاء — ٣ دقائق تكفي.']
  };

  function renderCompare() {
    var box = document.getElementById('plannerCompare');
    if (!box) return;
    var rows = CMP.rows.map(function (r) {
      return '<tr><td class="cmp-k">' + r.k + '<br><span class="cmp-best">' + r.best + '</span></td>' +
        '<td><b>' + r.unit + '</b></td>' +
        '<td><ul class="cmp-pros">' + r.pros.map(function (p) { return '<li>✅ ' + p + '</li>'; }).join('') + '</ul></td>' +
        '<td class="cmp-cons">⚠️ ' + r.cons + '</td>' +
        '<td>' + r.use + '</td></tr>';
    }).join('');
    box.innerHTML = '<div class="panel cmp-panel"><h4>' + CMP.title + '</h4>' +
      '<p class="mini">' + CMP.intro + '</p>' +
      '<div class="cmp-wrap"><table class="cmp-table"><thead><tr><th>النوع</th><th>وحدة التخطيط</th><th>المزايا</th><th>الحدود</th><th>الأفضل لـ</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<h4 style="margin-top:16px">🧩 الوصفة المثالية: استخدم الثلاثة معاً</h4>' +
      '<ol class="cmp-steps">' + CMP.combo.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>' +
      '<div class="btn-row"><button class="chip" onclick="masarPlannerMode(\'daily\');masarPlannerToggleCompare(false)">☀️ ابدأ باليومي</button>' +
      '<button class="chip" onclick="masarPlannerMode(\'weekly\');masarPlannerToggleCompare(false)">📅 ابدأ بالأسبوعي</button>' +
      '<button class="chip" onclick="masarPlannerMode(\'monthly\');masarPlannerToggleCompare(false)">🗓️ ابدأ بالشهري</button></div></div>';
  }
  window.masarPlannerToggleCompare = function (force) {
    var box = document.getElementById('plannerCompare');
    if (!box) return;
    var show = (typeof force === 'boolean') ? force : box.classList.contains('hidden');
    if (show) { renderCompare(); box.classList.remove('hidden'); }
    else box.classList.add('hidden');
    var b = document.getElementById('ptCmpBtn');
    if (b) b.classList.toggle('active', show);
    if (show) { try { box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {} }
  };

  /* ================= 3) التصدير والطباعة ================= */
  function activeMode() { return PL().mode || 'daily'; }

  function snapshotHTML(mode) {
    var p = PL(), items = p.items[mode] || [], m = mode || 'daily';
    var today = new Date().toLocaleDateString('ar-OM', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var quote = '';
    try { quote = document.getElementById('plannerQuote').textContent || ''; } catch (e) {}
    var rows = '';
    if (m === 'daily') {
      items.forEach(function (it) {
        rows += '<tr><td class="c-t">' + esc(it.time || '—') + '</td><td>' + esc(it.text || '') + '</td><td class="c-s">' + (it.done ? '✓' : '') + '</td></tr>';
      });
    } else if (m === 'weekly') {
      items.forEach(function (it) {
        rows += '<tr><td class="c-t">' + esc(it.day || '') + '</td><td class="c-t">' + esc(it.time || '—') + '</td><td>' + esc(it.text || '') + '</td><td class="c-s">' + (it.done ? '✓' : '') + '</td></tr>';
      });
    } else {
      items.forEach(function (it) {
        rows += '<tr><td class="c-t">' + esc(it.day || '—') + '</td><td>' + esc(it.text || '') + '</td><td class="c-s">' + (it.done ? '✓' : '') + '</td></tr>';
      });
    }
    if (!items.length) rows = '<tr><td colspan="4" class="c-empty">لا صفوف في هذا الجدول بعد</td></tr>';
    var head = m === 'weekly'
      ? '<tr><th>اليوم</th><th>الوقت</th><th>المهمة</th><th>تم</th></tr>'
      : (m === 'monthly' ? '<tr><th>التاريخ</th><th>المهمة</th><th>تم</th></tr>' : '<tr><th>الوقت</th><th>المهمة</th><th>تم</th></tr>');

    return '<div class="exp-card">' +
      '<div class="exp-head"><div class="exp-brand">مسار<span>MASAR</span></div>' +
      '<div class="exp-meta">' + MODE_T[m] + '<br>' + esc(today) + '</div></div>' +
      '<table class="exp-table"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>' +
      (quote ? '<div class="exp-quote">' + esc(quote) + '</div>' : '') +
      '<div class="exp-foot">منصة مسار — رفيق الطالب العماني · إعداد وتصميم: عامر بن خلفان الشكيري / معاذ بن عامر الشكيري @mo3th.x</div>' +
      '</div>';
  }

  function buildPrintArea(mode) {
    var area = document.getElementById('printArea');
    if (!area) {
      area = document.createElement('div');
      area.id = 'printArea';
      document.body.appendChild(area);
    }
    area.innerHTML = snapshotHTML(mode);
    return area;
  }

  window.masarPlannerPrint = function () {
    var m = activeMode();
    var p = PL();
    if (!(p.items[m] || []).length) { toast('⚠️ الجدول فارغ — أضف صفوفاً أولاً'); return; }
    buildPrintArea(m);
    document.body.classList.add('printing-planner');
    var done = function () {
      document.body.classList.remove('printing-planner');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    setTimeout(function () {
      try { window.print(); } catch (e) { toast('⚠️ تعذّرت الطباعة في هذا المتصفح'); }
      setTimeout(done, 1200);
    }, 120);
    toast('🖨️ اختر «حفظ كـ PDF» من نافذة الطباعة إن أردت ملف PDF');
  };

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var ok = false;
      Array.prototype.forEach.call(document.scripts, function (s) { if (s.src && s.src.indexOf(src.split('/').pop()) !== -1) ok = true; });
      if (ok) return res(true);
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = function () { res(true); };
      s.onerror = function () { rej(new Error('cdn')); };
      document.head.appendChild(s);
    });
  }

  function captureNode(mode, scale) {
    var host = document.createElement('div');
    host.style.cssText = 'position:fixed;top:-99999px;right:0;width:820px;z-index:-1;';
    host.innerHTML = snapshotHTML(mode);
    document.body.appendChild(host);
    var libs = [];
    if (!window.html2canvas) libs.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'));
    return Promise.all(libs).then(function () {
      if (!window.html2canvas) throw new Error('nocanvas');
      return window.html2canvas(host.firstElementChild, { backgroundColor: '#1C0B0E', scale: scale || 2, useCORS: true });
    }).then(function (canvas) {
      try { host.remove(); } catch (e) {}
      return canvas;
    })['catch'](function (e) {
      try { host.remove(); } catch (x) {}
      throw e;
    });
  }

  window.masarPlannerPNG = function () {
    var m = activeMode(), p = PL();
    if (!(p.items[m] || []).length) { toast('⚠️ الجدول فارغ — أضف صفوفاً أولاً'); return; }
    toast('🖼️ جارٍ إنشاء الصورة… (تحتاج اتصالاً بالإنترنت أول مرة)');
    captureNode(m, 2).then(function (canvas) {
      var a = document.createElement('a');
      a.download = 'masar-' + m + '-' + new Date().toISOString().slice(0, 10) + '.png';
      a.href = canvas.toDataURL('image/png');
      document.body.appendChild(a); a.click(); a.remove();
      toast('✅ جاهزة — نُزّلت صورة PNG');
    })['catch'](function () {
      toast('⚠️ تعذّر إنشاء الصورة (مكتبة التصدير تحتاج إنترنت) — استخدم «طباعة» ثم حفظ كـ PDF');
    });
  };

  window.masarPlannerPDF = function () {
    var m = activeMode(), p = PL();
    if (!(p.items[m] || []).length) { toast('⚠️ الجدول فارغ — أضف صفوفاً أولاً'); return; }
    toast('📄 جارٍ إنشاء ملف PDF… (يحتاج اتصالاً بالإنترنت أول مرة)');
    var chain = Promise.resolve();
    if (!window.jspdf) chain = chain.then(function () { return loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'); });
    chain.then(function () { return captureNode(m, 2); }).then(function (canvas) {
      var jsPDF = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
      if (!jsPDF) throw new Error('nopdf');
      var img = canvas.toDataURL('image/jpeg', 0.95);
      var pw = 595.28, ph = 841.89; /* A4 portrait */
      var pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      var iw = pw - 48;
      var ih = canvas.height * iw / canvas.width;
      if (ih > ph - 48) { ih = ph - 48; iw = canvas.width * ih / canvas.height; }
      pdf.setFillColor(28, 11, 14); pdf.rect(0, 0, pw, ph, 'F');
      pdf.addImage(img, 'JPEG', (pw - iw) / 2, 36, iw, ih);
      pdf.save('masar-' + m + '-' + new Date().toISOString().slice(0, 10) + '.pdf');
      toast('✅ جاهز — نُزّل ملف PDF');
    })['catch'](function () {
      toast('⚠️ تعذّر إنشاء PDF (مكتبة التصدير تحتاج إنترنت) — استخدم «طباعة» ثم «حفظ كـ PDF»');
    });
  };

  /* ================= 4) إحصائيات المالك ================= */
  var VISITS_KEY = 'MASAR_STATS_VISITS';

  function trackVisit() {
    try {
      var o = JSON.parse(localStorage.getItem(VISITS_KEY) || '{}');
      if (typeof o.total !== 'number') o.total = 0;
      if (!o.days || typeof o.days !== 'object') o.days = {};
      var today = new Date().toISOString().slice(0, 10);
      if (sessionStorage.getItem('masar_visit_logged') !== '1') {
        o.total++; o.days[today] = (o.days[today] || 0) + 1;
        o.last = Date.now();
        sessionStorage.setItem('masar_visit_logged', '1');
        localStorage.setItem(VISITS_KEY, JSON.stringify(o));
      }
    } catch (e) {}
  }
  function visitStats() {
    try {
      var o = JSON.parse(localStorage.getItem(VISITS_KEY) || '{}');
      return { total: o.total || 0, days: o.days || {}, last: o.last || 0 };
    } catch (e) { return { total: 0, days: {}, last: 0 }; }
  }

  function statCard(n, l, sub, tone) {
    return '<div class="st-card' + (tone ? ' ' + tone : '') + '"><div class="st-num">' + n + '</div><div class="st-lbl">' + l + '</div>' + (sub ? '<div class="st-sub">' + sub + '</div>' : '') + '</div>';
  }

  function renderStats() {
    var box = document.getElementById('ot-stats');
    if (!box) return;
    var S2 = ST() || {};
    var students = Array.isArray(S2.students) ? S2.students : [];
    var teachers = Array.isArray(S2.teachers) ? S2.teachers : [];
    var members = Array.isArray(S2.members) ? S2.members : [];
    var p = PL();
    var v = visitStats();
    var gradeCount = { '10': 0, '11': 0, '12': 0, 'أخرى': 0 };
    students.forEach(function (s) { var g = String(s.grade || ''); gradeCount[gradeCount[g] !== undefined ? g : 'أخرى']++; });
    var paid = students.filter(function (s) { return s.plan && s.plan !== 'مجاني'; }).length;
    var withPass = students.filter(function (s) { return s.pass || s.user; }).length;

    var tasks = Array.isArray(S2.tasks) ? S2.tasks : [];
    var tDone = tasks.filter(function (t) { return t.done; }).length;
    var secs = (S2.ui && Array.isArray(S2.ui.secs)) ? S2.ui.secs : [];
    var visible = secs.filter(function (x) { return x && x.show !== false; }).length;
    var hidden = secs.length - visible;
    var summ = Array.isArray(S2.summaries) ? S2.summaries.length : 0;
    var platOn = (S2.plats || []).filter(function (x) { return x.on; }).length;
    var banned = Array.isArray(S2.vio) ? S2.vio.length : 0;
    var grades = Array.isArray(S2.gradesLog) ? S2.gradesLog.length : 0;
    var msgs = Array.isArray(S2.pmsgs) ? S2.pmsgs.length : 0;

    var bytes = 0;
    try { bytes = (localStorage.getItem('MASAR_V3') || '').length * 2; } catch (e) {}
    var kb = (bytes / 1024).toFixed(1);

    var cloudUsers = 0;
    try {
      Object.keys(localStorage).forEach(function (k) {
        if (k.indexOf('MASAR_CLOUD_USERS') === 0) {
          var o = JSON.parse(localStorage.getItem(k) || '[]');
          if (Array.isArray(o)) cloudUsers = Math.max(cloudUsers, o.length);
          else if (o && typeof o === 'object') cloudUsers = Math.max(cloudUsers, Object.keys(o).length);
        }
      });
    } catch (e) {}

    var notifNote = 0; try { notifNote = (window.NOTES || []).length; } catch (e) {}

    var days = v.days, keys = Object.keys(days).sort();
    var last7 = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(Date.now() - i * 864e5);
      var k = d.toISOString().slice(0, 10);
      last7.push({ k: k, n: days[k] || 0, lbl: d.toLocaleDateString('ar-OM', { weekday: 'short' }) });
    }
    var maxN = Math.max(1, Math.max.apply(null, last7.map(function (x) { return x.n; })));
    var bars = last7.map(function (x) {
      var h = Math.round((x.n / maxN) * 100);
      return '<div class="st-bar"><div class="st-bar-fill" style="height:' + Math.max(6, h) + '%"></div><div class="st-bar-n">' + x.n + '</div><div class="st-bar-l">' + x.lbl + '</div></div>';
    }).join('');

    var lastAct = v.last ? new Date(v.last).toLocaleString('ar-OM') : '—';
    var planRows = (p.items.daily || []).length + (p.items.weekly || []).length + (p.items.monthly || []).length;

    box.innerHTML =
      '<div class="panel"><h4>📊 لوحة الإحصائيات — نظرة شاملة</h4>' +
      '<div class="st-grid">' +
      statCard(students.length, '🎓 طلاب مسجلون', 'ممن لهم حساب: ' + withPass + ' · مشتركون: ' + paid) +
      statCard(teachers.length, '👩‍🏫 معلمون', 'أعضاء السجل: ' + members.length) +
      statCard(v.total, '👣 زيارات التطبيق', 'على هذا الجهاز') +
      statCard(summ, '📚 ملخصات منشورة', 'منصات مفعّلة: ' + platOn) +
      statCard(tasks.length, '✅ مهام', 'منجزة: ' + tDone + ' · متبقية: ' + (tasks.length - tDone)) +
      statCard(planRows, '🗒️ صفوف جدولي الخاص', 'يومي ' + (p.items.daily || []).length + ' · أسبوعي ' + (p.items.weekly || []).length + ' · شهري ' + (p.items.monthly || []).length) +
      statCard(visible + '/' + secs.length, '🧭 أقسام ظاهرة', 'مخفية: ' + hidden) +
      statCard(kb + ' KB', '💾 حجم البيانات', 'آخر نشاط: ' + lastAct) +
      '</div>' +
      '<p class="mini">📈 النشاط في الأيام السبعة الأخيرة (زيارات الجهاز):</p>' +
      '<div class="st-chart">' + bars + '</div>' +
      '<div class="st-mini-grid">' +
      '<div class="st-mini"><b>توزيع الطلاب على الصفوف</b><span>الصف 10: ' + gradeCount['10'] + ' · الصف 11: ' + gradeCount['11'] + ' · الصف 12: ' + gradeCount['12'] + (gradeCount['أخرى'] ? ' · أخرى: ' + gradeCount['أخرى'] : '') + '</span></div>' +
      '<div class="st-mini"><b>متابعة مدرسية</b><span>مخالفات: ' + banned + ' · درجات مسجلة: ' + grades + ' · رسائل أولياء أمور: ' + msgs + '</span></div>' +
      '<div class="st-mini"><b>الإشعارات</b><span>الصادرة الآن: ' + notifNote + ' · التنبيهات المُطلقة محفوظة محلياً</span></div>' +
      '<div class="st-mini"><b>حسابات السحابة (Firebase)</b><span>' + (cloudUsers ? cloudUsers + ' حساب في مخزن المتصفح' : 'غير مزامنة على هذا الجهاز') + '</span></div>' +
      '</div>' +
      '<div class="btn-row"><button class="chip" onclick="masarRenderStats()">🔄 تحديث الأرقام</button>' +
      '<button class="chip" onclick="masarResetVisitStats()">🧹 تصفير عدّاد الزيارات</button>' +
      '<button class="chip" onclick="exportData()">⬇️ تصدير نسخة احتياطية</button></div>' +
      '<p class="mini" style="margin-top:10px">⚠️ <b>مهم:</b> هذه الأرقام تُحسب من بيانات المتصفح على هذا الجهاز (localStorage) لأن النسخة الحالية ملف ثابت بلا خادم. عدد الطلاب المسجلين والمهام دقيق لهذا الجهاز/الحساب؛ أما الإحصائيات المجمّعة بين كل الأجهزة والمستخدمين فتتطلب تشغيل Firebase (Firestore) وربط الموقع به — وهو جاهز في ملف <span dir="ltr">firestore.rules</span> المرفق.</p></div>';
  }
  window.masarRenderStats = renderStats;
  window.masarResetVisitStats = function () {
    if (!confirm('تصفير عدّاد الزيارات لهذا الجهاز؟')) return;
    try { localStorage.removeItem(VISITS_KEY); } catch (e) {}
    renderStats(); toast('🧹 صُفّر عدّاد الزيارات');
  };

  /* ================= 5) تركيب الواجهات ================= */
  function addPlannerTools() {
    var body = document.getElementById('plannerBody');
    if (!body || document.getElementById('ptCmpBtn')) return;
    var bar = document.createElement('div');
    bar.className = 'pt-toolbar';
    bar.innerHTML =
      '<button class="chip" id="ptCmpBtn" onclick="masarPlannerToggleCompare()">📊 مقارنة أنواع الجداول</button>' +
      '<button class="chip" onclick="masarPlannerPrint()">🖨️ طباعة الجدول</button>' +
      '<button class="chip" onclick="masarPlannerPNG()">🖼️ تصدير صورة PNG</button>' +
      '<button class="chip" onclick="masarPlannerPDF()">📄 تصدير PDF</button>';
    body.parentNode.insertBefore(bar, body.nextSibling);

    var cmp = document.createElement('div');
    cmp.id = 'plannerCompare'; cmp.className = 'hidden';
    bar.parentNode.insertBefore(cmp, bar.nextSibling);

    var nb = document.createElement('div');
    nb.id = 'plannerNotifyBar'; nb.className = 'panel pn-panel';
    cmp.parentNode.insertBefore(nb, cmp.nextSibling);
    renderNotifBar();
  }

  function addOwnerTab() {
    var tabs = document.getElementById('ownerTabs');
    if (!tabs || document.getElementById('tab-stats')) return;
    var b = document.createElement('button');
    b.className = 'tab-btn'; b.dataset.ot = 'stats'; b.id = 'tab-stats';
    b.textContent = '📊 الإحصائيات';
    tabs.insertBefore(b, tabs.firstChild ? tabs.firstChild.nextSibling : null);
    var pane = document.createElement('div');
    pane.id = 'ot-stats'; pane.className = 'owner-pane'; pane.style.display = 'none';
    tabs.parentNode.appendChild(pane);

    var _ot = window.ownerTab;
    window.ownerTab = function (k) {
      if (typeof _ot === 'function') { try { _ot.apply(null, arguments); } catch (e) {} }
      if (k === 'stats') { try { renderStats(); } catch (e) {} }
    };
    b.onclick = function () { window.ownerTab('stats'); };
  }

  /* ---------------- الإقلاع ---------------- */
  function boot3() {
    try { trackVisit(); } catch (e) {}
    try { addPlannerTools(); } catch (e) {}
    try { addOwnerTab(); } catch (e) {}
    try { renderNotifBar(); } catch (e) {}
    /* إعادة بناء أدوات الجدول عند كل رسم للقسم */
    if (window.masarRenderPlanner && !window.masarRenderPlanner.__tools) {
      var _rp = window.masarRenderPlanner;
      var w = function () { try { _rp.apply(null, arguments); } catch (e) {} try { addPlannerTools(); } catch (e) {} };
      w.__tools = true;
      window.masarRenderPlanner = w;
    }
    if (window.mnRenderNavCfg) {
      /* لا شيء: تبويب الإحصائيات مستقل */
    }
  }

  boot3();
  window.addEventListener('load', function () { boot3(); setTimeout(boot3, 400); setTimeout(boot3, 1500); });

  /* فحص التنبيهات كل ٣٠ ثانية */
  setInterval(function () { try { checkAlerts(); } catch (e) {} }, 30000);
  setTimeout(function () { try { checkAlerts(); } catch (e) {} }, 4000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { try { checkAlerts(); } catch (e) {} }
  });
  window.masarCheckAlerts = checkAlerts;
})();
