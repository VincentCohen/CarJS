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


var canvas 	= document.getElementById('platform');
var ctx 	= canvas.getContext('2d');

var player      = new Car('usr1', 'black', 'car_red_small.png', 100, 50);
var track       = new Image();
var trackHit    = new Image();

track.src = "track.png";
trackHit.src = "track-hit.png";


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
}

function draw(player)
{
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(trackHit, 0, 0);
    ctx.drawImage(track, 0, 0);

    ctx.save();

    // car drive
    player.draw();
}

function frame()
{
    movement(player);
    draw(player);
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