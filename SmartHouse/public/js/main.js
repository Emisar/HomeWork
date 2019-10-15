window.onload = () => {

    const server = new Server();


    let rock = document.getElementById('rock');
    let paper = document.getElementById('paper');
    let scissors = document.getElementById('scissors');
    let cheatBut = document.getElementById('cheatBut');
    let countsBut = document.getElementById('countsBut');
    let loginBut = document.getElementById('loginBut');
    let logoutBut = document.getElementById('logoutBut');

    loginBut.onclick = async () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const answer = await server.login(login, password);
        if (answer) {
            console.log('Ура!!!!');
        }
        console.log(answer);
    };

    logoutBut.onclick = async () => {
        const answer = await server.logout();
        console.log(answer);
    }
}