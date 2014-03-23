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
    // steering and acceleration
    if (keysPressed.left == true){ car.steerLeft();}
    if (keysPressed.right == true){ car.steerRight();}
    if (keysPressed.up == true){ car.goForward();}
    if (keysPressed.down == true){ car.goBackwards();}
}

function play()
{
    movement(player);
    player.drive();

    requestAnimFrame(play);
}

// key events
$(window).keydown(function(e)
{
    if (keys[e.keyCode] !== 'undefined'){
        keysPressed[keys[e.keyCode]] = true;
        //e.preventDefault();
    }
});

$(window).keyup(function(e)
{
    // clear pressed key
    if (keys[e.keyCode] !== 'undefined'){
        keysPressed[keys[e.keyCode]] = false;
        //e.preventDefault();
    }
    //throw new Error ('endd..');
});

var player = new Car('usr1', 'black', 'car_red_small.png', 100, 50);

var then = Date.now();
play();