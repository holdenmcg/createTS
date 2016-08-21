/** starts the game once html has loaded */
function init() {
    var canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    var game = new Game(canvas);
}
/**Class representing the Game */
var Game = (function () {
    function Game(canvas, width, height) {
        var _this = this;
        /** Resizes the canvas tot the screen*/
        this.resizeCanvas = function () {
            var windowRes = new Vector(window.innerWidth, window.innerHeight);
            _this.resolution = new Vector(_this.canvas.width, _this.canvas.height);
            var scale = Math.min(windowRes.x / _this.resolution.x, windowRes.y / _this.resolution.y);
            console.log(scale);
            _this.stage.scaleX = scale;
            _this.stage.scaleY = scale;
            _this.canvas.width *= scale;
            _this.canvas.height *= scale;
            console.log({
                w: _this.canvas.width,
                h: _this.canvas.height
            });
            _this.stage.update();
        };
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas);
        var ball = new GameObject(100, 100, new createjs.SpriteSheet({
            images: ["http://www.gritengine.com/luaimg/circle.png"],
            frames: {
                width: 64,
                height: 64,
                count: 1
            }
        }));
        this.stage.addChild(ball.sprite);
        this.stage.update();
    }
    return Game;
}());
/** Class representing a genric game object */
var GameObject = (function () {
    function GameObject(startX, startY, spriteSheet) {
        /** function called once, when the object is created */
        this.start = function () { };
        /**function called every frame */
        this.update = function () {
            //physics calculations
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        };
        /** draw's object's sprite to screen */
        this.draw = function () { };
        /** function called when object is destroyed*/
        this.destroy = function () { };
        this.sprite = new createjs.Sprite(spriteSheet);
        this.position = new Vector(startX, startY);
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.start();
    }
    return GameObject;
}());
/** Class to help with vector math */
var Vector = (function () {
    function Vector(x, y) {
        var _this = this;
        /**
        * Adds another vector to this once
        * @param other The vector that is added to this one
        */
        this.add = function (other) {
            _this.x += other.x;
            _this.y += other.y;
        };
        /**
        * Multiplies this vector by a scalar coefficient
        *@param coefficient The number that theis Vecotr is multiplied by
        */
        this.multiply = function (coefficient) {
            _this.x *= coefficient;
            _this.y *= coefficient;
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());