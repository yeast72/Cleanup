var Enemy = cc.Sprite.extend({
	ctor: function(game) {
		this._super();
		this.initWithFile('res/images/enemy1.png');
		this.gameLayer = game;
		this.player = this.gameLayer.player;
		this.moveAction = this.createAnimationAction1();
		this.dead = false;
	},
	update: function(dt) {
		var pPos = this.player.getPosition();
		this.directionToPlayer(pPos);
		this.closeTo(pPos);
		if(this.gameLayer.isOver == true){
			this.gameLayer.player.unscheduleUpdate();
			this.gameLayer.canfire = false;
			this.unscheduleUpdate();
		}
		
	},
	createAnimationAction1: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'res/images/enemy1.png' );
        animation.addSpriteFrameWithFile( 'res/images/enemy2.png' );
        animation.setDelayPerUnit( 0.2 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    },
	directionToPlayer: function(pPos){
		var pos = this.getPosition();
		if(pos.x < pPos.x){
			this.moveRight();
		}if(pos.x > pPos.x){
			this.moveLeft();
		}if(pos.y > pPos.y){
			this.moveDown();
		}if(pos.y < pPos.y){
			this.moveUp();
		}
		
	},moveRight: function() {
		var pos = this.getPosition();
		this.setPosition(pos.x + 2 , pos.y);
	},moveLeft: function() {
		var pos = this.getPosition();
		this.setPosition(pos.x - 2 , pos.y);
	},moveUp: function() {
		var pos = this.getPosition();
		this.setPosition(pos.x , pos.y + 2);
	},moveDown: function(){
		var pos = this.getPosition();
		this.setPosition(pos.x , pos.y - 2);
	},
	closeTo: function(pPos){
		var myPos = this.getPosition();
		if(( Math.abs(myPos.x - pPos.x) <= 30 ) && (Math.abs(myPos.y - pPos.y) <= 20 ))
			this.gameLayer.isOver = true ;
	},
	die: function(){
		this.gameLayer.enemy.unscheduleUpdate();
		this.gameLayer.removeChild(this);
		this.dead = true;
	}
	
});

Enemy.Velocity = 2;