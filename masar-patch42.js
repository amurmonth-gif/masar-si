/* MASAR — masar-patch42.js */
/* ===== MASAR v4.2 patch ===== */
/* ================= MASAR v4.2 — إضافات: بوابة المالك السرية + جدولي الخاص + حذف المهام ================= */
(function () {
  'use strict';

  /* ---------- SHA-256 (بدون مكتبات) ---------- */
  function sha256(str) {
    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
    var bytes = [], i, c, c2, cp;
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 63)); }
      else if (c < 0xd800 || c >= 0xe000) { bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63)); }
      else {
        i++; c2 = str.charCodeAt(i); cp = 0x10000 + (((c & 0x3ff) << 10) | (c2 & 0x3ff));
        bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
      }
    }
    var l = bytes.length;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    var hi = Math.floor(l / 536870912), lo = (l * 8) >>> 0;
    bytes.push((hi >>> 24) & 255, (hi >>> 16) & 255, (hi >>> 8) & 255, hi & 255);
    bytes.push((lo >>> 24) & 255, (lo >>> 16) & 255, (lo >>> 8) & 255, lo & 255);
    var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var w = new Array(64), off, a, b, cc, d, e, f, g, h, S0, S1, ch, mj, t1, t2, s0, s1;
    for (off = 0; off < bytes.length; off += 64) {
      for (i = 0; i < 16; i++) w[i] = (bytes[off + i * 4] << 24) | (bytes[off + i * 4 + 1] << 16) | (bytes[off + i * 4 + 2] << 8) | bytes[off + i * 4 + 3];
      for (i = 16; i < 64; i++) {
        s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      a = H[0]; b = H[1]; cc = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];
      for (i = 0; i < 64; i++) {
        S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        ch = (e & f) ^ ((~e) & g);
        t1 = (h + S1 + ch + K[i] + w[i]) | 0;
        S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        mj = (a & b) ^ (a & cc) ^ (b & cc);
        t2 = (S0 + mj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = cc; cc = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + cc) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H.map(function (x) { return ('00000000' + ((x >>> 0).toString(16))).slice(-8); }).join('');
  }

  var OWNER_HASH = 'c418f4123798aa28c8396641045ebdae69a17fa1b201641471fbab6fe1175f05';

  /* ================= 1) بوابة المالك: ٣ نقرات على الشعار + رمز ================= */
  var gateTaps = [];
  function bindTaps() {
    var nodes = document.querySelectorAll('#brandLogo, .brand img[data-logo], #studyland-section .logo-badge, .sec-logo img');
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.dataset.masarGate === '1') return;
      el.dataset.masarGate = '1';
      el.style.cursor = 'pointer';
      el.addEventListener('click', function (e) {
        var t = Date.now();
        gateTaps = gateTaps.filter(function (x) { return t - x < 1600; });
        gateTaps.push(t);
        if (gateTaps.length >= 3) { gateTaps = []; e.preventDefault(); openGate(); }
      });
    });
  }
  function openGate() {
    try { if (window.MC && MC.closeAuth) MC.closeAuth(); } catch (err) {}
    try { closeModal('authOverlay'); } catch (err) {}
    var p = document.getElementById('ownerPass');
    if (p) p.value = '';
    try { openModal('ownerModal'); } catch (err) {}
    setTimeout(function () { if (p) p.focus(); }, 200);
  }
  window.masarOpenOwnerGate = openGate;

  function ownerHash() {
    try { if (S && S.ownerCodeHash) return S.ownerCodeHash; } catch (e) {}
    return OWNER_HASH;
  }
  function unlockOwner() {
    try { sessionStorage.setItem('m_owner', '1'); } catch (e) {}
    try { if (typeof setRole === 'function') setRole('owner'); } catch (e) {}
    try { closeModal('ownerModal'); } catch (e) {}
    try { if (typeof applyRoleUI === 'function') applyRoleUI(); } catch (e) {}
    try { if (window.mnRenderNav) window.mnRenderNav(); } catch (e) {}
    try { go('owner'); } catch (e) {}
    try { toast('👑 أهلاً بك — منطقة التحكم الكاملة'); } catch (e) {}
  }
  var gateTries = 0, gateLock = 0;
  function gateLogin() {
    if (Date.now() < gateLock) { toast('⏳ انتظر قليلاً قبل المحاولة'); return; }
    var inp = document.getElementById('ownerPass');
    var v = (inp && inp.value || '').trim();
    if (!v) { toast('⚠️ اكتب رمز المالك'); return; }
    if (sha256(v) === ownerHash()) { gateTries = 0; if (inp) inp.value = ''; unlockOwner(); return; }
    gateTries++;
    if (gateTries >= 4) { gateLock = Date.now() + 20000; gateTries = 0; toast('🚫 محاولات كثيرة — انتظر ٢٠ ثانية'); }
    else toast('❌ رمز غير صحيح');
  }
  function bindGateLogin() {
    var btn = document.getElementById('doOwnerLogin');
    if (btn) { btn.onclick = null; btn.onclick = gateLogin; }
    var inp = document.getElementById('ownerPass');
    if (inp && inp.dataset.masarBound !== '1') {
      inp.dataset.masarBound = '1';
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') gateLogin(); });
    }
  }
  window.masarSaveOwnerCode = function () {
    var o = (document.getElementById('ownCodeOld') || {}).value || '';
    var n = (document.getElementById('ownCodeNew') || {}).value || '';
    if (!o || !n) { toast('⚠️ اكتب الرمز الحالي والجديد'); return; }
    if (sha256(o.trim()) !== ownerHash()) { toast('❌ الرمز الحالي غير صحيح'); return; }
    if (n.trim().length < 8) { toast('⚠️ الرمز الجديد قصير — ٨ أحرف على الأقل'); return; }
    S.ownerCodeHash = sha256(n.trim());
    try { save(); } catch (e) {}
    toast('🔑 حُفظ رمز المالك الجديد');
  };

  /* لوحة إضافية داخل تبويب الأمان */
  function wrapSecurity() {
    if (typeof window.renderOSec !== 'function' || window.renderOSec.__masarWrapped) return;
    var orig = window.renderOSec;
    var wrapped = function () {
      try { orig.apply(null, arguments); } catch (e) {}
      var box = document.getElementById('ot-security');
      if (!box || box.querySelector('.owncode-panel')) return;
      var d = document.createElement('div');
      d.className = 'panel owncode-panel';
      d.innerHTML = '<h4>🔑 رمز دخول منطقة المالك</h4>' +
        '<div class="field"><label>الرمز الحالي</label><input id="ownCodeOld" type="password" dir="ltr" autocomplete="off" placeholder="••••••••"></div>' +
        '<div class="field"><label>الرمز الجديد</label><input id="ownCodeNew" type="password" dir="ltr" autocomplete="off" placeholder="٨ أحرف على الأقل"></div>' +
        '<div class="btn-row"><button class="btn primary" onclick="masarSaveOwnerCode()">💾 حفظ الرمز</button></div>' +
        '<p class="mini">يُحفظ الرمز <b>مشفّراً (SHA-256)</b> ولا يُكتب نصاً صريحاً داخل الملف. الدخول: ٣ نقرات على شعار مسار ← يُطلب الرمز.</p>' +
        '<p class="mini">⚠️ الحماية هنا داخل المتصفح (ملف ثابت بلا خادم) فتمنع الوصول العابر ولا تُعدّ تشفيراً كاملاً — للنشر الرسمي استخدم Firebase وقواعد Firestore المرفقة.</p>';
      box.appendChild(d);
    };
    wrapped.__masarWrapped = true;
    window.renderOSec = wrapped;
  }

  /* ================= 2) جدولي الخاص ================= */
  function PL() {
    if (!S.planner || typeof S.planner !== 'object') S.planner = { mode: 'daily', items: {}, qi: 0 };
    var p = S.planner;
    if (!p.items || typeof p.items !== 'object') p.items = {};
    ['daily', 'weekly', 'monthly'].forEach(function (k) { if (!Array.isArray(p.items[k])) p.items[k] = []; });
    if (['daily', 'weekly', 'monthly'].indexOf(p.mode) < 0) p.mode = 'daily';
    if (typeof p.qi !== 'number') p.qi = 0;
    return p;
  }
  var DAYS = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  var MODE_META = {
    daily: { t: 'الجدول اليومي', hint: 'خطّط يومك ساعة بساعة: الوقت ثم المهمة أو الحصة.' },
    weekly: { t: 'الجدول الأسبوعي', hint: 'وزّع مهامك على أيام الأسبوع — من السبت إلى الجمعة.' },
    monthly: { t: 'الجدول الشهري', hint: 'أهداف الشهر: اكتب التاريخ ثم المهمة الكبيرة لكل يوم.' }
  };
  function esc2(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  function setPlannerMode(m) {
    var p = PL();
    p.mode = m;
    try { save(); } catch (e) {}
    renderPlanner();
  }
  window.masarPlannerMode = setPlannerMode;

  function plannerAdd(m) {
    var p = PL();
    p.items[m].push({ time: '', day: '', text: '', done: false });
    try { save(); } catch (e) {}
    renderPlanner();
    try { toast('➕ أُضيف صف جديد — اكتب فيه الآن'); } catch (e) {}
  }
  window.masarPlannerAdd = plannerAdd;

  function plannerDel(m, i) {
    var p = PL();
    p.items[m].splice(i, 1);
    try { save(); } catch (e) {}
    renderPlanner();
    try { toast('🗑 حُذف الصف'); } catch (e) {}
  }
  window.masarPlannerDel = plannerDel;

  function plannerToggle(m, i) {
    var p = PL();
    var it = p.items[m][i];
    if (!it) return;
    it.done = !it.done;
    try { save(); } catch (e) {}
    renderPlanner();
  }
  window.masarPlannerToggle = plannerToggle;

  function plannerClear(m) {
    if (!confirm('تفريغ جدول «' + (MODE_META[m] || {}).t + '» بالكامل؟')) return;
    var p = PL();
    p.items[m] = [];
    try { save(); } catch (e) {}
    renderPlanner();
    try { toast('🧹 تم تفريغ الجدول'); } catch (e) {}
  }
  window.masarPlannerClear = plannerClear;

  function plannerPreset(m) {
    var p = PL();
    if (m === 'daily') {
      p.items.daily = [
        { time: '16:00', text: 'مراجعة درس جديد', done: false },
        { time: '17:30', text: 'حل واجبات المادة', done: false },
        { time: '19:00', text: 'حفظ / تلخيص سريع', done: false },
        { time: '20:30', text: 'قراءة حرة ومراجعة خفيفة', done: false }
      ];
    } else if (m === 'weekly') {
      p.items.weekly = DAYS.map(function (d, k) {
        return { day: d, time: '', text: k === 6 ? 'راحة واستدراك ما فات' : 'مادة اليوم + واجب', done: false };
      });
    } else {
      p.items.monthly = [1, 7, 14, 21, 28].map(function (d) {
        return { day: String(d), text: 'هدف الأسبوع', done: false };
      });
    }
    try { save(); } catch (e) {}
    renderPlanner();
    try { toast('✨ أُنشئ جدول جاهز — عدّله كما تريد'); } catch (e) {}
  }
  window.masarPlannerPreset = plannerPreset;

  function bindPlannerInputs() {
    var body = document.getElementById('plannerBody');
    if (!body || body.dataset.bound === '1') return;
    body.dataset.bound = '1';
    body.addEventListener('input', function (e) {
      var el = e.target;
      if (!el || !el.dataset || !el.dataset.plK) return;
      var p = PL(), m = p.mode, i = +el.dataset.plI, k = el.dataset.plK;
      var it = p.items[m] && p.items[m][i];
      if (!it) return;
      it[k] = el.value;
      try { save(); } catch (err) {}
    });
  }

  function currentQuote() {
    var p = PL();
    var list = (S && Array.isArray(S.quotes) && S.quotes.length) ? S.quotes : ['النجاح مجموع جهود صغيرة تتكرر كل يوم.'];
    var idx = (p.qi + new Date().getDate()) % list.length;
    return list[idx] || list[0];
  }
  window.masarPlannerNextQuote = function () {
    var p = PL();
    p.qi = (p.qi + 1) % 97;
    try { save(); } catch (e) {}
    var q = document.getElementById('plannerQuote');
    if (q) q.textContent = '« ' + currentQuote() + ' »';
  };
  window.plannerNextQuote = window.masarPlannerNextQuote;

  function renderPlanner() {
    var body = document.getElementById('plannerBody');
    if (!body) return;
    var p = PL(), m = p.mode, meta = MODE_META[m] || MODE_META.daily;

    Array.prototype.forEach.call(document.querySelectorAll('#plannerTabs .ptab'), function (b) {
      b.classList.toggle('active', b.dataset.pm === m);
      if (b.dataset.masarBound !== '1') {
        b.dataset.masarBound = '1';
        b.addEventListener('click', function () { setPlannerMode(b.dataset.pm); });
      }
    });

    var items = p.items[m] || [];
    var head = '<div class="pt-head"><div class="pt-title">' + meta.t + '</div><div class="btn-row" style="margin:0">' +
      '<button class="btn primary" style="padding:9px 16px" onclick="masarPlannerAdd(\'' + m + '\')">➕ إضافة صف</button>' +
      '<button class="chip" onclick="masarPlannerPreset(\'' + m + '\')">✨ جدول جاهز</button>' +
      (items.length ? '<button class="chip" onclick="masarPlannerClear(\'' + m + '\')">🧹 تفريغ</button>' : '') +
      '</div></div><p class="mini" style="margin-bottom:10px">' + meta.hint + '</p>';

    var rows = '';
    if (m === 'daily') {
      rows = '<table class="pt-table"><thead><tr><th style="width:110px">الوقت</th><th>المهمة / الحصة</th><th style="width:130px"></th></tr></thead><tbody>';
      items.forEach(function (it, i) {
        rows += '<tr class="' + (it.done ? 'pt-done' : '') + '">' +
          '<td><input class="pt-cell" data-pl-k="time" data-pl-i="' + i + '" value="' + esc2(it.time || '') + '" placeholder="07:30" dir="ltr" style="text-align:center"></td>' +
          '<td><input class="pt-cell" data-pl-k="text" data-pl-i="' + i + '" value="' + esc2(it.text || '') + '" placeholder="مثال: مراجعة الرياضيات"></td>' +
          '<td style="text-align:left;white-space:nowrap"><button class="chip" onclick="masarPlannerToggle(\'' + m + '\',' + i + ')" title="إنجاز">' + (it.done ? '↺' : '✓') + '</button>' +
          '<button class="pt-row-del" onclick="masarPlannerDel(\'' + m + '\',' + i + ')" title="حذف">🗑</button></td></tr>';
      });
      rows += '</tbody></table>';
    } else if (m === 'weekly') {
      rows = '<table class="pt-table"><thead><tr><th style="width:120px">اليوم</th><th style="width:100px">الوقت</th><th>المهمة</th><th style="width:130px"></th></tr></thead><tbody>';
      items.forEach(function (it, i) {
        var opts = DAYS.map(function (d) { return '<option value="' + d + '"' + (it.day === d ? ' selected' : '') + '>' + d + '</option>'; }).join('');
        rows += '<tr class="' + (it.done ? 'pt-done' : '') + '">' +
          '<td><select class="pt-cell" data-pl-k="day" data-pl-i="' + i + '">' + opts + '</select></td>' +
          '<td><input class="pt-cell" data-pl-k="time" data-pl-i="' + i + '" value="' + esc2(it.time || '') + '" placeholder="16:00" dir="ltr" style="text-align:center"></td>' +
          '<td><input class="pt-cell" data-pl-k="text" data-pl-i="' + i + '" value="' + esc2(it.text || '') + '" placeholder="مثال: مراجعة الفيزياء"></td>' +
          '<td style="text-align:left;white-space:nowrap"><button class="chip" onclick="masarPlannerToggle(\'' + m + '\',' + i + ')" title="إنجاز">' + (it.done ? '↺' : '✓') + '</button>' +
          '<button class="pt-row-del" onclick="masarPlannerDel(\'' + m + '\',' + i + ')" title="حذف">🗑</button></td></tr>';
      });
      rows += '</tbody></table>';
    } else {
      rows = '<table class="pt-table"><thead><tr><th style="width:90px">التاريخ</th><th>المهمة</th><th style="width:130px"></th></tr></thead><tbody>';
      items.forEach(function (it, i) {
        rows += '<tr class="' + (it.done ? 'pt-done' : '') + '">' +
          '<td><input class="pt-cell" data-pl-k="day" data-pl-i="' + i + '" value="' + esc2(it.day || '') + '" placeholder="1" dir="ltr" style="text-align:center"></td>' +
          '<td><input class="pt-cell" data-pl-k="text" data-pl-i="' + i + '" value="' + esc2(it.text || '') + '" placeholder="مثال: تسليم مشروع العلوم"></td>' +
          '<td style="text-align:left;white-space:nowrap"><button class="chip" onclick="masarPlannerToggle(\'' + m + '\',' + i + ')" title="إنجاز">' + (it.done ? '↺' : '✓') + '</button>' +
          '<button class="pt-row-del" onclick="masarPlannerDel(\'' + m + '\',' + i + ')" title="حذف">🗑</button></td></tr>';
      });
      rows += '</tbody></table>';
    }
    if (!items.length) rows = '<div class="pt-empty">جدولك فارغ — اضغط «➕ إضافة صف» أو «✨ جدول جاهز» للبدء.</div>';

    body.innerHTML = head + rows;
    bindPlannerInputs();

    var q = document.getElementById('plannerQuote');
    if (q) q.textContent = '« ' + currentQuote() + ' »';
  }
  window.masarRenderPlanner = renderPlanner;

  /* ================= 3) مهام اليوم: زر حذف ================= */
  function renderTasksX() {
    var l = document.getElementById('taskList');
    if (!l) return;
    l.innerHTML = '';
    var arr = (S.tasks || []);
    if (!arr.length) l.innerHTML = '<div class="li">لا مهام بعد — أضف أول مهمة</div>';
    arr.forEach(function (x, i) {
      var d = document.createElement('div');
      d.className = 'task' + (x.done ? ' done' : '');
      var sp = document.createElement('span');
      sp.innerHTML = (x.done ? '✅' : '⬜') + ' ' + String(x.text == null ? '' : x.text).replace(/</g, '&lt;');
      d.appendChild(sp);
      var acts = document.createElement('div');
      acts.className = 'task-acts';
      var b = document.createElement('button');
      b.className = 'btn ' + (x.done ? 'ghost' : 'primary');
      b.style.padding = '8px 14px';
      b.textContent = x.done ? 'إلغاء' : 'تم إنجاز المهمة ✅';
      b.onclick = function () {
        x.done = !x.done;
        try { save(); } catch (e) {}
        window.renderTasks();
        if (x.done) { try { toast('🎉 أحسنت! تم إنجاز المهمة'); checkTasksDone(); } catch (e) {} }
      };
      var del = document.createElement('button');
      del.className = 'task-x';
      del.textContent = '🗑 حذف';
      del.title = 'حذف هذه المهمة نهائياً';
      del.onclick = function () {
        if (!confirm('حذف المهمة: «' + x.text + '» ؟')) return;
        S.tasks.splice(i, 1);
        try { save(); } catch (e) {}
        window.renderTasks();
        try { toast('🗑 حُذفت المهمة'); } catch (e) {}
      };
      acts.appendChild(b);
      acts.appendChild(del);
      d.appendChild(acts);
      l.appendChild(d);
    });
    try { if (typeof taskAlerts === 'function') taskAlerts(); } catch (e) {}
  }
  window.renderTasks = renderTasksX;

  /* ================= 4) ربط قسم «جدولي الخاص» بالقائمة ================= */
  function ensurePlannerSection() {
    if (!S || typeof S !== 'object') return;
    if (!S.ui || !Array.isArray(S.ui.secs)) return;
    var has = S.ui.secs.some(function (x) { return x && x.k === 'planner'; });
    if (!has) {
      var idx = -1;
      S.ui.secs.forEach(function (x, i) { if (x && x.k === 'tasks') idx = i; });
      var obj = { k: 'planner', i: '🗒️', t: 'جدولي الخاص', g: 0, show: true, roles: [], lock: false };
      if (idx >= 0) S.ui.secs.splice(idx + 1, 0, obj); else S.ui.secs.push(obj);
      try { save(); } catch (e) {}
    }
    try { if (window.mnRenderNav) window.mnRenderNav(); } catch (e) {}
  }

  /* ================= 5) الإقلاع ================= */
  function boot2() {
    try { bindTaps(); } catch (e) {}
    try { bindGateLogin(); } catch (e) {}
    try { wrapSecurity(); } catch (e) {}
    try { ensurePlannerSection(); } catch (e) {}
    try { if (typeof titles !== 'undefined') titles.planner = 'جدولي الخاص'; } catch (e) {}
    try { if (typeof S !== 'undefined' && S && S.ui) S.ui.secs.forEach(function (x) { if (x && x.k === 'planner' && typeof titles !== 'undefined') titles.planner = x.t; }); } catch (e) {}
    try { if (document.getElementById('s-planner') && document.getElementById('s-planner').classList.contains('active')) renderPlanner(); } catch (e) {}
  }

  var _go = window.go;
  window.go = function (s) {
    if (typeof _go === 'function') { try { _go(s); } catch (e) {} }
    if (s === 'planner') { try { renderPlanner(); } catch (e) {} }
    if (s === 'tasks') { try { renderTasksX(); } catch (e) {} }
    try {
      var t = document.getElementById('pgTitle');
      if (t && S.ui && Array.isArray(S.ui.secs)) {
        S.ui.secs.forEach(function (x) { if (x && x.k === s && x.t) t.textContent = x.t; });
      }
      if (t && s === 'planner') t.textContent = 'جدولي الخاص';
    } catch (e) {}
  };

  var _applyRoleUI = window.applyRoleUI;
  window.applyRoleUI = function () {
    if (typeof _applyRoleUI === 'function') { try { _applyRoleUI.apply(null, arguments); } catch (e) {} }
    try { bindTaps(); bindGateLogin(); } catch (e) {}
  };

  boot2();
  window.addEventListener('load', function () {
    boot2();
    setTimeout(boot2, 300);
    setTimeout(boot2, 1200);
    setTimeout(function () {
      try {
        var cur = document.querySelector('.section.active');
        if (cur && cur.id === 's-planner') renderPlanner();
      } catch (e) {}
    }, 900);
  });
  if (window.MC) {
    var _onS2 = MC.onState;
    MC.onState = function () {
      if (typeof _onS2 === 'function') { try { _onS2.apply(null, arguments); } catch (e) {} }
      try { ensurePlannerSection(); renderPlanner(); } catch (e) {}
    };
  }
})();
