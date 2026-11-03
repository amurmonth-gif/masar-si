/* MASAR — masar-cloud.js */
/* ================= MASAR v4 — الإقلاع ================= */
/* ================= MASAR v4 — محرّك التزامن السحابي ================= */
/* يعمل بوضعين:
   1) Firebase (حقيقي) — املأ FB_CONFIG بالمفاتيح وكل تعديل يظهر فوراً لدى الجميع.
   2) وضع العرض (demo) — localStorage + BroadcastChannel: تحديث فوري بين كل نوافذ/أجهزة المتصفح نفسه. */
var MC = (function () {
  'use strict';

  /* ============ 1) إعدادات Firebase — ضع مفاتيحك هنا ============ */
  var FB_CONFIG = {
    apiKey: "PASTE_API_KEY",
    authDomain: "PASTE_PROJECT.firebaseapp.com",
    projectId: "PASTE_PROJECT",
    storageBucket: "PASTE_PROJECT.appspot.com",
    messagingSenderId: "PASTE_SENDER_ID",
    appId: "PASTE_APP_ID"
  };
  var FB_VER = "10.12.2";
  var FB_ON = !!FB_CONFIG.apiKey && FB_CONFIG.apiKey.indexOf("PASTE") !== 0;

  var STATE_DOC = "apps/masar/state";        // مسار مستند الحالة الكامل
  var USERS = "masar_users";                  // حسابات الدخول
  var LOOKUP = "masar_lookup";                // اسم المستخدم → البريد

  var KEY_STATE = "MASAR_CLOUD_STATE";
  var KEY_USERS = "MASAR_CLOUD_USERS";
  var CH = "masar-live";

  var api = {
    mode: FB_ON ? "firebase" : "demo",
    ready: false,
    online: false,
    lastSync: 0,
    log: [],
    curSec: "dash",
    applying: false,
    user: null,          // {uid,email,name,role,username,subjects,grade}
    fb: null
  };
  var listeners = [];
  var bc = null;
  var writeTimer = null;
  var pending = false;

  /* ============ أدوات ============ */
  function nowStr() { return new Date().toLocaleTimeString("ar-OM", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); }
  function addLog(t, kind) {
    api.log.unshift({ t: t, k: kind || "i", at: nowStr() });
    if (api.log.length > 120) api.log.pop();
    if (api.onLog) try { api.onLog(); } catch (e) {}
  }
  function deep(v) { return JSON.parse(JSON.stringify(v)); }
  function uid() { return "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  /* ============ تجزئة كلمة المرور (وضع العرض فقط) ============ */
  var fallbackHash = function (p) {
    var s = unescape(encodeURIComponent(p)), h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return "d1:" + (h >>> 0).toString(16) + ":" + s.length;
  };
  function hashPass(p) {
    if (window.crypto && window.crypto.subtle) {
      return crypto.subtle.digest("SHA-256", new TextEncoder().encode("masar|" + p)).then(function (b) {
        return "s256:" + Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
      });
    }
    return Promise.resolve(fallbackHash(p));
  }

  /* ============ 2) وضع العرض: localStorage + BroadcastChannel ============ */
  var Demo = {
    init: function () {
      try { bc = new BroadcastChannel(CH); } catch (e) { bc = null; }
      if (bc) {
        bc.onmessage = function (ev) {
          var d = ev.data || {};
          if (d.t === "state" && d.by !== api.sid) { addLog("⇩ تحديث سحابي وارد من جهاز آخر", "in"); push(d.state); }
          if (d.t === "users") { api._uTick = Date.now(); if (api.onUsers) try { api.onUsers(); } catch (e) {} }
        };
      }
      window.addEventListener("storage", function (e) {
        if (e.key === KEY_STATE && e.newValue) {
          try { var o = JSON.parse(e.newValue); if (o.by !== api.sid) { addLog("⇩ تحديث وارد (تبويب آخر)", "in"); push(o.state); } } catch (er) {}
        }
        if (e.key === KEY_USERS && api.onUsers) { try { api.onUsers(); } catch (er2) {} }
      });
      api.sid = "w" + Math.random().toString(36).slice(2, 8);
      return Promise.resolve();
    },
    getState: function () {
      try { var o = JSON.parse(localStorage.getItem(KEY_STATE) || "null"); return Promise.resolve(o ? o.state : null); } catch (e) { return Promise.resolve(null); }
    },
    setState: function (state) {
      var payload = { state: deep(state), at: Date.now(), by: api.sid };
      try { localStorage.setItem(KEY_STATE, JSON.stringify(payload)); } catch (e) { addLog("⚠ تعذّر الحفظ المحلي (المساحة ممتلئة)", "e"); }
      if (bc) try { bc.postMessage({ t: "state", by: api.sid, state: deep(state) }); } catch (e) {}
      return Promise.resolve();
    },
    getUsers: function () {
      try { return Promise.resolve(JSON.parse(localStorage.getItem(KEY_USERS) || "[]")); } catch (e) { return Promise.resolve([]); }
    },
    setUsers: function (arr) {
      try { localStorage.setItem(KEY_USERS, JSON.stringify(arr)); } catch (e) {}
      if (bc) try { bc.postMessage({ t: "users" }); } catch (e) {}
      return Promise.resolve();
    }
  };

  /* ============ 3) وضع Firebase (v10 modular عبر CDN) ============ */
  var Fb = {
    _q: function (n) { return import("https://www.gstatic.com/firebasejs/" + FB_VER + "/firebase-" + n + ".js"); },
    init: async function () {
      var appMod = await Fb._q("app");
      var fsMod = await Fb._q("firestore");
      var auMod = await Fb._q("auth");
      var app = appMod.initializeApp(FB_CONFIG);
      var db = fsMod.initializeFirestore(app, { ignoreUndefinedProperties: true });
      try { await fsMod.enableNetwork(db); } catch (e) {}
      var auth = auMod.getAuth(app);
      Fb.appMod = appMod; Fb.fsMod = fsMod; Fb.auMod = auMod;
      Fb.app = app; Fb.db = db; Fb.auth = auth;
      api.fb = Fb;
      return Fb;
    },
    getState: async function () {
      var r = await Fb.fsMod.getDoc(Fb.fsMod.doc(Fb.db, "apps", "masar", "state", "main"));
      return r.exists() ? r.data().state : null;
    },
    setState: async function (state) {
      var o = { state: deep(state), at: Date.now(), by: (api.user && api.user.uid) || "anon", byName: (api.user && api.user.name) || "" };
      await Fb.fsMod.setDoc(Fb.fsMod.doc(Fb.db, "apps", "masar", "state", "main"), o, { merge: true });
    },
    watch: function (cb) {
      Fb.fsMod.onSnapshot(Fb.fsMod.doc(Fb.db, "apps", "masar", "state", "main"), function (snap) {
        if (!snap.exists()) return;
        var d = snap.data() || {};
        var me = (api.user && api.user.uid) || "";
        if (d.by && d.by === me && !d.force) { api.lastSync = Date.now(); return; }
        addLog("⇩ تحديث سحابي وارد" + (d.byName ? " من " + d.byName : ""), "in");
        push(d.state);
      }, function (err) { addLog("⚠ خطأ في المزامنة: " + err.code, "e"); });
    },
    getUsers: async function () {
      var s = await Fb.fsMod.getDocs(Fb.fsMod.collection(Fb.db, USERS));
      var a = []; s.forEach(function (d) { a.push(Object.assign({ id: d.id }, d.data())); }); return a;
    },
    setUser: async function (u) {
      var id = u.id || uid();
      var c = Object.assign({}, u); delete c.id;
      await Fb.fsMod.setDoc(Fb.fsMod.doc(Fb.db, USERS, id), c, { merge: true });
      if (u.username && u.email) {
        await Fb.fsMod.setDoc(Fb.fsMod.doc(Fb.db, LOOKUP, String(u.username).toLowerCase().trim()),
          { email: u.email, uid: id }, { merge: true });
      }
      return id;
    },
    delUser: async function (u) {
      if (u.id) await Fb.fsMod.deleteDoc(Fb.fsMod.doc(Fb.db, USERS, u.id));
      if (u.username) { try { await Fb.fsMod.deleteDoc(Fb.fsMod.doc(Fb.db, LOOKUP, String(u.username).toLowerCase())); } catch (e) {} }
    },
    findEmail: async function (username) {
      var r = await Fb.fsMod.getDoc(Fb.fsMod.doc(Fb.db, LOOKUP, String(username).toLowerCase().trim()));
      return r.exists() ? r.data().email : null;
    },
    signIn: async function (email, pass) {
      return await Fb.auMod.signInWithEmailAndPassword(Fb.auth, email, pass);
    },
    createAuthUser: async function (email, pass) {
      // تطبيق ثانوي حتى لا يُطرد المالك من جلسته
      var name = "sec" + Math.random().toString(36).slice(2, 7);
      var app2 = Fb.appMod.initializeApp(FB_CONFIG, name);
      try {
        var a2 = Fb.auMod.getAuth(app2);
        var cred = await Fb.auMod.createUserWithEmailAndPassword(a2, email, pass);
        var id = cred.user.uid;
        await Fb.auMod.signOut(a2);
        return id;
      } finally { try { await Fb.appMod.deleteApp(app2); } catch (e) {} }
    },
    signOut: async function () { try { await Fb.auMod.signOut(Fb.auth); } catch (e) {} }
  };

  /* ============ 4) الحالة والمزامنة ============ */
  function push(state) {
    if (!state || typeof state !== "object") return;
    api.applying = true;
    try {
      S = state;
      try { localStorage.setItem("MASAR_V3", JSON.stringify(S)); } catch (e) {}
      api.lastSync = Date.now();
      renderAll();
      if (api.onState) try { api.onState(state); } catch (e) {}
    } finally { setTimeout(function () { api.applying = false; }, 60); }
  }

  function renderAll() {
    try { renderDash(); } catch (e) {}
    try { renderSchedule(); } catch (e) {}
    try { renderTasks(); } catch (e) {}
    try { renderSummaries(); } catch (e) {}
    try { renderCity(); } catch (e) {}
    try { renderPlats(); renderAds(); } catch (e) {}
    try { renderTiers(); } catch (e) {}
    try { renderFaith(); } catch (e) {}
    try { renderRoles(); } catch (e) {}
    try { render(api.curSec); } catch (e) {}
    try { paintCloudChip(); } catch (e) {}
  }
  api.refreshAll = renderAll;

  function pushState() {
    if (api.applying) return;
    pending = false;
    var snap = deep(S);
    (FB_ON ? Fb.setState(snap) : Demo.setState(snap)).then(function () {
      api.lastSync = Date.now(); api.online = true; paintCloudChip();
    }).catch(function (e) {
      api.online = false; addLog("⚠ فشل الرفع السحابي: " + (e.code || e.message || e), "e"); paintCloudChip();
    });
  }

  function queuePush() {
    if (api.applying) return;
    pending = true; paintCloudChip();
    clearTimeout(writeTimer);
    writeTimer = setTimeout(pushState, 450);
  }
  api.queuePush = queuePush;

  /* ============ 5) الإقلاع ============ */
  api.boot = async function () {
    try {
      if (FB_ON) { await Fb.init(); addLog("☁ متصل بـ Firebase: " + FB_CONFIG.projectId, "ok"); }
      else { await Demo.init(); addLog("◈ وضع العرض المحلي (بدون مفاتيح Firebase)", "w"); }
      api.ready = true; api.online = true;

      var remote = FB_ON ? await Fb.getState() : await Demo.getState();
      if (remote && remote.vision) {
        S = remote;
        try { localStorage.setItem("MASAR_V3", JSON.stringify(S)); } catch (e) {}
        addLog("⇩ حُمّلت الحالة السحابية (" + Object.keys(remote).length + " مفتاحاً)", "in");
        renderAll();
      } else {
        addLog("↑ رفع الحالة الأولى إلى السحابة", "up");
        pushState();
      }
      if (FB_ON) Fb.watch();

      // الاستماع لحالة تسجيل الدخول في Firebase
      if (FB_ON) {
        Fb.auMod.onAuthStateChanged(Fb.auth, async function (u) {
          if (!u) { if (api.user && api.user.role !== "guest") { api.user = null; } return; }
          var all = await Fb.getUsers();
          var me = all.find(function (x) { return x.id === u.uid || x.email === u.email; });
          if (me) { api.user = me; api.user.uid = me.id || u.uid; afterLogin(); }
        });
      }
      paintCloudChip();
    } catch (e) {
      api.ready = true; api.online = false;
      addLog("⚠ تعذّر الاتصال بالخدمة السحابية — تم التحويل للوضع المحلي: " + (e.message || e), "e");
      try { await Demo.init(); var st = await Demo.getState(); if (st && st.vision) { S = st; renderAll(); } } catch (e2) {}
      paintCloudChip();
    }
    return api;
  };

  function afterLogin() {
    document.body.classList.toggle("staff", ["owner", "admin", "teacher"].indexOf(api.user && api.user.role) >= 0);
    try { applyRoleUI(); } catch (e) {}
    try { renderRoles(); } catch (e) {}
    try { paintCloudChip(); } catch (e) {}
    if (api.onAuth) try { api.onAuth(api.user); } catch (e) {}
  }
  api.afterLogin = afterLogin;

  /* ============ 6) الحسابات ============ */
  function seedAccountsFromData() {
    // ترحيل حسابات المعلمين/الطلاب الموجودة في الملف إلى سجل الحسابات (وضع العرض فقط)
    return Demo.getUsers().then(function (arr) {
      if (arr && arr.length) return arr;
      var out = [];
      (S.teachers || []).forEach(function (t) {
        out.push({ id: uid(), name: t.name, username: t.user, email: (t.email || (t.user + "@masar.om")), role: "teacher", subjects: t.subjects || [], grade: "", passHash: null, plain: t.pass || "" });
      });
      (S.students || []).forEach(function (t) {
        out.push({ id: uid(), name: t.name, username: t.user, email: (t.email || (t.user + "@masar.om")), role: "student", grade: t.grade || "10", subjects: [], passHash: null, plain: t.pass || "", phone: t.phone || "" });
      });
      // تجزئة كلمات المرور القديمة
      return Promise.all(out.map(function (u) {
        var p = u.plain; delete u.plain;
        return hashPass(p).then(function (h) { u.passHash = h; return u; });
      })).then(function (list) { return Demo.setUsers(list).then(function () { return list; }); });
    });
  }

  api.listUsers = async function () {
    if (FB_ON) return await Fb.getUsers();
    return await Demo.getUsers();
  };

  api.saveUser = async function (u) {
    if (FB_ON) { var id = await Fb.setUser(u); u.id = id; addLog("💾 حُفظ حساب " + u.username + " (" + u.role + ")", "ok"); return u; }
    var arr = await Demo.getUsers();
    var i = arr.findIndex(function (x) { return x.id === u.id || (x.username && u.username && x.username === u.username); });
    if (!u.id) u.id = uid();
    if (i >= 0) arr[i] = Object.assign(arr[i], u); else arr.push(u);
    await Demo.setUsers(arr);
    addLog("💾 حُفظ حساب " + u.username + " (" + u.role + ")", "ok");
    return u;
  };

  api.delUser = async function (u) {
    if (FB_ON) { await Fb.delUser(u); addLog("🗑 حُذف حساب " + u.username, "e"); return; }
    var arr = await Demo.getUsers();
    await Demo.setUsers(arr.filter(function (x) { return x.id !== u.id && x.username !== u.username; }));
    addLog("🗑 حُذف حساب " + u.username, "e");
  };

  api.createAccount = async function (o) {
    // o: {name,email,username,password,role,subjects,grade,phone}
    var users = await api.listUsers();
    if (users.some(function (x) { return String(x.username).toLowerCase() === String(o.username).toLowerCase(); }))
      throw new Error("اسم المستخدم مستخدم مسبقاً");
    if (users.some(function (x) { return String(x.email).toLowerCase() === String(o.email).toLowerCase(); }))
      throw new Error("البريد مستخدم مسبقاً");
    var acc = {
      id: uid(), name: o.name, email: o.email, username: o.username, role: o.role,
      subjects: o.subjects || [], grade: o.grade || "", phone: o.phone || "",
      created: Date.now(), by: (api.user && api.user.username) || "owner", active: true
    };
    if (FB_ON) {
      var realId = await Fb.createAuthUser(o.email, o.password);
      acc.id = realId;
      await Fb.setUser(acc);
    } else {
      acc.passHash = await hashPass(o.password);
      var arr = await Demo.getUsers(); arr.push(acc); await Demo.setUsers(arr);
    }
    addLog("➕ أُنشئ حساب " + o.username + " — " + o.role, "ok");
    return acc;
  };

  api.changePassword = async function (u, newPass) {
    if (FB_ON) { throw new Error("في وضع Firebase تُغيَّر كلمة المرور من وحدة تحكم Firebase أو عبر إعادة تعيين بالبريد"); }
    var arr = await Demo.getUsers();
    var i = arr.findIndex(function (x) { return x.id === u.id; });
    if (i < 0) throw new Error("الحساب غير موجود");
    arr[i].passHash = await hashPass(newPass);
    await Demo.setUsers(arr);
    addLog("🔑 تغيّرت كلمة مرور " + u.username, "ok");
  };

  api.login = async function (idf, pass) {
    var users = await api.listUsers();
    var q = String(idf).toLowerCase().trim();
    var u = users.find(function (x) {
      return (x.email && String(x.email).toLowerCase() === q) || (x.username && String(x.username).toLowerCase() === q);
    });
    if (!u) throw new Error("لا يوجد حساب بهذا البريد أو اسم المستخدم");
    if (u.active === false) throw new Error("هذا الحساب موقوف — راجع مالك التطبيق");

    if (FB_ON) {
      var email = u.email;
      if (q.indexOf("@") < 0) email = await Fb.findEmail(q);
      if (!email) throw new Error("تعذّر إيجاد بريد الحساب");
      await Fb.signIn(email, pass);
    } else {
      var h = await hashPass(pass);
      if (u.passHash !== h && u.passHash !== fallbackHash(pass)) throw new Error("كلمة المرور غير صحيحة");
    }
    api.user = u;
    afterLogin();
    addLog("✅ دخول: " + u.name + " (" + u.role + ")", "ok");
    return u;
  };

  api.logout = async function () {
    if (FB_ON) await Fb.signOut();
    api.user = null;
    document.body.classList.remove("staff");
    try { sessionStorage.removeItem("m_role"); sessionStorage.removeItem("m_owner"); sessionStorage.removeItem("m_child"); sessionStorage.removeItem("m_name"); } catch (e) {}
    try { $('#loginBtn').textContent = 'تسجيل الدخول'; $('#loginBtn').classList.remove('logged'); } catch (e) {}
    try { applyRoleUI(); go('dash'); } catch (e) {}
    addLog("🚪 تسجيل خروج", "w");
    if (api.onAuth) try { api.onAuth(null); } catch (e) {}
  };

  api.ownerExists = async function () {
    var arr = await api.listUsers();
    return arr.some(function (x) { return x.role === "owner"; });
  };

  api.can = function (what) {
    var r = (api.user && api.user.role) || "guest";
    var map = {
      editAll: ["owner"], manageUsers: ["owner"],
      editContent: ["owner", "admin"], editSummaries: ["owner", "admin", "teacher"],
      viewAdmin: ["owner", "admin"], viewTeacher: ["owner", "teacher"]
    };
    return (map[what] || []).indexOf(r) >= 0;
  };

  api.roleName = function (r) {
    return { owner: "المالك", admin: "الإدارة", teacher: "معلم", student: "طالب", parent: "ولي أمر", guest: "زائر" }[r || ""] || "زائر";
  };

  api.uid = uid; api.hashPass = hashPass; api.FB_ON = FB_ON; api.FB_CONFIG = FB_CONFIG;
  api.seedAccountsFromData = seedAccountsFromData;
  api.addLog = addLog;
  return api;
})();
window.MC = MC;

/* ============ شريحة السحابة ============ */
function paintCloudChip() {
  var el = document.getElementById('mcChip');
  if (!el) return;
  var cls = 'mc-chip', txt = '';
  if (!MC.ready) { cls += ' busy'; txt = '☁ جارٍ الاتصال…'; }
  else if (MC.mode === 'demo') { cls += ' warn'; txt = '◈ وضع العرض — تزامن المتصفح'; }
  else if (!MC.online) { cls += ' err'; txt = '⚠ غير متصل — إعادة محاولة'; }
  else { cls += ' ok'; txt = '☁ متزامن حيّ'; }
  el.className = cls;
  el.innerHTML = '<span class="mc-dot"></span>' + txt;
  el.title = 'آخر مزامنة: ' + (MC.lastSync ? new Date(MC.lastSync).toLocaleTimeString('ar-OM') : '—') + ' — اضغط لسجل المزامنة';
}

/* ============ ربط زر الحفظ السحابي ============ */
(function () {
  var _save = window.save;
  window.save = function () {
    try { localStorage.setItem('MASAR_V3', JSON.stringify(S)); } catch (e) {}
    if (window.MC && !MC.applying) MC.queuePush();
  };
})();

/* ================= MASAR v4 — واجهة الدخول والأدوار ================= */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ---------- فتح/غلق شاشة الدخول ---------- */
  var overlay = function () { return document.getElementById('authOverlay'); };
  function openAuth(tab) {
    var o = overlay(); if (!o) return;
    o.classList.add('open'); document.body.classList.add('no-scroll');
    setTab(tab || 'mail');
    setTimeout(function () { var f = document.getElementById('auEmail'); if (f) try { f.focus(); } catch (e) {} }, 120);
  }
  function closeAuth() {
    var o = overlay(); if (!o) return;
    o.classList.remove('open'); document.body.classList.remove('no-scroll');
  }
  function setTab(t) {
    $$('#authTabs button').forEach(function (b) { b.classList.toggle('on', b.dataset.at === t); });
    $$('.auth-pane').forEach(function (p) { p.classList.remove('on'); });
    var pane = document.getElementById('ap-' + t); if (pane) pane.classList.add('on');
  }
  function msg(t, ok) {
    var el = document.getElementById('authMsg'); if (!el) return;
    el.className = 'auth-msg show ' + (ok ? 'ok' : 'err'); el.textContent = t;
  }
  function clearMsg() { var el = document.getElementById('authMsg'); if (el) el.className = 'auth-msg'; }

  MC.openAuth = openAuth; MC.closeAuth = closeAuth;

  /* ---------- تطبيق الدور على الواجهة ---------- */
  function renderRoles() {
    var u = MC.user || null;
    var r = u ? u.role : '';
    try {
      if (r) sessionStorage.setItem('m_role', r); else sessionStorage.removeItem('m_role');
      if (u) sessionStorage.setItem('m_name', u.name || u.username || ''); else sessionStorage.removeItem('m_name');
      if (u && u.role === 'owner') sessionStorage.setItem('m_owner', '1');
      if (u && u.role === 'teacher') sessionStorage.setItem('m_teach_subj', JSON.stringify(u.subjects || []));
      if (u && u.role === 'student') sessionStorage.setItem('m_child', u.name || '');
    } catch (e) {}
    try { applyRoleUI(); } catch (e) {}
    var btn = document.getElementById('loginBtn');
    if (btn) {
      if (u) { btn.textContent = u.name || u.username; btn.classList.add('logged'); }
      else { btn.textContent = 'تسجيل الدخول'; btn.classList.remove('logged'); }
    }
    var av = document.getElementById('avatar');
    if (av) av.textContent = u ? (u.role === 'owner' ? '👑' : (u.name || 'م').trim()[0]) : 'م';
    var chip = document.getElementById('mcWho');
    if (chip) {
      chip.textContent = u ? (u.name + ' · ' + MC.roleName(u.role)) : 'لم تسجّل الدخول';
    }
  }
  window.renderRoles = renderRoles;

  /* ---------- إخفاء عناصر لوحة المالك عن غير المالك ---------- */
  var _applyRoleUI = window.applyRoleUI;
  window.applyRoleUI = function () {
    try { _applyRoleUI(); } catch (e) {}
    var isOwner = MC.user && MC.user.role === 'owner';
    var canContent = MC.user && (MC.user.role === 'owner' || MC.user.role === 'admin');
    $$('[data-mc-owner]').forEach(function (el) { el.style.display = isOwner ? '' : 'none'; });
    $$('[data-mc-content]').forEach(function (el) { el.style.display = canContent ? '' : 'none'; });
    var ob = document.getElementById('ownerBtn');
    if (ob) ob.style.display = isOwner ? '' : 'none';
  };

  /* ---------- الدخول ---------- */
  function doLogin(idf, pass, from) {
    clearMsg();
    if (!idf || !pass) { msg('أدخل البريد/اسم المستخدم وكلمة المرور'); return; }
    var btns = $$('.button-submit, #auSubmit2'); btns.forEach(function (b) { b.disabled = true; });
    MC.login(idf, pass).then(function (u) {
      msg('تم الدخول — أهلاً ' + (u.name || u.username) + ' 👋', true);
      renderRoles();
      setTimeout(function () {
        closeAuth();
        try { go(u.role === 'owner' ? 'owner' : u.role === 'admin' ? 'admin' : u.role === 'teacher' ? 'teacher' : u.role === 'parent' ? 'parents' : 'students'); } catch (e) {}
        try { toast('✅ أهلاً ' + (u.name || u.username) + ' — ' + MC.roleName(u.role)); } catch (e) {}
      }, 500);
    }).catch(function (e) {
      msg('❌ ' + (e.message || e.code || 'تعذّر الدخول'));
      MC.addLog('✖ فشل دخول: ' + (e.code || e.message), 'e');
    }).then(function () { btns.forEach(function (b) { b.disabled = false; }); });
  }

  function guest() {
    MC.user = { uid: 'guest', role: 'guest', name: 'زائر', email: '', username: 'guest' };
    renderRoles(); closeAuth();
    try { toast('👋 دخلت كزائر — سجّل دخولك لحفظ بياناتك وتمييزها'); } catch (e) {}
  }

  /* ---------- الإقلاع ---------- */
  function boot() {
    var o = overlay(); if (!o) return;

    document.getElementById('authClose').onclick = closeAuth;
    o.addEventListener('click', function (e) { if (e.target === o) closeAuth(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && o.classList.contains('open')) closeAuth(); });

    $$('#authTabs button').forEach(function (b) { b.onclick = function () { setTab(b.dataset.at); clearMsg(); }; });

    document.getElementById('authMailForm').addEventListener('submit', function (e) {
      e.preventDefault();
      doLogin(($('#auEmail').value || '').trim(), $('#auPass').value || '');
    });
    document.getElementById('authUserForm').addEventListener('submit', function (e) {
      e.preventDefault();
      doLogin(($('#auUser').value || '').trim(), $('#auPass2').value || '');
    });
    document.getElementById('auGuest1').onclick = guest;
    document.getElementById('auSignup').onclick = function () {
      msg('التسجيل الذاتي مغلق — اطلب من مالك التطبيق إنشاء حسابك (مستخدم + كلمة مرور).');
    };
    document.getElementById('auForgot').onclick = function () {
      msg('لإعادة تعيين كلمة المرور: تواصل مع مالك التطبيق — هو من يحدد كلمات المرور من منطقة القيادة.');
    };
    document.getElementById('auOwner').onclick = function () {
      setTab('mail');
      msg('دخول المالك بنفس البريد وكلمة المرور الخاصة به — ثم يفتح الموقع «منطقة القيادة» تلقائياً.');
    };

    // زر الدخول في الشريط العلوي
    var lb = document.getElementById('loginBtn');
    if (lb) lb.onclick = function () { if (MC.user && MC.user.role !== 'guest') { openAcct(); } else { openAuth('mail'); } };

    // زر المالك 👑
    var ob = document.getElementById('ownerBtn');
    if (ob) ob.onclick = function () {
      if (MC.user && MC.user.role === 'owner') { go('owner'); return; }
      openAuth('mail'); msg('سجّل دخول المالك — البريد وكلمة المرور اللذان أنشأتهما في التهيئة.');
    };

    // Avatar
    var av = document.getElementById('avatar');
    if (av) av.onclick = openAcct;

    // الشريحة
    var chip = document.getElementById('mcChip');
    if (chip) chip.onclick = cloudLog;

    // زر الملخص العائم
    var fab = document.getElementById('mcFab');
    if (fab) fab.onclick = function () { openSummEditor(null); };

    // إغلاق أي زر يفتح نماذج الإدارة القديمة → يوجّه لشاشة الدخول
    var eAdmin = document.getElementById('eAdmin'), eT = document.getElementById('eTeacher'),
      eP = document.getElementById('eParent'), eS = document.getElementById('eStudent');
    if (eAdmin) eAdmin.onclick = function () { if (MC.can('viewAdmin')) go('admin'); else { openAuth('user'); msg('دخول الإدارة بحساب المستخدم وكلمة المرور اللذين حددهما المالك'); } };
    if (eT) eT.onclick = function () { if (MC.can('viewTeacher')) go('teacher'); else { openAuth('user'); msg('دخول المعلمين باسم المستخدم وكلمة المرور الخاصين بك'); } };
    if (eP) eP.onclick = function () { if (MC.user && MC.user.role === 'parent') go('parents'); else { openAuth('user'); msg('دخول أولياء الأمور بحساب المستخدم وكلمة المرور'); } };
    if (eS) eS.onclick = function () { if (MC.user && MC.user.role === 'student') go('students'); else { openAuth('user'); msg('دخول الطلاب بحساب المستخدم وكلمة المرور'); } };

    // استبدال نماذج الدخول القديمة
    var drl = document.getElementById('doRoleLogin');
    if (drl) drl.onclick = function () {
      var u = (($('#roleUser') && $('#roleUser').value) || '').trim();
      var p = (($('#rolePass') && $('#rolePass').value) || '').trim();
      if (!u || !p) { try { toast('⚠️ أدخل اسم المستخدم وكلمة المرور'); } catch (e) {} return; }
      MC.login(u, p).then(function (acc) {
        renderRoles(); try { closeModal('roleModal'); } catch (e) {}
        var r = acc.role;
        go(r === 'owner' ? 'owner' : r === 'admin' ? 'admin' : r === 'teacher' ? 'teacher' : r === 'parent' ? 'parents' : 'students');
        try { toast('✅ أهلاً ' + acc.name); } catch (e) {}
      }).catch(function (e) { try { toast('❌ ' + (e.message || 'بيانات غير صحيحة')); } catch (er) {} });
    };
    var dol = document.getElementById('doOwnerLogin');
    if (dol) dol.onclick = function () {
      var u = (($('#ownerUser') && $('#ownerUser').value) || '').trim();
      var p = (($('#ownerPass') && $('#ownerPass').value) || '').trim();
      MC.login(u, p).then(function (acc) {
        if (acc.role !== 'owner') { try { toast('❌ هذا الحساب ليس حساب مالك'); } catch (e) {} return; }
        renderRoles(); try { closeModal('ownerModal'); } catch (e) {} go('owner');
        try { toast('👑 أهلاً ' + acc.name + ' — التحكم المطلق'); } catch (e) {}
      }).catch(function (e) { try { toast('❌ ' + (e.message || 'بيانات غير صحيحة')); } catch (er) {} });
    };

    // العودة من تسجيل الخروج
    var _logoutAll = window.logoutAll;
    window.logoutAll = function async() {
      MC.logout().then(function () { renderRoles(); openAuth('mail'); });
    };
  }

  /* ---------- حسابي ---------- */
  function openAcct() {
    var b = document.getElementById('acctBody');
    if (!b) return;
    var u = MC.user;
    if (!u) { b.innerHTML = '<p class="mini">لم تسجّل الدخول بعد.</p>'; }
    else {
      b.innerHTML =
        '<div class="li"><span>الاسم</span><b>' + esc(u.name) + '</b></div>' +
        '<div class="li"><span>الدور</span><b>' + MC.roleName(u.role) + '</b></div>' +
        '<div class="li"><span>اسم المستخدم</span><b dir="ltr">' + esc(u.username) + '</b></div>' +
        '<div class="li"><span>البريد</span><b dir="ltr">' + esc(u.email || '—') + '</b></div>' +
        (u.role === 'teacher' ? '<div class="li"><span>المواد</span><b>' + esc((u.subjects || []).join('، ') || '—') + '</b></div>' : '') +
        (u.role === 'student' ? '<div class="li"><span>الصف</span><b>' + esc(u.grade || '—') + '</b></div>' : '') +
        '<div class="li"><span>حالة السحابة</span><b>' + (MC.mode === 'firebase' ? 'Firebase حيّ' : 'وضع العرض') + '</b></div>';
    }
    try { openModal('acctModal'); } catch (e) {}
  }
  MC.openAcct = openAcct;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  window.mcEsc = esc;

  /* ---------- سجل السحابة ---------- */
  function cloudLog() {
    var m = document.getElementById('cloudLogModal');
    if (!m) {
      m = document.createElement('div');
      m.className = 'modal'; m.id = 'cloudLogModal';
      m.innerHTML = '<div class="modal-card wide"><button class="x-btn" onclick="closeModal(\'cloudLogModal\')">✕</button>' +
        '<h3>☁ حالة المزامنة السحابية</h3>' +
        '<div class="btn-row" style="margin:8px 0 12px"><span class="mc-badge" id="clMode"></span><span class="mc-badge" id="clTime"></span></div>' +
        '<div class="mc-log" id="clLog"></div>' +
        '<p class="mini" style="margin-top:10px" id="clHint"></p>' +
        '<div class="btn-row"><button class="btn primary" onclick="MC.queuePush();toast(\'↑ جارٍ الرفع\')">↑ رفع الحالة الآن</button>' +
        '<button class="btn ghost" onclick="MC.refreshAll();toast(\'↻ حُدّثت الواجهة\')">↻ تحديث الواجهة</button></div></div>';
      document.body.appendChild(m);
    }
    paint();
    try { openModal('cloudLogModal'); } catch (e) {}
  }
  function paint() {
    var mo = document.getElementById('clMode'); if (!mo) return;
    mo.className = 'mc-badge ' + (MC.mode === 'firebase' ? 'g' : 'y');
    mo.textContent = MC.mode === 'firebase' ? 'Firebase · تزامن حقيقي' : 'وضع العرض · تزامن المتصفح';
    document.getElementById('clTime').textContent = 'آخر مزامنة: ' + (MC.lastSync ? new Date(MC.lastSync).toLocaleTimeString('ar-OM') : '—');
    document.getElementById('clLog').textContent = (MC.log || []).map(function (l) { return l.at + '  ' + l.t; }).join('\n') || 'لا سجلات بعد';
    document.getElementById('clHint').innerHTML = MC.mode === 'firebase'
      ? 'المزامنة تعمل عبر Firestore — كل تعديل يُرفع ويظهر فوراً عند جميع المستخدمين عبر onSnapshot.'
      : 'لوضع التزامن الحقيقي عبر الأجهزة: افتح <b>منطقة القيادة ← ☁ السحابة</b> وضع مفاتيح مشروع Firebase الخاص بك. حالياً كل شيء يعمل ويُحفظ ويُزامَن بين نوافذ المتصفح نفسه.';
  }
  MC.paintCloudLog = paint;

  /* ---------- شاشة تهيئة المالك ---------- */
  function bootOwner() {
    // v6: لا تُعرض شاشة «إنشاء حساب المالك» إطلاقاً — الموقع يفتح مباشرة.
    MC.ownerExists().then(function (exists) {
      if (exists) { afterBoot(); return; }
      // تهيئة صامتة لحساب المالك في الخلفية (للتمكن من الدخول لاحقاً من زر «تسجيل الدخول»)
      var u = (typeof S !== 'undefined' && S && S.ownerUser) ? S.ownerUser : 'mu3th';
      var p = (typeof S !== 'undefined' && S && S.ownerPass) ? S.ownerPass : 'masar76208';
      return MC.createAccount({ name: 'مالك مسار', email: u + '@masar.om', username: u, password: p, role: 'owner' })
        .catch(function () {})
        .then(function () { afterBoot(); });
    }).catch(function () { afterBoot(); });
  }
  function afterBoot() {
    // الترحيب/الجلسة
    // v6: الدخول مباشرة إلى الواجهة — لا نافذة دخول تلقائية عند الفتح
    try { sessionStorage.setItem('masar_gate', '1'); } catch (e) {}
    renderRoles();
    if (MC.onLog) MC.onLog();
  }

  window.mcBootOwner = bootOwner;
  window.mcAfterBoot = afterBoot;

  document.addEventListener('DOMContentLoaded', boot);
  if (document.readyState !== 'loading') setTimeout(boot, 0);

  // ربط زر التهيئة
  setTimeout(function () {
    var g = document.getElementById('btGo');
    if (!g) return;
    g.onclick = function () {
      var n = ($('#btName').value || '').trim(), e = ($('#btEmail').value || '').trim(), p = $('#btPass').value || '';
      if (!n || !e || !p) { alert('أكمل الحقول الثلاثة'); return; }
      if (p.length < 6) { alert('كلمة المرور 6 أحرف على الأقل'); return; }
      MC.createAccount({ name: n, email: e, username: e.split('@')[0], password: p, role: 'owner' })
        .then(function (acc) { return MC.login(e, p); })
        .then(function () { renderRoles(); try { closeModal('bootModal'); } catch (er) {} go('owner'); toast('👑 أُنشئ حساب المالك — أنت الآن في منطقة القيادة'); afterBoot(); })
        .catch(function (er) { alert('تعذّر: ' + (er.message || er)); });
    };
  }, 400);
})();

/* ================= MASAR v4 — الملخصات في كل مكان + منطقة القيادة ================= */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var uid = function () { return 'sm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); };

  /* ---------- مواضع ظهور الملخصات ---------- */
  var PLACES = [
    { k: 'dash', t: '🏠 الرئيسية' },
    { k: 'sched', t: '🗓️ منظّم المذاكرة' },
    { k: 'tasks', t: '✅ مهام اليوم' },
    { k: 'faith', t: '🌱 الجرعة الإيمانية' },
    { k: 'summ', t: '📚 مكتبة الملخصات' },
    { k: 'ai', t: '🤖 المساعد الذكي' },
    { k: 'subs', t: '💎 الاشتراكات' },
    { k: 'city', t: '🏙️ مدينة مسار' },
    { k: 'studyland', t: '🎮 مسار سيتي' },
    { k: 'plat', t: '🇴🇲 المنصات' },
    { k: 'school', t: '🏫 بوابة المدرسة' },
    { k: 'students', t: '🎓 بوابة الطالب' },
    { k: 'parents', t: '👨‍👩‍👧 لوحة ولي الأمر' },
    { k: 'teacher', t: '👩‍🏫 لوحة المعلم' },
    { k: 'admin', t: '🛡️ لوحة الإدارة' }
  ];
  function placeName(k) { var p = PLACES.find(function (x) { return x.k === k; }); return p ? p.t : k; }

  /* ---------- ترقية عناصر الملخصات القديمة ---------- */
  function normalize() {
    (S.summaries || []).forEach(function (x) {
      if (!x.id) x.id = uid();
      if (typeof x.body !== 'string') x.body = '';
      if (!Array.isArray(x.places)) x.places = (x.grade === 'all') ? ['summ', 'city'] : ['summ'];
      if (x.grade == null) x.grade = '10';
    });
  }

  /* ---------- تنسيق نص الملخص ---------- */
  function fmt(body) {
    if (!body) return '<span class="mini">لا يوجد نص — افتح الرابط أو أضف شرحاً من المحرر.</span>';
    return esc(body)
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .split('\n').map(function (l) {
        if (/^#{1,3}\s+/.test(l)) return '<h4 style="color:var(--gold);margin:10px 0 4px;font-size:.92rem">' + l.replace(/^#{1,3}\s+/, '') + '</h4>';
        if (/^[-•]\s+/.test(l)) return '<div style="padding-right:14px;position:relative"><span style="position:absolute;right:0;color:var(--gold)">•</span>' + l.replace(/^[-•]\s+/, '') + '</div>';
        if (!l.trim()) return '<div style="height:8px"></div>';
        return '<div>' + l + '</div>';
      }).join('');
  }

  /* ---------- بطاقة ملخص ---------- */
  function card(x, compact) {
    var d = document.createElement('div');
    d.className = 'panel';
    d.style.margin = '0';
    d.style.padding = '13px 15px';
    var staff = window.MC && MC.can('editSummaries');
    var head = '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start;flex-wrap:wrap">' +
      '<div><b style="font-size:.9rem">📄 ' + esc(x.title) + '</b>' +
      '<div class="mini" style="margin-top:3px">' + esc(x.subject) + ' · ' + (x.grade === 'all' ? 'كل الصفوف' : 'الصف ' + esc(x.grade)) +
      (x.by ? ' · ' + esc(x.by) : '') + '</div></div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
      '<button class="chip" data-act="view">قراءة</button>' +
      (x.url ? '<a class="chip" href="' + esc(x.url) + '" target="_blank" rel="noopener">الملف</a>' : '') +
      (staff ? '<button class="chip" data-act="edit">✏️</button><button class="chip" data-act="del">🗑</button>' : '') +
      '</div></div>';
    d.innerHTML = head;
    if (!compact && x.body) {
      var p = document.createElement('div');
      p.className = 'mini';
      p.style.cssText = 'margin-top:9px;line-height:1.95;max-height:86px;overflow:hidden;color:var(--dim)';
      p.innerHTML = fmt(x.body);
      d.appendChild(p);
    }
    d.querySelector('[data-act="view"]').onclick = function () { viewSumm(x.id); };
    if (staff) {
      d.querySelector('[data-act="edit"]').onclick = function () { openSummEditor(x.id); };
      d.querySelector('[data-act="del"]').onclick = function () {
        if (!confirm('حذف الملخص «' + x.title + '»؟')) return;
        S.summaries = S.summaries.filter(function (y) { return y.id !== x.id; });
        save(); afterEdit('🗑 حُذف ملخص');
      };
    }
    return d;
  }

  function afterEdit(msg) {
    try { renderSummaries(); } catch (e) {}
    try { fillSlots(); } catch (e) {}
    try { renderMCContent(); } catch (e) {}
    try { toast(msg || '✅ تم'); } catch (e) {}
  }

  /* ---------- عارض الملخص ---------- */
  window.viewSumm = function (id) {
    var x = (S.summaries || []).find(function (y) { return y.id === id; });
    if (!x) return;
    var t = document.getElementById('svTitle'), m = document.getElementById('svMeta'),
      b = document.getElementById('svBody'), a = document.getElementById('svActs');
    if (!t) return;
    t.textContent = x.title;
    m.textContent = x.subject + ' · ' + (x.grade === 'all' ? 'كل الصفوف' : 'الصف ' + x.grade);
    b.innerHTML = fmt(x.body);
    a.innerHTML = '';
    if (x.url) {
      var l = document.createElement('a'); l.className = 'btn primary'; l.href = x.url; l.target = '_blank'; l.rel = 'noopener';
      l.textContent = '🔗 فتح الملف الأصلي'; a.appendChild(l);
    }
    if (window.MC && MC.can('editSummaries')) {
      var e = document.createElement('button'); e.className = 'btn ghost'; e.textContent = '✏️ تعديل';
      e.onclick = function () { try { closeModal('summViewModal'); } catch (er) {} openSummEditor(x.id); }; a.appendChild(e);
    }
    try { openModal('summViewModal'); } catch (er) {}
  };

  /* ---------- محرر الملخص ---------- */
  var editingId = null;
  window.openSummEditor = function (id) {
    if (window.MC && !MC.can('editSummaries')) { try { toast('🔒 هذا الإجراء للمالك والإدارة والمعلمين'); } catch (e) {} return; }
    editingId = id || null;
    var x = id ? (S.summaries || []).find(function (y) { return y.id === id; }) : null;
    var selS = document.getElementById('seSubject'); selS.innerHTML = '';
    (S.subjects || []).forEach(function (s) { var o = document.createElement('option'); o.value = s; o.textContent = s; selS.appendChild(o); });
    var selP = document.getElementById('seSlot'); selP.innerHTML = '';
    PLACES.forEach(function (p) {
      var o = document.createElement('option'); o.value = p.k; o.textContent = p.t;
      selP.appendChild(o);
    });
    selP.multiple = true;
    selP.size = 6;
    selP.style.minHeight = '120px';

    document.getElementById('seTitle').textContent = x ? '✏️ تعديل الملخص' : '📄 ملخص جديد';
    document.getElementById('seGrade').value = x ? x.grade : (sessionStorage.getItem('m_grade') || '10');
    if (x && x.subject) selS.value = x.subject;
    document.getElementById('seName').value = x ? x.title : '';
    document.getElementById('seBody').value = x ? (x.body || '') : '';
    document.getElementById('seUrl').value = x ? (x.url || '') : '';
    var pl = x ? (x.places || ['summ']) : ['summ'];
    Array.prototype.forEach.call(selP.options, function (o) { o.selected = pl.indexOf(o.value) >= 0; });
    var by = window.MC && MC.user ? MC.user.name : '';
    try { openModal('summEditModal'); } catch (e) {}
  };

  window.saveSummFromEditor = function () {
    var g = document.getElementById('seGrade').value;
    var subj = document.getElementById('seSubject').value;
    var title = (document.getElementById('seName').value || '').trim();
    var body = document.getElementById('seBody').value || '';
    var url = (document.getElementById('seUrl').value || '').trim();
    var sel = document.getElementById('seSlot');
    var places = Array.prototype.filter.call(sel.options, function (o) { return o.selected; }).map(function (o) { return o.value; });
    if (!title) { alert('اكتب عنوان الملخص'); return; }
    if (!places.length) places = ['summ'];
    var by = (window.MC && MC.user) ? MC.user.name : 'المالك';
    if (editingId) {
      var x = S.summaries.find(function (y) { return y.id === editingId; });
      Object.assign(x, { grade: g, subject: subj, title: title, body: body, url: url, places: places, by: by, at: Date.now() });
    } else {
      S.summaries.unshift({ id: uid(), grade: g, subject: subj, title: title, body: body, url: url, places: places, by: by, at: Date.now() });
    }
    save();
    try { closeModal('summEditModal'); } catch (e) {}
    afterEdit('☁ حُفظ الملخص وظهر فوراً في: ' + places.map(placeName).join('، '));
  };

  /* ---------- مكتبة الملخصات المحسّنة ---------- */
  window.renderSummaries = function () {
    try { renderGradeBtns('gradeBtns', 'm_grade'); } catch (e) {}
    var g = sessionStorage.getItem('m_grade') || '10';
    var box = document.getElementById('summList');
    if (!box) return;
    box.innerHTML = '';
    var staff = window.MC && MC.can('editSummaries');
    var bar = document.createElement('div');
    bar.className = 'btn-row';
    bar.style.marginBottom = '10px';
    if (staff) {
      var b = document.createElement('button');
      b.className = 'btn primary'; b.style.padding = '9px 16px';
      b.textContent = '➕ إضافة ملخص لهذا الصف';
      b.onclick = function () { openSummEditor(null); };
      bar.appendChild(b);
    }
    (S.grades || [10, 11, 12]).forEach(function (gg) {
      var link = (S.driveLinks || {})['g' + gg] || S.drive;
      var a = document.createElement('a');
      a.className = 'chip'; a.href = link; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = '🗂️ مجلد Drive — الصف ' + gg;
      bar.appendChild(a);
    });
    box.appendChild(bar);

    var items = (S.summaries || []).filter(function (x) { return x.grade === g || x.grade === 'all'; });
    if (!items.length) {
      var e = document.createElement('div');
      e.className = 'li';
      e.textContent = 'لا ملخصات لهذا الصف بعد — أضف أول ملخص أو افتح مجلد Drive.';
      box.appendChild(e);
    }
    items.forEach(function (x) { box.appendChild(card(x)); });
  };

  /* ---------- حقن مواضع الملخصات في كل الصفحات ---------- */
  function fillSlots() {
    PLACES.forEach(function (p) {
      var sec = document.getElementById('s-' + p.k);
      if (!sec) return;
      var host = sec.querySelector('.mc-slot[data-slot="' + p.k + '"]');
      if (!host) {
        host = document.createElement('div');
        host.className = 'mc-slot';
        host.dataset.slot = p.k;
        host.style.marginTop = '16px';
        sec.appendChild(host);
      }
      var items = (S.summaries || []).filter(function (x) { return (x.places || []).indexOf(p.k) >= 0 && (x.grade === 'all' || x.grade === (sessionStorage.getItem('m_grade') || '10')); });
      if (!items.length) { host.innerHTML = ''; host.style.display = 'none'; return; }
      host.style.display = '';
      var staff = window.MC && MC.can('editSummaries');
      var head = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap">' +
        '<div style="font-weight:800;font-size:.86rem;color:var(--gold)">📄 ملخصات في هذا القسم <span class="mc-badge y">' + items.length + '</span></div>' +
        (staff ? '<button class="chip" data-slot-add="' + p.k + '">➕ أضف ملخصاً هنا</button>' : '') + '</div>';
      host.innerHTML = head + '<div class="mc-slot-grid"></div>';
      var grid = host.querySelector('.mc-slot-grid');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:11px';
      items.forEach(function (x) { grid.appendChild(card(x, true)); });
      var add = host.querySelector('[data-slot-add]');
      if (add) add.onclick = function () {
        openSummEditor(null);
        setTimeout(function () {
          var sel = document.getElementById('seSlot');
          if (sel) Array.prototype.forEach.call(sel.options, function (o) { o.selected = (o.value === p.k); });
        }, 60);
      };
    });
  }
  window.fillSlots = fillSlots;

  /* ---------- ربط الملخصات السريعة ---------- */
  setTimeout(function () {
    var s = document.getElementById('seSave');
    if (s) s.onclick = function (e) { e.preventDefault(); window.saveSummFromEditor(); };
  }, 600);

  /* ================= منطقة القيادة: تبويبات جديدة ================= */
  function addOwnerPanes() {
    var tabs = document.getElementById('ownerTabs');
    if (!tabs || document.getElementById('tab-mcusers')) return;
    var mk = function (id, label, panedata) {
      var b = document.createElement('button');
      b.className = 'tab-btn'; b.dataset.ot = panedata; b.id = 'tab-' + id; b.textContent = label;
      return b;
    };
    tabs.appendChild(mk('mcsumm', '🧾 الملخصات والمواضع', 'mcsumm'));
    tabs.appendChild(mk('mcusers', '👥 حسابات الدخول', 'mcusers'));
    tabs.appendChild(mk('mccloud', '☁️ السحابة والمزامنة', 'mccloud'));

    var wrap = tabs.parentNode;
    ['mcsumm', 'mcusers', 'mccloud'].forEach(function (k) {
      var d = document.createElement('div');
      d.id = 'ot-' + k; d.className = 'owner-pane'; d.style.display = 'none';
      wrap.appendChild(d);
    });

    // إعادة ربط التبويبات (تشمل الجديدة)
    $$('#ownerTabs .tab-btn').forEach(function (b) {
      b.onclick = function () {
        $$('#ownerTabs .tab-btn').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        $$('.owner-pane').forEach(function (p) { p.style.display = 'none'; });
        var pane = document.getElementById('ot-' + b.dataset.ot);
        if (pane) pane.style.display = '';
        if (b.dataset.ot === 'mcsumm') renderMCContent();
        if (b.dataset.ot === 'mcusers') renderMCUsers();
        if (b.dataset.ot === 'mccloud') renderMCCloud();
      };
    });
  }

  /* ---------- تبويب: الملخصات والمواضع ---------- */
  function renderMCContent() {
    var box = document.getElementById('ot-mcsumm');
    if (!box) return;
    var rows = (S.summaries || []).map(function (x) {
      return '<div class="mc-summ-head"><div><b>' + esc(x.title) + '</b><div class="mini">' + esc(x.subject) + ' · ' +
        (x.grade === 'all' ? 'كل الصفوف' : 'الصف ' + esc(x.grade)) + ' · ' + (x.places || []).map(placeName).join(' ← ') + '</div></div>' +
        '<div class="mc-acts"><button class="mc-act" onclick="openSummEditor(\'' + x.id + '\')">✏️ تعديل</button>' +
        '<button class="mc-act" onclick="viewSumm(\'' + x.id + '\')">👁 عرض</button>' +
        '<button class="mc-act del" onclick="mcDelSumm(\'' + x.id + '\')">🗑</button></div></div>';
    }).join('');
    var placeRows = PLACES.map(function (p) {
      var n = (S.summaries || []).filter(function (x) { return (x.places || []).indexOf(p.k) >= 0; }).length;
      return '<div class="li"><span>' + p.t + '</span><span class="mc-badge ' + (n ? 'g' : 'y') + '">' + n + ' ملخص</span></div>';
    }).join('');
    box.innerHTML =
      '<div class="panel"><div class="mc-hero"><div><h3>🧾 الملخصات — تظهر حيث تريد</h3>' +
      '<p>أضف ملخصاً واختر «مكان الظهور» — يمكن اختيار أكثر من صفحة، فيظهر الملخص فيها جميعاً فوراً عند كل المستخدمين. النص الطويل مدعوم (سطر جديد لكل فكرة، <b>**عريض**</b>، <b># عنوان</b>، <b>- نقطة</b>).</p></div>' +
      '<button class="btn primary" onclick="openSummEditor(null)">➕ ملخص جديد</button></div>' +
      '<div class="list-box" style="max-height:430px">' + (rows || '<div class="li">لا ملخصات بعد — أضف الأول</div>') + '</div></div>' +
      '<div class="panel"><h4>📍 توزيع الملخصات على الصفحات</h4><div class="list-box" style="max-height:300px">' + placeRows + '</div>' +
      '<p class="mini">كل ملخص يحمل قائمة صفحات مستقلة، لذا يظهر في أكثر من مكان في نفس الوقت دون تكرار البيانات.</p></div>' +
      '<div class="panel"><h4>🗂️ مجلدات Drive لكل صف</h4>' +
      '<div class="field"><label>مجلد عام</label><input id="mcDrive" dir="ltr" value="' + esc(S.drive || '') + '"></div>' +
      '<div class="mc-grid2"><div class="field"><label>الصف 10</label><input id="mcG10" dir="ltr" value="' + esc((S.driveLinks || {}).g10 || '') + '"></div>' +
      '<div class="field"><label>الصف 11</label><input id="mcG11" dir="ltr" value="' + esc((S.driveLinks || {}).g11 || '') + '"></div>' +
      '<div class="field"><label>الصف 12</label><input id="mcG12" dir="ltr" value="' + esc((S.driveLinks || {}).g12 || '') + '"></div></div>' +
      '<div class="btn-row"><button class="btn primary" onclick="mcSaveDrive()">💾 حفظ المجلدات</button></div></div>';
  }
  window.mcDelSumm = function (id) {
    var x = (S.summaries || []).find(function (y) { return y.id === id; });
    if (!x || !confirm('حذف «' + x.title + '»؟')) return;
    S.summaries = S.summaries.filter(function (y) { return y.id !== id; });
    save(); afterEdit('🗑 حُذف الملخص'); renderMCContent();
  };
  window.mcSaveDrive = function () {
    S.drive = (document.getElementById('mcDrive').value || '').trim();
    S.driveLinks = {
      g10: (document.getElementById('mcG10').value || '').trim() || S.drive,
      g11: (document.getElementById('mcG11').value || '').trim() || S.drive,
      g12: (document.getElementById('mcG12').value || '').trim() || S.drive
    };
    save(); afterEdit('💾 حُفظت روابط المجلدات');
  };

  /* ---------- تبويب: حسابات الدخول ---------- */
  function chipSubjects(val) {
    return (S.subjects || []).map(function (s) {
      var on = (val || []).indexOf(s) >= 0;
      return '<label class="mini" style="white-space:nowrap;display:inline-flex;gap:4px;align-items:center;margin:2px 4px 2px 0">' +
        '<input type="checkbox" class="mc-sub" value="' + esc(s) + '"' + (on ? ' checked' : '') + '>' + esc(s) + '</label>';
    }).join('');
  }
  var usersCache = [];
  function renderMCUsers() {
    var box = document.getElementById('ot-mcusers');
    if (!box) return;
    box.innerHTML = '<div class="panel"><p class="mini">جارٍ تحميل الحسابات…</p></div>';
    MC.listUsers().then(function (list) {
      usersCache = list || [];
      var rows = usersCache.map(function (u, i) {
        return '<div class="mc-summ-head" style="flex-wrap:wrap">' +
          '<div style="display:flex;gap:7px;flex-wrap:wrap;flex:1">' +
          '<input data-usr="name" data-i="' + i + '" value="' + esc(u.name) + '" placeholder="الاسم" style="min-width:110px">' +
          '<input data-usr="username" data-i="' + i + '" dir="ltr" value="' + esc(u.username) + '" placeholder="username" style="min-width:100px">' +
          '<input data-usr="email" data-i="' + i + '" dir="ltr" value="' + esc(u.email || '') + '" placeholder="email" style="min-width:150px">' +
          '<select data-usr="role" data-i="' + i + '">' +
          ['owner', 'admin', 'teacher', 'student', 'parent'].map(function (r) {
            return '<option value="' + r + '"' + (u.role === r ? ' selected' : '') + '>' + MC.roleName(r) + '</option>';
          }).join('') + '</select>' +
          '<select data-usr="grade" data-i="' + i + '">' + ['10', '11', '12'].map(function (g) {
            return '<option value="' + g + '"' + (u.grade === g ? ' selected' : '') + '>الصف ' + g + '</option>';
          }).join('') + '</select>' +
          '<label class="mini"><input type="checkbox" data-usr="active" data-i="' + i + '"' + (u.active !== false ? ' checked' : '') + '> مفعّل</label>' +
          '</div>' +
          '<div class="mc-acts">' +
          '<button class="mc-act" onclick="mcSaveUser(' + i + ')">💾</button>' +
          '<button class="mc-act" onclick="mcPassUser(' + i + ')">🔑 كلمة المرور</button>' +
          '<button class="mc-act del" onclick="mcDropUser(' + i + ')">🗑</button>' +
          '</div>' +
          (u.role === 'teacher' ? '<div style="flex:1 0 100%;margin-top:6px">' + chipSubjects(u.subjects) + '</div>' : '') +
          '</div>';
      }).join('');

      box.innerHTML =
        '<div class="panel"><div class="mc-hero"><div><h3>👥 حسابات الدخول</h3><p>أنت وحدك من ينشئ حسابات الإدارة والمعلمين والطلاب، بمستخدم وكلمة مرور تحددها أنت. لا يوجد تسجيل ذاتي في الموقع.</p></div>' +
        '<span class="mc-badge ' + (MC.mode === 'firebase' ? 'g' : 'y') + '">' + (MC.mode === 'firebase' ? 'Firebase Auth' : 'وضع العرض') + '</span></div>' +
        '<div class="list-box" style="max-height:400px">' + (rows || '<div class="li">لا حسابات بعد</div>') + '</div></div>' +

        '<div class="panel"><h4>➕ إنشاء حساب جديد</h4>' +
        '<div class="mc-grid2">' +
        '<div class="field"><label>الاسم الكامل</label><input id="nuName" placeholder="مثال: سالم بن علي"></div>' +
        '<div class="field"><label>البريد الإلكتروني</label><input id="nuEmail" dir="ltr" placeholder="user@masar.om"></div>' +
        '<div class="field"><label>اسم المستخدم</label><input id="nuUser" dir="ltr" placeholder="salem"></div>' +
        '<div class="field"><label>كلمة المرور</label><input id="nuPass" dir="ltr" value="' + Math.random().toString(36).slice(2, 8) + '"></div>' +
        '<div class="field"><label>الدور</label><select id="nuRole"><option value="admin">الإدارة</option><option value="teacher" selected>معلم</option><option value="student">طالب</option><option value="parent">ولي أمر</option><option value="owner">مالك</option></select></div>' +
        '<div class="field"><label>الصف (للطلاب)</label><select id="nuGrade"><option value="10">الصف 10</option><option value="11">الصف 11</option><option value="12">الصف 12</option></select></div>' +
        '</div>' +
        '<div class="field"><label>مواد المعلم (اختياري)</label><div id="nuSubs" style="max-height:110px;overflow:auto;border:1px solid var(--line);border-radius:11px;padding:8px">' + chipSubjects([]) + '</div></div>' +
        '<div class="btn-row"><button class="btn primary" onclick="mcAddUser()">➕ إنشاء الحساب</button>' +
        '<button class="btn ghost" onclick="renderMCUsers()">↻ تحديث</button></div>' +
        '<p class="mini">' + (MC.mode === 'firebase'
          ? 'في Firebase: يُنشأ الحساب في Firebase Auth عبر تطبيق ثانوي حتى لا تُطرد من جلستك، ثم يُسجَّل دوره في Firestore.'
          : 'وضع العرض: كلمة المرور تُخزَّن مُجزَّأة (SHA-256) داخل المتصفح — وليست نصاً صريحاً داخل الملف.') + '</p></div>';
    });
  }
  window.renderMCUsers = renderMCUsers;

  window.mcAddUser = function () {
    var name = (document.getElementById('nuName').value || '').trim();
    var email = (document.getElementById('nuEmail').value || '').trim();
    var username = (document.getElementById('nuUser').value || '').trim();
    var pass = document.getElementById('nuPass').value || '';
    var role = document.getElementById('nuRole').value;
    var grade = document.getElementById('nuGrade').value;
    var subs = $$('#nuSubs .mc-sub').filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    if (!name || !username || !pass) { alert('أكمل الاسم واسم المستخدم وكلمة المرور'); return; }
    if (!email) email = username + '@masar.om';
    if (pass.length < 6) { alert('كلمة المرور 6 أحرف على الأقل'); return; }
    MC.createAccount({ name: name, email: email, username: username, password: pass, role: role, subjects: subs, grade: grade })
      .then(function () {
        // مزامنة الحساب مع قوائم الملف (المعلمين/الطلاب) ليعمل كل شيء
        if (role === 'teacher') {
          S.teachers = S.teachers || [];
          if (!S.teachers.some(function (t) { return t.user === username; }))
            S.teachers.push({ name: name, user: username, pass: '', subjects: subs, email: email });
        }
        if (role === 'student') {
          S.students = S.students || [];
          if (!S.students.some(function (t) { return t.user === username; }))
            S.students.push({ name: name, user: username, pass: '', grade: grade, phone: '', plan: 'مجاني', email: email });
        }
        save();
        toast('✅ أُنشئ حساب ' + username + ' — ' + MC.roleName(role));
        renderMCUsers();
      })
      .catch(function (e) { alert('تعذّر إنشاء الحساب: ' + (e.message || e.code || e)); });
  };

  window.mcSaveUser = function (i) {
    var u = usersCache[i]; if (!u) return;
    $$('[data-usr]').forEach(function (el) {
      if (+el.dataset.i !== i) return;
      var k = el.dataset.usr;
      if (k === 'active') u.active = el.checked; else u[k] = el.value;
    });
    var subs = $$('#ot-mcusers .mc-summ-head')[i];
    if (subs) {
      var boxes = subs.querySelectorAll('.mc-sub');
      if (boxes.length) u.subjects = Array.prototype.filter.call(boxes, function (c) { return c.checked; }).map(function (c) { return c.value; });
    }
    MC.saveUser(u).then(function () { toast('💾 حُفظ الحساب'); renderMCUsers(); })
      .catch(function (e) { alert('تعذّر الحفظ: ' + (e.message || e)); });
  };

  window.mcPassUser = function (i) {
    var u = usersCache[i]; if (!u) return;
    var p = prompt('كلمة مرور جديدة للمستخدم «' + u.username + '» (6 أحرف على الأقل):');
    if (!p) return;
    if (p.length < 6) { alert('كلمة المرور قصيرة'); return; }
    MC.changePassword(u, p).then(function () { toast('🔑 حُدّثت كلمة المرور'); })
      .catch(function (e) { alert('تعذّر: ' + (e.message || e)); });
  };

  window.mcDropUser = function (i) {
    var u = usersCache[i]; if (!u) return;
    if (u.role === 'owner' && MC.user && u.username === MC.user.username) { alert('لا يمكن حذف حسابك الحالي'); return; }
    if (!confirm('حذف حساب «' + u.username + '» نهائياً؟')) return;
    MC.delUser(u).then(function () { toast('🗑 حُذف الحساب'); renderMCUsers(); })
      .catch(function (e) { alert('تعذّر: ' + (e.message || e)); });
  };

  /* ---------- تبويب: السحابة ---------- */
  function renderMCCloud() {
    var box = document.getElementById('ot-mccloud');
    if (!box) return;
    var cfgNow = '';
    try { cfgNow = localStorage.getItem('MASAR_FB_CONFIG') || ''; } catch (e) {}
    if (!cfgNow) cfgNow = JSON.stringify(MC.FB_CONFIG, null, 2);
    box.innerHTML =
      '<div class="panel"><div class="mc-hero"><div><h3>☁️ التزامن السحابي المباشر</h3>' +
      '<p>الوضع الحالي: <b>' + (MC.mode === 'firebase' ? 'Firebase — تزامن حقيقي بين جميع الأجهزة' : 'وضع العرض — تزامن فوري بين نوافذ المتصفح نفسه') + '</b>. الموقع يعمل بالكامل الآن؛ لتفعيل التزامن بين كل الأجهزة أدخل مفاتيح مشروع Firebase ثم أعد التحميل.</p></div>' +
      '<span class="mc-chip ' + (MC.mode === 'firebase' ? 'ok' : 'warn') + '"><span class="mc-dot"></span>' + (MC.mode === 'firebase' ? 'متزامن حيّ' : 'وضع العرض') + '</span></div>' +
      '<div class="mc-stats">' +
      '<div class="mc-stat"><div class="n">' + (MC.mode === 'firebase' ? 'ON' : 'DEMO') + '</div><div class="l">وضع المزامنة</div></div>' +
      '<div class="mc-stat"><div class="n">' + (MC.lastSync ? new Date(MC.lastSync).toLocaleTimeString("ar-OM") : '—') + '</div><div class="l">آخر مزامنة</div></div>' +
      '<div class="mc-stat"><div class="n">' + (MC.log || []).length + '</div><div class="l">عمليات في السجل</div></div>' +
      '</div>' +
      '<div class="field"><label>مفاتيح مشروع Firebase (انسخها من إعدادات المشروع ← تطبيق ويب)</label>' +
      '<textarea class="mc-code" id="mcCfg">' + esc(cfgNow) + '</textarea></div>' +
      '<div class="btn-row"><button class="btn primary" onclick="mcSaveCfg()">💾 حفظ المفاتيح</button>' +
      '<button class="btn ghost" onclick="MC.queuePush();toast(\'↑ جارٍ رفع الحالة\')">↑ رفع الحالة الآن</button>' +
      '<button class="btn ghost" onclick="MC.refreshAll();fillSlots();toast(\'↻ حُدّثت الواجهة\')">↻ تحديث الواجهة</button></div>' +
      '<div class="mc-log" style="margin-top:12px">' + esc((MC.log || []).map(function (l) { return l.at + '  ' + l.t; }).join('\n') || 'لا سجلات') + '</div>' +
      '</div>' +
      '<div class="panel"><h4>🧭 خطوات التفعيل (5 دقائق)</h4>' +
      '<ol class="mini" style="line-height:2.2;padding-right:18px">' +
      '<li>افتح <span dir="ltr">console.firebase.google.com</span> ← أنشئ مشروعاً جديداً.</li>' +
      '<li>Authentication ← Sign-in method ← فعّل <b>Email/Password</b>.</li>' +
      '<li>Firestore Database ← Create database ← ابدأ بوضع الإنتاج ثم الصق قواعد <span dir="ltr">firestore.rules</span> المرفقة.</li>' +
      '<li>Project settings ← Your apps ← Web ← انسخ كائن <span dir="ltr">firebaseConfig</span> والصقه أعلاه واحفظ.</li>' +
      '<li>أعد تحميل الصفحة — ستتحول الشريحة إلى «متزامن حيّ» وكل تعديل يظهر فوراً عند الجميع بدون إعادة تحميل.</li>' +
      '</ol>' +
      '<p class="mini">ملاحظة: رفع ملفات PDF داخل الموقع يحتاج Firebase Storage (خطة Blaze). لذلك الملخصات هنا نص + رابط — تعمل مجاناً وبسرعة، وتقبل روابط Google Drive.</p></div>';
  }
  window.renderMCCloud = renderMCCloud;
  window.mcSaveCfg = function () {
    var txt = (document.getElementById('mcCfg').value || '').trim();
    try {
      var o = JSON.parse(txt);
      localStorage.setItem('MASAR_FB_CONFIG', JSON.stringify(o, null, 2));
      alert('حُفظت المفاتيح. أعد تحميل الصفحة لتفعيل التزامن الحقيقي.');
    } catch (e) { alert('الصيغة غير صحيحة — يجب أن تكون JSON صالحاً.'); }
  };

  /* ---------- ربط المحتوى بالواجهة ---------- */
  var _render = window.render;
  window.render = function (s) {
    if (typeof _render === 'function') _render(s);
    MC.curSec = s;
    try { fillSlots(); } catch (e) {}
  };
  var _go = window.go;
  window.go = function (s) {
    if (typeof _go === 'function') _go(s);
    MC.curSec = s;
    setTimeout(function () { try { fillSlots(); } catch (e) {} }, 30);
  };

  var _renderOwner = window.renderOwner;
  window.renderOwner = function () {
    if (typeof _renderOwner === 'function') _renderOwner();
    addOwnerPanes();
    renderMCContent();
    renderMCUsers();
    renderMCCloud();
  };

  /* ---------- الإقلاع ---------- */
  window.addEventListener('load', function () {
    normalize();
    addOwnerPanes();
    fillSlots();
    try { renderSummaries(); } catch (e) {}
    setTimeout(fillSlots, 900);
    setTimeout(normalize, 1500);
  });
  setTimeout(function () { try { normalize(); addOwnerPanes(); fillSlots(); } catch (e) {} }, 700);

  MC.onState = function () { normalize(); fillSlots(); };
  MC.onLog = function () { try { if (document.getElementById('ot-mccloud') && document.getElementById('ot-mccloud').style.display !== 'none') renderMCCloud(); } catch (e) {} };
})();

/* ---------- أيقونة احتياطية إن لم يوجد icon.png ---------- */
(function(){
  function fixIcons(){
    var svg = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%231C0B0E'/><text x='32' y='44' font-size='34' font-family='Cairo,Arial' font-weight='900' fill='%23D4A962' text-anchor='middle'>M</text></svg>");
    Array.prototype.forEach.call(document.querySelectorAll('img'), function(im){
      if (!/icon\.png/.test(im.getAttribute('src')||'')) return;
      im.addEventListener('error', function(){ im.src = svg; });
      if (im.complete && im.naturalWidth === 0) im.src = svg;
    });
  }
  fixIcons();
  var l = document.createElement('link'); l.rel='icon'; l.href="data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%231C0B0E'/><text x='32' y='44' font-size='34' font-family='Arial' font-weight='900' fill='%23D4A962' text-anchor='middle'>M</text></svg>");
  document.head.appendChild(l);
})();

/* ---------- تشغيل السحابة ثم بوابة الدخول ---------- */
function masarStart(){
  if (!window.MC) return setTimeout(masarStart, 60);
  MC.boot().then(function(){
    if (MC.mode === 'demo') { try { return MC.seedAccountsFromData(); } catch(e){} }
  }).then(function(){
    try { paintCloudChip(); } catch(e){}
    try { if (typeof normalizeSlots === 'function') normalizeSlots(); } catch(e){}
    try { fillSlots(); } catch(e){}
    try { paintCloudChip(); } catch(e){}
    try { mcBootOwner(); } catch(e){ mcAfterBoot(); }
  }).catch(function(e){
    console.warn('MASAR cloud boot:', e);
    try { mcAfterBoot(); } catch(er){}
  });
}
if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(masarStart, 120);
else window.addEventListener('load', function(){ setTimeout(masarStart, 120); });
