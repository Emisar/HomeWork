$(document).ready(async () => {
    const server = new Server();

    const result = await server.endTurn(1);

    console.log(result);
});