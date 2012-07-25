// (function() {
// 
// })();

if(typeof navigator.device == "undefined") {
    document.addEventListener("deviceready", function(){
        console.log("The device is ready now!");
    }, false);
}
else {
    console.log("Device is ready");
}

function playVideoNow(url) {
    window.plugins.videoPlayer.play(url);
}
