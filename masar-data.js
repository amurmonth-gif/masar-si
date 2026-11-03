/* MASAR — masar-data.js */
/* ================= MASAR v3 — البيانات والتخزين ================= */
const LS='MASAR_V3';
const SUBJECTS=['اللغة الإنجليزية','مهارات اللغة الإنجليزية','اللغة العربية','العلوم البيئية','التربية الإسلامية','الجغرافيا والتاريخ','الكيمياء','الفيزياء','الأحياء','الرياضيات الأساسية','الرياضيات المتقدمة','اللغة الألمانية','الرياضة المدرسية','الفنون التشكيلية','المهارات الموسيقية','التقنية','الدراسات'];
const DEF={
 vision:'إعداد جيل متمكن من مهارات المستقبل ومحافظ على الهوية العمانية',
 drive:'https://drive.google.com/drive/folders/1nRo6eylNgcosNipeqZiBJxlTx73rZD6G',
 driveLinks:{g10:'https://drive.google.com/drive/folders/1nRo6eylNgcosNipeqZiBJxlTx73rZD6G',g11:'https://drive.google.com/drive/folders/1nRo6eylNgcosNipeqZiBJxlTx73rZD6G',g12:'https://drive.google.com/drive/folders/1nRo6eylNgcosNipeqZiBJxlTx73rZD6G'},
 codes:{admin:'7979',teacher:'8989',parent:'5959'},
 ownerUser:'mu3th',ownerPass:'masar76208',
 wa:'96800000000',
 grades:[10,11,12],
 subjects:SUBJECTS,
 schedule:[
  {t:'07:30',s:'الرياضيات',r:'قاعة 12'},{t:'08:20',s:'اللغة العربية',r:'قاعة 7'},
  {t:'09:10',s:'الفيزياء',r:'مختبر 2'},{t:'10:20',s:'اللغة الإنجليزية',r:'قاعة 9'},
  {t:'11:10',s:'الكيمياء',r:'مختبر 1'},{t:'12:00',s:'التربية الإسلامية',r:'قاعة 5'}
 ],
 tasks:[],
 quotes:['النجاح مجموع جهود صغيرة تتكرر كل يوم.','لا تنتظر الإلهام، ابدأ والباقي يأتي.','من جدّ وجد، ومن زرع حصد.','اجعل هدفك أكبر من خوفك.','التقدم لا يحدث بالصدفة، بل بالجدول والالتزام.'],
 summaries:[
  {grade:'10',subject:'الرياضيات الأساسية',title:'ملخص الجبر والمتباينات',url:''},
  {grade:'11',subject:'الفيزياء',title:'ملخص الحركة والمتجهات',url:''},
  {grade:'12',subject:'الكيمياء',title:'ملخص الاتزان الكيميائي',url:''}
 ],
 adhkar:{
  morning:['أصبحنا وأصبح الملك لله، والحمد لله، لا شريك له.','اللهم بك أصبحنا وبك أمسينا وبك نحيا وإليك النشور.','أستغفر الله العظيم وأتوب إليه.'],
  evening:['أمسينا وأمسى الملك لله، والحمد لله، لا شريك له.','بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء.','آية الكرسي — حصناً حتى الصباح.'],
  duaa:['ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.','رب اشرح لي صدري ويسر لي أمري.','اللهم انفعني بما علمتني وزدني علماً.']
 },
 city:{name:'مسار',welcome:'أهلاً بك في مدينة مسار',desc:'مدينة الدراسة التفاعلية — تجوّل بين مبانيها: كل مبنى عالم من التعلم والتحدي.',buildings:[
  {icon:'🏰',name:'قلعة الرياضيات',desc:'حصّن مهاراتك في الأرقام والمعادلات.'},
  {icon:'📚',name:'مكتبة المعرفة',desc:'ملخصات جميع المواد في مكان واحد.'},
  {icon:'🔬',name:'مختبر العلوم',desc:'تجارب فيزياء وكيمياء وأحياء ممتعة.'},
  {icon:'🖋️',name:'بيت اللغة',desc:'عربية وإنجليزية: قراءة وتعبير بثقة.'},
  {icon:'🎯',name:'ساحة التحدي',desc:'اختبارات قصيرة وتحديات يومية.'},
  {icon:'🕌',name:'ركن الطمأنينة',desc:'أذكار ودعاءات تهدئ القلب قبل المذاكرة.'},
  {icon:'🏆',name:'قاعة الأبطال',desc:'أنجز مهامك واجمع إنجازاتك اليومية.'},
  {icon:'🗺️',name:'برج التخطيط',desc:'جدولك الدراسي وخطتك الأسبوعية.'}
 ]},
 hero:{title:'مسارُك نحو التفوق يبدأ من هنا',desc:'لوحة هادئة بلا مشتتات: وقتك، مادتك القادمة، وعبارات تُلهمك. مع مساعد ذكي يشرح لك ويخطط معك، ودليل كامل للمنصات التعليمية العمانية.',badge:'🇴🇲 منصة الطالب العمانية'},
 features:[
  {txt:'🗓️ منظّم المذاكرة: جدول يومي وأسبوعي + مهام وتنبيهات',tag:'مفعّل',cls:'g'},
  {txt:'📚 مكتبة ملخصات جميع المواد — الصفوف 10 و11 و12',tag:'مفعّل',cls:'g'},
  {txt:'🤖 مساعد ذكي يشرح ويخطط ويرشد للمنصات',tag:'مفعّل',cls:'g'},
  {txt:'🏙️ مدينة مسار التعليمية التفاعلية',tag:'جديد',cls:'y'},
  {txt:'🏫 مدرسة المتنبي: إدارة، معلمون، أولياء أمور، طلاب',tag:'جديد',cls:'y'}
 ],
 plats:[
  {name:'إصرار',en:'Esrar Academy',url:'https://esraracademy.com/',on:true,desc:'أكاديمية إصرار التعليمية — دروس وشروحات للطلاب في سلطنة عُمان.',steps:'افتح الموقع الرسمي: esraracademy.com\nأنشئ حساباً جديداً أو سجّل الدخول ببريدك.\nاختر صفّك ثم استعرض الدروس والاختبارات.'},
  {name:'همم',en:'Hemam',url:'https://hemam.org/',on:true,desc:'منصة همم التعليمية — موارد ودورات تدعم مسار الطالب.',steps:'افتح الموقع: hemam.org\nتصفح الأقسام أو سجّل حساباً.\nواجهت مشكلة؟ اسأل مسار وسيعطيك الحل.'}
 ],
 tiers:[
  {name:'مجاني',price:'0',feat:'الوقت والمادة القادمة والعبارات التحفيزية\nمساعد ذكي بعدد ردود محدود\nمساران صوتيان للتركيز',hot:false,btn:'ghost'},
  {name:'تمريرة الفصل',price:'3.500',feat:'مساعد ذكي بلا حدود ✦\nجميع المقاطع الصوتية ✦\nثيمات فاخرة ✦\nجدول دراسي موسّع',hot:true,btn:'primary'},
  {name:'التمريرة السنوية',price:'4.900',feat:'كل مزايا تمريرة الفصل\nأولوية في المزايا الجديدة\nشارة مساري الذهبية',hot:false,btn:'primary'}
 ],
 payments:[],
 teachers:[{name:'معلم تجريبي',user:'teacher1',pass:'1234',subjects:['الرياضيات الأساسية']}],
 students:[{name:'طالب تجريبي',user:'student1',pass:'1234',grade:'10',phone:'',feat:{ai:false},plan:'مجاني'}],
 gradesLog:[],vio:[],pmsgs:[],ads:[
  {type:'text',title:'أهلاً بكم في مسار',body:'منصة مسار — رفيقك الدراسي في سلطنة عُمان. تابع جدولك ومهامك يومياً.'}
 ],
 members:[],
 audio:{quran:'https://server8.mp3quran.net/afs/001.mp3',adhkar:'',calm:''},
 sfx:true,
 aiUsed:{date:'',count:0}
};
function load(){try{const s=JSON.parse(localStorage.getItem(LS));if(s&&s.vision)return s}catch(e){}return JSON.parse(JSON.stringify(DEF))}
let S=load();
function save(){localStorage.setItem(LS,JSON.stringify(S))}
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function openModal(id){$('#'+id).classList.add('open')}
function closeModal(id){$('#'+id).classList.remove('open')}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove('show'),2600)}
function escT(v){return String(v==null?'':v).replace(/</g,'&lt;')}
function escQ(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function nowT(){return new Date().toLocaleTimeString('ar-OM',{hour:'2-digit',minute:'2-digit'})}
function liRow(inner,onDel){const d=document.createElement('div');d.className='li';d.innerHTML='<span>'+inner+'</span>';if(onDel){const b=document.createElement('button');b.className='chip';b.textContent='🗑';b.onclick=onDel;d.appendChild(b)}return d}

/* ================= التنقل ================= */
const titles={dash:'الرئيسية',sched:'منظّم المذاكرة',tasks:'مهام اليوم',faith:'الجرعة الإيمانية',summ:'مكتبة الملخصات',ai:'مساعد مسار الذكي',subs:'الاشتراكات والأسعار',city:'مدينة مسار',studyland:'مسار سيتي',plat:'المنصات والإعلانات',school:'بوابة مدرسة المتنبي',admin:'لوحة الإدارة',teacher:'لوحة المعلم',parents:'لوحة ولي الأمر',students:'بوابة الطالب',owner:'لوحة المالك'};
function go(s){
 $$('#nav button').forEach(x=>x.classList.toggle('active',x.dataset.s===s));
 $$('.section').forEach(x=>x.classList.remove('active'));
 ($('#s-'+s)||$('#s-dash')).classList.add('active');
 $('#pgTitle').textContent=titles[s]||'مسار';
 if(window.innerWidth<900)$('#sidebar').classList.remove('open');
 render(s);
}
$('#nav').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.dataset.s)go(b.dataset.s)});
$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');
function render(s){
 if(s==='dash')renderDash();
 if(s==='sched')renderSchedule();
 if(s==='tasks')renderTasks();
 if(s==='faith')renderFaith();
 if(s==='summ')renderSummaries();
 if(s==='subs')renderTiers();
 if(s==='city')renderCity();
 if(s==='studyland'&&window.sl_refresh)window.sl_refresh();
 if(s==='plat')renderPlats(),renderAds();
 if(s==='school')renderSchool();
 if(s==='admin')renderAdmin();
 if(s==='teacher')renderTeacher();
 if(s==='parents')renderParent();
 if(s==='students')renderStudent();
 if(s==='owner')renderOwner();
}
/* أصوات النقر (مؤثرات) */
let AC=null;
function sfx(){if(!S.sfx)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=880;g.gain.value=.04;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.06)}catch(e){}}
document.addEventListener('click',e=>{if(e.target.closest('button,.chip'))sfx()});

/* ================= المشغل الصوتي ================= */
let AUD=null;
$('#audPlay').onclick=()=>{
 if(AUD&&!AUD.paused){AUD.pause();$('#audPlay').textContent='▶';return}
 const k=$('#audSrc').value,url=(S.audio||{})[k];
 if(!url){toast('🎵 لم يضف المالك ملفاً صوتياً لهذا الخيار بعد');return}
 AUD=AUD||new Audio();AUD.src=url;AUD.volume=.5;AUD.play().then(()=>$('#audPlay').textContent='⏸').catch(()=>toast('🎵 تعذّر التشغيل — يتطلب اتصالاً بالإنترنت'));
};

/* ================= الجرس والإشعارات ================= */
let NOTES=[];
function pushNote(t){NOTES.unshift({t,ts:Date.now()});updBell()}
function updBell(){const n=NOTES.length;$('#bellBadge').textContent=n;$('#bellBadge').classList.toggle('hidden',!n)}
$('#bellBtn').onclick=()=>{
 const l=$('#bellList');l.innerHTML='';
 if(!NOTES.length)l.innerHTML='<div class="li">لا إشعارات بعد</div>';
 NOTES.forEach(n=>l.appendChild(liRow('🔔 '+escT(n.t)+'<br><small class="mini">'+new Date(n.ts).toLocaleString('ar-OM')+'</small>')));
 openModal('bellModal');
};
function taskAlerts(){
 const undone=(S.tasks||[]).filter(x=>!x.done);
 const el=$('#taskAlert');
 if(undone.length){el.classList.remove('hidden');el.innerHTML='⏰ عندك <b>'+undone.length+'</b> مهمة لم تُنجز بعد: '+undone.map(x=>escT(x.text)).join('، ')}
 else el.classList.add('hidden');
 $('#stTasks').textContent=undone.length;
}

/* ================= الدور الحالي ================= */
function role(){return sessionStorage.getItem('m_role')||''}
function setRole(r){if(r)sessionStorage.setItem('m_role',r);else sessionStorage.removeItem('m_role')}
function myName(){return sessionStorage.getItem('m_name')||''}
function logoutAll(){setRole('');sessionStorage.removeItem('m_owner');sessionStorage.removeItem('m_child');$('#loginBtn').textContent='تسجيل الدخول';$('#loginBtn').classList.remove('logged');applyRoleUI();go('dash');toast('🚪 تم تسجيل الخروج')}
function applyRoleUI(){
 const r=role();
 const _tog=(id,sh)=>{const e=document.getElementById(id);if(e)e.classList.toggle('hidden',!sh)};
 _tog('navAdmin',r==='admin'||r==='owner');_tog('navTeacher',r==='teacher');_tog('navParent',r==='parent');_tog('navStudent',r==='student');_tog('navOwner',r==='owner');
 $('#avatar').textContent=r==='owner'?'👑':(myName()?myName().trim()[0]||'م':'م');
 updBell();
}

/* ================= تسجيل الدخول ================= */
$('#loginBtn').onclick=()=>{
 if(role()){logoutAll();return}
 openRole('student','🎓 تسجيل دخول الطالب','أدخل اسم المستخدم وكلمة المرور — الحساب تنشئه الإدارة.');
};
function openRole(mode,title,hint){
 $('#roleTitle').textContent=title;$('#roleHint').textContent=hint;
 $('#roleUserWrap').style.display=(mode==='teacher'||mode==='student')?'':'none';
 $('#roleCodeWrap').classList.toggle('hidden',!(mode==='admin'||mode==='teacher'||mode==='parent'));
 $('#rolePassLbl').textContent=(mode==='parent'||mode==='admin')?'كلمة المرور / الرمز (اختياري)':'كلمة المرور';
 $('#roleUser').value='';$('#roleCode').value='';$('#rolePass').value='';
 $('#roleModal').dataset.mode=mode;openModal('roleModal');
}
$('#eAdmin').onclick=()=>openRole('admin','🛡️ دخول الإدارة','أدخل رمز القسم السري للإدارة.');
$('#eTeacher').onclick=()=>openRole('teacher','👩‍🏫 دخول المعلمين','رمز القسم + اسم المستخدم وكلمة المرور (تنشئهما لوحة المالك).');
$('#eParent').onclick=()=>openRole('parent','👨‍👩‍👧 دخول أولياء الأمور','أدخل رمز القسم أو رقم هاتفك المسجل، واسم الطالب للربط.');
$('#eStudent').onclick=()=>{
 if(role()==='student'){go('students');return}
 openRole('student','🎓 دخول الطلاب','أدخل اسم المستخدم وكلمة المرور — أو تصفح البوابة كزائر.');
};
$('#doRoleLogin').onclick=()=>{
 const m=$('#roleModal').dataset.mode,u=($('#roleUser').value||'').trim(),c=($('#roleCode').value||'').trim(),p=($('#rolePass').value||'').trim();
 if(m==='admin'){
  if(c===S.codes.admin||p===S.codes.admin){setRole('admin');closeModal('roleModal');applyRoleUI();go('admin');toast('🛡️ أهلاً بك — لوحة الإدارة')}
  else toast('❌ رمز الإدارة غير صحيح');
 }else if(m==='teacher'){
  const t=(S.teachers||[]).find(x=>x.user===u&&x.pass===p);
  if(t&&(c===S.codes.teacher||!c)){setRole('teacher');sessionStorage.setItem('m_name',t.name);sessionStorage.setItem('m_teach_subj',JSON.stringify(t.subjects||[]));closeModal('roleModal');applyRoleUI();go('teacher');toast('👩‍🏫 أهلاً معلم '+t.name)}
  else toast('❌ بيانات غير صحيحة (تحقق من الرمز والحساب)');
 }else if(m==='parent'){
  const kid=(S.students||[]).find(x=>x.name===u||(x.phone&&x.phone===c));
  if((c===S.codes.parent||p===S.codes.parent||(kid&&kid.phone===c))&&kid){setRole('parent');sessionStorage.setItem('m_child',kid.name);closeModal('roleModal');applyRoleUI();go('parents');toast('👨‍👩‍👧 أهلاً بك — متابعة: '+kid.name)}
  else toast('❌ تحقق من الرمز/الهاتف واسم الطالب المسجل');
 }else{ /* student */
  const st=(S.students||[]).find(x=>x.user===u&&x.pass===p);
  if(st){setRole('student');sessionStorage.setItem('m_name',st.name);closeModal('roleModal');$('#loginBtn').textContent=myName();$('#loginBtn').classList.add('logged');applyRoleUI();go('students');toast('🎓 أهلاً '+st.name)}
  else{closeModal('roleModal');go('students');toast('🎓 دخلت كزائر — سجّل دخولك لحسابك الخاص')}
 }
};
$('#doOwnerLogin').onclick=()=>{
 const u=$('#ownerUser').value.trim(),p=$('#ownerPass').value.trim();
 if(u===S.ownerUser&&p===S.ownerPass){sessionStorage.setItem('m_owner','1');setRole('owner');closeModal('ownerModal');applyRoleUI();go('owner');toast('👑 أهلاً معاذ — التحكم المطلق')}
 else toast('❌ بيانات غير صحيحة');
};
/* المسار السري للمالك: زر التاج الخفي + #owner-secret */
$('#ownerBtn').onclick=()=>{if(sessionStorage.getItem('m_owner')){go('owner')}};

/* ================= الرئيسية ================= */
function renderDash(){
 $('#heroTitle').textContent=S.hero.title;$('#heroDesc').textContent=S.hero.desc;$('#heroBadge').textContent=S.hero.badge;
 const q=$('#quickGrid');q.innerHTML='';
 [{s:'sched',i:'🗓️',t:'منظّم المذاكرة',d:'جدول يومي وأسبوعي يتضيء تلقائياً'},{s:'tasks',i:'✅',t:'مهام اليوم',d:'أنجز مهامك مع تنبيهات ذكية'},{s:'faith',i:'🌱',t:'الجرعة الإيمانية',d:'أذكار وأدعية وعبارات متجددة'},{s:'summ',i:'📚',t:'مكتبة الملخصات',d:'ملخصات جميع المواد والصفوف'},{s:'subs',i:'💎',t:'الاشتراكات',d:'باقات أقل من 5 ريال'}].forEach(c=>{
  const d=document.createElement('div');d.className='quick-card';d.innerHTML='<div class="qi">'+c.i+'</div><h4>'+c.t+'</h4><p>'+c.d+'</p>';d.onclick=()=>go(c.s);q.appendChild(d);
 });
 const hot=(S.tiers||[]).find(t=>t.hot)||S.tiers[1];
 $('#stPrice').innerHTML=escT(hot.price)+'<small style="font-size:12px"> ر.ع</small>';
 const fl=$('#featList');fl.innerHTML='';
 S.features.forEach(f=>{const li=document.createElement('li');li.innerHTML=escT(f.txt)+' <span class="pill '+f.cls+'">'+escT(f.tag)+'</span>';fl.appendChild(li)});
 taskAlerts();
}
function tick(){
 const n=new Date();
 $('#liveClock').textContent=n.toLocaleTimeString('ar-OM');
 $('#liveDate').textContent=n.toLocaleDateString('ar-OM',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 const cur=n.toTimeString().slice(0,5);
 const nxt=(S.schedule||[]).find(x=>x.t>cur);
 $('#nextSubj').textContent=nxt?nxt.s:'انتهت حصص اليوم 🌙';
 $('#stNext').textContent=nxt?nxt.s:'—';
 $('#stClock').textContent=cur;
 const d=n.getDate();
 $('#motivQuote').textContent=(S.quotes||[])[d%(S.quotes||[]).length]||'';
 const dq=$('#dailyQuote');if(dq)dq.textContent='« '+((S.quotes||[])[d%(S.quotes||[]).length]||'')+' »';
}
setInterval(tick,1000);

/* ================= الجدول والمهام ================= */
function renderSchedule(){
 const n=new Date(),cur=n.toTimeString().slice(0,5);
 const arr=(S.schedule||[]).slice().sort((a,b)=>a.t.localeCompare(b.t));
 const g=$('#schedGrid');g.innerHTML='';
 if(!arr.length){g.innerHTML='<div class="li">لا حصص بعد</div>';return}
 arr.forEach((x,idx)=>{
  const end=arr[idx+1]?arr[idx+1].t:'23:59';
  const d=document.createElement('div');d.className='sched-item'+(x.t<=cur&&cur<end?' now':'');
  d.innerHTML='<div class="t">'+escT(x.t)+'</div><div class="s">'+escT(x.s)+'</div><div class="r">'+escT(x.r||'')+'</div>';g.appendChild(d);
 });
}
function renderSchedInto(id){
 const p=$('#'+id);if(!p)return;p.innerHTML='';
 (S.schedule||[]).forEach(x=>{const d=document.createElement('div');d.className='sched-item';d.innerHTML='<div class="t">'+escT(x.t)+'</div><div class="s">'+escT(x.s)+'</div><div class="r">'+escT(x.r||'')+'</div>';p.appendChild(d)});
}
function renderTasks(){
 const l=$('#taskList');l.innerHTML='';
 if(!(S.tasks||[]).length)l.innerHTML='<div class="li">لا مهام بعد — أضف أول مهمة</div>';
 S.tasks.forEach((x,i)=>{
  const d=document.createElement('div');d.className='task'+(x.done?' done':'');
  d.innerHTML='<span>'+(x.done?'✅':'⬜')+' '+escT(x.text)+'</span>';
  const b=document.createElement('button');b.className='btn '+(x.done?'ghost':'primary');b.style.padding='8px 14px';b.textContent=x.done?'إلغاء':'تم إنجاز المهمة ✅';
  b.onclick=()=>{
   x.done=!x.done;save();renderTasks();taskAlerts();
   if(x.done){toast('🎉 أحسنت! تم إنجاز المهمة');checkTasksDone()}
  };
  d.appendChild(b);l.appendChild(d);
 });
 taskAlerts();
}
$('#addTask').onclick=()=>{
 const t=$('#taskText').value.trim();if(!t){toast('⚠️ اكتب المهمة');return}
 S.tasks.unshift({text:t,done:false,ts:Date.now()});save();$('#taskText').value='';renderTasks();toast('➕ أُضيفت المهمة');
};
function checkTasksDone(){
 const undone=(S.tasks||[]).filter(x=>!x.done).length;
 if(!undone)pushNote('🎉 أنجزت كل مهام اليوم! أحسنت.');
}
setInterval(()=>{const u=(S.tasks||[]).filter(x=>!x.done).length;if(u)pushNote('⏰ تذكير: '+u+' مهام غير منجزة')},3600000);

/* ================= الجرعة الإيمانية ================= */
function renderFaith(){
 renderAdhkar();
 const d=new Date().getDate();
 $('#dailyQuote').textContent='« '+((S.quotes||[])[d%(S.quotes||[]).length]||'')+' »';
}
function renderAdhkar(){
 const cat=$('#adhkarCat').value,l=$('#adhkarList');l.innerHTML='';
 (S.adhkar[cat]||[]).forEach(z=>{const d=document.createElement('div');d.className='li';d.innerHTML='<span>'+escT(z)+'</span>';l.appendChild(d)});
}
$('#adhkarCat').onchange=renderAdhkar;

/* ================= مكتبة الملخصات ================= */
function renderGradeBtns(boxId,storeKey){
 const w=$('#'+boxId);w.innerHTML='';
 S.grades.forEach(g=>{
  const b=document.createElement('button');b.className='chip'+(String(g)===sessionStorage.getItem(storeKey)?' active':'');
  b.textContent='الصف '+g;b.onclick=()=>{sessionStorage.setItem(storeKey,String(g));renderSummaries();renderCity()};w.appendChild(b);
 });
 if(!sessionStorage.getItem(storeKey))sessionStorage.setItem(storeKey,'10');
}
function gradeRow(l,g,link){
 const r=document.createElement('div');r.className='li';
 r.innerHTML='<span>🗂️ <b>مجلد ملخصات الصف '+g+'</b> — جميع المواد على Google Drive</span><a class="chip" href="'+link+'" target="_blank" rel="noopener">فتح المجلد</a>';
 l.appendChild(r);
}
function renderSummaries(){
 renderGradeBtns('gradeBtns','m_grade');
 const g=sessionStorage.getItem('m_grade')||'10',l=$('#summList');l.innerHTML='';
 gradeRow(l,g,(S.driveLinks||{})['g'+g]||S.drive);
 const items=(S.summaries||[]).filter(x=>x.grade===g);
 items.forEach(x=>{const d=liRow('📄 <b>'+escT(x.subject)+'</b> — '+escT(x.title));if(x.url){const a=document.createElement('a');a.className='chip';a.href=x.url;a.target='_blank';a.rel='noopener';a.textContent='فتح';d.appendChild(a)}l.appendChild(d)});
 if(!items.length){const nn=document.createElement('div');nn.className='li';nn.textContent='لا ملخصات مضافة بعد لهذا الصف — افتح المجلد أعلاه';l.appendChild(nn)}
}

/* ================= المدينة ================= */
function renderCity(){
 const c=S.city||{};
 $('#cityTitle').textContent='مدينة '+c.name;$('#cityDesc').textContent=c.desc||'';
 $('#cityWelcome').textContent='« '+(c.welcome||'')+' »';
 const g=$('#cityGrid');g.innerHTML='';
 (c.buildings||[]).forEach(b=>{const d=document.createElement('div');d.className='city-card';d.innerHTML='<div class="ci">'+escT(b.icon)+'</div><h4>'+escT(b.name)+'</h4><p>'+escT(b.desc)+'</p>';g.appendChild(d)});
 renderGradeBtns('cityGradeBtns','c_grade');
 const gl=sessionStorage.getItem('c_grade')||'10',l=$('#citySummList');l.innerHTML='';
 gradeRow(l,gl,(S.driveLinks||{})['g'+gl]||S.drive);
 (S.summaries||[]).filter(x=>x.grade===gl).forEach(x=>{const d=liRow('📄 <b>'+escT(x.subject)+'</b> — '+escT(x.title));if(x.url){const a=document.createElement('a');a.className='chip';a.href=x.url;a.target='_blank';a.rel='noopener';a.textContent='فتح';d.appendChild(a)}l.appendChild(d)});
}

/* ================= المنصات والإعلانات ================= */
function renderPlats(){
 const g=$('#platGrid');g.innerHTML='';
 (S.plats||[]).filter(p=>p.on!==false).forEach(p=>{
  const d=document.createElement('div');d.className='plat-card';
  const steps=(p.steps||'').split('\n').filter(Boolean).map(x=>'<li>'+escT(x)+'</li>').join('');
  d.innerHTML='<h3>'+escT(p.name)+' <span style="font-weight:300;font-size:.75rem;color:var(--dim)">'+escT(p.en||'')+'</span></h3><p>'+escT(p.desc)+'</p><ol>'+steps+'</ol><div class="plat-actions"><a class="chip" href="'+p.url+'" target="_blank" rel="noopener">زيارة الموقع</a></div>';
  g.appendChild(d);
 });
 if(!g.children.length)g.innerHTML='<p class="mini">لا منصات مفعّلة حالياً — يديرها المالك.</p>';
}
function renderAds(){
 const g=$('#adGrid');g.innerHTML='';
 (S.ads||[]).forEach(a=>{
  const d=document.createElement('div');d.className='ad-card';
  if(a.type==='img'&&a.url)d.innerHTML='<img src="'+escQ(a.url)+'" alt="إعلان"/>';
  else if(a.type==='video'&&a.url)d.innerHTML='<video src="'+escQ(a.url)+'" controls muted></video>';
  d.innerHTML+='<div class="ac-body"><b>'+escT(a.title)+'</b><br/>'+escT(a.body)+'</div>';
  g.appendChild(d);
 });
 if(!(S.ads||[]).length)g.innerHTML='<p class="mini">لا إعلانات بعد.</p>';
 const tr=$('#tickerTrack');
 tr.innerHTML=(S.ads||[]).map(a=>'<span>📢 <b>'+escT(a.title)+'</b> — '+escT(a.body)+'</span>').join('')+'<span>🏫 مسار | مساري في مدرسة المتنبي</span>';
}
function renderSchool(){$('#visionCard').innerHTML='«'+escT(S.vision)+'»<div class="mini" style="margin-top:5px">— الرؤية المعتمدة للمدرسة</div>'}

/* ================= الاشتراكات ================= */
function renderTiers(){
 const g=$('#tierGrid');g.innerHTML='';
 S.tiers.forEach((t,i)=>{
  const d=document.createElement('div');d.className='tier'+(t.hot?' hot':'');
  const fs=(t.feat||'').split('\n').filter(Boolean).map(f=>'<li>'+escT(f)+'</li>').join('');
  d.innerHTML='<h3>'+escT(t.name)+'</h3><div class="price">'+escT(t.price)+' <small>ر.ع</small></div><ul>'+fs+'</ul>';
  const b=document.createElement('button');b.className='btn '+(t.btn||'primary');b.textContent=t.price==='0'?'خطتك الحالية':'اشترك الآن';
  b.onclick=()=>{if(t.price==='0'){toast('أنت على الخطة المجانية');return}$('#payTitle').textContent='اشتراك: '+t.name+' — '+t.price+' ر.ع';openModal('payModal');$('#payModal').dataset.plan=t.name+' | '+t.price+' ر.ع'};
  d.appendChild(b);g.appendChild(d);
 });
}
$('#doPay').onclick=()=>{
 const n=$('#payName').value.trim(),ph=$('#payPhone').value.trim(),bk=$('#payBank').value.trim(),rf=$('#payRef').value.trim();
 if(!n||!ph||!rf){toast('⚠️ أكمل الاسم والهاتف ورقم الإيصال');return}
 S.payments.unshift({name:n,phone:ph,bank:bk,ref:rf,plan:$('#payModal').dataset.plan||'',status:'قيد المراجعة',ts:Date.now()});
 save();closeModal('payModal');pushNote('💎 وصل طلب اشتراك جديد من '+n);toast('📨 أُرسل طلبك — ستتم مراجعة الإيصال من الإدارة');
};

/* ================= المساعد الذكي ================= */
function aiLimit(){
 const st=(S.students||[]).find(x=>x.name===myName());
 if(st&&st.plan&&st.plan!=='مجاني')return Infinity;
 const today=new Date().toISOString().slice(0,10);
 if(S.aiUsed.date!==today){S.aiUsed={date:today,count:0}}
 return 10-S.aiUsed.count;
}
function addMsg(t,who){const d=document.createElement('div');d.className='msg '+who;d.textContent=t;$('#chatLog').appendChild(d);$('#chatLog').scrollTop=1e6}
function aiReply(q){
 q=q.toLowerCase();
 const inS=S.subjects.find(s=>q.includes(s.toLowerCase().split(' ')[0])&&s.length>3);
 if(q.includes('إصرار'))return 'منصة إصرار: 1) افتح esraracademy.com\n2) أنشئ حساباً ببريدك\n3) اختر صفّك ودرسك.\nهل تحتاج شرح درس معين؟';
 if(q.includes('همم'))return 'منصة همم: 1) افتح hemam.org\n2) تصفح الأقسام أو سجّل حساباً\n3) استعرض الموارد الخاصة بمسارك.';
 if(q.includes('جدول')||q.includes('وقت'))return 'نصيحتي:\n1) اكتب مهامك في «مهام اليوم»\n2) رتّبها حسب الحصص في «منظّم المذاكرة»\n3) ذاكر 25 دقيقة واسترح 5.\nأقسم وقتك بمكتبة الملخصات عند المراجعة.';
 if(q.includes('ملخص'))return 'كل ملخصات المواد في «مكتبة الملخصات» — اختر صفّك، وهناك مجلد Google Drive كامل لكل صف.'+(inS?' ولدينا ملخصات لمادة '+inS+'.':'');
 if(q.includes('اشتراك')||q.includes('سعر'))return 'الباقات: مجاني 0 ر.ع، تمريرة الفصل 3.500 ر.ع، التمريرة السنوية 4.900 ر.ع. الدفع عبر بنك مسقط أو نزوى أو الأهلي من صفحة الاشتراكات.';
 if(q.includes('توجيه')||q.includes('مهني'))return 'للتوجيه المهني: منصة خطى khuta.om واختبار هولاند masari-holland-oman.floot.app — كلاهما في بوابة الطلاب.';
 if(inS)return 'مادة '+inS+': راجع ملخصاتها من المكتبة، ونفّذ تمارين الكتاب، وإن احتجت درساً بعينه اسألني باسمه وسأشرحه خطوة بخطوة.';
 return 'أنا مسار 🤖 اسألني عن: شرح درس، تنظيم وقتك، الملخصات، منصتي إصرار وهمم، أو التوجيه المهني.';
}
function sendChat(){
 const q=$('#chatText').value.trim();if(!q)return;
 addMsg(q,'me');$('#chatText').value='';
 const lim=aiLimit();
 if(lim<=0){addMsg('انتهت ردودك المجانية اليوم 🌟 اشترك في «تمريرة الفصل» للردود بلا حدود من صفحة الاشتراكات.','bot');return}
 setTimeout(()=>{
  addMsg(aiReply(q),'bot');
  S.aiUsed.count=(S.aiUsed.count||0)+1;save();
  $('#aiQuota').textContent=isFinite(lim)?'ردود متبقية اليوم: '+(lim-1):'اشتراك مفعّل — ردود بلا حدود ✦';
 },400);
}
$('#chatSend').onclick=sendChat;
$('#chatText').addEventListener('keydown',e=>{if(e.key==='Enter')sendChat()});

/* ================= لوحة المعلم ================= */
function mySubj(){try{return JSON.parse(sessionStorage.getItem('m_teach_subj')||'[]')}catch(e){return[]}}
function renderTeacher(){
 const r=role();if(r!=='teacher'&&r!=='owner')return;
 $('#teacherHello').textContent='👩‍🏫 لوحة المعلم — '+myName();
 const chips=$('#mySubjChips');chips.innerHTML='';
 (mySubj().length?mySubj():S.subjects).forEach(s=>{const c=document.createElement('span');c.className='chip on';c.textContent=s;chips.appendChild(c)});
 // جدول مادتي
 const sl=$('#tSchedList');sl.innerHTML='';
 (S.schedule||[]).filter(x=>mySubj().some(s=>(x.s||'').includes(s.slice(0,6)))||!mySubj().length).forEach((x,i)=>{
  sl.appendChild(liRow('🗓️ '+escT(x.t)+' — <b>'+escT(x.s)+'</b> — '+escT(x.r||''),()=>{S.schedule.splice(S.schedule.indexOf(x),1);save();renderTeacher();renderSchedule()}));
 });
 // معايير
 const el=$('#evalList');el.innerHTML='';
 if(!(S.evalcrit||[]).length)el.innerHTML='<div class="li">لا معايير بعد</div>';
 (S.evalcrit||[]).forEach((c,i)=>el.appendChild(liRow('📏 '+escT(c.text)+' ('+escT(c.weight)+'%)',()=>{S.evalcrit.splice(i,1);save();renderTeacher()})));
 // درجات
 const gl=$('#gradeList');gl.innerHTML='';
 (S.gradesLog||[]).slice(0,20).forEach((x,i)=>gl.appendChild(liRow('📝 <b>'+escT(x.student)+'</b> — '+escT(x.subject)+': '+escT(x.score)+'<br><small class="mini">'+escT(x.note||'')+'</small>',()=>{S.gradesLog.splice(S.gradesLog.indexOf(x),1);save();renderTeacher()})));
 // مخالفاتي
 const vl=$('#vioList');vl.innerHTML='';
 (S.vio||[]).filter(v=>!v.teacher||v.teacher===myName()||role()==='owner').forEach(v=>vl.appendChild(liRow('⚠️ <b>'+escT(v.student)+'</b> (الصف '+escT(v.grade)+') — '+escT(v.text))));
 // ملخصاتي
 const tl=$('#tSummList');tl.innerHTML='';
 (S.summaries||[]).filter(x=>mySubj().includes(x.subject)||role()==='owner').forEach(x=>tl.appendChild(liRow('📄 <b>'+escT(x.subject)+'</b> — '+escT(x.title),()=>{S.summaries.splice(S.summaries.indexOf(x),1);save();renderTeacher();renderSummaries()})));
 // صندوق رسائل الأولياء
 const ml=$('#tmsgList');ml.innerHTML='';
 const mine=(S.pmsgs||[]).filter(m=>mySubj().includes(m.subject));
 if(!mine.length)ml.innerHTML='<div class="li">لا رسائل بعد</div>';
 mine.forEach(m=>{
  const d=document.createElement('div');d.className='li';d.style.flexDirection='column';d.style.alignItems='stretch';
  d.innerHTML='<div>✉️ <b>'+escT(m.parent)+'</b> (ولي أمر '+escT(m.child)+') — بخصوص مادة '+escT(m.subject)+':<br><small>'+escT(m.text)+'</small></div>';
  if(m.reply)d.innerHTML+='<div style="margin-top:6px;font-size:.72rem;color:var(--ok)">↩️ ردّك: '+escT(m.reply)+'</div>';
  else{const row=document.createElement('div');row.className='adm-row';
   const inp=document.createElement('input');inp.placeholder='اكتب ردك…';inp.style.flex='1';
   const b=document.createElement('button');b.className='btn primary';b.style.padding='8px 14px';b.textContent='رد';
   b.onclick=()=>{m.reply=inp.value.trim();if(!m.reply){toast('⚠️ اكتب الرد');return}m.replied=true;save();renderTeacher();toast('📨 أُرسل الرد لولي الأمر')};
   row.append(inp,b);d.appendChild(row);
  }
  ml.appendChild(d);
 });
}
$('#tSchedForm').onsubmit=e=>{
 e.preventDefault();const r=role();if(r!=='teacher'&&r!=='owner')return;
 const t=$('#tsTime').value.trim(),rm=$('#tsRoom').value.trim();
 if(!t){toast('⚠️ أدخل وقت الحصة');return}
 const sbj=mySubj()[0]||'مادة';
 S.schedule.push({t,s:sbj,r:rm});S.schedule.sort((a,b)=>a.t.localeCompare(b.t));
 save();$('#tsTime').value='';$('#tsRoom').value='';renderTeacher();renderSchedule();toast('✅ أُضيفت حصة '+sbj);
};
$('#evalForm').onsubmit=e=>{
 e.preventDefault();const t=$('#evalText').value.trim();if(!t){toast('⚠️ اكتب المعيار');return}
 S.evalcrit=S.evalcrit||[];S.evalcrit.unshift({text:t,weight:$('#evalWeight').value||'10'});
 save();$('#evalText').value='';renderTeacher();toast('✅ أُضيف المعيار');
};
$('#gradeForm').onsubmit=e=>{
 e.preventDefault();const st=$('#grStudent').value.trim(),sc=$('#grScore').value.trim();
 if(!st||!sc){toast('⚠️ أدخل اسم الطالب والدرجة');return}
 S.gradesLog.unshift({student:st,subject:mySubj()[0]||'عام',score:sc,note:$('#grNote').value.trim(),teacher:myName(),ts:Date.now()});
 save();$('#grStudent').value='';$('#grScore').value='';$('#grNote').value='';renderTeacher();
 pushNote('📝 سُجلت درجة جديدة للطالب '+st);toast('💾 سُجلت الدرجة وظهرت لولي الأمر');
};
$('#vioForm').onsubmit=e=>{
 e.preventDefault();const st=$('#vioStudent').value.trim(),tx=$('#vioText').value.trim();
 if(!st||!tx){toast('⚠️ أكمل الحقول');return}
 S.vio.unshift({student:st,grade:$('#vioGrade').value,text:tx,teacher:myName(),ts:Date.now()});
 save();$('#vioStudent').value='';$('#vioText').value='';renderTeacher();renderAdmin();
 pushNote('⚠️ رصد المعلم '+myName()+' مخالفة للطالب '+st);toast('📨 رُصدت المخالفة ووصلت للإدارة');
};
$('#tSummForm').onsubmit=e=>{
 e.preventDefault();const ti=$('#tSummTitle').value.trim(),u=$('#tSummUrl').value.trim();
 if(!ti||!u){toast('⚠️ أكمل العنوان والرابط');return}
 S.summaries.unshift({grade:'10',subject:mySubj()[0]||'عام',title:ti,url:u,ts:Date.now()});
 save();$('#tSummTitle').value='';$('#tSummUrl').value='';renderTeacher();renderSummaries();renderCity();toast('📄 رُفع الملخص للطلاب');
};

/* ================= لوحة الإدارة ================= */
function renderAdmin(){
 const r=role();if(r!=='admin'&&r!=='owner')return;
 $('#adStatVio').textContent=S.vio.length;$('#adStatPay').length&&($('#adStatPay').textContent=S.payments.length);
 $('#adStatTeach').textContent=S.teachers.length;$('#adStatStu').textContent=S.students.length;
 $('#adStatMsg').textContent=S.pmsgs.length;
 const vl=$('#adminVioList');vl.innerHTML='';
 if(!S.vio.length)vl.innerHTML='<div class="li">لا مخالفات مسجلة</div>';
 S.vio.forEach(v=>vl.appendChild(liRow('⚠️ <b>'+escT(v.student)+'</b> — الصف '+escT(v.grade)+'<br><small class="mini">'+escT(v.text)+' | رصد: '+escT(v.teacher)+'</small>')));
 const tl=$('#teacherList');tl.innerHTML='';
 S.teachers.forEach(t=>tl.appendChild(liRow('👩‍🏫 <b>'+escT(t.name)+'</b> — '+escT((t.subjects||[]).join('، '))+' <span dir="ltr" class="mini">'+escT(t.user)+'</span>')));
 const stl=$('#studentList');stl.innerHTML='';
 if(!S.students.length)stl.innerHTML='<div class="li">لا طلاب بعد</div>';
 S.students.forEach(s=>stl.appendChild(liRow('🎓 <b>'+escT(s.name)+'</b> — الصف '+escT(s.grade)+' <span dir="ltr" class="mini">'+escT(s.user)+' | '+escT(s.plan||'مجاني')+'</span>')));
 const ml=$('#adminMsgList');ml.innerHTML='';
 if(!S.pmsgs.length)ml.innerHTML='<div class="li">لا رسائل بعد</div>';
 S.pmsgs.forEach(m=>ml.appendChild(liRow('✉️ <b>'+escT(m.parent)+'</b> → معلم '+escT(m.subject)+' (بخصوص '+escT(m.child)+')<br><small class="mini">'+escT(m.text)+'</small>'+(m.reply?' <span class="pill g">تم الرد</span>':''))));
 const pl=$('#adminPayList');pl.innerHTML='';
 if(!S.payments.length)pl.innerHTML='<div class="li">لا طلبات بعد</div>';
 S.payments.forEach(p=>{
  const d=liRow('💎 <b>'+escT(p.name)+'</b> — '+escT(p.plan)+'<br><small class="mini">'+escT(p.bank)+' | إيصال '+escT(p.ref)+' | '+escT(p.status)+'</span>');
  const ok=document.createElement('button');ok.className='chip';ok.textContent=p.status==='قيد المراجعة'?'✅ تأكيد الإيصال':'تم التأكيد ✓';
  ok.onclick=()=>{p.status='مؤكد ✓';const st=S.students.find(x=>x.name===p.name);if(st)st.plan=p.plan;save();renderAdmin();toast('✅ تم تفعيل الاشتراك')};
  d.appendChild(ok);pl.appendChild(d);
 });
}
$('#addStudentForm').onsubmit=e=>{
 e.preventDefault();const n=$('#nsName').value.trim(),u=$('#nsUser').value.trim(),p=$('#nsPass').value.trim();
 if(!n||!u||!p){toast('⚠️ أكمل جميع الحقول');return}
 if(S.students.some(x=>x.user===u)){toast('⚠️ اسم المستخدم موجود');return}
 S.students.push({name:n,user:u,pass:p,grade:$('#nsGrade').value,phone:$('#nsPhone').value.trim(),feat:{ai:false},plan:'مجاني'});
 S.members.push({name:n,email:$('#nsPhone').value.trim(),role:'طالب'});
 save();$('#nsName').value='';$('#nsUser').value='';$('#nsPass').value='';$('#nsPhone').value='';
 renderAdmin();toast('🎓 سُجّل الطالب '+n);
};
$('#adminCodeForm').onsubmit=e=>{
 e.preventDefault();
 const a=$('#ncAdmin').value.trim(),t=$('#ncTeach').value.trim(),p=$('#ncParent').value.trim();
 if(a)S.codes.admin=a;if(t)S.codes.teacher=t;if(p)S.codes.parent=p;
 save();$('#ncAdmin').value=$('#ncTeach').value=$('#ncParent').value='';toast('🔐 حُدّثت الرموز');
};

/* ================= لوحة ولي الأمر ================= */
function renderParent(){
 const r=role();if(r!=='parent'&&r!=='owner')return;
 const child=sessionStorage.getItem('m_child')||'';
 $('#parentHello').textContent='👨‍👩‍👧 متابعة الطالب: '+child;
 $('#parChildBadge').textContent=child;
 const vio=S.vio.filter(v=>v.student===child);
 const pv=$('#parVioList');pv.innerHTML='';
 if(!vio.length)pv.innerHTML='<div class="li">لا مخالفات — الحمد لله على سلوك الابن 🌟</div>';
 vio.forEach(v=>pv.appendChild(liRow('⚠️ <b>'+escT(v.student)+'</b> (الصف '+escT(v.grade)+')<br><small class="mini">'+escT(v.text)+' | رصده: '+escT(v.teacher)+'</small>')));
 const pg=$('#parGradeList');pg.innerHTML='';
 const gr=S.gradesLog.filter(x=>x.student===child);
 if(!gr.length)pg.innerHTML='<div class="li">لا درجات مسجلة بعد</div>';
 gr.forEach(x=>pg.appendChild(liRow('📝 <b>'+escT(x.subject)+'</b>: '+escT(x.score)+'/100<br><small class="mini">'+escT(x.note||'')+' | '+escT(x.teacher)+'</small>')));
 renderSchedInto('parSchedList');
 const pt=$('#parTaskList');pt.innerHTML='';
 (S.tasks||[]).forEach(x=>pt.appendChild(liRow((x.done?'✅':'⬜')+' '+escT(x.text))));
 // رسائل
 const sel=$('#pmsgSubject');sel.innerHTML='';
 S.subjects.forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;sel.appendChild(o)});
 const pm=$('#parMsgList');pm.innerHTML='';
 const mine=S.pmsgs.filter(m=>m.child===child);
 if(!mine.length)pm.innerHTML='<div class="li">لا رسائل بعد — أرسل استفسارك الأول</div>';
 mine.forEach(m=>pm.appendChild(liRow('✉️ إلى معلم '+escT(m.subject)+': '+escT(m.text)+(m.reply?'<br><span style="color:var(--ok)">↩️ رد المعلم: '+escT(m.reply)+'</span>':' <span class="pill y">بانتظار الرد</span>'))));
}
$('#pmsgForm').onsubmit=e=>{
 e.preventDefault();const tx=$('#pmsgText').value.trim();if(!tx){toast('⚠️ اكتب نص الرسالة');return}
 const sbj=$('#pmsgSubject').value;
 S.pmsgs.unshift({parent:myName()||'ولي أمر',child:sessionStorage.getItem('m_child')||'',subject:sbj,text:tx,reply:'',ts:Date.now()});
 save();$('#pmsgText').value='';renderParent();pushNote('✉️ رسالة جديدة من ولي أمر بخصوص '+sbj);toast('📨 وصلت الرسالة لمعلم المادة');
};

/* ================= بوابة الطالب ================= */
function renderStudent(){
 const me=myName();
 $('#stuHello').textContent='🎓 بوابة الطالب'+(me?' — '+me:'');
 const vio=S.vio.filter(v=>!me||v.student===me);
 const sv=$('#stuVioList');sv.innerHTML='';
 if(!vio.length)sv.innerHTML='<div class="li">لا مخالفات مسجلة عليك — واصل التميز 🌟</div>';
 vio.forEach(v=>sv.appendChild(liRow('⚠️ '+escT(v.text)+'<br><small class="mini">طريقة التصحيح: ناقش المعلم '+escT(v.teacher)+' والتزم بخطة التحسين</small>')));
 const ss=$('#stuSummList');ss.innerHTML='';
 (S.summaries||[]).slice(0,25).forEach(x=>{const d=liRow('📄 <b>'+escT(x.subject)+'</b> — '+escT(x.title)+' (الصف '+escT(x.grade)+')');if(x.url){const a=document.createElement('a');a.className='chip';a.href=x.url;a.target='_blank';a.rel='noopener';a.textContent='فتح';d.appendChild(a)}ss.appendChild(d)});
 renderSchedInto('stuSchedList');
}

/* ================= لوحة المالك ================= */
$$('#ownerTabs .tab-btn').forEach(b=>b.onclick=()=>{
 $$('#ownerTabs .tab-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');
 $$('.owner-pane').forEach(p=>p.style.display='none');
 $('#ot-'+b.dataset.ot).style.display='';
});
const TA='style="width:100%;min-height:60px;background:rgba(242,235,220,.05);border:1px solid var(--line);border-radius:12px;padding:11px;color:var(--ink);font-family:inherit"';
function renderOwner(){
 if(role()!=='owner')return;
 renderOMembers();renderOTeachers();renderOSections();renderOSumm();renderOMedia();renderOAudio();renderOPricing();renderOSec();
}
function renderOMembers(){
 let rows='';
 S.members.forEach((m,i)=>{rows+='<div class="li"><div style="flex:1;display:flex;gap:8px;flex-wrap:wrap"><input data-m="name" data-i="'+i+'" value="'+escQ(m.name)+'" placeholder="الاسم" style="min-width:110px"><input dir="ltr" data-m="email" data-i="'+i+'" value="'+escQ(m.email||'')+'" placeholder="هاتف/بريد" style="min-width:120px"><select data-m="role" data-i="'+i+'"><option value="طالب"'+(m.role==='طالب'?' selected':'')+'>طالب</option><option value="معلم"'+(m.role==='معلم'?' selected':'')+'>معلم</option><option value="إدارة"'+(m.role==='إدارة'?' selected':'')+'>إدارة</option></select></div><button class="chip" onclick="delMember('+i+')">🗑</button></div>'});
 let stu='';
 S.students.forEach((s,i)=>{stu+='<div class="li"><div style="flex:1;display:flex;gap:8px;flex-wrap:wrap"><input data-st="name" data-i="'+i+'" value="'+escQ(s.name)+'" style="min-width:110px"><input dir="ltr" data-st="user" data-i="'+i+'" value="'+escQ(s.user)+'" style="min-width:100px"><input dir="ltr" data-st="pass" data-i="'+i+'" value="'+escQ(s.pass)+'" style="min-width:90px"><select data-st="grade" data-i="'+i+'"><option value="10"'+(s.grade==='10'?' selected':'')+'>10</option><option value="11"'+(s.grade==='11'?' selected':'')+'>11</option><option value="12"'+(s.grade==='12'?' selected':'')+'>12</option></select><label class="mini">✦ مزايا <input type="checkbox" data-st="planA" data-i="'+i+'"'+(s.plan&&s.plan!=='مجاني'?' checked':'')+'></label></div><button class="chip" onclick="delStudent('+i+')">🗑</button></div>'});
 $('#ot-members').innerHTML='<div class="panel"><h4>👥 سجل التسجيل والأعضاء ('+S.members.length+')</h4><div class="list-box" style="max-height:260px">'+(rows||'<div class="li">لا أعضاء</div>')+'</div><div class="btn-row"><button class="btn ghost" onclick="addMember()">➕ عضو</button><button class="btn primary" onclick="saveMembers()">💾 حفظ</button></div></div><div class="panel"><h4>🎓 الطلاب المسجلون وتفعيل المزايا ('+S.students.length+')</h4><div class="list-box" style="max-height:300px">'+(stu||'<div class="li">لا طلاب</div>')+'</div><div class="btn-row"><button class="btn primary" onclick="saveStudents()">💾 حفظ الطلاب والمزايا</button></div><p class="mini">تفعيل «مزايا ✦» يفتح للطالب المساعد الذكي بلا حدود وكل الميزات المخصصة للمشتركين.</p></div>';
}
function addMember(){S.members.push({name:'عضو جديد',email:'',role:'طالب'});save();renderOMembers()}
function delMember(i){S.members.splice(i,1);save();renderOMembers()}
function saveMembers(){$$('[data-m]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.m;if(S.members[i])S.members[i][k]=el.value});save();renderOMembers();toast('💾 حُفظ الأعضاء')}
function delStudent(i){S.students.splice(i,1);save();renderOMembers();renderAdmin()}
function saveStudents(){
 $$('[data-st]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.st,s=S.students[i];if(!s)return;
  if(k==='planA')s.plan=el.checked?'تمريرة الفصل':'مجاني';else s[k]=el.value});
 save();renderOMembers();renderAdmin();toast('💾 حُفظ الطلاب والمزايا');
}
function renderOTeachers(){
 let rows='';
 S.teachers.forEach((t,i)=>{
  const chips=S.subjects.map(s=>'<label class="mini" style="white-space:nowrap"><input type="checkbox" data-tc-sub="'+i+'" value="'+escQ(s)+'"'+((t.subjects||[]).includes(s)?' checked':'')+'> '+escT(s)+'</label>').join(' ');
  rows+='<div class="li" style="flex-direction:column;align-items:stretch"><div style="display:flex;gap:8px;flex-wrap:wrap"><input data-tc="name" data-i="'+i+'" value="'+escQ(t.name)+'" placeholder="الاسم" style="min-width:110px"><input dir="ltr" data-tc="user" data-i="'+i+'" value="'+escQ(t.user)+'" placeholder="المستخدم" style="min-width:110px"><input dir="ltr" data-tc="pass" data-i="'+i+'" value="'+escQ(t.pass)+'" placeholder="كلمة المرور" style="min-width:110px"><button class="chip" onclick="delTeacher('+i+')">🗑</button></div><div class="subj-chips" style="margin-top:6px">'+chips+'</div></div>';
 });
 $('#ot-teachers').innerHTML='<div class="panel"><h4>👩‍🏫 إدارة المعلمين — الاسم والمادة والحساب ('+S.teachers.length+')</h4><div class="list-box" style="max-height:420px">'+(rows||'<div class="li">لا معلمين</div>')+'</div><div class="btn-row"><button class="btn ghost" onclick="addTeacher()">➕ معلم جديد</button><button class="btn primary" onclick="saveTeachers()">💾 حفظ</button></div><p class="mini">يدخل المعلم من: بوابة المدرسة ← دخول المعلمين (رمز القسم '+escT(S.codes.teacher)+' + حسابه).</p></div>';
}
function addTeacher(){S.teachers.push({name:'معلم جديد',user:'teacher'+(S.teachers.length+1),pass:'1234',subjects:[]});save();renderOTeachers()}
function delTeacher(i){S.teachers.splice(i,1);save();renderOTeachers();renderAdmin()}
function saveTeachers(){
 $$('[data-tc]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.tc;if(S.teachers[i])S.teachers[i][k]=el.value});
 S.teachers.forEach((t,i)=>{
  t.subjects=$$('[data-tc-sub="'+i+'"]').filter(c=>c.checked).map(c=>c.value);
 });
 save();renderOTeachers();renderAdmin();toast('💾 حُفظ المعلمون وموادهم');
}
function renderOSections(){
 let fq='';
 S.quotes.forEach((q,i)=>{fq+='<div class="li"><input data-q="'+i+'" value="'+escQ(q)+'" style="flex:1"><button class="chip" onclick="delQuote('+i+')">🗑</button></div>'});
 let ff='';
 S.features.forEach((f,i)=>{ff+='<div class="li"><input data-f="txt" data-i="'+i+'" value="'+escQ(f.txt)+'" style="flex:1"><input data-f="tag" data-i="'+i+'" value="'+escQ(f.tag)+'" style="width:90px"><button class="chip" onclick="delFeat('+i+')">🗑</button></div>'});
 let fc='';
 S.city.buildings.forEach((b,i)=>{fc+='<div class="li"><input data-c="icon" data-i="'+i+'" value="'+escQ(b.icon)+'" style="width:56px;text-align:center"><input data-c="name" data-i="'+i+'" value="'+escQ(b.name)+'" style="min-width:120px"><input data-c="desc" data-i="'+i+'" value="'+escQ(b.desc)+'" style="flex:1"><button class="chip" onclick="delBld('+i+')">🗑</button></div>'});
 let fsch='';
 S.schedule.forEach((x,i)=>{fsch+='<div class="li"><input dir="ltr" data-h="t" data-i="'+i+'" value="'+escQ(x.t)+'" style="width:80px;text-align:center"><input data-h="s" data-i="'+i+'" value="'+escQ(x.s)+'" style="flex:1"><input data-h="r" data-i="'+i+'" value="'+escQ(x.r||'')+'" placeholder="المكان" style="flex:1"><button class="chip" onclick="delSched('+i+')">🗑</button></div>'});
 let secd='';
 ['admin','teacher','parent'].forEach(k=>{secd+='<div class="li"><span>🔑 رمز '+(k==='admin'?'الإدارة':k==='teacher'?'المعلمين':'أولياء الأمور')+'</span><input dir="ltr" id="ocd_'+k+'" value="'+escQ(S.codes[k])+'" style="width:110px"></div>'});
 $('#ot-sections').innerHTML='<div class="panel"><h4>🏠 ترحيب الرئيسية</h4><div class="field"><label>العنوان</label><input id="ohT" value="'+escQ(S.hero.title)+'"></div><div class="field"><label>الوصف</label><textarea id="ohD" '+TA+'>'+escT(S.hero.desc)+'</textarea></div><div class="field"><label>الشارة</label><input id="ohB" value="'+escQ(S.hero.badge)+'"></div><div class="field"><label>رؤية المدرسة</label><input id="ohV" value="'+escQ(S.vision)+'"></div><div class="field"><label>رقم واتساب الدعم (بدون +)</label><input id="ohWa" dir="ltr" value="'+escQ(S.wa)+'"></div></div>'
 +'<div class="panel"><h4>💬 العبارات التحفيزية</h4><div class="list-box">'+fq+'</div><div class="btn-row"><button class="btn ghost" onclick="addQuote()">➕ عبارة</button></div></div>'
 +'<div class="panel"><h4>⭐ ميزات مسار</h4><div class="list-box">'+ff+'</div><div class="btn-row"><button class="btn ghost" onclick="addFeat()">➕ ميزة</button></div></div>'
 +'<div class="panel"><h4>🏙️ مدينة مسار</h4><div class="adm-row" style="flex-wrap:wrap"><input id="ocN" value="'+escQ(S.city.name)+'" placeholder="الاسم" style="min-width:120px"><input id="ocW" value="'+escQ(S.city.welcome)+'" placeholder="الترحيب" style="flex:1"><input id="ocD" value="'+escQ(S.city.desc)+'" placeholder="الوصف" style="flex:1"></div><div class="list-box" style="max-height:240px">'+fc+'</div><div class="btn-row"><button class="btn ghost" onclick="addBld()">➕ مبنى</button></div></div>'
 +'<div class="panel"><h4>🏛️ أسماء الأقسام والفئات</h4><div class="field"><label>اسم قسم المدرسة</label><input id="osSchool" value="مساري في مدرسة المتنبي"></div><div class="field"><label>اسم المدينة في القائمة</label><input id="osCityLbl" value="مدينة مسار"></div><p class="mini">تُحفظ أسماء الأقسام وتظهر في الشريط الجانبي والتنقل.</p></div>'
 +'<div class="panel"><h4>🗓️ الجدول العام</h4><div class="list-box" style="max-height:260px">'+fsch+'</div><div class="btn-row"><button class="btn ghost" onclick="addSched()">➕ حصة</button><button class="btn primary" onclick="saveSched()">💾 حفظ</button></div></div>'
 +'<div class="panel"><h4>🔑 رموز دخول الأقسام</h4>'+secd+'</div>'
 +'<div class="btn-row"><button class="btn primary" onclick="saveSections()">💾 حفظ كل تعديلات المحتوى</button></div>';
}
function addQuote(){S.quotes.push('عبارة جديدة');save();renderOSections()}
function delQuote(i){S.quotes.splice(i,1);save();renderOSections()}
function addFeat(){S.features.push({txt:'ميزة جديدة',tag:'جديد',cls:'y'});save();renderOSections()}
function delFeat(i){S.features.splice(i,1);save();renderOSections()}
function addBld(){S.city.buildings.push({icon:'🏢',name:'مبنى جديد',desc:''});save();renderOSections()}
function delBld(i){S.city.buildings.splice(i,1);save();renderOSections()}
function addSched(){S.schedule.push({t:'07:30',s:'مادة جديدة',r:''});save();renderOSections()}
function delSched(i){S.schedule.splice(i,1);save();renderOSections();renderSchedule()}
function saveSched(){$$('[data-h]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.h;if(S.schedule[i])S.schedule[i][k]=el.value});S.schedule.sort((a,b)=>a.t.localeCompare(b.t));save();renderOSections();renderSchedule();toast('💾 حُفظ الجدول')}
function saveSections(){
 S.hero={title:$('#ohT').value,desc:$('#ohD').value,badge:$('#ohB').value};
 S.vision=$('#ohV').value;S.wa=$('#ohWa').value.trim();
 $$('[data-q]').forEach(el=>{S.quotes[+el.dataset.q]=el.value});
 $$('[data-f]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.f;if(S.features[i])S.features[i][k]=el.value});
 $$('[data-c]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.c;if(S.city.buildings[i])S.city.buildings[i][k]=el.value});
 S.city.name=$('#ocN').value;S.city.welcome=$('#ocW').value;S.city.desc=$('#ocD').value;
 const a=$('#ocd_admin').value.trim(),t=$('#ocd_teacher').value.trim(),p=$('#ocd_parent').value.trim();
 if(a)S.codes.admin=a;if(t)S.codes.teacher=t;if(p)S.codes.parent=p;
 save();renderDash();renderCity();renderSchool();toast('💾 حُفظ كل تعديلات المحتوى');
}
function renderOSumm(){
 let rows='';
 S.summaries.forEach((x,i)=>{
  rows+='<div class="li"><div style="flex:1;display:flex;gap:8px;flex-wrap:wrap"><select data-s="grade" data-i="'+i+'">'+['10','11','12'].map(g=>'<option value="'+g+'"'+(x.grade===g?' selected':'')+'>الصف '+g+'</option>').join('')+'</select><select data-s="subject" data-i="'+i+'">'+S.subjects.map(sb=>'<option'+(sb===x.subject?' selected':'')+'>'+escT(sb)+'</option>').join('')+'</select><input data-s="title" data-i="'+i+'" value="'+escQ(x.title)+'" style="min-width:130px"><input dir="ltr" data-s="url" data-i="'+i+'" value="'+escQ(x.url||'')+'" placeholder="رابط" style="flex:1;min-width:140px"></div><button class="chip" onclick="delSumm('+i+')">🗑</button></div>';
 });
 $('#ot-summ').innerHTML='<div class="panel"><h4>🗂️ روابط مجلدات الملخصات (Google Drive)</h4><div class="adm-row"><input id="oDrive" dir="ltr" value="'+escQ(S.drive)+'" style="flex:1"><button class="btn primary" style="padding:10px 16px" onclick="saveDrive()">💾 حفظ</button></div><div class="adm-row" style="flex-wrap:wrap"><input id="oDG10" dir="ltr" value="'+escQ((S.driveLinks||{}).g10||S.drive)+'" placeholder="مجلد الصف 10" style="flex:1;min-width:170px"><input id="oDG11" dir="ltr" value="'+escQ((S.driveLinks||{}).g11||S.drive)+'" placeholder="مجلد الصف 11" style="flex:1;min-width:170px"><input id="oDG12" dir="ltr" value="'+escQ((S.driveLinks||{}).g12||S.drive)+'" placeholder="مجلد الصف 12" style="flex:1;min-width:170px"></div></div>'
 +'<div class="panel"><h4>📄 إدارة الملخصات ('+S.summaries.length+')</h4><div class="list-box" style="max-height:360px">'+(rows||'<div class="li">لا ملخصات</div>')+'</div><div class="btn-row"><button class="btn ghost" onclick="addSumm()">➕ ملخص</button><button class="btn primary" onclick="saveSummEdits()">💾 حفظ التعديلات</button></div></div>';
}
function saveDrive(){S.drive=$('#oDrive').value.trim();S.driveLinks=S.driveLinks||{};S.driveLinks.g10=$('#oDG10').value.trim()||S.drive;S.driveLinks.g11=$('#oDG11').value.trim()||S.drive;S.driveLinks.g12=$('#oDG12').value.trim()||S.drive;save();renderSummaries();renderCity();toast('💾 حُفظت روابط المجلدات')}
function addSumm(){S.summaries.unshift({grade:'10',subject:S.subjects[0],title:'ملخص جديد',url:''});save();renderOSumm();renderSummaries()}
function delSumm(i){S.summaries.splice(i,1);save();renderOSumm();renderSummaries();renderCity()}
function saveSummEdits(){$$('[data-s]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.s;if(S.summaries[i])S.summaries[i][k]=el.value});save();renderOSumm();renderSummaries();renderCity();renderStudent();toast('💾 حُفظت الملخصات')}
function renderOMedia(){
 let pa='';
 S.plats.forEach((p,i)=>{pa+='<div class="li"><span>🇴🇲 <b>'+escT(p.name)+'</b></span><label class="mini"><input type="checkbox" data-pl="on" data-i="'+i+'"'+(p.on!==false?' checked':'')+'> ظاهرة</label><button class="chip" onclick="delPlat('+i+')">🗑</button></div>'});
 let ads='';
 S.ads.forEach((a,i)=>{ads+='<div class="li" style="flex-direction:column;align-items:stretch"><div style="display:flex;gap:8px;flex-wrap:wrap"><select data-ad="type" data-i="'+i+'"><option value="text"'+(a.type==='text'?' selected':'')+'>نص</option><option value="img"'+(a.type==='img'?' selected':'')+'>صورة</option><option value="video"'+(a.type==='video'?' selected':'')+'>فيديو</option></select><input data-ad="title" data-i="'+i+'" value="'+escQ(a.title)+'" placeholder="العنوان" style="min-width:120px"><input dir="ltr" data-ad="url" data-i="'+i+'" value="'+escQ(a.url||'')+'" placeholder="رابط الصورة/الفيديو" style="flex:1;min-width:150px"><button class="chip" onclick="delAd('+i+')">🗑</button></div><input data-ad="body" data-i="'+i+'" value="'+escQ(a.body||'')+'" placeholder="نص الإعلان" style="width:100%;margin-top:6px"></div>'});
 $('#ot-media').innerHTML='<div class="panel"><h4>🇴🇲 إظهار/إخفاء المنصات</h4><div class="list-box">'+pa+'</div><div class="btn-row"><button class="btn ghost" onclick="addPlat()">➕ منصة</button><button class="btn primary" onclick="savePlats()">💾 حفظ</button></div></div><div class="panel"><h4>📢 الإعلانات — شريط متحرك + صور وفيديو</h4><div class="list-box" style="max-height:340px">'+(ads||'<div class="li">لا إعلانات</div>')+'</div><div class="btn-row"><button class="btn ghost" onclick="addAd()">➕ إعلان</button><button class="btn primary" onclick="saveAds()">💾 حفظ الإعلانات</button></div><p class="mini">الإعلانات النصية تظهر في الشريط السفلي المتحرك، وصور/فيديو تظهر في صفحة المنصات والإعلانات.</p></div>';
}
function addPlat(){S.plats.push({name:'منصة جديدة',en:'',url:'https://',on:true,desc:'',steps:''});save();renderOMedia()}
function delPlat(i){S.plats.splice(i,1);save();renderOMedia();renderPlats()}
function savePlats(){$$('[data-pl]').forEach(el=>{const i=+el.dataset.i;if(S.plats[i])S.plats[i].on=el.checked});save();renderOMedia();renderPlats();toast('💾 حُفظت المنصات')}
function addAd(){S.ads.push({type:'text',title:'إعلان جديد',body:'',url:''});save();renderOMedia()}
function delAd(i){S.ads.splice(i,1);save();renderOMedia()}
function saveAds(){$$('[data-ad]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.ad;if(S.ads[i])S.ads[i][k]=el.value});save();renderOMedia();renderAds();toast('💾 حُفظت الإعلانات')}
function renderOAudio(){
 $('#ot-audio').innerHTML='<div class="panel"><h4>🎵 ملفات الخلفية الصوتية</h4><div class="field"><label>قرآن كريم (رابط MP3)</label><input dir="ltr" id="oAuQ" value="'+escQ(S.audio.quran||'')+'"></div><div class="field"><label>أذكار (رابط MP3)</label><input dir="ltr" id="oAuA" value="'+escQ(S.audio.adhkar||'')+'"></div><div class="field"><label>صوت هادئ (رابط MP3)</label><input dir="ltr" id="oAuC" value="'+escQ(S.audio.calm||'')+'"></div><div class="li"><span>🔊 مؤثرات صوتية للنقر والتنقل</span><label class="mini"><input type="checkbox" id="oSfx"'+(S.sfx?' checked':'')+'> مفعّلة</label></div><div class="btn-row"><button class="btn primary" onclick="saveAudio()">💾 حفظ</button></div><p class="mini">الروابط تُشغّل عند توفر الإنترنت — للتشغيل بدون إنترنت ضع ملفات mp3 بجانب index.html وضع أسماء الملفات مثل: quran.mp3</p></div>';
}
function saveAudio(){
 S.audio={quran:$('#oAuQ').value.trim(),adhkar:$('#oAuA').value.trim(),calm:$('#oAuC').value.trim()};
 S.sfx=$('#oSfx').checked;save();renderOAudio();toast('🎵 حُفظت إعدادات الصوت');
}
function renderOPricing(){
 let rows='';
 S.payments.forEach((p,i)=>{rows+='<div class="li"><span>💎 <b>'+escT(p.name)+'</b> — '+escT(p.plan)+'<br><small class="mini">'+escT(p.bank)+' | إيصال '+escT(p.ref)+' | '+escT(p.status)+'</small></span><button class="chip" onclick="confirmPay('+i+')">'+(p.status==='قيد المراجعة'?'✅ تأكيد':'مؤكد ✓')+'</button></div>'});
 let ti='';
 S.tiers.forEach((t,i)=>{ti+='<div class="li" style="flex-direction:column;align-items:stretch"><div style="display:flex;gap:8px;flex-wrap:wrap"><input data-tr="name" data-i="'+i+'" value="'+escQ(t.name)+'" style="min-width:120px"><input dir="ltr" data-tr="price" data-i="'+i+'" value="'+escQ(t.price)+'" style="width:90px"><label class="mini"><input type="checkbox" data-tr="hot" data-i="'+i+'"'+(t.hot?' checked':'')+'> مميزة ★</label><button class="chip" onclick="delTier('+i+')">🗑</button></div><textarea data-tr="feat" data-i="'+i+'" '+TA+' placeholder="المزايا — سطر لكل ميزة">'+escT(t.feat)+'</textarea></div>'});
 $('#ot-pricing').innerHTML='<div class="panel"><h4>💎 طلبات التحويل والإيصالات ('+S.payments.length+')</h4><div class="list-box" style="max-height:280px">'+(rows||'<div class="li">لا طلبات</div>')+'</div><div class="btn-row"><button class="btn ghost" onclick="clearPay()">🧹 مسح المؤكدة</button></div></div><div class="panel"><h4>💰 تعديل الباقات والأسعار</h4><div class="list-box">'+ti+'</div><div class="btn-row"><button class="btn ghost" onclick="addTier()">➕ خطة</button><button class="btn primary" onclick="saveTiers()">💾 حفظ</button></div></div>';
}
function confirmPay(i){const p=S.payments[i];p.status='مؤكد ✓';const st=S.students.find(x=>x.name===p.name);if(st)st.plan=p.plan;save();renderOPricing();renderAdmin();toast('✅ تم تفعيل الاشتراك')}
function clearPay(){S.payments=S.payments.filter(p=>p.status!=='مؤكد ✓');save();renderOPricing();renderAdmin()}
function addTier(){S.tiers.push({name:'خطة جديدة',price:'0',feat:'',hot:false,btn:'ghost'});save();renderOPricing();renderTiers()}
function delTier(i){S.tiers.splice(i,1);save();renderOPricing();renderTiers()}
function saveTiers(){$$('[data-tr]').forEach(el=>{const i=+el.dataset.i,k=el.dataset.tr,t=S.tiers[i];if(!t)return;t[k]=el.type==='checkbox'?el.checked:el.value});save();renderOPricing();renderTiers();renderDash();toast('💰 حُفظت الباقات')}
function renderOSec(){
 $('#ot-security').innerHTML='<div class="panel"><h4>🔐 بيانات الأمان</h4><div class="adm-row" style="flex-wrap:wrap"><input dir="ltr" id="oOu" value="'+escQ(S.ownerUser)+'" placeholder="مستخدم المالك" style="min-width:130px"><input dir="ltr" id="oOp" value="'+escQ(S.ownerPass)+'" placeholder="كلمة مرور المالك" style="min-width:130px"><button class="btn primary" style="padding:10px 18px" onclick="saveSec()">💾 حفظ</button></div><p class="mini" style="margin-top:10px">🔑 مسار الدخول السري: زر التاج 👑 في الشريط العلوي أو إضافة <span dir="ltr">#owner-secret</span> لنهاية الرابط.</p><div class="btn-row"><button class="btn ghost" onclick="exportData()">⬇️ تصدير نسخة احتياطية (JSON)</button><button class="btn ghost" onclick="wipeData()">🧹 تصفير البيانات</button></div><p class="mini" style="margin-top:10px">⚠️ تنبيه أمني: هذه الحماية تعمل داخل المتصفح فقط (localStorage) وليست حماية خادم حقيقية — مناسبة للاستخدام المحلي والتجريبي. للنشر الرسمي بحماية كاملة يلزم ربط الموقع بخادم وقاعدة بيانات.</p></div>';
}
function saveSec(){S.ownerUser=$('#oOu').value.trim()||S.ownerUser;S.ownerPass=$('#oOp').value.trim()||S.ownerPass;save();renderOSec();toast('🔐 حُدّثت بيانات الأمان')}
function exportData(){const b=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='masar-backup.json';a.click();toast('⬇️ صُدّرت النسخة')}
function wipeData(){if(confirm('تصفير كل البيانات والعودة للإعدادات الافتراضية؟')){localStorage.removeItem(LS);S=load();renderDash();renderSchedule();renderTasks();renderSummaries();renderCity();renderPlats();renderAds();renderTiers();toast('🧹 تم التصفير')}}

/* ================= الإقلاع ================= */
$('#yr').textContent=new Date().getFullYear();
$('#waBtn').href='https://wa.me/'+(S.wa||'96800000000');
$('#visionTop').textContent='«'+S.vision+'»';
$('#aiQuota').textContent='الخطة المجانية: 10 ردود يومياً — الاشتراك يفتح الردود بلا حدود.';
renderDash();renderSummaries();renderCity();renderPlats();renderAds();renderTiers();tick();applyRoleUI();
addMsg('أهلاً! أنا مسار 🤖 مساعدك الدراسي.\nاسألني عن: شرح درس، تنظيم وقتك، الملخصات، أو منصتي إصرار وهمم.','bot');
if(location.hash==='#owner-secret')openModal('ownerModal');

/* ================== وحدة مسار سيتي (Study Land v3) — معزولة ================== */
(function(){

/* ============ بيانات الشخصيات والسبرايتات ============ */
function buildSprite(kind){
  let head, body, shoes;
  if(kind==="salem"){
    head = `<rect x='150' y='60' width='100' height='80' fill='#e8b88a'/>
            <rect x='140' y='40' width='120' height='36' fill='#f2ede2' stroke='#c9b98a' stroke-width='4'/>`;
    body = `<rect x='130' y='140' width='140' height='150' fill='#ffffff' stroke='#d9d9d9' stroke-width='4'/>
            <rect x='135' y='150' width='12' height='120' fill='#f2f2f2'/><rect x='253' y='150' width='12' height='120' fill='#f2f2f2'/>
            <rect x='190' y='145' width='20' height='14' fill='#e8e8e8'/>`;
    shoes = `<rect x='150' y='296' width='42' height='16' fill='#7a5230'/><rect x='208' y='296' width='42' height='16' fill='#7a5230'/>`;
  } else {
    head = `<rect x='150' y='60' width='100' height='80' fill='#e8b88a'/>
            <rect x='138' y='44' width='124' height='50' rx='14' fill='#ffffff' stroke='#dddddd' stroke-width='4'/>
            <rect x='146' y='100' width='108' height='70' fill='#ffffff' stroke='#dddddd' stroke-width='4'/>`;
    body = `<rect x='140' y='140' width='120' height='130' fill='#2c3560' stroke='#1e2a52' stroke-width='4'/>
            <rect x='128' y='140' width='18' height='110' fill='#ffffff' stroke='#dddddd' stroke-width='3'/>
            <rect x='254' y='140' width='18' height='110' fill='#ffffff' stroke='#dddddd' stroke-width='3'/>`;
    shoes = `<rect x='150' y='280' width='40' height='16' fill='#2b2b2b'/><rect x='212' y='280' width='40' height='16' fill='#2b2b2b'/>`;
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 320' shape-rendering='crispEdges'>
    ${head}
    <rect x='160' y='88' width='10' height='10' fill='#2b1d12'/><rect x='230' y='88' width='10' height='10' fill='#2b1d12'/>
    <rect x='188' y='112' width='24' height='6' fill='#a3663f'/>
    ${body}${shoes}</svg>`;
}
const sprites = { salem:"data:image/svg+xml,"+encodeURIComponent(buildSprite("salem")),
                  noor:"data:image/svg+xml,"+encodeURIComponent(buildSprite("noor")) };
const chars = [
  {id:"salem", name:"سالم", bio:"طالب فضولي يحب الاستكشاف وتحقيق الأهداف."},
  {id:"noor",  name:"نور",  bio:"طالبة مجتهدة وشغوفة بالتنظيم والإنجاز."}
];
let charIdx = 0, chosenChar = null, chosenGrade = null;

/* ============ الحالة (localStorage) ============ */
const LS = "masar_studyland_v2";
let state = { name:"", grade:"11", char:"salem", tasks:[], subjects:[], notes:"", dailyGoal:"",
  water:0, mood:"", goals:[], exams:[], achs:[], mail:null, week:{}, month:{},
  streak:1, lastDay:new Date().toDateString() };
try{ const s = JSON.parse(localStorage.getItem(LS)); if(s) state = Object.assign(state, s); }catch(e){}
function save(){ try{ localStorage.setItem(LS, JSON.stringify(state)); }catch(e){} }

/* صيانة السلسلة اليومية */
(function(){ const today = new Date().toDateString();
  if(state.lastDay !== today){ state.streak = (state.lastDay === new Date(Date.now()-864e5).toDateString()) ? state.streak+1 : 1; state.lastDay = today; save(); } })();

/* ============ أدوات ============ */
function $(id){ return document.getElementById(id); }
let toastTimer;
function toast(msg){ const t=$("slToast"); t.textContent=msg; t.style.opacity=1; clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.style.opacity=0,2200); }
const esc = s => (s||"").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const AR_DAYS = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const AR_DAYS_SAT = ["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
const AR_MONTHS = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

/* ============ شاشة التحميل ============ */
/* splash removed (embedded) */

/* ============ الانضمام ============ */
function renderChar(){
  const c = chars[charIdx];
  $("charImg").src = sprites[c.id];
  $("charName").textContent = c.name;
  $("charBio").textContent = c.bio;
  document.querySelectorAll("#charDots i").forEach((d,i)=>d.classList.toggle("on", i===charIdx));
}
function nextChar(){ charIdx=(charIdx+1)%chars.length; renderChar(); }
function prevChar(){ charIdx=(charIdx-1+chars.length)%chars.length; renderChar(); }
function pickChar(){ chosenChar=chars[charIdx]; toast("تم اختيار "+chosenChar.name+" ✨"); }
function showStep(n){
  [1,2,3].forEach(i=>$("step"+i).classList.toggle("hidden", i!==n));
  $("heroDots").innerHTML = `<i class="${n===1?'on':''}"></i><i class="${n===2?'on':'gold'}"></i><i class="${n===3?'on':'gold'}"></i>`;
  if(n===2) renderChar();
  if(n===3) $("avatarMini").src = sprites[(chosenChar||chars.find(c=>c.id===state.char)).id];
  $("step"+n).scrollIntoView({behavior:"smooth", block:"center"});
}
document.querySelectorAll(".grade-card").forEach(gc=>{
  gc.addEventListener("click", ()=>{
    document.querySelectorAll(".grade-card").forEach(x=>x.classList.remove("selected"));
    gc.classList.add("selected"); chosenGrade = gc.dataset.grade;
    setTimeout(()=>showStep(2), 450);
  });
});
function enterCity(){
  const name = $("nameInput").value.trim();
  if(!name){ $("welcomeMsg").textContent="اكتب اسمك أولاً يا بطل 🙂"; return; }
  const ch = chosenChar || chars[0];
  state.name = name; state.char = ch.id;
  state.grade = chosenGrade || state.grade;
  save(); startDash();
}
function startDash(){
  $("userName").textContent = state.name || "صديقي";
  $("userGradeBadge").textContent = "الصف "+state.grade+" 🎓";
  const ch = chars.find(c=>c.id===state.char) || chars[0];
  $("userCharName").textContent = ch.name;
  $("dashAvatar").src = sprites[ch.id];
  $("libGrade").textContent = state.grade;
  $("onboarding").classList.add("hidden");
  $("dashboard").classList.add("visible");
  $("hero").classList.add("hidden");
  $("heroDots").innerHTML = `<i class="on"></i><i class="gold on"></i><i class="gold on"></i>`;
  renderStats(); window.scrollTo({top:0, behavior:"smooth"});
}
function logout(){
  $("dashboard").classList.remove("visible");
  $("onboarding").classList.remove("hidden");
  $("hero").classList.remove("hidden");
  showStep(3); $("nameInput").value = state.name;
}

/* ============ التنقل بين صفحات المدينة ============ */
function goHome(){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("visible"));
  $("dashboard").classList.add("visible");
  renderStats();
  window.scrollTo({top:0, behavior:"smooth"});
}
function openView(id){
  $("dashboard").classList.remove("visible");
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("visible"));
  const key = (id==="planning2") ? "planning" : id;
  const map = {goals:"view-goals", planning:"view-planning", grades:"view-grades", ach:"view-ach", library:"view-library", mail:"view-mail"};
  $(map[key]).classList.add("visible");
  if(key==="planning") buildWeek();
  if(key==="goals") renderGoals();
  if(key==="grades") renderExams();
  if(key==="ach") renderAch();
  if(key==="mail") renderMail();
  window.scrollTo({top:0, behavior:"smooth"});
}

/* ============ الإحصائيات ============ */
function renderStats(){
  const done = state.tasks.filter(t=>t.done).length;
  $("statTasks").textContent = done;
  $("statGoal").textContent = state.dailyGoal ? "🎯" : "—";
  const future = state.goals.filter(g=>g.date && !g.done).map(g=>g.date).sort()[0];
  $("statDeadline").textContent = future ? future : "—";
  $("statStreak").textContent = state.streak;
}

/* ============ مركز التخطيط: التبويبات ============ */
function switchPlan(name, btn){
  document.querySelectorAll("#view-planning .tab").forEach(t=>t.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll("#view-planning .panel").forEach(p=>p.classList.remove("active"));
  $("plan-"+name).classList.add("active");
  if(name==="weekly") buildWeek();
  if(name==="monthly") buildCal();
}

/* ===== اليومي ===== */
$("dailyGoal") && null;
function initDaily(){
  $("dailyGoal").value = state.dailyGoal || "";
  $("dailyGoal").addEventListener("input", e=>{ state.dailyGoal=e.target.value; save(); renderStats(); });
  $("waterVal").textContent = state.water;
  $("notesArea").value = state.notes || "";
  $("notesArea").addEventListener("input", e=>{ state.notes=e.target.value; save(); });
  document.querySelectorAll("#moods .mood").forEach(m=>{
    if(state.mood===m.dataset.m) m.classList.add("sel");
    m.addEventListener("click", ()=>{
      document.querySelectorAll("#moods .mood").forEach(x=>x.classList.remove("sel"));
      m.classList.add("sel"); state.mood=m.dataset.m; save();
    });
  });
  renderTasks(); renderSubjects();
}
function water(d){ state.water=Math.max(0,state.water+d); $("waterVal").textContent=state.water; save(); }
function renderTasks(){
  const ul=$("slTaskList"), dl=$("doneList"); ul.innerHTML=""; dl.innerHTML="";
  const pend = state.tasks.filter(t=>!t.done), done = state.tasks.filter(t=>t.done);
  $("tasksEmpty").classList.toggle("hidden", pend.length>0);
  $("doneEmpty").classList.toggle("hidden", done.length>0);
  pend.forEach((t,i)=>{
    const li=document.createElement("li"); li.innerHTML =
      `<span class="chk" onclick="toggleTask(${state.tasks.indexOf(t)})">✓</span><span>${esc(t.text)}</span>
       <button class="del" onclick="delTask(${state.tasks.indexOf(t)})">🗑️</button>`; ul.appendChild(li); });
  done.forEach(t=>{
    const li=document.createElement("li"); li.className="done"; li.innerHTML =
      `<span class="chk" onclick="toggleTask(${state.tasks.indexOf(t)})">✓</span><span>${esc(t.text)}</span>
       <button class="del" onclick="delTask(${state.tasks.indexOf(t)})">🗑️</button>`; dl.appendChild(li); });
  renderStats();
}
function addTask(){ const v=$("taskInput").value.trim(); if(!v)return; state.tasks.push({text:v,done:false}); $("taskInput").value=""; save(); renderTasks(); }
function toggleTask(i){ state.tasks[i].done=!state.tasks[i].done; save(); renderTasks(); }
function delTask(i){ state.tasks.splice(i,1); save(); renderTasks(); }
function renderSubjects(){
  const ul=$("subjectList"); ul.innerHTML="";
  $("subjectsEmpty").classList.toggle("hidden", state.subjects.length>0);
  state.subjects.forEach((s,i)=>{ const li=document.createElement("li");
    li.innerHTML=`📖 ${esc(s)}<button class="del" onclick="delSubject(${i})">🗑️</button>`; ul.appendChild(li); });
}
function addSubject(){ const v=$("subjectInput").value.trim(); if(!v)return; state.subjects.push(v); $("subjectInput").value=""; save(); renderSubjects(); }
function delSubject(i){ state.subjects.splice(i,1); save(); renderSubjects(); }

/* ===== الأسبوعي ===== */
function buildWeek(){
  const wrap=$("weekCards"); wrap.innerHTML="";
  const names=["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
  const todayIdx=(new Date().getDay()+1)%7;
  for(let i=0;i<7;i++){
    const key="d"+i, w=state.week[key]||{note:"",tasks:[]};
    const card=document.createElement("div"); card.className="mini-card";
    card.innerHTML=`<h3>${names[i]} 📅 ${i===todayIdx?'<span class="chip">اليوم</span>':''}</h3>
      <input class="input" style="width:100%" placeholder="...ملاحظات اليوم" value="${esc(w.note)}" data-wk="${key}" data-fld="note">
      <div class="row" style="margin-top:8px">
        <input class="input" placeholder="...مهمة" data-wk="${key}" data-fld="newtask" onkeydown="if(event.key==='Enter')addWeekTask(this)">
        <button class="plus-btn" onclick="addWeekTask(this.previousElementSibling)">+</button>
      </div>
      <ul class="tasks" data-wklist="${key}"></ul>`;
    wrap.appendChild(card);
  }
  refreshWeek();
}
function refreshWeek(){
  document.querySelectorAll("[data-wklist]").forEach(ul=>{
    const w = state.week[ul.dataset.wklist]||{tasks:[]}; ul.innerHTML="";
    w.tasks.forEach((t,i)=>{ const li=document.createElement("li");
      li.innerHTML=`<span class="chk ${t.done?'donex':''}" style="${t.done?'background:var(--purple)':''}" onclick="toggleWeekTask('${ul.dataset.wklist}',${i})">✓</span>
        <span style="${t.done?'text-decoration:line-through;opacity:.6':''}">${esc(t.text)}</span>
        <button class="del" onclick="delWeekTask('${ul.dataset.wklist}',${i})">🗑️</button>`; ul.appendChild(li); });
  });
}
function weekObj(key){ if(!state.week[key]) state.week[key]={note:"",tasks:[]}; return state.week[key]; }
document.addEventListener("input", e=>{
  const wk=e.target.dataset && e.target.dataset.wk;
  if(wk && e.target.dataset.fld==="note"){ weekObj(wk).note=e.target.value; save(); }
});
function addWeekTask(inp){
  const key=inp.dataset.wk, v=inp.value.trim(); if(!v)return;
  weekObj(key).tasks.push({text:v,done:false}); inp.value=""; save(); refreshWeek();
}
function toggleWeekTask(key,i){ state.week[key].tasks[i].done=!state.week[key].tasks[i].done; save(); refreshWeek(); }
function delWeekTask(key,i){ state.week[key].tasks.splice(i,1); save(); refreshWeek(); }

/* ===== الشهري ===== */
let calY, calM;
function buildCal(){
  if(calY===undefined){ const n=new Date(); calY=n.getFullYear(); calM=n.getMonth(); }
  $("calTitle").textContent = AR_MONTHS[calM]+" "+calY;
  const grid=$("calGrid"); grid.innerHTML="";
  AR_DAYS_SAT.forEach(d=>{ const h=document.createElement("div"); h.className="h"; h.textContent=d; grid.appendChild(h); });
  const first=new Date(calY,calM,1), start=(first.getDay()+1)%7, days=new Date(calY,calM+1,0).getDate();
  for(let i=0;i<start;i++){ const b=document.createElement("div"); b.className="d blank"; grid.appendChild(b); }
  const t=new Date();
  for(let d=1;d<=days;d++){
    const cell=document.createElement("div"); cell.className="d";
    const key=`${calY}-${calM+1}-${d}`;
    if(d===t.getDate()&&calM===t.getMonth()&&calY===t.getFullYear()) cell.classList.add("today");
    if(state.month[key] && ((state.month[key].note||"").trim() || (state.month[key].tasks||[]).length)) cell.classList.add("hasnote");
    cell.innerHTML=`<span>${d}</span>`;
    cell.onclick=()=>openDayEditor(key, d);
    grid.appendChild(cell);
  }
}
function calNav(d){ calM+=d; if(calM<0){calM=11;calY--;} if(calM>11){calM=0;calY++;} buildCal(); }
function openDayEditor(key, d){
  const o = state.month[key]||{note:"",tasks:[]};
  const note = prompt("ملاحظات وتذكيرات ليوم "+d+" "+AR_MONTHS[calM]+":", o.note||"");
  if(note===null) return;
  state.month[key]={note:note, tasks:o.tasks||[]}; save(); buildCal();
  if(note.trim()) toast("حُفظت ملاحظات يوم "+d+" ✅");
}

/* ============ ساحة الأهداف ============ */
let dpTarget="goal", dpSel=null, dpY, dpM;
function openDatePicker(){
  dpTarget="goal"; dpSel=null; const n=new Date(); dpY=n.getFullYear(); dpM=n.getMonth();
  $("dateModalTitle").textContent="اختر تاريخ الهدف"; $("dpErr").textContent="يرجى اختيار تاريخ.";
  buildDp(); $("dateModal").classList.add("open");
}
function openMailPicker(){
  dpTarget="mail"; dpSel=null; const n=new Date(); dpY=n.getFullYear(); dpM=n.getMonth();
  $("dateModalTitle").textContent="اختر يوم فتح الرسالة"; $("dpErr").textContent="يرجى اختيار تاريخ.";
  buildDp(); $("dateModal").classList.add("open");
}
function buildDp(){
  $("dpTitle").textContent = AR_MONTHS[dpM]+" "+dpY;
  const grid=$("dpGrid"); grid.innerHTML="";
  AR_DAYS_SAT.forEach(d=>{ const h=document.createElement("div"); h.className="h"; h.textContent=d.slice(0,3); grid.appendChild(h); });
  const first=new Date(dpY,dpM,1), start=(first.getDay()+1)%7, days=new Date(dpY,dpM+1,0).getDate();
  for(let i=0;i<start;i++){ const b=document.createElement("div"); b.className="d blank"; grid.appendChild(b); }
  for(let d=1;d<=days;d++){
    const cell=document.createElement("div"); cell.className="d"; cell.textContent=d;
    if(dpSel===`${d} ${AR_MONTHS[dpM]} ${dpY}`) cell.classList.add("today");
    cell.onclick=()=>{ dpSel=`${d} ${AR_MONTHS[dpM]} ${dpY}`; $("dpErr").textContent=""; buildDp(); };
    grid.appendChild(cell);
  }
}
function dpNav(d){ dpM+=d; if(dpM<0){dpM=11;dpY--;} if(dpM>11){dpM=0;dpY++;} buildDp(); }
function closeDateModal(){ $("dateModal").classList.remove("open"); }
function confirmDate(){
  if(!dpSel){ $("dpErr").textContent="يرجى اختيار تاريخ."; return; }
  if(dpTarget==="goal"){ state.goalDate=dpSel; $("goalDateLbl").textContent=dpSel; }
  else { state.mailDate=dpSel; $("mailDateLbl").textContent=dpSel; }
  closeDateModal();
}
function addGoal(){
  const v=$("goalText").value.trim(); if(!v){ toast("اكتب هدفك أولاً 🎯"); return; }
  state.goals.push({text:v, prio:$("goalPrio").value, date:state.goalDate||"", done:false});
  $("goalText").value=""; state.goalDate=""; $("goalDateLbl").textContent="بدون";
  save(); renderGoals(); toast("هدف جديد في الساحة! 🎯");
}
function renderGoals(){
  const list=$("goalList"); list.innerHTML="";
  $("goalEmpty").classList.toggle("hidden", state.goals.length>0);
  state.goals.forEach((g,i)=>{
    const d=document.createElement("div"); d.className="goal-card";
    d.innerHTML=`<div style="font-weight:900">${g.done?"✅":"🎯"} ${esc(g.text)}</div>
      <div class="meta">
        <span class="chip ${g.prio==='عالية'?'high':g.prio==='منخفضة'?'low':''}">أولوية ${esc(g.prio)}</span>
        ${g.date?`<span class="chip">📅 ${esc(g.date)}</span>`:""}
        ${g.done?`<span class="chip ok">مُنجز</span>`:""}
      </div>
      <div class="goal-actions">
        <button class="btn" onclick="toggleGoal(${i})">${g.done?"إعادة فتح":"أنجزته ✓"}</button>
        <button class="btn" onclick="delGoal(${i})">حذف 🗑️</button>
      </div>`;
    list.appendChild(d);
  });
  renderStats();
}
function toggleGoal(i){ state.goals[i].done=!state.goals[i].done; save(); renderGoals(); }
function delGoal(i){ state.goals.splice(i,1); save(); renderGoals(); }

/* ============ مركز الدرجات ============ */
function addExam(){
  const s=$("examSubject").value.trim(), v=parseFloat($("examScore").value);
  if(!s||isNaN(v)){ toast("أدخل المادة والدرجة 📊"); return; }
  state.exams.push({s:s, v:v}); $("examSubject").value=""; $("examScore").value="";
  save(); renderExams(); toast("سُجلت الدرجة ✅");
}
function renderExams(){
  const ul=$("examList"); ul.innerHTML="";
  $("examsEmpty").classList.toggle("hidden", state.exams.length>0);
  $("mExams").textContent = state.exams.length;
  $("mAvg").textContent = state.exams.length ? Math.round(state.exams.reduce((a,e)=>a+e.v,0)/state.exams.length) : "—";
  $("mTop").textContent = state.exams.length ? Math.max(...state.exams.map(e=>e.v)) : "—";
  state.exams.forEach((e,i)=>{ const li=document.createElement("li");
    li.innerHTML=`📊 ${esc(e.s)} — <b>${e.v}</b><button class="del" onclick="delExam(${i})">🗑️</button>`; ul.appendChild(li); });
}
function delExam(i){ state.exams.splice(i,1); save(); renderExams(); }

/* ============ قاعة الإنجازات ============ */
let achImage=null;
$("achFile").addEventListener("change", ev=>{
  const f=ev.target.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=()=>{ achImage=r.result; const dz=$("achDrop"); dz.classList.add("filled"); dz.textContent="✅ تم اختيار الصورة: "+f.name; };
  r.readAsDataURL(f);
});
function addAch(){
  const t=$("achTitle").value.trim();
  if(!t){ toast("اكتب عنوان الإنجاز 🏆"); return; }
  state.achs.unshift({t:t, d:$("achDesc").value.trim(), img:achImage});
  $("achTitle").value=""; $("achDesc").value=""; achImage=null;
  const dz=$("achDrop"); dz.classList.remove("filled"); dz.textContent="إضافة صورة 📤";
  save(); renderAch(); toast("أُضيف إنجاز جديد إلى المعرض! 🏆");
}
function renderAch(){
  const gal=$("achGal"); gal.innerHTML="";
  $("achEmpty").classList.toggle("hidden", state.achs.length>0);
  state.achs.forEach((a,i)=>{
    const fig=document.createElement("figure");
    fig.innerHTML=`${a.img?`<img src="${a.img}" alt="${esc(a.t)}">`:`<div style="height:120px;display:grid;place-items:center;font-size:2.4rem">🏆</div>`}
      <figcaption>${esc(a.t)}${a.d?`<div style="color:var(--muted);font-weight:400">${esc(a.d)}</div>`:""}</figcaption>
      <button class="del" onclick="delAch(${i})">حذف 🗑️</button>`;
    gal.appendChild(fig);
  });
}
function delAch(i){ state.achs.splice(i,1); save(); renderAch(); }

/* ============ بريد المستقبل ============ */
function saveMail(){
  const v=$("mailText").value.trim();
  if(!v){ toast("اكتب رسالتك أولاً 💌"); return; }
  state.mail={text:v, date:state.mailDate||"", created:new Date().toLocaleDateString("ar")};
  save(); renderMail(); toast("أُرسلت رسالتك إلى المستقبل! 💌");
}
function renderMail(){
  $("mailSaved").classList.toggle("hidden", !state.mail);
  if(state.mail){ $("mailSavedInfo").textContent="تاريخ الإنشاء: "+state.mail.created+(state.mail.date?" · تاريخ الفتح: "+state.mail.date:""); }
}
function readMail(){ toast("💌 "+(state.mail?state.mail.text:"")); }

/* ============ تعديل الملف الشخصي ============ */
let editGrade=null, editChar=null;
function openEditModal(){
  editGrade=state.grade; editChar=state.char;
  $("editName").value=state.name||"";
  document.querySelectorAll("#editGrades .tab").forEach(b=>{
    b.classList.toggle("active", b.dataset.g===state.grade);
    b.onclick=()=>{ editGrade=b.dataset.g; document.querySelectorAll("#editGrades .tab").forEach(x=>x.classList.toggle("active",x===b)); };
  });
  const ap=$("editChars"); ap.innerHTML="";
  chars.forEach(c=>{
    const o=document.createElement("div"); o.className="opt"+(c.id===state.char?" sel":"");
    o.innerHTML=`<img src="${sprites[c.id]}" alt="${c.name}">`;
    o.onclick=()=>{ editChar=c.id; document.querySelectorAll("#editChars .opt").forEach(x=>x.classList.toggle("sel",x===o)); };
    ap.appendChild(o);
  });
  $("editModal").classList.add("open");
}
function closeEditModal(){ $("editModal").classList.remove("open"); }
function saveProfile(){
  const n=$("editName").value.trim(); if(n) state.name=n;
  state.grade=editGrade||state.grade; state.char=editChar||state.char;
  save(); closeEditModal(); startDash(); toast("حُفظ الملف الشخصي ✅");
}

/* ============ إقلاع ============ */
document.querySelectorAll(".modal-bg").forEach(m=>m.addEventListener("click", e=>{ if(e.target===m) m.classList.remove("open"); }));
if(state.name){ startDash(); } else { renderChar(); $("charImg").src=sprites.salem; }
initDaily();

window.sl_$=$;
window.sl_addAch=addAch;
window.sl_addExam=addExam;
window.sl_addGoal=addGoal;
window.sl_addSubject=addSubject;
window.sl_addTask=addTask;
window.sl_addWeekTask=addWeekTask;
window.sl_buildCal=buildCal;
window.sl_buildDp=buildDp;
window.sl_buildSprite=buildSprite;
window.sl_buildWeek=buildWeek;
window.sl_calNav=calNav;
window.sl_closeDateModal=closeDateModal;
window.sl_closeEditModal=closeEditModal;
window.sl_confirmDate=confirmDate;
window.sl_delAch=delAch;
window.sl_delExam=delExam;
window.sl_delGoal=delGoal;
window.sl_delSubject=delSubject;
window.sl_delTask=delTask;
window.sl_delWeekTask=delWeekTask;
window.sl_dpNav=dpNav;
window.sl_enterCity=enterCity;
window.sl_goHome=goHome;
window.sl_initDaily=initDaily;
window.sl_logout=logout;
window.sl_nextChar=nextChar;
window.sl_openDatePicker=openDatePicker;
window.sl_openDayEditor=openDayEditor;
window.sl_openEditModal=openEditModal;
window.sl_openMailPicker=openMailPicker;
window.sl_openView=openView;
window.sl_pickChar=pickChar;
window.sl_prevChar=prevChar;
window.sl_readMail=readMail;
window.sl_refreshWeek=refreshWeek;
window.sl_renderAch=renderAch;
window.sl_renderChar=renderChar;
window.sl_renderExams=renderExams;
window.sl_renderGoals=renderGoals;
window.sl_renderMail=renderMail;
window.sl_renderStats=renderStats;
window.sl_renderSubjects=renderSubjects;
window.sl_renderTasks=renderTasks;
window.sl_save=save;
window.sl_saveMail=saveMail;
window.sl_saveProfile=saveProfile;
window.sl_showStep=showStep;
window.sl_startDash=startDash;
window.sl_switchPlan=switchPlan;
window.sl_toast=toast;
window.sl_toggleGoal=toggleGoal;
window.sl_toggleTask=toggleTask;
window.sl_toggleWeekTask=toggleWeekTask;
window.sl_water=water;
window.sl_weekObj=weekObj;

window.sl_refresh=function(){ try{ if(state.name){startDash();} renderStats(); }catch(e){} };

})();
