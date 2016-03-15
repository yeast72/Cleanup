var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );
	this.player= new Cannon();
	this.player.setPosition(new cc.Point(100,100));
	this.addChild(this.player);
	this.enemy = new Enemy();
	this.enemy.setPosition(new cc.Point(400, 400));
	this.addChild(this.enemy);
    
    return true;
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
