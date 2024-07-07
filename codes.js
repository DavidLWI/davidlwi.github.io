let username = "Stranger";
document.getElementById("hiuser").textContent = "Hi, " + username + "!";

document.getElementById("changeusername").onclick = function(){
	username = window.prompt("What's your name?");
    if (username === null || username === "") {
        username = "Stranger";
    }
    document.getElementById("hiuser").textContent = "Hi, " + username + "!";
}



let credits = 0;
let cga = 0;
let prev_credits = 0;
let prev_cga = 0;
let rc_credits = 0;
let rc_cga = 0;
let creditsresult = document.getElementById("creditsresult");
let cgaresult = document.getElementById("cgaresult");

document.getElementById('credits_earned').addEventListener('keydown', handleEnterPress);
document.getElementById('grades').addEventListener('keydown', handleEnterPress);
function handleEnterPress(event) {
    if (event.key === 'Enter') document.getElementById('submitcga').click();
}

function calculateCGA() {
    rc_credits = Math.floor(Number(document.getElementById("credits_earned").value));
    document.getElementById("credits_earned").value = "";
    if (isNaN(rc_credits) || rc_credits <= 0) {
        window.alert("Please input a valid number for credits");
        return;
    }
    rc_cga = document.getElementById("grades").value;
    document.getElementById("grades").value = "";
    rc_cga = rc_cga.trim().split(" ").join("");
    if ((rc_cga == "")) {
        window.alert("Please input your grades");
        return;
    }
    if ((rc_cga.charAt(0) >= '0') && (rc_cga.charAt(0) <= '4')) { //If it's digit
        rc_cga = Number(rc_cga);
        if (isNaN(rc_cga)) {
            window.alert("Invalid Grade/CGA");
            return;
        }
        prev_credits = credits;
        prev_cga = cga;
        credits += rc_credits;
        cga += rc_credits*rc_cga;
        refreshcga();
        return;
    }
    rc_cga = rc_cga.toUpperCase();
    if ((rc_cga.charAt(0) >= 'A') && rc_cga.charAt(0) <= 'F') { //If it's alphabets
        prev_cga = cga;
        switch (rc_cga.charAt(0)){
            case 'A':
                cga += rc_credits*4;
                break;
            case 'B':
                cga += rc_credits*3;
                break;
            case 'C':
                cga += rc_credits*2;
                break;
            case 'D':
                cga += rc_credits;
                break;
            case 'E':
                window.alert("Invalid Grade/CGA");
                return;
        }
        if (rc_cga.charAt(1) == '+') cga += rc_credits*0.3;
        else if (rc_cga.charAt(1) == '-') cga -= rc_credits*0.3;
        prev_credits = credits;
        credits += rc_credits;
        refreshcga();
        return;
    }
    else window.alert("Invalid Grade/CGA");
}

function clean() {
    prev_credits = credits;
    prev_cga = cga;
    credits = 0;
    cga = 0;
    document.getElementById("credits_earned").value = "";
    document.getElementById("grades").value = "";
    refreshcga();
}

function refreshcga() {
    creditsresult.textContent = "Earned Credits: " + credits;
    if (credits == 0) cgaresult.textContent = "CGA: 0";
    else cgaresult.textContent = "CGA: "+ (cga/credits).toFixed(3);
}

function undo() {
    credits = prev_credits;
    cga = prev_cga;
    refreshcga();
}
