const plan = [
  { name:'Strength + first step', focus:'Lower-body strength & acceleration', duration:'70 min', effort:'7 / 10', desc:'Build a strong base, then make it count in your first two steps.', blocks:[['Prime','8 min · Dynamic mobility, ankle rocks, hip openers, glute activation'],['Strength','3 × 6 split squats each side · 3 × 6 Romanian deadlifts · Rest 90 sec'],['Court speed','6 × 10 m accelerations · 4 × 3 split-step to chasse reps each side'],['Reset','5 min easy walk, calves and hip flexors'] ]},
  { name:'Court movement + intervals', focus:'Footwork repeatability', duration:'65 min', effort:'7 / 10', desc:'Stay balanced through the corners and recover to base after every shot.', blocks:[['Prime','8 min · Light skipping, dynamic mobility, 3 progressive shadow rounds'],['Footwork','4 × 45 sec six-corner shadow · 60 sec rest · Stay smooth and balanced'],['Intervals','2 sets of 6 × 20 sec court movement / 40 sec easy · 3 min between sets'],['Reset','5 min easy movement and relaxed breathing'] ]},
  { name:'Upper body + trunk', focus:'Shoulder capacity & rotation control', duration:'55 min', effort:'6 / 10', desc:'Support overhead work with controlled pulling, pressing and trunk stability.', blocks:[['Prime','6 min · Band pull-aparts, wall slides, thoracic rotations'],['Strength','3 × 8 cable or band rows · 3 × 8 push-ups · 3 × 10 external rotations'],['Trunk','3 rounds: 8 dead bugs each side · 10 side-plank reaches each side'],['Reset','Easy shoulder and upper-back mobility · Keep every rep pain-free'] ]},
  { name:'Speed + skill quality', focus:'Reaction, braking & clean technique', duration:'60 min', effort:'6 / 10', desc:'Short, crisp court work. Stop the speed drills when your footwork gets sloppy.', blocks:[['Prime','8 min · Dynamic warm-up and 3 gradual split-step starts'],['Reaction','6 × 5 sec coach or partner cue starts · 45 sec rest'],['Braking','3 × 4 controlled lunge-and-recover reps each side · 60 sec rest'],['Skills','20 min focused serve, return or net quality · Finish while sharp'] ]},
  { name:'Strength + power', focus:'Whole-body strength & jump control', duration:'65 min', effort:'7 / 10', desc:'Move with intent and land quietly. Keep at least two good reps in reserve.', blocks:[['Prime','8 min · Mobility, glute activation and low pogo hops'],['Power','3 × 4 low countermovement jumps · 60–90 sec rest · Skip if sore'],['Strength','3 × 6 hip hinge · 3 × 8 step-ups each side · 3 × 10 calf raises'],['Reset','5 min easy walk and ankle mobility'] ]},
  { name:'Match play + review', focus:'Tactical transfer & aerobic base', duration:'75 min', effort:'6–8 / 10', desc:'Use the court session to practise decisions under pressure, not just to get tired.', blocks:[['Prime','10 min · Progressive warm-up, footwork and easy rallies'],['Play','3–5 games or 4 × 6 min conditioned games · 2 min easy between'],['Review','Write one pattern that worked and one decision to practise next week'],['Reset','5–10 min easy cool-down · Eat, drink and recover'] ]},
  { name:'Rest + recharge', focus:'Full rest or gentle recovery', duration:'Optional', effort:'2 / 10', desc:'A real recovery day helps you bring quality to the next training week. Skip hard conditioning.', blocks:[['Option','15–25 min easy walk or relaxed cycling'],['Mobility','10 min gentle, comfortable mobility if it feels good'],['Recover','Prioritise sleep, regular meals and fluids · No session to make up'] ]}
];
const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const logs = JSON.parse(localStorage.getItem('shuttle_logs') || '{}');
let profile = JSON.parse(localStorage.getItem('shuttle_profile') || '{}');
let weekOffset = 0;
let selectedDate = new Date();
let installEvent = null;
const $ = selector => document.querySelector(selector);
const keyFor = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const mondayOf = date => { const d = new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate() - ((d.getDay()+6)%7)); return d; };
const weekStart = () => { const d = mondayOf(new Date()); d.setDate(d.getDate()+weekOffset*7); return d; };
const safeDate = d => new Date(d.getFullYear(),d.getMonth(),d.getDate());
const escapeHtml = s => String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render() {
  const start = weekStart();
  const end = new Date(start); end.setDate(end.getDate()+6);
  $('#week-label').textContent = `${start.toLocaleDateString('en',{month:'short',day:'numeric'})} — ${end.toLocaleDateString('en',{month:'short',day:'numeric'})}`;
  const today = new Date();
  $('#today-label').textContent = profile.focus ? `SEASON FOCUS · ${profile.focus.toUpperCase()}` : today.toLocaleDateString('en',{weekday:'long',month:'long',day:'numeric'}).toUpperCase();
  const strip = $('#week-strip'); strip.innerHTML = '';
  for (let i=0;i<7;i++) {
    const date=new Date(start); date.setDate(date.getDate()+i); const key=keyFor(date);
    const chip=document.createElement('button'); chip.type='button';
    chip.className=`day-chip ${i===6?'rest':'training'} ${logs[key]?'complete':''} ${key===keyFor(selectedDate)?'selected':''}`;
    chip.setAttribute('aria-label',`${dayNames[i]} ${date.getDate()}${logs[key]?', completed':''}`);
    chip.innerHTML=`<span class="day-name">${dayNames[i]}</span><span class="day-date">${date.getDate()}</span><i class="day-mark"></i>`;
    chip.addEventListener('click',()=>{selectedDate=date;render();}); strip.append(chip);
  }
  const dayIndex=(selectedDate.getDay()+6)%7;
  const workout=plan[dayIndex], key=keyFor(selectedDate), done=!!logs[key];
  const dateLabel=selectedDate.toLocaleDateString('en',{weekday:'long',month:'short',day:'numeric'});
  const card=$('#session-card'); card.className=`session-card ${dayIndex===6?'rest-card':''}`;
  card.innerHTML=`<div class="session-top"><span class="session-kicker">${dateLabel} · ${dayIndex===6?'RECOVERY':'SESSION '+String(dayIndex+1).padStart(2,'0')}</span><span class="session-tag">${dayIndex===6?'RESET':'ON-COURT READY'}</span></div><h2>${workout.name}</h2><p class="session-desc">${workout.desc}</p><div class="session-stats"><div class="stat"><b>${workout.duration}</b><small>Duration</small></div><div class="stat"><b>${workout.effort}</b><small>Target effort</small></div><div class="stat"><b>${workout.focus}</b><small>Session focus</small></div></div><div class="session-blocks">${workout.blocks.map((b,i)=>`<div class="session-block"><span class="block-num">${String(i+1).padStart(2,'0')}</span><div><p class="block-title">${b[0]}</p><p class="block-detail">${b[1]}</p></div></div>`).join('')}</div>${dayIndex===6?'':`<div class="session-footer"><span class="effort">Train at <b>RPE ${workout.effort.split(' ')[0]}</b> · Smooth reps first</span><button class="complete-button ${done?'done':''}" id="complete-button">${done?'✓ Done today':'Mark complete'}</button></div>`}`;
  const count=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return i<6&&logs[keyFor(d)]?1:0;}).reduce((a,b)=>a+b,0);
  $('#progress-count').textContent=`${count} / 6`; $('#progress-fill').style.width=`${Math.round(count/6*100)}%`; $('#progress-percent').textContent=`${Math.round(count/6*100)}%`;
  $('#streak-number').textContent=calculateStreak();
  $('#profile-button').textContent=profile.name?profile.name.trim()[0].toUpperCase():'A';
  const button=$('#complete-button'); if(button) button.addEventListener('click',()=>{if(logs[key])delete logs[key];else logs[key]=true;localStorage.setItem('shuttle_logs',JSON.stringify(logs));render();toast(logs[key]?'Session logged. Nice work.':'Session unmarked.');});
}
function calculateStreak(){let date=safeDate(new Date());if(!logs[keyFor(date)])date.setDate(date.getDate()-1);let streak=0;for(let i=0;i<366;i++){if(!logs[keyFor(date)])break;streak++;date.setDate(date.getDate()-1);}return streak;}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2100);}
$('#week-prev').addEventListener('click',()=>{weekOffset--;const d=weekStart();selectedDate=d;render();});
$('#week-next').addEventListener('click',()=>{weekOffset++;const d=weekStart();selectedDate=d;render();});
$('#profile-button').addEventListener('click',()=>{$('#name-input').value=profile.name||'';$('#focus-input').value=profile.focus||'';$('#profile-dialog').showModal();});
$('#save-profile').addEventListener('click',()=>{profile={name:$('#name-input').value.trim(),focus:$('#focus-input').value.trim()};localStorage.setItem('shuttle_profile',JSON.stringify(profile));setTimeout(render,0);});
$('#share-button').addEventListener('click',async()=>{const data={title:'Shuttle badminton training',text:'A focused weekly training planner for competitive badminton players.',url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(location.href);toast('Link copied to clipboard.');}}catch(e){}});
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;$('#install-button').hidden=false;});
$('#install-button').addEventListener('click',async()=>{if(!installEvent)return;installEvent.prompt();await installEvent.userChoice;installEvent=null;$('#install-button').hidden=true;});
document.querySelectorAll('.nav-item[href="#progress"]').forEach(item=>item.addEventListener('click',()=>$('#progress-count').scrollIntoView({behavior:'smooth',block:'center'})));
if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
render();
