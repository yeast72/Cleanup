var BulletPlus = cc.Sprite.extend({
	ctor : function(game) {
		this._super();
		this.initWithFile('res/images/bulletPlus.png');
		this.gameLayer = game;
	},
	
	randomPosition: function() {
		var randomX = blockBg + Math.floor(Math.random() * (screenWidth - blockBg*2) );
		var randomY = blockBg + Math.floor(Math.random() * (screenHeight - blockBg*2) );
		this.setPosition(cc.p( randomX , randomY ));
	},
	
});

var blockBg = 50;