let username = "Stranger";
document.getElementById("hiuser").textContent = "Hi, " + username + "!";

document.getElementById("changeusername").onclick = function(){
	username = window.prompt("What's your name?");
    if (username === null || username === "") {
        username = "Stranger";
    }
    document.getElementById("hiuser").textContent = "Hi, " + username + "!";
}