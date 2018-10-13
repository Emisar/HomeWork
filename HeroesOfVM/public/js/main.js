$(document).ready(async () => {
    const server = new Server();
    const canvas = new Canvas(400, 300);

    canvas.fillRect('red');

    const result = await server.getStruct();
    if (result.result) {
        const struct = result.data;
        const map = struct.map;

        const spriteWidth = 40;
        const spriteHeight = 40;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const color = (map[i][j].type === "grass") ? 'green' : 'blue';
                canvas.fillSmallRect(
                    i * spriteWidth,
                    j * spriteHeight, spriteWidth, spriteHeight, color);
            }
        }

        console.log(map);
    }
});