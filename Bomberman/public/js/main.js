window.onload = () => {
    var HOST = window.location.protocol + '//' + window.location.hostname;
    var PORT = '5000';
    const socket = io(HOST + ':' + PORT); // where socket connecting
    
    socket.on('test_message', (data) => console.log(data));

    socket.on('some event', (data) => console.log(data));

    document.getElementById('pressMe').addEventListener('click', () => {
        socket.emit('test_message', { some: 'some val' });
    });
};