const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and a  amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionsDOM(transaction);

    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//Generate a ramdom id
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// add transactions to dom list

function addTransactionsDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onCLick= "removeTransaction(${
    transaction.id
  })">x</button>
  
  `;

  list.appendChild(item);
}

//Update the balance income and expence
function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, intem) => acc + intem, 0).toFixed(2);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, inc) => (acc = acc + inc), 0)
    .toFixed(2);
  const expense = (
    amount
      .filter((item) => item < 0)
      .reduce((acc, inc) => (acc = acc + inc), 0) * -1
  ).toFixed(2);
  console.log(expense);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}
// remove transaction by id

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

//Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init app

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
