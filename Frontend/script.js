function showPage(pageid){
    const pages=document.getElementsByClassName("displaying");
    for( const item of pages){
        item.classList.add("hidden");
    }
    const page=document.getElementById(pageid);
    page.classList.remove("hidden");
}

function login(){
    const loginPage=document.getElementById("login-modal");
    loginPage.classList.remove("hidden");
}

function signup(){
    const loginPage=document.getElementById("signup-modal");
    loginPage.classList.remove("hidden");
}

function openModal(id ){
    const element = document.getElementById(id);
    element.classList.remove("hidden");
}

function closeModal(id ){
    const element = document.getElementById(id);
    element.classList.add("hidden");
}

function switchModal(event,current,newM ){
    event.preventDefault();
    closeModal(current);
    openModal(newM);
}

async function send(){
    const msgBox= document.getElementById("msg-box").value;
    document.getElementById("msg-box").value="";

    const msgs=document.getElementById('chat-content');
    const userMsg=document.createElement("div");
    userMsg.classList.add("user-msg");
    userMsg.innerHTML=`<p>${msgBox}</p>` ;
    msgs.appendChild(userMsg);

    const res=await fetch("/api/gemini",{
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt : msgBox})
})
    const response= await res.json();
    const output=response.response;

    const aiMsg=document.createElement("div");
    aiMsg.classList.add("ai-msg");
    aiMsg.innerHTML=`<p>${output}</p>` ;
    msgs.appendChild(aiMsg);
}
