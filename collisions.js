function rotatePoint (coords, angle, distance) {
    return {
        x: Math.sin(angle * 180) * distance + coords.x,
        y: Math.cos(angle * 180) * distance * -1 + coords.y,
    };
}

// http://www.playmycode.com/blog/2011/08/javascript-per-pixel-html5-canvas-image-collision-detection/

function CollisionPoint (car, rotation, distance) {
    this.car = car;
    this.rotation = rotation;
    this.distance = distance || this.distance;
}

CollisionPoint.prototype = {
    car: null,
    rotation: 0,
    distance: 20,
    getXY: function(){
        return rotatePoint(
            this.car.getCenter(),
            this.car.rotation + this.rotation,
            this.distance
        );
    },
    isHit: function(hitMap){
        var xy = this.getXY();
        return hitMap.isHit(xy.x, xy.y);
    }
};

function CollisionRadius () {}

CollisionRadius.prototype = {
    x: 0,
    y: 0,
    radius: 10,
    check: function(coords){
    }
};