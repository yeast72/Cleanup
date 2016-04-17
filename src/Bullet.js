var Bullet = cc.Sprite.extend({
	ctor: function(game,direction) {
		this._super();
		this.initWithFile('res/images/bullet.png');
		this.gameLayer = game;
		this.direction = direction;
		this.speed = 5.2;
		var playerPos = this.gameLayer.player.getPosition();
		this.setPosition(new cc.Point(playerPos.x, playerPos.y));
	},
	update: function(dt){
		if(this.direction == Bullet.Dir.UP){
			this.fireUp();
		}else if(this.direction == Bullet.Dir.DOWN){
			this.fireDown();
		}else if(this.direction == Bullet.Dir.LEFT){
			this.fireLeft();
		}else if(this.direction == Bullet.Dir.RIGHT){
			this.fireRight();
		}
	},
	fireRight: function(){
		var pos = this.getPosition();
		this.setPosition(new cc.Point(pos.x + this.speed , pos.y));
	},
	fireLeft: function() {
		var pos = this.getPosition();
		this.setPosition(new cc.Point(pos.x - this.speed , pos.y));
	},
	fireUp: function() {
		var pos = this.getPosition();
		this.setPosition(new cc.Point(pos.x , pos.y + this.speed));
	},
	fireDown: function(){
		var pos = this.getPosition();
		this.setPosition(new cc.Point(pos.x , pos.y - this.speed));
	},
});

var Velocity = 5.2;
Bullet.Dir = {
	UP : 1,
	DOWN : 2,
	LEFT : 3,
	RIGHT : 4
};