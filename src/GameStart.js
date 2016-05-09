var GameStart = cc.Sprite.extend( {
	init : function() {
		this._super();
		this.initWithFile('res/images/StartGame.png');
		this.setPosition(new cc.Point(screenWidth / 2,screenHeight / 2));
		this.addKeyboardHandlers();
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

var GameStartScece = cc.Scene.extend ({
	onEnter : function() {
		this._super();
		var layer = new GameStart();
		layer.init();
		this.addChild(layer);
	}
});