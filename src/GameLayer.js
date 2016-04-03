
var GameLayer = cc.LayerColor.extend({
  init: function() {
   	this.background = new Bg();
	this.addChild(this.background);
	this.background.setPosition(new cc.Point(400,300));
	this.player= new Player();
	this.player.setPosition(new cc.Point(400,300));
	this.addChild(this.player);
	this.enemy = new Enemy();
	this.enemy.setPosition(new cc.Point(0, 300));
	this.addChild(this.enemy);
    this.addKeyboardHandlers();
	this.scheduleUpdate();
    return true;
  },
	update: function(){
	this.player.scheduleUpdate();
		
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
		if( keyCode == cc.KEY.right){
			this.player.moveRight();
		}else if( keyCode == cc.KEY.left){
			this.player.moveLeft();
		}
    },
    onKeyUp: function( keyCode, event ) {
		console.log('Up: ' + keyCode.toString());
    }
});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});
