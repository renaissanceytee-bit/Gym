const STORAGE_KEY="ascend-demo-v1";
const initial={missions:[true,false,false],workouts:[],xp:1240,streak:7,weekCount:3,meals:[]};
let state;
try{state={...initial,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}}catch{state={...initial}}
const $=(s)=>document.querySelector(s);
const $$=(s)=>[...document.querySelectorAll(s)];
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2400)}
function render(){
  $$("#missions .mission input").forEach((input,i)=>{input.checked=!!state.missions[i];input.closest(".mission").classList.toggle("done",!!state.missions[i])});
  const count=state.missions.filter(Boolean).length;$("#mission-progress").textContent=count+"/3";
  $("#xp-count").textContent=state.xp.toLocaleString();$("#streak-count").textContent=state.streak;$("#workout-count").textContent=state.weekCount;
  if(state.workouts.length){const rows=state.workouts.slice(0,3).map(w=>`<div class="workout-row"><span class="workout-mark ${w.type.toLowerCase()==="cardio"?"cardio":"strength"}">${w.type.toLowerCase()==="cardio"?"⌁":"↗"}</span><span class="workout-info"><strong>${escapeHtml(w.name)}</strong><small>Today · ${w.duration} min · ${escapeHtml(w.type)}${w.notes?" · "+escapeHtml(w.notes):""}</small></span><span class="workout-stat">+${Math.max(25,Math.round(w.duration*2))} XP</span><span class="row-arrow">›</span></div>`).join("");$("#workout-list").innerHTML=rows+$("#workout-list").innerHTML}
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function localDate(){return new Intl.DateTimeFormat(undefined,{weekday:"long",month:"long",day:"numeric"}).format(new Date())}
function greet(){const h=new Date().getHours();const part=h<12?"morning":h<17?"afternoon":"evening";$("#greeting").innerHTML="Good "+part+", Jordan<span class=\"sun\">✳</span>";$("#today-label").textContent=localDate().toUpperCase()}
function nav(view){const title=view[0].toUpperCase()+view.slice(1);$("#page-label").textContent=title;$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));if(view!=="overview")toast(title+" view is coming in the next build step.")}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>nav(b.dataset.view)));
$$("[data-view]").forEach(b=>{if(!b.classList.contains("nav-item"))b.addEventListener("click",()=>nav(b.dataset.view))});
$("#missions").addEventListener("change",e=>{if(!e.target.matches("input"))return;const inputs=$$("#missions .mission input");state.missions=inputs.map(x=>x.checked);const complete=state.missions.filter(Boolean).length;state.xp+=e.target.checked?[50,30,20][inputs.indexOf(e.target)]:-[50,30,20][inputs.indexOf(e.target)];if(complete===3)state.xp+=50;save();render();toast(complete===3?"All missions complete! +50 bonus XP":"Mission progress saved")});
const dialog=$("#workout-dialog");$("#start-workout").addEventListener("click",()=>dialog.showModal());
$("#workout-form").addEventListener("submit",e=>{e.preventDefault();const workout={name:$("#workout-name").value.trim(),duration:Math.max(1,Number($("#workout-duration").value)),type:$("#workout-type").value,notes:$("#workout-notes").value.trim(),createdAt:Date.now()};if(!workout.name)return;state.workouts.unshift(workout);state.weekCount+=1;state.xp+=Math.max(25,Math.round(workout.duration*2));state.missions[0]=true;save();dialog.close();e.target.reset();$("#workout-duration").value=45;$("#workout-list").innerHTML='<div class="workout-row"><span class="workout-mark strength">↗</span><span class="workout-info"><strong>Upper body strength</strong><small>Yesterday · 48 min · Chest, Shoulders</small></span><span class="workout-stat">+120 XP</span><span class="row-arrow">›</span></div><div class="workout-row"><span class="workout-mark cardio">⌁</span><span class="workout-info"><strong>Easy recovery run</strong><small>Wednesday · 32 min · 3.2 mi</small></span><span class="workout-stat">+85 XP</span><span class="row-arrow">›</span></div><div class="workout-row"><span class="workout-mark strength">↗</span><span class="workout-info"><strong>Lower body power</strong><small>Monday · 55 min · Legs, Core</small></span><span class="workout-stat">+145 XP</span><span class="row-arrow">›</span></div>';render();toast("Workout saved · XP earned")});
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
greet();render();