const plan = [
  { name:'Strength + first step', focus:'Lower-body strength & acceleration', duration:'70 min', effort:'7 / 10', desc:'Build a strong base, then make it count in your first two steps.', blocks:[['Prime','8 min · Dynamic mobility, ankle rocks, hip openers, glute activation'],['Strength','3 × 6 split squats each side · 3 × 6 Romanian deadlifts · Rest 90 sec'],['Court speed','6 × 10 m accelerations · 4 × 3 split-step to chasse reps each side'],['Reset','5 min easy walk, calves and hip flexors'] ]},
  { name:'Court movement + intervals', focus:'Footwork repeatability', duration:'65 min', effort:'7 / 10', desc:'Stay balanced through the corners and recover to base after every shot.', blocks:[['Prime','8 min · Light skipping, dynamic mobility, 3 progressive shadow rounds'],['Footwork','4 × 45 sec six-corner shadow · 60 sec rest · Stay smooth and balanced'],['Intervals','2 sets of 6 × 20 sec court movement / 40 sec easy · 3 min between sets'],['Reset','5 min easy movement and relaxed breathing'] ]},
  { name:'Upper body + trunk', focus:'Shoulder capacity & rotation control', duration:'55 min', effort:'6 / 10', desc:'Support overhead work with controlled pulling, pressing and trunk stability.', blocks:[['Prime','6 min · Band pull-aparts, wall slides, thoracic rotations'],['Strength','3 × 8 cable or band rows · 3 × 8 push-ups · 3 × 10 external rotations'],['Trunk','3 rounds: 8 dead bugs each side · 10 side-plank reaches each side'],['Reset','Easy shoulder and upper-back mobility · Keep every rep pain-free'] ]},
  { name:'Speed + skill quality', focus:'Reaction, braking & clean technique', duration:'60 min', effort:'6 / 10', desc:'Short, crisp court work. Stop the speed drills when your footwork gets sloppy.', blocks:[['Prime','8 min · Dynamic warm-up and 3 gradual split-step starts'],['Reaction','6 × 5 sec coach or partner cue starts · 45 sec rest'],['Braking','3 × 4 controlled lunge-and-recover reps each side · 60 sec rest'],['Skills','20 min focused serve, return or net quality · Finish while sharp'] ]},
  { name:'Strength + power', focus:'Whole-body strength & jump control', duration:'65 min', effort:'7 / 10', desc:'Move with intent and land quietly. Keep at least two good reps in reserve.', blocks:[['Prime','8 min · Mobility, glute activation and low pogo hops'],['Power','3 × 4 low countermovement jumps · 60–90 sec rest · Skip if sore'],['Strength','3 × 6 hip hinge · 3 × 8 step-ups each side · 3 × 10 calf raises'],['Reset','5 min easy walk and ankle mobility'] ]},
  { name:'Match play + review', focus:'Tactical transfer & aerobic base', duration:'75 min', effort:'6–8 / 10', desc:'Use the court session to practise decisions under pressure, not just to get tired.', blocks:[['Prime','10 min · Progressive warm-up, footwork and easy rallies'],['Play','3–5 games or 4 × 6 min conditioned games · 2 min easy between'],['Review','Write one pattern that worked and one decision to practise next week'],['Reset','5–10 min easy cool-down · Eat, drink and recover'] ]},
  { name:'Rest + recharge', focus:'Full rest or gentle recovery', duration:'Optional', effort:'2 / 10', desc:'A real recovery day helps you bring quality to the next training week. Skip hard conditioning.', blocks:[['Option','15–25 min easy walk or relaxed cycling'],['Mobility','10 min gentle, comfortable mobility if it feels good'],['Recover','Prioritise sleep, regular meals and fluids · No session to make up'] ]}
];
// Guided steps use elapsed-time timers so interval/rest blocks advance reliably
// even when the browser is backgrounded or the phone screen is locked.
const guidedSessions = [
  [
    ['Dynamic warm-up',480,'warmup','Move smoothly through ankle rocks, hip openers, leg swings and glute activation. Build warmth without rushing.'],
    ['Split squat',600,'squat','Take a comfortable split stance. Lower the back knee under control, keep the front foot planted, then drive through the whole front foot. Alternate sides.'],
    ['Rest between strength sets',90,'rest','Walk gently, breathe, and get set for the next strength set. Keep the rest easy.'],
    ['Romanian deadlift',600,'hinge','Soften your knees, push your hips back and keep your back long. Lower only as far as you can control, then stand tall by driving your hips forward.'],
    ['Rest and prepare',90,'rest','Shake out your legs and prepare a clear 10 metre lane.'],
    ['10 metre acceleration',720,'run','Start balanced. Push the ground behind you, take quick controlled first steps and stop smoothly. Walk back before the next effort.'],
    ['Split-step to chasse',900,'footwork','Make a small split-step as your partner or coach cues a corner. Push off the outside foot, chasse with control, then recover to base. Practise both sides.'],
    ['Cool-down walk',300,'stretch','Walk easily and let your breathing settle. Finish with gentle calf and hip-flexor mobility.']
  ],
  [
    ['Progressive warm-up',480,'warmup','Start with light skipping or jogging, then add dynamic leg swings and three gradually quicker shadow rounds.'],
    ['Six-corner shadow footwork',720,'footwork','Begin at base. Move to one corner with short balanced steps, shadow the shot, then recover to base before moving again. Keep the pace smooth.'],
    ['Easy recovery',180,'rest','Walk, sip water and let your breathing settle before the interval set.'],
    ['Court movement intervals',1080,'run','Repeat 20 seconds of sharp but tidy court movement, then 40 seconds easy. Complete six rounds, recover, and repeat the set. Stop if your footwork loses control.'],
    ['Between-set recovery',120,'rest','Walk slowly for two minutes. Start the next drill only when you can move well.'],
    ['Serve and return quality',900,'racket','Practise relaxed serves and returns with a partner. Reset your stance after every shuttle and focus on clean placement rather than power.'],
    ['Easy cool-down',300,'stretch','Walk gently and use comfortable ankle, calf and hip mobility.']
  ],
  [
    ['Shoulder warm-up',360,'shoulder','Use easy band pull-aparts, wall slides and upper-back rotations. Keep the range comfortable and pain-free.'],
    ['Rows and push-ups',900,'pushup','Alternate controlled band or cable rows with push-ups. Keep your ribs quiet, shoulders relaxed and each repetition smooth.'],
    ['Set recovery',60,'rest','Rest for one minute, breathe calmly and prepare your band.'],
    ['External rotations',300,'shoulder','Keep your elbow close to your side and rotate the forearm outward against a light band. Use a small, controlled range on both sides.'],
    ['Trunk stability',720,'plank','Alternate dead bugs and side-plank reaches. Keep the trunk steady; shorten the lever or range if you cannot hold a comfortable position.'],
    ['Upper-back reset',660,'stretch','Finish with relaxed shoulder and upper-back mobility. Do not force a stretch or work through pain.']
  ],
  [
    ['Dynamic warm-up',480,'warmup','Move through easy court steps, leg swings and three gradual split-step starts. Increase speed only as you feel ready.'],
    ['Reaction starts',360,'run','Start in a ready stance. On a coach or partner cue, push off quickly for a few steps, then decelerate under control. Reset fully between starts.'],
    ['Recovery between starts',45,'rest','Stand or walk gently. Keep your next effort crisp rather than rushed.'],
    ['Lunge and recover',480,'lunge','Reach into a comfortable lunge with the knee tracking over the foot. Keep your chest balanced, push back to base and alternate sides.'],
    ['Lunge recovery',60,'rest','Walk back to your starting position and check your balance before continuing.'],
    ['Serve, return or net quality',1200,'racket','Choose one skill. Use deliberate repetitions and consistent recovery to ready position. Pause briefly between groups; finish while your technique is sharp.'],
    ['Easy cool-down',300,'stretch','Walk easily, then use gentle shoulder and leg mobility.']
  ],
  [
    ['Power warm-up',480,'warmup','Start with mobility and glute activation. Add a few very low pogo hops only if you feel fresh and pain-free.'],
    ['Low countermovement jumps',360,'jump','Dip only a little, jump vertically with quiet intent and land softly with knees tracking over your feet. Reset between jumps; skip if sore.'],
    ['Full recovery',90,'rest','Rest between power sets. Take the full recovery so each landing stays controlled.'],
    ['Hip hinge strength',600,'hinge','Use a light, manageable load. Push the hips back with a long spine, then stand by driving through your feet. Stop before your back rounds.'],
    ['Set recovery',90,'rest','Walk gently and set up the step-up station safely.'],
    ['Step-ups and calf raises',900,'squat','Step onto a stable low platform, drive through the whole foot and lower slowly. Alternate sides, then finish with controlled calf raises.'],
    ['Easy walk and ankle mobility',600,'stretch','Walk at an easy pace and move your ankles gently through a comfortable range.']
  ],
  [
    ['Progressive rally warm-up',600,'warmup','Begin with easy movement and short cooperative rallies. Gradually add footwork and pace while staying relaxed.'],
    ['Conditioned game one',1920,'racket','Play a game with one tactical focus, such as creating space before attacking. Keep good court recovery and take a brief pause between games.'],
    ['Between-game recovery',180,'rest','Sit or walk lightly, sip water and recall your tactical focus.'],
    ['Conditioned game two',1200,'racket','Play another game or drill under the same tactical focus. Notice which decisions create a good next shot.'],
    ['Match review',480,'stretch','Write down one pattern that worked and one decision to practise next week. Keep this calm and specific.'],
    ['Cool-down',420,'stretch','Walk easily and breathe slowly until settled. Finish with comfortable mobility and begin your usual recovery routine.']
  ]
];
const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const logs = JSON.parse(localStorage.getItem('shuttle_logs') || '{}');
let profile = JSON.parse(localStorage.getItem('shuttle_profile') || '{}');
let weekOffset = 0;
let selectedDate = new Date();
let installEvent = null;
let runnerDay = 0;
let runnerIndex = 0;
let runnerMode = 'preview';
let runnerTimer = null;
let stepEndsAt = 0;
let remainingMs = 0;
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
  card.innerHTML=`<div class="session-top"><span class="session-kicker">${dateLabel} · ${dayIndex===6?'RECOVERY':'SESSION '+String(dayIndex+1).padStart(2,'0')}</span><span class="session-tag">${dayIndex===6?'RESET':'ON-COURT READY'}</span></div><h2>${workout.name}</h2><p class="session-desc">${workout.desc}</p><div class="session-stats"><div class="stat"><b>${workout.duration}</b><small>Duration</small></div><div class="stat"><b>${workout.effort}</b><small>Target effort</small></div><div class="stat"><b>${workout.focus}</b><small>Session focus</small></div></div><div class="session-blocks">${workout.blocks.map((b,i)=>`<div class="session-block"><span class="block-num">${String(i+1).padStart(2,'0')}</span><div><p class="block-title">${b[0]}</p><p class="block-detail">${b[1]}</p></div></div>`).join('')}</div>${dayIndex===6?'':`<div class="session-footer"><span class="effort">Train at <b>RPE ${workout.effort.split(' ')[0]}</b> · Smooth reps first</span><div class="session-actions"><button class="guided-button" id="open-workout">Preview &amp; start</button><button class="complete-button ${done?'done':''}" id="complete-button">${done?'✓ Done today':'Mark complete'}</button></div></div>`}`;
  const count=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return i<6&&logs[keyFor(d)]?1:0;}).reduce((a,b)=>a+b,0);
  $('#progress-count').textContent=`${count} / 6`; $('#progress-fill').style.width=`${Math.round(count/6*100)}%`; $('#progress-percent').textContent=`${Math.round(count/6*100)}%`;
  $('#streak-number').textContent=calculateStreak();
  $('#profile-button').textContent=profile.name?profile.name.trim()[0].toUpperCase():'A';
  const openWorkout=$('#open-workout'); if(openWorkout) openWorkout.addEventListener('click',openRunner);
  const button=$('#complete-button'); if(button) button.addEventListener('click',()=>{if(logs[key])delete logs[key];else logs[key]=true;localStorage.setItem('shuttle_logs',JSON.stringify(logs));render();toast(logs[key]?'Session logged. Nice work.':'Session unmarked.');});
}
function openRunner(){
  runnerDay=(selectedDate.getDay()+6)%7; runnerIndex=0; runnerMode='preview'; clearInterval(runnerTimer); runnerTimer=null;
  $('#runner-timer').hidden=true; $('#preview-actions').hidden=false; $('#timer-actions').hidden=true;
  $('#preview-previous').hidden=false; $('#preview-next').hidden=false; $('#start-workout').textContent='Start workout';
  $('#runner-kicker').textContent='MOVEMENT PREVIEW'; $('#runner-title').textContent=plan[runnerDay].name;
  $('#workout-dialog').showModal(); renderRunnerStep();
}
function renderRunnerStep(){
  const steps=guidedSessions[runnerDay], step=steps[runnerIndex];
  $('#runner-step-count').textContent=`MOVEMENT ${String(runnerIndex+1).padStart(2,'0')} OF ${String(steps.length).padStart(2,'0')} · ${formatTime(step[1])}`;
  $('#runner-step-name').textContent=step[0]; $('#runner-step-cue').textContent=step[3];
  const athlete=$('#athlete'); athlete.className=`athlete pose-${step[2]}`; athlete.setAttribute('aria-label',`${step[0]} movement demonstration`);
  $('#preview-previous').disabled=runnerIndex===0; $('#preview-next').disabled=runnerIndex===steps.length-1;
  $('#preview-actions').hidden=runnerMode!=='preview'; $('#timer-actions').hidden=runnerMode!=='running'&&runnerMode!=='paused';
  $('#runner-timer').hidden=runnerMode==='preview';
  if(runnerMode==='running'||runnerMode==='paused'){
    $('#runner-kicker').textContent=runnerMode==='paused'?'PAUSED':'GUIDED WORKOUT';
    $('#runner-title').textContent=plan[runnerDay].name;
    $('#timer-caption').textContent=step[2]==='rest'?'RECOVERY':'TIME LEFT';
    $('#pause-workout').textContent=runnerMode==='paused'?'Resume':'Pause';
    $('#skip-step').textContent=runnerIndex===steps.length-1?'Finish':'Next';
    updateTimerDisplay();
  }
}
function formatTime(totalSeconds){const seconds=Math.max(0,Math.ceil(totalSeconds));return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
function updateTimerDisplay(){
  const step=guidedSessions[runnerDay][runnerIndex], durationMs=step[1]*1000;
  remainingMs=runnerMode==='running'?Math.max(0,stepEndsAt-Date.now()):remainingMs;
  $('#timer-clock').textContent=formatTime(remainingMs/1000);
  $('#timer-fill').style.width=`${Math.min(100,Math.max(0,(1-remainingMs/durationMs)*100))}%`;
  if(runnerMode==='running'&&remainingMs<=0)advanceRunner();
}
function startCurrentStep(){
  runnerMode='running'; stepEndsAt=Date.now()+(remainingMs||guidedSessions[runnerDay][runnerIndex][1]*1000); remainingMs=0;
  clearInterval(runnerTimer); runnerTimer=setInterval(updateTimerDisplay,250); renderRunnerStep();
}
function startWorkout(){runnerMode='running';remainingMs=guidedSessions[runnerDay][runnerIndex][1]*1000;startCurrentStep();}
function advanceRunner(){
  clearInterval(runnerTimer); runnerTimer=null;
  if(navigator.vibrate) navigator.vibrate([120,60,120]);
  if(runnerIndex>=guidedSessions[runnerDay].length-1){
    runnerMode='complete'; $('#runner-kicker').textContent='SESSION COMPLETE'; $('#runner-title').textContent='Strong work.';
    $('#runner-step-count').textContent='YOU FINISHED TODAY’S GUIDED SESSION'; $('#runner-step-name').textContent='Cool down and recover';
    $('#runner-step-cue').textContent='Let your breathing settle, drink according to your needs and log the session when you are ready.';
    $('#runner-timer').hidden=true; $('#preview-actions').hidden=false; $('#preview-previous').hidden=true; $('#preview-next').hidden=true;
    $('#start-workout').textContent='Done';
    const athlete=$('#athlete'); athlete.className='athlete pose-stretch';
    const key=keyFor(selectedDate); logs[key]=true; localStorage.setItem('shuttle_logs',JSON.stringify(logs)); render();
    return;
  }
  runnerIndex++; remainingMs=guidedSessions[runnerDay][runnerIndex][1]*1000; runnerMode='running';
  startCurrentStep(); toast(`${guidedSessions[runnerDay][runnerIndex][0]} next`);
}
function closeRunner(){clearInterval(runnerTimer);runnerTimer=null;runnerMode='preview';const dialog=$('#workout-dialog');if(dialog.open)dialog.close();}
$('#runner-close').addEventListener('click',closeRunner);
$('#preview-previous').addEventListener('click',()=>{if(runnerIndex>0){runnerIndex--;renderRunnerStep();}});
$('#preview-next').addEventListener('click',()=>{if(runnerIndex<guidedSessions[runnerDay].length-1){runnerIndex++;renderRunnerStep();}});
$('#start-workout').addEventListener('click',()=>{if(runnerMode==='complete'){closeRunner();return;}runnerMode='running';remainingMs=guidedSessions[runnerDay][runnerIndex][1]*1000;startCurrentStep();});
$('#pause-workout').addEventListener('click',()=>{
  if(runnerMode==='running'){remainingMs=Math.max(0,stepEndsAt-Date.now());clearInterval(runnerTimer);runnerTimer=null;runnerMode='paused';renderRunnerStep();}
  else if(runnerMode==='paused')startCurrentStep();
});
$('#skip-step').addEventListener('click',advanceRunner);
$('#end-workout').addEventListener('click',()=>{closeRunner();toast('Workout timer stopped.');});
$('#workout-dialog').addEventListener('click',event=>{if(event.target===$('#workout-dialog'))closeRunner();});
$('#workout-dialog').addEventListener('cancel',()=>{clearInterval(runnerTimer);runnerTimer=null;runnerMode='preview';});
let dragX=null, dragYaw=-18;
$('#model-scene').addEventListener('pointerdown',event=>{dragX=event.clientX;$('#model-scene').setPointerCapture(event.pointerId);});
$('#model-scene').addEventListener('pointermove',event=>{if(dragX===null)return;dragYaw+=(event.clientX-dragX)*.7;dragX=event.clientX;$('#athlete').style.setProperty('--yaw',`${dragYaw}deg`);});
$('#model-scene').addEventListener('pointerup',()=>{dragX=null;});
$('#model-scene').addEventListener('pointercancel',()=>{dragX=null;});
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

