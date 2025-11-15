
const socket = io();

socket.on("connect", () => {
    console.log("Connected");
})


socket.on('sendmessage', async (data) => {
    const msg=data.msg;
    const username=data.username;
    const container = document.createElement("div");
    container.classList.add('user-msg');
    container.classList.add('aileft');
    const msgs = document.getElementById('chat-content');
    const aiMsg = document.createElement("div");
    const sender = document.createElement("p");

    sender.classList.add('robotic-text');
    sender.innerText = `${username}`;
    aiMsg.classList.add("ai-msg");
    aiMsg.innerHTML = `<p>${msg}</p>`;
    container.appendChild(sender);
    container.appendChild(aiMsg);
    msgs.appendChild(container);

})

async function LoginState() {
    const res = await fetch("/api/verify", {
        method: "GET",
        credentials: "include"
    });
    const data = await res.json();
    if (data.message === 'Valid') {
        console.log(data.user);
        return true;
    }
    else {
        return false;
    }
}

async function showPage(pageid) {
    if (pageid !== 'dashboard') {
        const verified = await LoginState();
        if (verified === false) {
            alert("Please log in to continue");
            showPage('dashboard');
            return;
        }
    }
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
        document.getElementById("login-modal").classList.add("hidden");
        document.getElementById("logins").classList.add("hidden");
        document.getElementById("signups").classList.add("hidden");
        location.reload()
    }
}
async function disconnect() {
    const response = await fetch("/api/disconnect", {
        method: "POST",
        credentials: "include"
    })
    const res = await response.json();
    console.log(res);
    if (res.message == 'LoggedOut') {
        location.reload();
    }
}

async function fetchUsername() {
    const response = await fetch("/api/username", {
        method: "POST",
        credentials: "include"
    })
    const res = await response.json();
    return res;
}
async function greet() {
    const res=await fetchUsername();
    if (res.state === 'true') {
        const heroTitle = document.getElementById("heroTitle1");
        document.getElementById("dash-sec1").classList.add('hidden');
        document.getElementById("dash-sec2").classList.remove('hidden');

        heroTitle.innerHTML = `Hello, ${res.username}`;
        document.getElementById("logout").classList.remove("hidden");
    }
    else {
        document.getElementById("dash-sec2").classList.add('hidden');
        document.getElementById("dash-sec1").classList.remove('hidden');
        document.getElementById("logout").classList.add("hidden");
    }
}

async function send() {
    const msgBox = document.getElementById("msg-box").value;
    document.getElementById("msg-box").value = "";

    const msgs = document.getElementById('chat-content');
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-msg");
    userMsg.classList.add("userright");
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
        const aiMsgBox = document.createElement("div");
        aiMsgBox.classList.add("user-msg");
        aiMsgBox.classList.add("aileft");
        aiMsgBox.innerHTML = ` <p class= robotic-text>OctoCanes</p>
                            <div class="ai-msg">
                                <p>${output}</p>
                            </div>`;
        msgs.appendChild(aiMsgBox);
    }
    else {
        const res=await fetchUsername();
        const data={msg: msgBox,username: res.username};
        socket.emit('message', data);
    }
}
window.addEventListener('DOMContentLoaded', greet);
