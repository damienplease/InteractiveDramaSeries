/* THEATRE/LAB — original branching adaptation prototype.
   Default chapter duration: five minutes. For quick local testing append ?test=1 to the URL. */
const CHAPTER_SECONDS = new URLSearchParams(location.search).has("test") ? 15 : 300;
const STORAGE_KEY = "theatreLabGodsStoryV2";
const chapters = [
 {name:"The Prophecy",label:"THE PROPHECY",title:"A future spoken before it begins.",body:["The kingdom of Kutuje is unsettled by a warning about the future of its royal line. The words are not fully understood, but fear begins to influence the people who hear them.","A child has not yet had the chance to choose who he will become. Yet powerful adults are already deciding what his future should mean."],voice:"A kingdom waits. A warning has been spoken. And before a child can choose his future, others begin choosing it for him.",question:"How should the royal household respond to the prophecy?",choices:[
  {title:"Face the warning",desc:"Seek counsel and confront uncertainty openly.",tag:"COURAGE",effects:{courage:2,openness:1},branch:"open"},
  {title:"Keep it secret",desc:"Protect the royal household by concealing the warning.",tag:"SECRECY",effects:{secrecy:2,trust:-1},branch:"secret"},
  {title:"Follow tradition",desc:"Let established customs and elders guide the response.",tag:"TRADITION",effects:{tradition:2,community:1},branch:"tradition"}]},
 {name:"The Child",label:"A LIFE IN THE BALANCE",title:"A decision made in fear.",body:["The warning has become a private burden. The adults around the child must decide whether fear will guide their actions, or whether the child will be allowed a future beyond the prediction.","The choice cannot settle the truth of the prophecy. It can only reveal the values of those who act."],voice:"A child's future hangs between fear, custom and compassion.",question:"What should guide the decision about the child?",choices:[
  {title:"Choose compassion",desc:"Protect the child and refuse to treat a prediction as a verdict.",tag:"COMPASSION",effects:{compassion:2,courage:1},branch:"compassion"},
  {title:"Obey the warning",desc:"Treat the prophecy as an order that cannot be questioned.",tag:"FATALISM",effects:{fatalism:2,compassion:-1},branch:"fatalism"},
  {title:"Seek another voice",desc:"Ask a trusted adviser to challenge the household's assumptions.",tag:"COUNSEL",effects:{wisdom:2,openness:1},branch:"counsel"}]},
 {name:"The Rise of Odewale",label:"A NEW BEGINNING",title:"A new name, a new future.",body:["Years pass. Odewale grows into a respected and forceful leader. His life appears to be his own, yet the questions surrounding identity, authority and destiny have not disappeared.","The people of Kutuje look to their ruler for certainty. The way he responds to challenge will shape the trust between a leader and the community."],voice:"Years have passed. Odewale stands before a kingdom that expects strength, certainty and justice.",question:"When Odewale is challenged, how should he respond?",choices:[
  {title:"Listen carefully",desc:"Hear every side, even when the truth may be uncomfortable.",tag:"OPENNESS",effects:{wisdom:2,trust:2},branch:"listen"},
  {title:"Defend his authority",desc:"Act decisively so his leadership cannot be questioned.",tag:"PRIDE",effects:{pride:2,trust:-1},branch:"authority"},
  {title:"Consult the people",desc:"Invite the community to help establish what happened.",tag:"COMMUNITY",effects:{community:2,openness:1},branch:"people"}]},
 {name:"The Road to Kutuje",label:"THE JOURNEY",title:"The road that changes everything.",body:["A journey brings Odewale into a tense encounter. Anger, status and uncertainty meet in a moment that will later carry more meaning than anyone present can understand.","The earlier choices now colour the way this scene unfolds: some paths have encouraged patience, while others have strengthened secrecy or pride."],voice:"On the road, a brief encounter becomes a turning point. What is done in anger may outlive the anger itself.",question:"How should Odewale handle the confrontation?",choices:[
  {title:"Step away",desc:"Refuse to let anger make the decision.",tag:"RESTRAINT",effects:{wisdom:2,pride:-1},branch:"restraint"},
  {title:"Stand his ground",desc:"Protect his dignity and refuse to be intimidated.",tag:"DEFIANCE",effects:{pride:2,courage:1},branch:"defiance"},
  {title:"Seek understanding",desc:"Try to discover why the encounter has become hostile.",tag:"CURIOSITY",effects:{wisdom:1,compassion:1},branch:"understanding"}]},
 {name:"The Uncovering",label:"THE REVELATION",title:"The past enters the present.",body:["As fragments of the past come together, the people of Kutuje begin to question what they once believed. Odewale faces evidence that challenges his understanding of himself and the history around him.","The response is not simple. Earlier choices have shaped how much trust remains, how openly people speak and how prepared the community is to hear difficult truths."],voice:"The past is no longer distant. The truth is moving into the present, and every person must decide how to face it.",question:"What should Odewale do as the evidence gathers?",choices:[
  {title:"Demand the whole truth",desc:"Continue the search, regardless of the personal cost.",tag:"TRUTH",effects:{truth:2,courage:1},branch:"truth"},
  {title:"Protect the kingdom",desc:"Consider the stability of the people before public disclosure.",tag:"DUTY",effects:{community:2,secrecy:1},branch:"duty"},
  {title:"Question every account",desc:"Examine each claim carefully before reaching a conclusion.",tag:"DOUBT",effects:{wisdom:2,truth:1},branch:"question"}]},
 {name:"The Final Reckoning",label:"THE FINAL CHOICE",title:"Who is responsible?",body:["The truth has transformed the kingdom. The people look to their leader, while Odewale faces the consequences of a life shaped by choices, beliefs and forces beyond his understanding.","The final question is not simply what was foretold. It is what responsibility means when the truth is finally known."],voice:"The kingdom waits. The truth has arrived. Now comes the question of responsibility.",question:"How should this version of the story conclude?",choices:[
  {title:"Accept responsibility",desc:"Face the consequences and acknowledge the harm caused.",tag:"ACCOUNTABILITY",effects:{truth:2,courage:1},ending:"accountability"},
  {title:"Put the kingdom first",desc:"Choose a path focused on the future of the community.",tag:"DUTY",effects:{community:2,wisdom:1},ending:"kingdom"},
  {title:"Challenge the idea of fate",desc:"Ask whether prophecy excuses human choices at all.",tag:"FREE WILL",effects:{truth:1,courage:2},ending:"freewill"}]}
];
const endings={
 accountability:{title:"The Weight of Responsibility",copy:"Your path places accountability at the centre of the conclusion. The truth is faced rather than hidden, and the community must begin the difficult work of understanding what happened. This ending asks whether accepting responsibility can be the first step toward change.",question:"Can a person take responsibility even when they did not understand the full consequences of their actions?"},
 kingdom:{title:"A Kingdom Must Continue",copy:"Your choices place the community at the centre. The future of Kutuje becomes the urgent concern, and the people must decide how to rebuild trust. This ending asks what a leader owes to the people they serve.",question:"When personal truth and public responsibility collide, whose needs should come first?"},
 freewill:{title:"Beyond the Prophecy",copy:"Your path challenges the belief that a prediction removes human responsibility. The audience is left to consider the many decisions that shaped the tragedy, and whether different responses could have changed its course.",question:"Are people controlled by destiny, or do their choices give destiny its meaning?"}
};
let state=freshState(), timerId=null, audioCtx=null, ambientNodes=[], voiceOn=false, soundOn=false;
const $=id=>document.getElementById(id);
function freshState(){return {chapter:0,seconds:CHAPTER_SECONDS,choices:[],stats:{courage:0,openness:0,secrecy:0,trust:0,tradition:0,compassion:0,fatalism:0,wisdom:0,pride:0,community:0,truth:0},branchHistory:[],paused:true,ended:false,endingKey:null}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$("saveStatus").textContent="PROGRESS SAVED LOCALLY"}
function load(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved&&Array.isArray(saved.choices)&&saved.chapter<6&&!saved.ended){state={...freshState(),...saved,paused:true};return true}}catch(e){}return false}
function renderChapters(){ $("chapterList").innerHTML=chapters.map((c,i)=>`<div class="chapter-item ${i===state.chapter?"active":i<state.chapter?"done":""}"><span class="num">${String(i+1).padStart(2,"0")}</span><span>${c.name}</span></div>`).join("")}
function sceneVariant(){
 const stats=state.stats, previous=state.branchHistory;
 if(state.chapter===2 && stats.secrecy>stats.openness) return {sub:"A guarded arrival",extra:"Because the warning was concealed, Odewale's early life is surrounded by unanswered questions. The silence protected some people, but it also left others without the truth."};
 if(state.chapter===2 && stats.compassion>0) return {sub:"A life beyond the warning",extra:"The earlier choice to protect the child becomes part of the story's moral memory. Compassion did not erase uncertainty, but it resisted allowing fear to decide everything."};
 if(state.chapter===3 && stats.pride>=2) return {sub:"A tense encounter",extra:"Odewale's earlier insistence on authority makes this confrontation especially charged. A challenge to his status feels like a challenge to the order of the kingdom."};
 if(state.chapter===3 && stats.wisdom>=2) return {sub:"A moment for restraint",extra:"The earlier commitment to listen creates another possibility: Odewale can pause, ask questions and consider what he does not yet know."};
 if(state.chapter===4 && stats.trust<0) return {sub:"A divided community",extra:"Trust has been weakened by earlier secrecy and conflict. People hesitate before speaking, and each new account is met with suspicion."};
 if(state.chapter===4 && stats.trust>=2) return {sub:"Voices begin to gather",extra:"Earlier choices created a measure of trust. More people are willing to speak, allowing the picture of the past to become clearer."};
 if(state.chapter===5 && stats.truth>=2) return {sub:"A truth pursued",extra:"Your repeated commitment to uncovering the truth has brought the kingdom to a decisive moment. There is less room left for comfortable uncertainty."};
 if(state.chapter===5 && stats.community>=2) return {sub:"The people must decide",extra:"Your choices have repeatedly centred the community. The conclusion now asks how the people can move forward together."};
 return null;
}
function renderScene(){
 const c=chapters[state.chapter],variant=sceneVariant();
 $("chapterLabel").textContent=`CHAPTER ${String(state.chapter+1).padStart(2,"0")} / 06`;
 $("sceneStatus").textContent=c.label;$("progressBar").style.width=`${(state.chapter/6)*100}%`;
 const heading=variant?variant.sub:c.title;
 const paragraphs=[...c.body];if(variant)paragraphs.push(variant.extra);
 $("sceneContent").innerHTML=`<p class="eyebrow">${c.label}</p><h2>${heading}</h2>${paragraphs.map(p=>`<p class="scene-text">${p}</p>`).join("")}<p class="character-line">“${c.voice}”</p>`;
 $("choiceArea").classList.add("hidden");$("continueButton").classList.add("hidden");
 state.seconds=CHAPTER_SECONDS;state.paused=false;updateTimer();renderChapters();save();startTimer();if(voiceOn)speak(c.voice);transitionScene();
}
function transitionScene(){const panel=$("scenePanel");panel.classList.remove("scene-panel");void panel.offsetWidth;panel.classList.add("scene-panel")}
function updateTimer(){const m=String(Math.floor(state.seconds/60)).padStart(2,"0"),s=String(state.seconds%60).padStart(2,"0");$("timer").textContent=`${m}:${s}`;$("timerHint").textContent=CHAPTER_SECONDS===15?"TEST MODE · 15 seconds per chapter":"A decision appears when the chapter ends."}
function startTimer(){clearInterval(timerId);timerId=setInterval(()=>{if(state.paused||state.ended)return;state.seconds--;updateTimer();if(state.seconds<=0)pauseForChoice()},1000)}
function getAvailableChoices(){
 const c=chapters[state.chapter],s=state.stats;
 // Earlier decisions can unlock a different response, not just different descriptive text.
 if(state.chapter===2 && s.secrecy>s.openness) return [
  {title:"Demand an explanation",desc:"Question the silence surrounding Odewale's early life.",tag:"DISCLOSURE",effects:{truth:2,courage:1},branch:"disclosure"},
  {title:"Protect the royal image",desc:"Keep troubling questions away from the public eye.",tag:"IMAGE",effects:{secrecy:2,trust:-1},branch:"image"},
  {title:"Ask the elders",desc:"Invite those who remember the past to speak.",tag:"ELDERS",effects:{wisdom:2,community:1},branch:"elders"}
 ];
 if(state.chapter===2 && s.compassion>0) return [
  {title:"Lead with care",desc:"Make room for mercy as well as justice.",tag:"MERCY",effects:{compassion:2,trust:1},branch:"mercy"},
  {title:"Set firm boundaries",desc:"Show that kindness and accountability can coexist.",tag:"BALANCE",effects:{wisdom:1,courage:1},branch:"balance"},
  {title:"Hear the people",desc:"Ask the community what it needs from its new ruler.",tag:"COMMUNITY",effects:{community:2,openness:1},branch:"people"}
 ];
 if(state.chapter===4 && s.community>=2) return [
  {title:"Open a public inquiry",desc:"Let the community contribute to uncovering the past.",tag:"PUBLIC INQUIRY",effects:{community:2,truth:1},branch:"inquiry"},
  {title:"Protect those who speak",desc:"Create a safe way for witnesses to share what they know.",tag:"PROTECTION",effects:{compassion:1,trust:2},branch:"witnesses"},
  {title:"Ask for a council",desc:"Bring different perspectives together before deciding.",tag:"COUNCIL",effects:{wisdom:2,community:1},branch:"council"}
 ];
 if(state.chapter===4 && s.secrecy>=2) return [
  {title:"Break the silence",desc:"Bring hidden information into the open, even if it causes upheaval.",tag:"DISCLOSURE",effects:{truth:2,courage:1},branch:"break-silence"},
  {title:"Question the messenger",desc:"Find out why the truth was kept from the people.",tag:"SCRUTINY",effects:{wisdom:2,truth:1},branch:"scrutiny"},
  {title:"Keep the matter private",desc:"Try to prevent panic while the facts are checked.",tag:"PRIVACY",effects:{secrecy:1,community:-1},branch:"privacy"}
 ];
 return c.choices;
}
function pauseForChoice(){state.paused=true;clearInterval(timerId);if("speechSynthesis"in window)speechSynthesis.cancel();const c=chapters[state.chapter],available=getAvailableChoices();$("timer").textContent="DECIDE";$("choiceQuestion").textContent=c.question;$("choices").innerHTML=available.map((ch,i)=>`<button class="choice-card" data-choice="${i}"><strong>${ch.title}</strong><span>${ch.desc}</span><small>${ch.tag} ↗</small></button>`).join("");$("choices").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>choose(Number(b.dataset.choice))));$("choiceArea").classList.remove("hidden");$("sceneStatus").textContent="YOUR DECISION";save();$("choiceArea").scrollIntoView({behavior:"smooth",block:"nearest"})}
function choose(index){
 const c=chapters[state.chapter],choice=getAvailableChoices()[index];
 state.choices.push({chapter:state.chapter,title:choice.title,tag:choice.tag,branch:choice.branch});
 state.branchHistory.push(choice.branch);Object.entries(choice.effects).forEach(([k,v])=>state.stats[k]=(state.stats[k]||0)+v);save();
 $("choiceArea").classList.add("hidden");if(choice.ending){finish(choice.ending);return}
 state.chapter++;$("sceneStatus").textContent="CHOICE RECORDED";$("sceneContent").insertAdjacentHTML("beforeend",`<p class="scene-text" style="color:#d2ad76">Your choice — ${choice.title} — has been recorded. It will influence later scenes.</p>`);$("continueButton").classList.remove("hidden");renderChapters();$("progressBar").style.width=`${(state.chapter/6)*100}%`;$("timer").textContent="READY";state.paused=true;save();if(voiceOn)speak(`Your choice: ${choice.title}. Continue when you are ready.`);
}
function finish(key){
 state.ended=true;state.paused=true;state.endingKey=key;save();clearInterval(timerId);if("speechSynthesis"in window)speechSynthesis.cancel();
 $("story").classList.add("hidden");$("ending").classList.remove("hidden");$("endingTitle").textContent=endings[key].title;$("endingCopy").textContent=endings[key].copy;$("reflectionQuestion").textContent=endings[key].question;
 renderReport();window.scrollTo({top:0,behavior:"smooth"});if(voiceOn)speak(endings[key].copy);
}
function dominantThemes(){const s=state.stats;const pairs=[["Courage",s.courage],["Openness",s.openness],["Secrecy",s.secrecy],["Tradition",s.tradition],["Compassion",s.compassion],["Wisdom",s.wisdom],["Pride",s.pride],["Community",s.community],["Truth-seeking",s.truth],["Fatalism",s.fatalism]];return pairs.sort((a,b)=>b[1]-a[1]).filter(x=>x[1]>0).slice(0,3).map(x=>x[0])}
function renderReport(){
 const themes=dominantThemes();$("storyProfile").innerHTML=`<div><strong>Ending:</strong> ${endings[state.endingKey].title}</div><div><strong>Decisions:</strong> ${state.choices.length} of 6</div><div><strong>Strongest themes:</strong> ${themes.length?themes.join(", "):"A mixed path"}</div><div><strong>Route:</strong> ${state.choices.map(c=>c.tag).join(" → ")}</div>`;
 $("decisionReview").innerHTML=`<strong>Your six decisions</strong><br>${state.choices.map((c,i)=>`${i+1}. Chapter ${c.chapter+1} — ${chapters[c.chapter].name}: <strong>${c.title}</strong>`).join("<br>")}`;
}
function reportText(){const themes=dominantThemes();return `THE GODS ARE NOT TO BLAME — MY STORY REPORT\n\nEnding: ${endings[state.endingKey].title}\n${endings[state.endingKey].copy}\n\nMy decisions:\n${state.choices.map((c,i)=>`${i+1}. ${chapters[c.chapter].name}: ${c.title} (${c.tag})`).join("\n")}\n\nThemes most reflected in my choices: ${themes.join(", ")||"A mixed path"}\n\nAudience reflection: ${endings[state.endingKey].question}\n\nThis is an original educational adaptation inspired by Ola Rotimi's play. It is not a reproduction of the original script.`}
function start(){ $("intro").classList.add("hidden");$("ending").classList.add("hidden");$("story").classList.remove("hidden");if(!load())state=freshState();if(state.chapter>0&&state.choices.length){state.chapter=Math.min(state.chapter,5);renderScene()}else renderScene();window.scrollTo({top:0,behavior:"smooth"})}
function restart(){clearInterval(timerId);if("speechSynthesis"in window)speechSynthesis.cancel();localStorage.removeItem(STORAGE_KEY);state=freshState();$("ending").classList.add("hidden");$("story").classList.add("hidden");$("intro").classList.remove("hidden");$("beginButton").textContent="Enter the story";window.scrollTo({top:0,behavior:"smooth"})}
function speak(text){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.rate=.88;utterance.pitch=.9;utterance.volume=.9;const voices=speechSynthesis.getVoices();const preferred=voices.find(v=>/en-GB|en-GH|en-NG|en-ZA/i.test(v.lang))||voices.find(v=>v.lang.startsWith("en"));if(preferred)utterance.voice=preferred;speechSynthesis.speak(utterance)}
function toggleVoice(){voiceOn=!voiceOn;$("voiceToggle").setAttribute("aria-pressed",String(voiceOn));$("voiceToggle").innerHTML=`◖ <span>Voice ${voiceOn?"on":"off"}</span>`;if(!voiceOn&&"speechSynthesis"in window)speechSynthesis.cancel();else if(voiceOn&&!$("story").classList.contains("hidden"))speak(chapters[state.chapter].voice)}
function toggleSound(){
 soundOn=!soundOn;$("audioToggle").setAttribute("aria-pressed",String(soundOn));$("audioToggle").innerHTML=`♫ <span>Sound ${soundOn?"on":"off"}</span>`;
 if(!soundOn){ambientNodes.forEach(n=>{try{n.stop()}catch(e){}});ambientNodes=[];return}
 try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume();const master=audioCtx.createGain();master.gain.value=.035;master.connect(audioCtx.destination);
  [55,82.4,110].forEach((freq,i)=>{const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type=i===1?"triangle":"sine";osc.frequency.value=freq;gain.gain.value=i===0?.5:.18;osc.connect(gain);gain.connect(master);osc.start();ambientNodes.push(osc)});
 }catch(e){$("audioToggle").innerHTML="♫ <span>Sound unavailable</span>"}
}
$("beginButton").addEventListener("click",start);$("continueButton").addEventListener("click",()=>renderScene());$("restartTop").addEventListener("click",restart);$("brandHome").addEventListener("click",e=>{e.preventDefault();restart()});$("playAgain").addEventListener("click",restart);$("resetProgress").addEventListener("click",()=>{if(confirm("Clear your saved story and start again?"))restart()});$("showChoices").addEventListener("click",()=> $("decisionReview").classList.toggle("hidden"));$("downloadReport").addEventListener("click",()=>{const blob=new Blob([reportText()],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="my-theatre-lab-story-report.txt";a.click();URL.revokeObjectURL(url)});$("audioToggle").addEventListener("click",toggleSound);$("voiceToggle").addEventListener("click",toggleVoice);
if(load()){$("beginButton").textContent="Continue your story →";$("beginButton").addEventListener("click",()=>{ $("intro").classList.add("hidden");$("story").classList.remove("hidden");renderScene()},{once:true})}
