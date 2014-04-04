// request animation frame by Paul Irish
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();


// App settings
var canvas 	= document.getElementById('platform');
var ctx 	= canvas.getContext('2d');
var player      = new Car('usr1', 'black', 'car_red_small.png', 100, 50);
var track       = new Image();
var trackHit    = new Image();

track.src = "track_test.png";
track.loaded = false;
trackHit.src = "track-hit.png";
trackHit.loaded = false;

track.onload = function()
{
    track.loaded = true;
}

trackHit.onload = function()
{
    trackHit.loaded = true;
}


var keys = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
};

var keysPressed = {
    left: false,
    right: false,
    up: false,
    down: false
}

function movement(car)
{
    if (keysPressed.left == true){ car.steerLeft();}
    if (keysPressed.right == true){ car.steerRight();}
    if (keysPressed.up == true){ car.goForward();}
    if (keysPressed.down == true){ car.goBackwards();}

    // draw hitmap before track is drawn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(trackHit, 0, 0);
    ctx.save();
}

function draw(player)
{
//    ctx.clearRect(0, 0, canvas.width, canvas.height);
//    ctx.drawImage(track, 0, 0);
//    ctx.save();

    // car frame functions
    player.frame();
}

function frame()
{
    if (trackHit.loaded && track.loaded)
    {
        movement(player);
        draw(player);
    }

    requestAnimFrame(frame);
}

// key events
$(window).keydown(function(e)
{
    if (keys[e.keyCode] !== 'undefined'){
        keysPressed[keys[e.keyCode]] = true;
    }
});

$(window).keyup(function(e)
{
    // clear pressed key
    if (keys[e.keyCode] !== 'undefined'){
        keysPressed[keys[e.keyCode]] = false;
    }
    //throw new Error ('endd..');
});

var then = Date.now();

frame();