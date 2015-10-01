var APIkey = 'a1fa6acd3abb1d70';

// making a sound stuff
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// create oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

//connect oscillator with gain
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

//define the sound

oscillator.type = 'square';
oscillator.frequency.value = 300;
oscillator.start();

gainNode.gain.value = 0.2;

//now lets find the wind speed.

var loadWeather = function(parsed_json) {
    console.log(parsed_json);
    var location = parsed_json['location']['city'];
    var wind_kph = parsed_json['current_observation']['wind_kph'];
    console.log("Current wind kph " + location + " is: " + wind_kph);

    $('#city').html("The current wind speed in " + location + " is " + wind_kph + " kilometers per hour.");
    //map this shit to a more reasonable range for the variable

    var output = setInterval(function(){
        var hello = Math.floor((Math.random() * wind_kph * 20) + 1);
        hello *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        console.log("hello " + hello)
        oscillator.frequency.value = 500 + hello;
        console.log(oscillator.frequency.value)

    }, 500);
}

var mute = document.querySelector('.mute');

mute.onclick = function() {
  if(mute.id == "") {
    gainNode.disconnect(audioCtx.destination);
    mute.id = "activated";
    mute.innerHTML = "(unmute)";
  } else {
    gainNode.connect(audioCtx.destination);
    mute.id = "";
    mute.innerHTML = "(mute)";
  }
}

// // Set the name of the hidden property and the change event for visibility
// var hidden, visibilityChange;
// if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
//     hidden = "hidden";
//     visibilityChange = "visibilitychange";
// } else if (typeof document.webkitHidden !== "undefined") {
//     hidden = "webkitHidden";
//     visibilityChange = "webkitvisibilitychange";
// }


// // If the page is hidden and unmuted, pause the sound;

// function handleVisibilityChange() {
//     if (document[hidden] && mute.id == "") {
//         gainNode.disconnect(audioCtx.destination);
//         mute.id = "activated";
//         mute.innerHTML = "(unmute)";
//     }
// }


// // Warn if the browser doesn't support addEventListener or the Page Visibility API
// if (typeof document.addEventListener === "undefined" ||
//     typeof document[hidden] === "undefined") {
//     alert("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
// } else {
// // Handle page visibility change
//     document.addEventListener(visibilityChange, handleVisibilityChange, false);
// }


//get wunderground working

$.ajax({
    url:"http://api.wunderground.com/api/" + APIkey + "/geolookup/conditions/q/autoip.json",
    // http://api.wunderground.com/api/'MY_KEY'/conditions/q/NY/brooklyn.json
    dataType : "jsonp",
    success : function(parsed_json) {
        loadWeather(parsed_json);
    }
});






