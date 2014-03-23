// http://jsfiddle.net/havok2905/tJnCh/18/light/

var canvas 	= document.getElementById('platform');
var ctx 	= canvas.getContext('2d');	

function Car(player, color, image, x, y)
{
    this.player	= player;
    this.color	= color;

    this.speed = 0;
    this.rotation = Math.PI/180;

    this.x 	= x;
    this.y	= y;

    this.angle	= 0;//Math.PI / 180;
    this.drift	= 0;

    this.image 	= new Image();
    this.image.src	= image;
}

Car.prototype.drive = function()
{
    ctx.clearRect(0,0,800,600);

    // before we screw with it
    ctx.save();

    var speedAxis = this.getSpeedAxis();

    this.x += speedAxis.x;
    this.y += speedAxis.y;

    // move to the middle of where we want to draw our image
    ctx.translate(this.x, this.y);

    // angle from degrees to radians
    ctx.rotate(this.angle * this.rotation);

    // and height of the image
    ctx.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));

    // and restore the co-ords to how they were when we began
    ctx.restore();
}

Car.prototype.steerLeft = function()
{
    this.angle -= 3;
}

Car.prototype.steerRight = function()
{
    this.angle += 3;
}

Car.prototype.goForward = function()
{
    this.speed += 0.1;
}

Car.prototype.goBackwards = function()
{
    this.speed -= 0.1;
}

Car.prototype.getSpeedAxis = function()
{
    return {
        'x' : Math.sin(this.angle *  this.rotation) * this.speed,
        'y' : Math.cos(this.angle *  this.rotation) * this.speed * -1
    }
}