var GameLayer = cc.LayerColor.extend({
  init: function() {
   	this.background = new Bg();
	this.addChild(this.background);
	this.background.setPosition(new cc.Point(400,300));
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
