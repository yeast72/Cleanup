var Player = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('res/images/PlayerDown.png');
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.dirMove = "";
	},
	update: function(dt){
		this.move(dt);
	},
	switchDirection: function(direction) {
		if(direction == 1){
			this.isUp =true;
		}
		else if (direction == 2) {
			this.isDown = true;
		}
		else if (direction == 3){
			this.isLeft = true;
		}else if(direction == 4){
			this.isRight = true;
		}
	},
	switchDirectionRelease: function(direction){
		if(direction == 1){
		this.isUp = false;
		}
		else if (direction == 2) {
			this.isDown = false;
		}
		else if (direction == 3){
			this.isLeft = false;
		}else if(direction == 4){
			this.isRight = false;
		}
	},
	move :function(dt) {
		var pos = this.getPosition();
		var nextPos = pos;
		if(this.isUp){
			this.initWithFile('res/images/PlayerUp.png');
			nextPos = cc.p(pos.x, pos.y + Player.MOVE_UP);
			if(nextPos.y < screenHeight - BlockMap){
				this.setPosition(nextPos);
			}
		}
		else if (this.isDown) {
			this.initWithFile('res/images/PlayerDown.png');
			nextPos = cc.p(pos.x, pos.y + Player.MOVE_DOWN);
			if(nextPos.y > BlockMap){
				this.setPosition(nextPos);
			}
		}
		else if (this.isRight) {
			this.initWithFile('res/images/PlayerRight.png');
			nextPos = cc.p(pos.x + Player.MOVE_RIGHT, pos.y);
			if(nextPos.x < screenWidth - BlockMap){
				this.setPosition(nextPos);
			}
		}else if (this.isLeft) {
			this.initWithFile('res/images/PlayerLeft.png');
			nextPos = cc.p(pos.x + Player.MOVE_LEFT, pos.y);
			if(nextPos.x > BlockMap){
				this.setPosition(nextPos);
			}
		}
	}
});


Player.MOVE_RIGHT = 3.5;
Player.MOVE_LEFT = -3.5 ;
Player.MOVE_UP = 3.5;
Player.MOVE_DOWN = -3.5;
Player.DIR = {
	UP:1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4
};
BlockMap = 50;
