const socket = io();

socket.on("connect", () => {
    console.log("Connected");
})
socket.on('sendmessage', (msg) => {
    const msgs = document.getElementById('chat-content');
    const aiMsg = document.createElement("div");
    aiMsg.classList.add("ai-msg");
    aiMsg.innerHTML = `<p>${msg}</p>`;
    msgs.appendChild(aiMsg);

})


function showPage(pageid) {
    console.log("ran");
    const pages = document.getElementsByClassName("displaying");
    for (const item of pages) {
        item.classList.add("hidden");
    }
    const page = document.getElementById(pageid);
    page.classList.remove("hidden");
}

function login() {
    const loginPage = document.getElementById("login-modal");
    loginPage.classList.remove("hidden");
}

function signup() {
    const loginPage = document.getElementById("signup-modal");
    loginPage.classList.remove("hidden");
}

function openModal(id) {
    const element = document.getElementById(id);
    element.classList.remove("hidden");
}

function closeModal(id) {
    const element = document.getElementById(id);
    element.classList.add("hidden");
}

function switchModal(event, current, newM) {
    event.preventDefault();
    closeModal(current);
    openModal(newM);
}

function showNotification(message, content) {
    const div = document.createElement("div");
    div.classList.add("notification");
    div.innerHTML = `
    <h2class='not-header'>${message}</h2>
    <p>${content}</p>
    `;
    document.body.appendChild(div);
}

async function SignUp(event) {
    event.preventDefault();
    const username = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    const res = await response.json();
    if (res.message === "Email Already Registered") {
        alert("Email Already Registered");
    }
    else if (res.message === "Username Taken") {
        alert("Username Taken");
    }
    else if (res.message === "Registered Successfully") {
        alert("Registration Successful")
        location.reload();
    }
}

async function LogIn(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    const res = await response.json();
    if (res.message === "Present") {
        alert("Present");
        greet(username);
    }
}

function greet(username) {
    document.getElementById("login-modal").classList.add("hidden");
    document.getElementById("logout").classList.remove("hidden");
    document.getElementById("logins").classList.add("hidden");
    document.getElementById("signups").classList.add("hidden");
    const heroTitle = document.getElementById("heroTitle");
    const p = document.getElementById("p");
    heroTitle.innerHTML = `Hello, ${username}`;
    const container = document.getElementById("dash-sec");
    const div = document.createElement("div");
    div.classList.add("herolink");
    div.innerHTML = `<a onclick=showPage('chatbot')> Let's Get Started <i id='tom' class="fa-solid fa-arrow-up-right-from-square" style="font-size:20px ;color: #108964;"></i></a>`;
    container.insertBefore(div, p);
}
async function send() {
    const msgBox = document.getElementById("msg-box").value;
    document.getElementById("msg-box").value = "";

    const msgs = document.getElementById('chat-content');
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-msg");
    userMsg.innerHTML = `<p>${msgBox}</p>`;
    msgs.appendChild(userMsg);

    if (msgBox.includes("@AI")) {
        console.log("AI");
        const res = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: msgBox })
        })
        const response = await res.json();
        const output = response.response;
        const aiMsg = document.createElement("div");
        aiMsg.classList.add("ai-msg");
        aiMsg.innerHTML = `<p>${output}</p>`;
        msgs.appendChild(aiMsg);
    }
    else {
        socket.emit('message', msgBox);
    }
}
