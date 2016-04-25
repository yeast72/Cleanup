
var GameLayer = cc.LayerColor.extend({
  init: function() {
   	this.background = new Bg();
	this.addChild(this.background);
	this.background.setPosition(new cc.Point(400,300));
	this.player= new Player();
	this.player.setPosition(new cc.Point(400,300));
	this.addChild(this.player);
    this.addKeyboardHandlers();
	this.scheduleUpdate();
	this.arrBullet = [];
	this.arrEnemy = [];
	this.createEnemy();
	this.isOver = false;
	this.canfire = true;
	this.time = 0;
    return true;
  },
	update: function(){
		if(!this.isOver){
			var pos = this.player.getPosition();
			this.player.scheduleUpdate();
		}
		this.time++;
		if(this.time > 180){
			this.createEnemy();
			this.time = 0;
		}
		this.checkBulletToEnemy()
		for(var i = 0 ; i < this.arrBullet.length ; i++) {
			this.removeBulletOutOfBound(this.arrBullet[i] , i);
		}
		
	},
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },

	onKeyDown: function( keyCode, event ) {
		if( keyCode == cc.KEY.d){
			this.player.switchDirection(4);
		}else if( keyCode == cc.KEY.a){
			this.player.switchDirection(3);
		}else if( keyCode == cc.KEY.w){
			this.player.switchDirection(1);
    	}else if(keyCode == cc.KEY.s){
      		this.player.switchDirection(2);
		}else if( keyCode == cc.KEY.up){
				this.fire(1);
		}else if( keyCode == cc.KEY.down){
				this.fire(2);
		}else if( keyCode == cc.KEY.left){
				this.fire(3);
		}else if( keyCode == cc.KEY.right){
				this.fire(4);
		}
    },
    onKeyUp: function( keyCode, event ) {
      if( keyCode == cc.KEY.d){
		  this.player.switchDirectionRelease(4);
      }else if (keyCode == cc.KEY.a) {
          this.player.switchDirectionRelease(3);
      }else if(keyCode == cc.KEY.w){
          this.player.switchDirectionRelease(1);
      }else if(keyCode == cc.KEY.s){
          this.player.switchDirectionRelease(2);
      }
    },
	
	createEnemy : function(){
		this.enemy = new Enemy(this);
		this.enemy.randomPosition();
		this.enemy.runAction(this.enemy.moveAction);
		this.addChild(this.enemy);
		this.arrEnemy.push(this.enemy);
		this.enemy.scheduleUpdate();
	},
	fire : function(direction){
		if(this.canfire){
			this.bullet = new Bullet(this,direction);
			this.addChild(this.bullet);
			this.arrBullet.push(this.bullet);
			this.bullet.scheduleUpdate();
		}
		
	},
	canFireBullet : function(){
		this.canfire = true;
		console.log(this.canfire);
	},
	checkBulletToEnemy : function() {
		if(this.arrBullet != null && this.arrEnemy != null){
			for( var i = 0 ; i < this.arrEnemy.length ; i++){
				for( var j = 0 ; j < this.arrBullet.length ; j++){
					if(this.isIntersect(this.arrEnemy[i] , 		this.arrBullet[j])){
						this.removeChild(this.arrBullet[j]);
						this.arrBullet.splice(j,1);
						this.removeChild(this.arrEnemy[i]);
						this.arrEnemy.splice(i,1);
					}	
				}
			}
		}
	},
	isIntersect : function (obj1 , obj2) {
		if(obj1 != null && obj2 != null) {
			var obj1Pos = obj1.getPosition();
			var obj2Pos = obj2.getPosition();
			var distanceX = Math.abs(obj1Pos.x - obj2Pos.x);
			var distanceY = Math.abs(obj1Pos.y - obj2Pos.y);
			return(distanceX < 10 && distanceY < 10);
		}
	},
	removeBulletOutOfBound : function(bullet , i){
			var pos = bullet.getPosition();
		if( pos.x < 50 || pos.x > screenWidth - 50 || pos.y < 50 || pos.y > screenHeight - 50) {
			this.removeChild(this.arrBullet[i]);
			this.arrBullet.splice(i,1);
		}
		},
	
	
	

});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});
