var Player = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/Cannon.png');
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.dirMove = "";
	},
	update: function(dt){
		var pos = this.getPosition();
		this.setPosition(new cc.Point(pos.x + this.xVelocity,pos.y + this.yVelocity));
	},
	moveRight: function() {
		this.xVelocity = Player.MOVE_RIGHT;
		this.dirMove = "right";
	},
	moveLeft: function() {
		this.xVelocity = Player.MOVE_LEFT;
		this.dirMove = "left";
	}
});


Player.MOVE_RIGHT = 5 ;
Player.MOVE_LEFT = -5 ;

