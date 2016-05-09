
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
	  this.currentBullet = 7;
	  this.arrBullet = [];
	  this.arrEnemy = [];
	  this.timeEnemySpawn = 180;
	  this.timeEnemy = 0;
	  this.timeDelayGun = 15;
	  this.timeGun = 0;
	  this.timeItemBullet = 0;
	  this.createEnemy();
	  this.isOver = false;
	  this.canfire = true;
	  this.textAmmo = cc.LabelTTF.create('Ammo : ' + this.currentBullet , 'bullet' , 40);
	  this.textAmmo.setPosition(new cc.Point(blockBg + 50, screenHeight - blockBg));
	  this.addChild(this.textAmmo);
	  this.scoreLabel = cc.LabelTTF.create( 'Score : ' + score, 'Score' , 40);
	  this.scoreLabel.setPosition(new cc.Point(screenWidth - 100 , screenHeight - 40 ));
	  this.addChild(this.scoreLabel);
	  return true;
	  
  },
	
	update: function(){
		if(!this.isOver){
			var pos = this.player.getPosition();
			this.player.scheduleUpdate();
		}
		this.updateTime();
		if(this.timeEnemy > this.timeEnemySpawn){
			this.createEnemy();
			this.timeEnemy = 0;
			if(this.timeEnemySpawn > 45)
			this.timeEnemySpawn = this.timeEnemySpawn -30;
		}
		if(this.timeGun > this.timeDelayGun){
			this.canfire = true;
			this.timeGun = 0;
		}
		this.checkBulletToEnemy()
		for(var i = 0 ; i < this.arrBullet.length ; i++) {
			this.removeBulletOutOfBound(this.arrBullet[i] , i);
		}
		this.checkAdjacentEnemy();
		this.gameOver();
		this.itemBulletSpawn();
		this.loseItemBullet();
		this.checkGetBullet();
		
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
		if(this.currentBullet > 0) {
			if(this.canfire) {
				this.bullet = new Bullet(this,direction);
				this.addChild(this.bullet);
				this.arrBullet.push(this.bullet);
				this.bullet.scheduleUpdate();
				this.canfire = false;
				this.currentBullet -= 1;
				this.textAmmo.setString('Ammo : ' + this.currentBullet );
			}
		}
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
						this.addScore(2);
					}	
				}
			}
		}
	},
	updateTime : function() {
		this.timeEnemy++;
		this.timeGun++;
		this.timeItemBullet++;
	},
									 
	addScore : function(scoreAdd) {
		score += scoreAdd;
		this.scoreLabel.setString('Score : '+ score);
	},
	
	isIntersect : function (obj1 , obj2) {
		if(obj1 != null && obj2 != null) {
			var obj1Pos = obj1.getPosition();
			var obj2Pos = obj2.getPosition();
			var distanceX = Math.abs(obj1Pos.x - obj2Pos.x);
			var distanceY = Math.abs(obj1Pos.y - obj2Pos.y);
			return(distanceX < 35 && distanceY < 35);
		}
	},
	removeBulletOutOfBound : function(bullet , i){
			var pos = bullet.getPosition();
		if( pos.x < 50 || pos.x > screenWidth - 50 || pos.y < 50 || pos.y > screenHeight - 50) {
			this.removeChild(this.arrBullet[i]);
			this.arrBullet.splice(i,1);
			}
	},
	
	checkAdjacentEnemy : function(){
		for(var i = 0 ; i < this.arrEnemy.length ; i++){
			for(var j = 0 ; j < this.arrEnemy.length ; j++){
				if(this.isIntersect(this.arrEnemy[i],this.arrEnemy[j])){
					this.checkDirection(this.arrEnemy[i],this.arrEnemy[j]);
				}
					
			}
		}
	},
	
	checkDirection : function(obj1,obj2) {
		if(obj1 != null && obj2 != null) {
			var obj1Pos = obj1.getPosition();
			var obj2Pos = obj2.getPosition();
			if(obj1Pos.x > obj2Pos.x){
				obj2.moveLeft();
			}
			if(obj1Pos.x < obj2Pos.x){
				obj2.moveRight();
			}
			if(obj1Pos.y > obj2Pos.y){
				obj2.moveDown();
			}
			if(obj1Pos.y < obj2Pos.y){
				obj2.moveUp();
			}
		}
	},
	
	gameOver : function() {
		if(this.isOver)
			cc.director.runScene(new GameOverScene());
	},
	
	itemBulletSpawn : function() {
		if(this.timeItemBullet > 300){
			this.itemBullet = new BulletPlus(this);
			this.itemBullet.randomPosition();
			this.addChild(this.itemBullet);
			this.timeItemBullet = 0;
		}
	},
	
	checkGetBullet : function() {
		if(this.isIntersect(this.player,this.itemBullet)){
			this.removeChild(this.itemBullet);
			this.itemBullet = null;
			this.currentBullet += 8;
			this.textAmmo.setString('Ammo : ' + this.currentBullet );
		}
	},
	
	loseItemBullet : function() {
		if(this.itemBullet != null){
			if(this.timeItemBullet > 240 ){
				this.removeChild(this.itemBullet);
				this.itemBullet = null;
			}
		}
	},
	
});

var StartScene = cc.Scene.extend ({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});

var score = 0 ;