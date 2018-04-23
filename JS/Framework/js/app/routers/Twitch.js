function Twitch() {
    BaseRouter.call(this);

    var supportFunction = new SupportFunction();

	var self = this;

	var plugin;

	function check() {
		navigator.getUserMedia = (navigator.getUserMedia ||
								  navigator.webkitGetUserMedia ||
								  navigator.mozGetUserMedia ||
								  navigator.msGetUserMedia);
		if (navigator.getUserMedia) {
			navigator.getUserMedia( { video: true },
				function (localMediaStream) {
                    if (plugin) {
                        plugin.src = window.URL.createObjectURL(localMediaStream);
					}
				},
				function (err) {
					console.log('Error occured');
				}
			);
		} else {
			alert('Sorry');
		}
	}

    this.eventHandler = function () {
        supportFunction.MenuButton.eventHandler(self);

		plugin = document.getElementById('camera');
        check();

        var timeBlock = document.createElement('div');
        timeBlock.setAttribute('class', 'timeBlock');
        document.getElementById('application').appendChild(timeBlock);

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
            //console.log('progress');
        });
        plugin.addEventListener('currenttime', function () {
            console.log('currenttime');
        });
        plugin.addEventListener('timeupdate', function () {
            document.getElementById('timeCode').innerHTML += 'Stream duration: ' + timeFormat(plugin.currentTime);
        });
        plugin.addEventListener('waiting', function () {
            console.log('waiting');
        });
	};

    this.eventRemove = function () {
        supportFunction.MenuButton.eventRemove();
	};

    this.render = function () {
        return supportFunction.MenuButton.template('Main Menu') + 
				'<div align="middle">' +
            '<video id="camera" width="500" autoplay></video><br>' +
            '<div id="timeCode" width="500"></div>'
                '</div>';
	};
}