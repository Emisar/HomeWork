function MyTube() {
    BaseRouter.call(this);

    var supportFunction = new SupportFunction();

    var data = {};

    var self = this;

    var plugin;
    var url = '';

    

    this.eventHandler = function () {
        supportFunction.MenuButton.eventHandler(self);

        plugin = document.getElementById('plugin');
        plugin.src = url;
        plugin.play();

        var progressBar = document.createElement('div');
        progressBar.setAttribute('class', 'progressBar-unactive');
        plugin.appendChild(progressBar);

        var progressBarRed = document.createElement('div');
        progressBarRed.setAttribute('class', 'progressBar-active');
        plugin.appendChild(progressBarRed);

        plugin.addEventListener('canplay', function () {
            console.log('canplay');
        });
        plugin.addEventListener('ended', function () {
            console.log('ended');
        });
        plugin.addEventListener('error', function (e) {
            console.log('error', e);
        });
        plugin.addEventListener('loaddeddata', function () {
            console.log('loaddeddata');
        });
        plugin.addEventListener('loadstart', function () {
            console.log('loadstart');
        });
        plugin.addEventListener('pause', function () {
            console.log('pause');
        });
        plugin.addEventListener('play', function () {
            console.log('play');
        });
        plugin.addEventListener('playing', function () {
            console.log('playing');
        });
        plugin.addEventListener('progress', function () {
            console.log('progress');
        });
        plugin.addEventListener('currenttime', function (time) {
            console.log('currenttime', time);
        });
        plugin.addEventListener('timeupdate', function () {

            console.log('timeupdate');
        });
        plugin.addEventListener('waiting', function () {
            console.log('waiting');
        });

        document.getElementById('play-pause').addEventListener('click', function () {
            if (plugin.paused) {
                plugin.play();
            } else {
                plugin.paused();
            }
        })
    }

    this.eventRemove = function () {
        supportFunction.MenuButton.eventRemove();
    }

    this.render = function () {
        return supportFunction.MenuButton.template('Main Menu') +
            '<h1>MyTube</h1>' +
            '<video id="plugin"></video></br>' +
            '<input type="button" id="play-pause" value="Play/Pause"></br>';
    }
}