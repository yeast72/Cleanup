var GameOver = cc.Sprite.extend( {
	
	init : function() {
		this._super();
		var animate = new cc.Animation.create();	animate.addSpriteFrameWithFile('res/images/gameover.png');	animate.addSpriteFrameWithFile('res/images/gameover.png');
		animate.setDelayPerUnit(1.0);
		var movingBackground = cc.RepeatForever.create(cc.Animate.create(animate));
		this.runAction(movingBackground);
		this.setPosition(new cc.Point(screenWidth /2 , screenHeight / 2));
		this.addKeyboardHandlers();
		this.scoreLabel = cc.LabelTTF.create( '0' , 'Score' , 40);
		this.scoreLabel.setPosition(new cc.Point(screenWidth / 2 , screenHeight / 2  - 100));
		this.scoreLabel.setString(score);
	  	this.addChild(this.scoreLabel);
		 this.textScoreLabel = cc.LabelTTF.create( 'Score :  ' , 'StringScore' , 40);
		this.textScoreLabel.setPosition(new cc.Point(screenWidth / 2 - 75 , screenHeight / 2 - 100 ));
	  	this.addChild(this.textScoreLabel);
	},
	
	addKeyboardHandlers : function() {
		var self = this;
		cc.eventManager.addListener({
			event : cc.EventListener.KEYBOARD,
			onKeyPressed : function( keyCode , event ) {
				self.onKeyDown( keyCode , event );
			},
			onKeyReleased : function( keyCode , event ) {
				self.onKeyUp( keyCode , event );
			}
		} , this );
	},
	
	onKeyDown : function( keyCode , event ) {
		if( keyCode == cc.KEY.enter){
			cc.director.runScene( new StartScene());
			score = 0;
		}
	},
	
	onKeyUp : function(keyCode , event) {
		
	},
	
});

var GameOverScene = cc.Scene.extend ({
	onEnter : function() {
		this._super();
		var layer = new GameOver();
		layer.init();
		this.addChild(layer);
	}
});