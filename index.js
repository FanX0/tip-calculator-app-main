const $ = (s) => document.querySelector(s);

const bill = $("#bill");
const customTip = $("#custom-tip");
const people = $("#people");
const tipAmount = $("#tip-amount");
const total = $("#total");
const resetBtn = $("#reset-button");
const tipWrap = $(".select-tip");
const tipBtns = Array.from(document.querySelectorAll(".select-tip button"));

let tipRate = 0;

const money = (n) => `$${(Number.isFinite(n) ? n : 0).toFixed(2)}`;

function setActiveTip(btn) {
  tipBtns.forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function updateResetState() {
  const dirty = bill.value || people.value || customTip.value || tipRate > 0;
  resetBtn.disabled = !dirty;
}

function update() {
  const billNum = parseFloat(bill.value) || 0;
  const peopleNum = parseInt(people.value, 10) || 0;

  const valid = peopleNum > 0;
  people.classList.toggle("error", !valid);

  if (!valid) {
    tipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
    updateResetState();
    return;
  }

  const tip = billNum * tipRate;
  const sum = billNum + tip;
  const perT = tip / peopleNum;
  const perS = sum / peopleNum;

  tipAmount.textContent = money(perT);
  total.textContent = money(perS);
  updateResetState();
}

tipWrap.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const raw = btn.textContent.replace("%", "");
  const num = parseFloat(raw);
  if (Number.isNaN(num)) return;

  tipRate = num / 100;
  customTip.value = "";
  setActiveTip(btn);
  update();
});

customTip.addEventListener("input", () => {
  tipRate = (parseFloat(customTip.value) || 0) / 100;
  setActiveTip(null);
  update();
});

bill.addEventListener("input", update);
people.addEventListener("input", update);

resetBtn.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  customTip.value = "";
  tipRate = 0;

  setActiveTip(null);
  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";
  people.classList.remove("error");
  updateResetState();
});

update();

function chars(text) {
  return Array.from(text);
}

function splitToGrid(el) {
  const text = el.textContent;
  el.textContent = "";
  el.classList.add("grid-letters");
  for (const ch of chars(text)) {
    const span = document.createElement("span");
    span.textContent = ch;
    el.appendChild(span);
  }
}
splitToGrid(title);
