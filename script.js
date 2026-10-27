const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const items = [
  {emoji:"🥤", name:"Plastic Bottle", answer:"dry"},
  {emoji:"🍌", name:"Banana Peel", answer:"wet"},
  {emoji:"🔋", name:"Used Battery", answer:"hazardous"},
  {emoji:"🍕", name:"Food Scraps", answer:"wet"},
  {emoji:"📦", name:"Cardboard Box", answer:"dry"},
  {emoji:"🧴", name:"Chemical Container", answer:"hazardous"},
  {emoji:"🧻", name:"Used Tissue", answer:"residual"}
];
let itemIndex = 0;
let answered = false;
const itemEmoji = document.getElementById("itemEmoji");
const itemName = document.getElementById("itemName");
const itemHint = document.getElementById("itemHint");
const quizResult = document.getElementById("quizResult");
const nextItem = document.getElementById("nextItem");

function loadItem(){
  const item = items[itemIndex];
  itemEmoji.textContent = item.emoji;
  itemName.textContent = item.name;
  itemHint.textContent = "Where should it go?";
  quizResult.textContent = "";
  quizResult.className = "quiz-result";
  nextItem.classList.add("hidden");
  answered = false;
}
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if(answered) return;
    answered = true;
    const item = items[itemIndex];
    if(btn.dataset.answer === item.answer){
      quizResult.textContent = "✓ Correct! Great job.";
      quizResult.classList.add("good");
    }else{
      quizResult.textContent = "✕ Not quite. Try to remember the waste category.";
      quizResult.classList.add("bad");
    }
    itemHint.textContent = "Correct category: " + (item.answer === "dry" ? "Dry / Recyclable" : item.answer.charAt(0).toUpperCase()+item.answer.slice(1));
    nextItem.classList.remove("hidden");
  });
});
nextItem.addEventListener("click", () => { itemIndex = (itemIndex + 1) % items.length; loadItem(); });

const reportForm = document.getElementById("reportForm");
const formMessage = document.getElementById("formMessage");
reportForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  formMessage.textContent = `✓ Thank you, ${name}! Your demo report has been submitted successfully.`;
  formMessage.style.color = "#16a34a";
  reportForm.reset();
});

const search = document.getElementById("pointSearch");
const cards = [...document.querySelectorAll(".point-card")];
const noPoints = document.getElementById("noPoints");
search.addEventListener("input", () => {
  const q = search.value.toLowerCase().trim();
  let visible = 0;
  cards.forEach(card => {
    const match = card.dataset.search.includes(q);
    card.style.display = match ? "" : "none";
    if(match) visible++;
  });
  noPoints.classList.toggle("hidden", visible !== 0);
});

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 500));
topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const counters = document.querySelectorAll(".counter");
let countersStarted = false;
function startCounters(){
  if(countersStarted) return;
  const impact = document.getElementById("impact");
  if(window.scrollY + window.innerHeight > impact.offsetTop + 100){
    countersStarted = true;
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 55));
      const timer = setInterval(() => {
        value += step;
        if(value >= target){ value = target; clearInterval(timer); }
        counter.textContent = value.toLocaleString() + (target === 75 ? "%" : "+");
      }, 25);
    });
  }
}
window.addEventListener("scroll", startCounters);
startCounters();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});
