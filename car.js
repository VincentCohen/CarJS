// http://jsfiddle.net/havok2905/tJnCh/18/light/
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

    var center      = this.getCenter();
    this.collisionPoints = {
        top_left:    { x: center.x - (this.image.width/2), y: center.y + (this.image.height/2) },
        bottom_left: { x: center.x - (this.image.width/2), y: center.y - (this.image.height/2) },
        top_right:   { x: center.x + (this.image.width/2), y: center.y + (this.image.height/2) },
        bottom_right:{ x: center.x + (this.image.width/2), y: center.y - (this.image.height/2) }
    }
}

Car.prototype.frame = function()
{
    /*
     Define collision points
     */
    var center      = this.getCenter();
    this.collisionPoints = {
        top_left:    { x: center.x - (this.image.width/2), y: center.y + (this.image.height/2) },
        bottom_left: { x: center.x - (this.image.width/2), y: center.y - (this.image.height/2) },
        top_right:   { x: center.x + (this.image.width/2), y: center.y + (this.image.height/2) },
        bottom_right:{ x: center.x + (this.image.width/2), y: center.y - (this.image.height/2) }
    }

    this.checkBoundaries();
    this.draw();
}

Car.prototype.draw = function()
{
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

Car.prototype.checkBoundaries = function()
{
    var collided = false;
    if (this.x >= canvas.width)
    {
        this.x = 0;
        collided = true;
    }

    if (this.x+4 < 0)
    {
        this.x = canvas.width;
        collided = true;
    }

    if (this.y >= canvas.height){
        this.y = 0
        collided = true;
    }

    if (this.y < 0)
    {
        this.y = canvas.height;
        collided = true;
    }

    if (collided)
    {
        this.speed = this.speed * 0.5;
    }

    /*
        Loop trough collision and check if there is a collision
     */
    if (!collided)
    {
        for (var key in this.collisionPoints)
        {
            var collisionPoint = this.collisionPoints[key];
            if (this.getCollision(collisionPoint.x, collisionPoint.y, 1, 1))
            {
//                console.log('Collided ' + key);

//                this.x = this.x *-1;
//                this.y = this.y *-1;

                this.speed = this.speed * 0.895;

            }
        }
    }
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

Car.prototype.getCenter = function()
{
    return {
        x: this.x,
        y: this.y
    };
}

// detects collision
Car.prototype.getCollision = function(x, y, px,py)
{
    var res = false;

    // only check imagedata if not colliding with boundaries
    if (y > 0 && y < canvas.height && x > 0 && x < canvas.width)
    {
        var pxl = ctx.getImageData(x, y, 1, 1);// px + py image width + height??

        if (pxl.data[0] === 0)
            res = true;

        if (pxl.data[1] === 0)
            res = true;

        if (pxl.data[2] === 0)
            res = true;

        if (res == true)
        {
//            console.log(pxl.data[0]);
//            console.log(pxl.data[1]);
//            console.log(pxl.data[2]);
        }
    }

    return res;
}