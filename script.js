/* THEATRE/LAB — original branching adaptation prototype.
   Default chapter duration: five minutes. For quick local testing append ?test=1 to the URL. */
const CHAPTER_SECONDS = new URLSearchParams(location.search).has("test") ? 15 : 300;
const STORAGE_KEY = "theatreLabGodsStoryV3";
const chapters = [
 {name:"The Warning",label:"CHAPTER I · THE WARNING",title:"A prophecy enters the palace.",body:[
  "Kutuje is a kingdom built on ceremony, memory and the belief that its rulers stand between the people and disorder. One evening, the royal household receives a warning about the future of its family. The words are incomplete, but their meaning frightens the court.",
  "The king, Adetusa, listens while the elders debate. Some insist that the warning must be obeyed exactly. Others argue that a prediction is not proof and should never become an excuse to harm an innocent person.",
  "Outside the palace, ordinary life continues. Traders close their stalls, children run through the courtyard and the palace guards change shifts. None of them knows that a private decision may shape the kingdom for years."
 ],voice:"In Kutuje, a warning has been spoken. But is a prophecy a command, or a question that people must answer?",question:"How should the royal household respond to the warning?",choices:[
  {title:"Question the prophecy",desc:"Ask the elders to explain the warning and its uncertainty.",tag:"QUESTIONING",effects:{wisdom:2,openness:1},branch:"question"},
  {title:"Keep it secret",desc:"Hide the warning to prevent fear from spreading.",tag:"SECRECY",effects:{secrecy:2,trust:-1},branch:"secret"},
  {title:"Follow tradition",desc:"Allow established customs to guide the household.",tag:"TRADITION",effects:{tradition:2,community:1},branch:"tradition"}]},
 {name:"The Palace Debate",label:"CHAPTER II · THE PALACE DEBATE",title:"Fear divides the royal family.",body:[
  "The warning becomes the subject of a tense meeting. Queen Ojuola asks whether the court is protecting the kingdom or simply protecting itself from uncertainty. Adetusa struggles to answer.",
  "A senior adviser says that rulers must sometimes make painful decisions for the safety of the throne. A younger attendant disagrees: the child at the centre of the warning has done nothing wrong and deserves the chance to grow without being treated as a threat.",
  "The argument reveals a deeper conflict. The palace can preserve its reputation, obey tradition, or place compassion first—but it may not be able to satisfy everyone."
 ],voice:"The court is divided. Every argument claims to protect the kingdom, but whose future is being protected?",question:"Whose voice should carry the most weight?",choices:[
  {title:"Listen to Ojuola",desc:"Give the queen space to challenge decisions made through fear.",tag:"EMPATHY",effects:{compassion:2,openness:1},branch:"queen"},
  {title:"Trust the elders",desc:"Respect the experience and customs of the royal council.",tag:"TRADITION",effects:{tradition:2,wisdom:1},branch:"elders"},
  {title:"Hear the attendants",desc:"Include people whose lives are affected but who hold little power.",tag:"COMMUNITY",effects:{community:2,trust:1},branch:"attendants"}]},
 {name:"The Child",label:"CHAPTER III · THE CHILD",title:"A life should not be decided by fear.",body:[
  "The court must now decide what to do about the child. The prophecy has not been tested, and no one can say with certainty what the future holds. Yet the adults speak as if the child's fate has already been settled.",
  "Ojuola insists that a prediction cannot replace evidence or conscience. Adetusa is torn between his responsibility to the kingdom and his love for his family. The elders warn that ignoring tradition may carry consequences of its own.",
  "The decision made here will echo through the years. It will shape not only the child's future, but also the kind of people the royal household becomes."
 ],voice:"A child stands at the centre of a decision made by adults. What matters more: fear, custom or compassion?",question:"What should guide the decision about the child?",choices:[
  {title:"Choose compassion",desc:"Protect the child and refuse to treat a prediction as a verdict.",tag:"COMPASSION",effects:{compassion:2,courage:1},branch:"compassion"},
  {title:"Obey the warning",desc:"Treat the prophecy as an order that cannot be questioned.",tag:"FATALISM",effects:{fatalism:2,compassion:-1},branch:"fatalism"},
  {title:"Seek another voice",desc:"Ask a trusted adviser to challenge the household's assumptions.",tag:"COUNSEL",effects:{wisdom:2,openness:1},branch:"counsel"}]},
 {name:"A Different Home",label:"CHAPTER IV · A DIFFERENT HOME",title:"A new life begins beyond the palace.",body:[
  "Time passes. Far from the palace, a child grows up in a household where daily work matters more than royal titles. The child learns to read people, solve problems and stand up for those who are treated unfairly.",
  "The people who raise the child do not know every detail of the past. They offer care, ordinary routines and a sense of belonging. Yet questions about identity sometimes surface, especially when visitors speak of the royal family.",
  "The young person begins to understand that identity is shaped by more than ancestry. It is also shaped by relationships, choices and the values a person carries into the world."
 ],voice:"Away from the palace, a young life takes shape. A name may be inherited, but character is built.",question:"What should shape the young person's sense of identity?",choices:[
  {title:"Value the people who raised them",desc:"Recognise care and loyalty as foundations of identity.",tag:"BELONGING",effects:{compassion:2,community:1},branch:"belonging"},
  {title:"Search for the past",desc:"Look for answers about family history and origin.",tag:"IDENTITY",effects:{truth:2,openness:1},branch:"past"},
  {title:"Build an independent future",desc:"Focus on personal values rather than inherited expectations.",tag:"INDEPENDENCE",effects:{courage:2,wisdom:1},branch:"independent"}]},
 {name:"The Rise of Odewale",label:"CHAPTER V · THE RISE",title:"A respected leader arrives.",body:[
  "Years later, Odewale has become known for his confidence, intelligence and determination. His ability to solve disputes earns him respect, and the people of Kutuje begin to see him as a leader who can bring stability.",
  "When Odewale enters the palace, he is welcomed by a kingdom hoping for a fresh beginning. Queen Ojuola sees qualities she admires, while some elders remain cautious about how quickly power has changed hands.",
  "Odewale believes that strong leadership requires clear decisions. The question is whether he can remain open to advice when his authority is challenged."
 ],voice:"A new leader has risen. The people hope for justice, but strength must be balanced with humility.",question:"What kind of leader should Odewale become?",choices:[
  {title:"Listen before deciding",desc:"Hear different perspectives, even when they challenge him.",tag:"OPENNESS",effects:{wisdom:2,trust:2},branch:"listen"},
  {title:"Defend his authority",desc:"Act decisively so that others do not mistake patience for weakness.",tag:"PRIDE",effects:{pride:2,trust:-1},branch:"authority"},
  {title:"Share responsibility",desc:"Invite the community to help shape important decisions.",tag:"PARTICIPATION",effects:{community:2,openness:1},branch:"share"}]},
 {name:"The Roadside Conflict",label:"CHAPTER VI · THE CONFLICT",title:"One encounter leaves a lasting question.",body:[
  "During a journey, Odewale encounters a powerful stranger on the road. The path is narrow, tempers rise and neither person is willing to give way. A disagreement becomes a serious conflict.",
  "Afterwards, Odewale continues his journey, believing the incident is behind him. He does not understand how important the encounter may become. The people travelling with him remember different details, and their accounts do not fully agree.",
  "The scene raises a question that will return throughout the story: when anger takes control, how much responsibility remains with the person who acts?"
 ],voice:"A brief encounter becomes a turning point. What is done in anger may outlive the anger itself.",question:"How should Odewale respond when challenged?",choices:[
  {title:"Step away",desc:"Refuse to let anger make the decision.",tag:"RESTRAINT",effects:{wisdom:2,pride:-1},branch:"restraint"},
  {title:"Stand his ground",desc:"Protect his dignity and refuse to be intimidated.",tag:"DEFIANCE",effects:{pride:2,courage:1},branch:"defiance"},
  {title:"Seek understanding",desc:"Try to discover why the encounter has become hostile.",tag:"CURIOSITY",effects:{wisdom:1,compassion:1},branch:"understanding"}]},
 {name:"The Kingdom in Crisis",label:"CHAPTER VII · THE CRISIS",title:"The land grows quiet.",body:[
  "A serious crisis spreads through Kutuje. Crops fail, families worry about food and illness weakens the community. People who once celebrated the new leadership now ask whether the kingdom has lost the protection it depended on.",
  "Odewale orders practical measures: food stores are reviewed, messengers are sent to neighbouring communities and the palace invites healers and advisers to share what they know. But fear is difficult to manage, especially when rumours begin to spread.",
  "Some citizens blame the gods. Others blame the palace. A few ask whether the crisis has a human cause that can be investigated. The kingdom needs answers, but it also needs people to work together."
 ],voice:"The kingdom is suffering. Rumour offers easy explanations, but the people need careful action.",question:"What should Odewale prioritise?",choices:[
  {title:"Organise practical support",desc:"Focus on food, care and immediate help for families.",tag:"PUBLIC WELFARE",effects:{community:2,compassion:1},branch:"support"},
  {title:"Seek spiritual guidance",desc:"Consult respected spiritual leaders while the crisis continues.",tag:"TRADITION",effects:{tradition:2,wisdom:1},branch:"spiritual"},
  {title:"Investigate the causes",desc:"Gather evidence before deciding what has brought the crisis.",tag:"INVESTIGATION",effects:{truth:2,openness:1},branch:"investigate"}]},
 {name:"The Call for Answers",label:"CHAPTER VIII · THE INQUIRY",title:"The people demand an explanation.",body:[
  "The crisis continues, and patience in Kutuje begins to run out. At a public gathering, citizens ask Odewale to explain what is happening. Some speak with respect; others are openly angry.",
  "A messenger brings news that the oracle has been asked to speak. The palace prepares for a formal inquiry, but witnesses disagree about what they have seen and heard. Odewale must decide whether the search for truth should be public or controlled by the royal household.",
  "The earlier choices now matter. A community that has been included may be more willing to cooperate. A community kept in the dark may suspect that the palace has something to hide."
 ],voice:"The people are no longer satisfied with silence. The kingdom asks its ruler to answer.",question:"How should the inquiry be conducted?",choices:[
  {title:"Open a public inquiry",desc:"Allow the community to contribute to uncovering the past.",tag:"PUBLIC INQUIRY",effects:{community:2,truth:1},branch:"inquiry"},
  {title:"Protect those who speak",desc:"Create a respectful and safe way for witnesses to share information.",tag:"PROTECTION",effects:{compassion:1,trust:2},branch:"witnesses"},
  {title:"Keep the inquiry private",desc:"Check the facts carefully before making a public announcement.",tag:"PRIVACY",effects:{secrecy:1,wisdom:1},branch:"private"}]},
 {name:"Fragments of the Past",label:"CHAPTER IX · THE PAST",title:"Old memories begin to connect.",body:[
  "The inquiry uncovers details that do not fit the story Odewale has always believed about himself. An elder remembers a journey from years earlier. A traveller recalls a family searching for a missing child. A record from the palace contains a name that has long been avoided.",
  "Each clue is incomplete on its own. Some witnesses are uncertain; others have reasons to remain silent. Odewale becomes frustrated, but Ojuola urges him not to turn suspicion into a verdict.",
  "The search is no longer simply about the crisis. It has become a search for identity, memory and the truth behind decisions made before Odewale could understand them."
 ],voice:"The past returns through fragments. A careful search may reveal more than a quick accusation.",question:"What should happen as the clues gather?",choices:[
  {title:"Demand the whole truth",desc:"Continue the search, even when the evidence is uncomfortable.",tag:"TRUTH",effects:{truth:2,courage:1},branch:"truth"},
  {title:"Question every account",desc:"Check each claim and compare it with other evidence.",tag:"SCRUTINY",effects:{wisdom:2,truth:1},branch:"scrutiny"},
  {title:"Protect the kingdom",desc:"Consider the community's stability while facts are verified.",tag:"DUTY",effects:{community:2,secrecy:1},branch:"duty"}]},
 {name:"The Revelation",label:"CHAPTER X · THE REVELATION",title:"The story Odewale knew begins to collapse.",body:[
  "The accounts finally connect. Odewale learns that the stranger from the road was tied to the royal history he never knew. The warning spoken before his childhood, the separation from his birth family and the later conflict are no longer separate events.",
  "Ojuola is forced to confront her own memories. The palace elders recognise that decisions made in fear helped create the very suffering they hoped to prevent. No one can undo the past, but everyone must decide how honestly to face it.",
  "Odewale asks whether his life was controlled by fate or shaped by choices made by many people. The revelation brings grief and confusion, but it also exposes the danger of treating a prediction as more important than human judgement."
 ],voice:"The truth has arrived. It cannot change the past, but it can change what the kingdom chooses to do next.",question:"How should Odewale face the revelation?",choices:[
  {title:"Acknowledge the truth publicly",desc:"Refuse to hide what has been discovered.",tag:"HONESTY",effects:{truth:2,courage:1},branch:"public-truth"},
  {title:"Take time to understand",desc:"Pause before making decisions that affect the whole kingdom.",tag:"REFLECTION",effects:{wisdom:2,compassion:1},branch:"reflect"},
  {title:"Ask the council to respond",desc:"Share responsibility for the next steps with the elders and people.",tag:"SHARED DUTY",effects:{community:2,trust:1},branch:"council"}]},
 {name:"The Council of Kutuje",label:"CHAPTER XI · THE COUNCIL",title:"A kingdom must decide what justice means.",body:[
  "The palace gathers a council of elders, citizens and representatives from different parts of Kutuje. The revelation has shaken the kingdom, and people disagree about what should happen next.",
  "Some believe Odewale must step away from leadership so the kingdom can rebuild confidence. Others argue that the community should not make a decision through anger. Ojuola asks the council to consider the role of the adults who made choices long before Odewale understood the prophecy.",
  "The council must balance accountability with compassion. It must also decide what lessons should be passed to the next generation: obedience without question, or the courage to examine tradition and authority."
 ],voice:"The council must choose a future. Justice is not simple when responsibility is shared across generations.",question:"What should guide the council's judgement?",choices:[
  {title:"Put accountability first",desc:"Name the decisions that caused harm and accept their consequences.",tag:"ACCOUNTABILITY",effects:{truth:2,courage:1},branch:"accountability"},
  {title:"Protect the community",desc:"Prioritise stability and a careful plan for rebuilding trust.",tag:"COMMUNITY",effects:{community:2,wisdom:1},branch:"stability"},
  {title:"Re-examine tradition",desc:"Keep meaningful customs but challenge practices that cause harm.",tag:"REFORM",effects:{openness:2,wisdom:1},branch:"reform"}]},
 {name:"The Final Choice",label:"CHAPTER XII · THE FINAL CHOICE",title:"What will Kutuje learn?",body:[
  "The people gather for the final decision. The prophecy has shaped the lives of the royal family, but it did not make every choice for them. Fear, secrecy, pride, compassion and the search for truth all played a part.",
  "Odewale must decide how to respond to the truth and what kind of future he wants for Kutuje. The council waits. Ojuola remembers the child whose life was once treated as a problem to solve. The people want a future in which leaders listen before acting.",
  "There is no ending that can erase what happened. But the kingdom can decide whether the story will be remembered only as a tragedy, or also as a warning about responsibility, power and the human cost of unquestioned belief."
 ],voice:"The kingdom waits. The truth has arrived. Now comes the question of responsibility.",question:"How should this story conclude?",choices:[
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
function load(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved&&Array.isArray(saved.choices)&&saved.chapter<12&&!saved.ended){state={...freshState(),...saved,paused:true};return true}}catch(e){}return false}
function renderChapters(){ $("chapterList").innerHTML=chapters.map((c,i)=>`<div class="chapter-item ${i===state.chapter?"active":i<state.chapter?"done":""}"><span class="num">${String(i+1).padStart(2,"0")}</span><span>${c.name}</span></div>`).join("")}
function sceneVariant(){
 const stats=state.stats;
 if(state.chapter===3 && stats.secrecy>stats.openness) return {sub:"A guarded childhood",extra:"Because the warning was concealed, Odewale's early life is surrounded by unanswered questions. Silence protected some people, but it also left others without the truth."};
 if(state.chapter===3 && stats.compassion>0) return {sub:"A life beyond the warning",extra:"The earlier choice to protect the child becomes part of the story's moral memory. Compassion did not erase uncertainty, but it resisted allowing fear to decide everything."};
 if(state.chapter===5 && stats.pride>=2) return {sub:"A tense encounter",extra:"Odewale's earlier insistence on authority makes this confrontation especially charged. A challenge to his status feels like a challenge to the order of the kingdom."};
 if(state.chapter===5 && stats.wisdom>=2) return {sub:"A moment for restraint",extra:"The earlier commitment to listen creates another possibility: Odewale can pause, ask questions and consider what he does not yet know."};
 if(state.chapter===7 && stats.trust<0) return {sub:"A divided community",extra:"Trust has been weakened by earlier secrecy and conflict. People hesitate before speaking, and each new account is met with suspicion."};
 if(state.chapter===7 && stats.trust>=2) return {sub:"Voices begin to gather",extra:"Earlier choices created a measure of trust. More people are willing to speak, allowing the picture of the past to become clearer."};
 if(state.chapter===9 && stats.truth>=2) return {sub:"A truth pursued",extra:"Your repeated commitment to uncovering the truth has brought the kingdom to a decisive moment. There is less room left for comfortable uncertainty."};
 if(state.chapter===10 && stats.community>=2) return {sub:"The people must decide",extra:"Your choices have repeatedly centred the community. The conclusion now asks how the people can move forward together."};
 return null;
}
function renderScene(){
 const c=chapters[state.chapter],variant=sceneVariant();
 $("chapterLabel").textContent=`CHAPTER ${String(state.chapter+1).padStart(2,"0")} / 12`;
 $("sceneStatus").textContent=c.label;$("progressBar").style.width=`${(state.chapter/12)*100}%`;
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
 // Previous decisions unlock different responses in later chapters.
 if(state.chapter===3 && s.secrecy>s.openness) return [
  {title:"Demand an explanation",desc:"Question the silence surrounding Odewale's early life.",tag:"DISCLOSURE",effects:{truth:2,courage:1},branch:"disclosure"},
  {title:"Protect the royal image",desc:"Keep troubling questions away from the public eye.",tag:"IMAGE",effects:{secrecy:2,trust:-1},branch:"image"},
  {title:"Ask the elders",desc:"Invite those who remember the past to speak.",tag:"ELDERS",effects:{wisdom:2,community:1},branch:"elders"}
 ];
 if(state.chapter===3 && s.compassion>0) return [
  {title:"Lead with care",desc:"Make room for mercy as well as justice.",tag:"MERCY",effects:{compassion:2,trust:1},branch:"mercy"},
  {title:"Set firm boundaries",desc:"Show that kindness and accountability can coexist.",tag:"BALANCE",effects:{wisdom:1,courage:1},branch:"balance"},
  {title:"Hear the people",desc:"Ask the community what it needs from its new ruler.",tag:"COMMUNITY",effects:{community:2,openness:1},branch:"people"}
 ];
 if(state.chapter===7 && s.community>=2) return [
  {title:"Open a public inquiry",desc:"Let the community contribute to uncovering the past.",tag:"PUBLIC INQUIRY",effects:{community:2,truth:1},branch:"inquiry"},
  {title:"Protect those who speak",desc:"Create a respectful way for witnesses to share what they know.",tag:"PROTECTION",effects:{compassion:1,trust:2},branch:"witnesses"},
  {title:"Ask for a council",desc:"Bring different perspectives together before deciding.",tag:"COUNCIL",effects:{wisdom:2,community:1},branch:"council"}
 ];
 if(state.chapter===7 && s.secrecy>=2) return [
  {title:"Break the silence",desc:"Bring hidden information into the open, even if it causes upheaval.",tag:"DISCLOSURE",effects:{truth:2,courage:1},branch:"break-silence"},
  {title:"Question the messenger",desc:"Find out why the truth was kept from the people.",tag:"SCRUTINY",effects:{wisdom:2,truth:1},branch:"scrutiny"},
  {title:"Keep the matter private",desc:"Prevent panic while the facts are checked.",tag:"PRIVACY",effects:{secrecy:1,community:-1},branch:"privacy"}
 ];
 return c.choices;
}
function pauseForChoice(){state.paused=true;clearInterval(timerId);if("speechSynthesis"in window)speechSynthesis.cancel();const c=chapters[state.chapter],available=getAvailableChoices();$("timer").textContent="DECIDE";$("choiceQuestion").textContent=c.question;$("choices").innerHTML=available.map((ch,i)=>`<button class="choice-card" data-choice="${i}"><strong>${ch.title}</strong><span>${ch.desc}</span><small>${ch.tag} ↗</small></button>`).join("");$("choices").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>choose(Number(b.dataset.choice))));$("choiceArea").classList.remove("hidden");$("sceneStatus").textContent="YOUR DECISION";save();$("choiceArea").scrollIntoView({behavior:"smooth",block:"nearest"})}
function choose(index){
 const c=chapters[state.chapter],choice=getAvailableChoices()[index];
 state.choices.push({chapter:state.chapter,title:choice.title,tag:choice.tag,branch:choice.branch});
 state.branchHistory.push(choice.branch);Object.entries(choice.effects).forEach(([k,v])=>state.stats[k]=(state.stats[k]||0)+v);save();
 $("choiceArea").classList.add("hidden");if(choice.ending){finish(choice.ending);return}
 state.chapter++;$("sceneStatus").textContent="CHOICE RECORDED";$("sceneContent").insertAdjacentHTML("beforeend",`<p class="scene-text" style="color:#d2ad76">Your choice — ${choice.title} — has been recorded. It will influence later scenes.</p>`);$("continueButton").classList.remove("hidden");renderChapters();$("progressBar").style.width=`${(state.chapter/12)*100}%`;$("timer").textContent="READY";state.paused=true;save();if(voiceOn)speak(`Your choice: ${choice.title}. Continue when you are ready.`);
}
function finish(key){
 state.ended=true;state.paused=true;state.endingKey=key;save();clearInterval(timerId);if("speechSynthesis"in window)speechSynthesis.cancel();
 $("story").classList.add("hidden");$("ending").classList.remove("hidden");$("endingTitle").textContent=endings[key].title;$("endingCopy").textContent=endings[key].copy;$("reflectionQuestion").textContent=endings[key].question;
 renderReport();window.scrollTo({top:0,behavior:"smooth"});if(voiceOn)speak(endings[key].copy);
}
function dominantThemes(){const s=state.stats;const pairs=[["Courage",s.courage],["Openness",s.openness],["Secrecy",s.secrecy],["Tradition",s.tradition],["Compassion",s.compassion],["Wisdom",s.wisdom],["Pride",s.pride],["Community",s.community],["Truth-seeking",s.truth],["Fatalism",s.fatalism]];return pairs.sort((a,b)=>b[1]-a[1]).filter(x=>x[1]>0).slice(0,3).map(x=>x[0])}
function renderReport(){
 const themes=dominantThemes();$("storyProfile").innerHTML=`<div><strong>Ending:</strong> ${endings[state.endingKey].title}</div><div><strong>Decisions:</strong> ${state.choices.length} of 12</div><div><strong>Strongest themes:</strong> ${themes.length?themes.join(", "):"A mixed path"}</div><div><strong>Route:</strong> ${state.choices.map(c=>c.tag).join(" → ")}</div>`;
 $("decisionReview").innerHTML=`<strong>Your six decisions</strong><br>${state.choices.map((c,i)=>`${i+1}. Chapter ${c.chapter+1} — ${chapters[c.chapter].name}: <strong>${c.title}</strong>`).join("<br>")}`;
}
function reportText(){const themes=dominantThemes();return `THE GODS ARE NOT TO BLAME — MY STORY REPORT\n\nEnding: ${endings[state.endingKey].title}\n${endings[state.endingKey].copy}\n\nMy decisions:\n${state.choices.map((c,i)=>`${i+1}. ${chapters[c.chapter].name}: ${c.title} (${c.tag})`).join("\n")}\n\nThemes most reflected in my choices: ${themes.join(", ")||"A mixed path"}\n\nAudience reflection: ${endings[state.endingKey].question}\n\nThis is an original educational adaptation inspired by Ola Rotimi's play. It is not a reproduction of the original script.`}
function start(){ $("intro").classList.add("hidden");$("ending").classList.add("hidden");$("story").classList.remove("hidden");if(!load())state=freshState();if(state.chapter>0&&state.choices.length){state.chapter=Math.min(state.chapter,11);renderScene()}else renderScene();window.scrollTo({top:0,behavior:"smooth"})}
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
