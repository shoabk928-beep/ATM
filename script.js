```javascript
let balance = 50000;
const correctPin = "1234";
let transactions = [];

function loginUser() {
    const pin = document.getElementById("pin").value;
    const error = document.getElementById("loginError");

    if (pin === correctPin) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        updateBalance();
        error.textContent = "";
    } else {
        error.textContent = "Invalid PIN. Please try again.";
    }
}

function updateBalance() {
    document.getElementById("balance").textContent =
        `Rs. ${balance.toLocaleString()}`;

    document.getElementById("balance2").textContent =
        `Rs. ${balance.toLocaleString()}`;
}

function showPanel(panelId) {
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".balance-box").style.display = "none";
    document.querySelector(".logout").style.display = "none";

    document.querySelectorAll(".panel").forEach(panel => {
        panel.style.display = "none";
    });

    document.getElementById(panelId).style.display = "block";

    if (panelId === "history") {
        renderTransactions();
    }
}

function backHome() {
    document.querySelector(".menu").style.display = "grid";
    document.querySelector(".balance-box").style.display = "block";
    document.querySelector(".logout").style.display = "block";

    document.querySelectorAll(".panel").forEach(panel => {
        panel.style.display = "none";
    });

    document.getElementById("withdrawAmount").value = "";
    document.getElementById("depositAmount").value = "";

    document.getElementById("withdrawError").textContent = "";
    document.getElementById("depositError").textContent = "";
}

function withdrawMoney() {
    const input = document.getElementById("withdrawAmount");
    const error = document.getElementById("withdrawError");
    const amount = Number(input.value);

    if (!amount || amount <= 0) {
        error.textContent = "Please enter a valid amount.";
        return;
    }

    if (amount > balance) {
        error.textContent = "Insufficient balance.";
        return;
    }

    if (amount % 500 !== 0) {
        error.textContent = "Amount must be a multiple of Rs. 500.";
        return;
    }

    balance -= amount;

    transactions.unshift({
        type: "withdraw",
        title: "Cash Withdrawal",
        amount: amount,
        date: new Date().toLocaleString()
    });

    updateBalance();

    alert(`Rs. ${amount.toLocaleString()} withdrawn successfully.`);

    backHome();
}

function depositMoney() {
    const input = document.getElementById("depositAmount");
    const error = document.getElementById("depositError");
    const amount = Number(input.value);

    if (!amount || amount <= 0) {
        error.textContent = "Please enter a valid amount.";
        return;
    }

    balance += amount;

    transactions.unshift({
        type: "deposit",
        title: "Money Deposit",
        amount: amount,
        date: new Date().toLocaleString()
    });

    updateBalance();

    alert(`Rs. ${amount.toLocaleString()} deposited successfully.`);

    backHome();
}

function renderTransactions() {
    const container = document.getElementById("transactions");

    if (transactions.length === 0) {
        container.innerHTML = "<p>No transactions available.</p>";
        return;
    }

    container.innerHTML = transactions.map(transaction => `
        <div class="transaction">
            <div>
                <strong>${transaction.title}</strong>
                <br>
                <small>${transaction.date}</small>
            </div>

            <strong class="${transaction.type}">
                ${transaction.type === "deposit" ? "+" : "-"}
                Rs. ${transaction.amount.toLocaleString()}
            </strong>
        </div>
    `).join("");
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login").style.display = "block";

    document.getElementById("pin").value = "";
    document.getElementById("loginError").textContent = "";

    backHome();
}

document.getElementById("pin").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        loginUser();
    }
});
```

