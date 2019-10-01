window.onload = async () => {
    let token;

    async function login(login, hash) {
        const response = await fetch(`/api/login/${login}/${hash}`);
        const result = await response.json();
        return result;
    }

    async function actionTurn(token, value) {
        const response = await fetch(`/api/game/actionTurn/${token}/${value}`);
        const result = await response.json();
        return result;
    }

    async function cheat() {
        const response = await fetch(`/api/game/cheat/${token}`);
        const result = await response.json();
        return result;
    }

    async function getCounts() {
        const response = await fetch(`/api/game/getCounts/${token}`);
        const result = await response.json();
        return result;
    }

    async function test() {
        const response = await fetch('/api/test');
        const result = await response.json();
        return result;
    }

    let rock = document.getElementById('rock');
    let paper = document.getElementById('paper');
    let scissors = document.getElementById('scissors');
    let cheatBut = document.getElementById('cheatBut');
    let countsBut = document.getElementById('countsBut');
    let loginBut = document.getElementById('loginBut');

    loginBut.onclick = async () => {
        const nickname = document.getElementById('nickname').value;
        const password = document.getElementById('password').value;
        const answer = await login(nickname, password);
        token = answer.data;
        console.log(answer);
    }
    countsBut.onclick = async () => {
        const answer = await getCounts(token);
        console.log(answer);
    }
    cheatBut.onclick = async () => {
        const answer = await cheat(token);
        console.log(answer);
    }
    rock.onclick = async () => {
        const answer = await actionTurn(token,'rock');
        console.log(answer);
    }
    paper.onclick = async () => {
        const answer = await actionTurn(token, 'paper');
        console.log(answer);
    }
    scissors.onclick = async () => {
        const answer = await actionTurn(token, 'scissors');
        console.log(answer);
    }
}