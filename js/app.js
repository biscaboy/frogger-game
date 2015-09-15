/*
 app.js - Frogger Game Implementation 
 Author:  David Dickinson from provided script by Udacity Instructors
*/
/*
//////////////////////////////////////////////////////////////////////
Static variable section
Since Javascript containt not static key word, I've impletemented
these variables as functions so that their value is protected
making them behave as statics with a global scope.
Credit for this pattern: chamnap @ http://chamnapchhorn.blogspot.com/2008/07/trick-to-use-static-variables-in.html
//////////////////////////////////////////////////////////////////////
*/
// OFFSET_X: Horizontial offset for each square on the playing space
var OFFSET_X = (function(){
    return 101;
})();
// OFFSET_Y: Vertical offset for each square on the playing space
var OFFSET_Y = (function(){
    return 83;
})();
// @todo:  make it dynamic instead of static (maybe based on levels?)
// NUM_COLS:  Total number of columns in the playing space
var NUM_COLS = (function(){
    return 7;  
})();
// NUM_ROWS:  Total number of rows in the playing space  
var NUM_ROWS = (function(){
    return 6;  
})();
// FIRST_COL: Number of the left most column in the playing space
var FIRST_COL = (function(){
    return 1;
})();
// FIRST_ROW:  Number of the top row in the playing space
var FIRST_ROW = (function(){
    return 1; 
})();
// @todo:  make it dynamic. (based on level?)
// NUM_ENEMIES:  The starting number of enemies to render in the game.
// Having an enemy for each column makes the game too hard... so one less is fun.
var NUM_ENEMIES = (function(){
    return NUM_COLS - 1;
})();
// @todo: add a sprite selector.
// Images for the game players, gems and enemies.
var PLAYER_DEFAULT_IMAGE = (function(){
    return 'images/char-boy.png'; 
})();
var ENEMY_DEFAULT_IMAGE = (function(){
    return 'images/enemy-bug.png'; 
})();
var GEM_BLUE_IMAGE = (function(){
	return 'images/Gem Blue.png';
})();
var GEM_GREEN_IMAGE = (function(){
	return 'images/Gem Green.png';
})();
var GEM_ORANGE_IMAGE = (function(){
	return 'images/Gem Orange.png';
})();

//////////////////////////////////////////////////////////////////////
// Utility functions
//////////////////////////////////////////////////////////////////////
function strokeRoundedRect(color, x, y, width, height, radius){
	_roundedRect (x,y,width,height,radius);
	ctx.strokeStyle = color;
  	ctx.stroke();
};

function fillRoundedRect(color, x, y, width, height, radius){
	_roundedRect (x,y,width,height,radius);
	ctx.fillStyle = color;
  	ctx.fill();
};

// A utility function to draw a rectangle with rounded corners.
// Source:  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function _roundedRect (x, y, width, height, radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
};

//////////////////////////////////////////////////////////////////////
// Class:  Scoreboard 
//  
// Object representing the scoreboard where the player's score is 
// displayed.
//
// A score board also adds Gems to the fieldf as the player's 
// score goes higher.
//////////////////////////////////////////////////////////////////////
var Scoreboard = function() {
	// formatting properties
	this.position = { x: (NUM_COLS - 1) * OFFSET_X, y: 0 };
	this.textposition = { x: 50, y: 50 };
	this.dimension = { height: 50, width: OFFSET_X };
	this.bgcolor = "#000";
	this.borderwidth = 3;
	this.bordercolor = "#fff";
	this.textcolor = "#fff";
	this.textbordercolor = "#fff";
	this.textborderwidth = 1;
	this.cornerradius = 15;
	this.textsize = 18;
	
	// state properties
	this.score = 0;
	// @todo currently not used could be useful for timestamps of events.
	this.elapsedTime = 0;
	
	// animation properties - the score blinks when points are earned.
	this.isVisible = true;
	this.blinkTimer = 0;
	this.animateScore = false;
	this.animateCollision = false;
	this.animationInitialized = false;
	this.animationTimer = 0;

};

// CELEBRATION_DELAY:  how long to celebrate a score
// seconds to delay before resetting player to starting position.
Scoreboard.prototype.CELEBRATION_DELAY = (function(){
    return 2;  
})();

Scoreboard.prototype.getElapsedTime = function() {
	return this.elapsedTime;
}

Scoreboard.prototype.increment = function(value) {
	this.score += value;
	this.animateScore = true;
	this.animationTimer = 0;
	// @todo make sure there is only one gem in a square.
	// add a new gem to the game if the score is high enough
	if (this.score % 3 == 0) {
		gems.push(new Saphire()); 
	} else if (this.score % 7 == 0) {
		gems.push(new Emerald()); 
	} else if (this.score % 13 == 0) {
		gems.push(new Diamond()); 
	}
};

Scoreboard.prototype.decrement = function(value) {
	if (this.score > 0 && this.score - value >= 0) {
		this.score -= value;
	} else {
		this.score = 0;
	}
	this.animateCollision = true;
	this.animationTimer = 0;
};

// @todo:  if you clear a level then reset to 0
Scoreboard.prototype.reset = function(){
	this.isVisible = true;
	this.textcolor = "#fff";
	this.textbordercolor = "#fff";
	this.animationInitialized = false;
	this.animationTimer = 0;
	this.animateScore = false;
	this.animateCollision = false;
};

Scoreboard.prototype.render = function() {
	// create the scoreboard background
	ctx.fillStyle = this.bgcolor;
	fillRoundedRect(this.bgcolor,
		this.position.x + this.borderwidth/2, 
		this.position.y + this.borderwidth/2, 
		this.dimension.width - this.borderwidth, 
		this.dimension.height - this.borderwidth,
		this.cornerradius); // 
	ctx.strokeStyle = this.bordercolor;
	ctx.lineWidth = this.borderwidth;
	strokeRoundedRect(this.bordercolor,
		this.position.x + this.borderwidth/2, 
		this.position.y + this.borderwidth/2, 
		this.dimension.width - this.borderwidth, 
		this.dimension.height - this.borderwidth,
		this.cornerradius); // 

	// write the score
	ctx.font = this.textsize + "pt Arial";
	ctx.textAlign = "right";

	if (this.isVisible) {
		ctx.fillStyle = this.textcolor;
		ctx.strokeStyle = this.textbordercolor;
	} else { 
		ctx.fillStyle = this.bgcolor;
		ctx.strokeStyle = this.bgcolor;
	}

	ctx.fillText(this.score, this.position.x + this.dimension.width - 15, this.position.y + this.dimension.height - 15);
	ctx.lineWidth = this.textborderwidth;
	ctx.strokeText(this.score, this.position.x + this.dimension.width - 15, this.position.y + this.dimension.height - 15);

	// display gems if any
	if (gems.length > 0) {
	    for (var i = 0; i < gems.length; i++){
		    gems[i].render();
	    }
	}
};

Scoreboard.prototype.blinkScore = function(dt, color) {
	this.animate(dt, .15, color)
};

Scoreboard.prototype.animate = function(dt, duration, color) {
	this.blinkTimer += dt;
	if (this.blinkTimer > duration) {
		if (!this.animationInitialized) {
			// this is the first movement made for this animation.
			// so center the shake (stays in the middle of the square)
			this.animationInitialized = true;
		}
		if (this.isVisible) {
			this.isVisible = false;
		} else {
			this.textcolor = color; 
			this.textbordercolor = color;
			this.isVisible = true;
		}
		this.blinkTimer = 0;
	}
};

Scoreboard.prototype.update = function(dt) {
	// keeping track of how long we have played.
	this.elapsedTime += dt;
	
	// has there been a collision or a score??
	if (this.animateScore || this.animateCollision ) {
		    	// increment the elapsed time to the timer.
        this.animationTimer += dt;
        var color = "#00ff00";
        if (this.animateCollision) {
        	color = "#ff0000";
        } 
        this.blinkScore(dt, color);
        
        // wait for timer to go off and then reset the animation
        if (this.animationTimer > this.CELEBRATION_DELAY) {
            this.reset();
        }
	}

}

//////////////////////////////////////////////////////////////////////
// Class:  GamePiece
//
// Base class for all the picese on the board (Player, Enemy, Gem).
//////////////////////////////////////////////////////////////////////
var GamePiece = function() {};

GamePiece.prototype.initAnimationState = function() {
	// timers allow animation for a certain period of time.
    this.collisionAnimationTimer = 0; // timer after collisions with enemy
    this.celebrationTimer = 0; // timer for when a Player scores
    this.shakeTimer = 0; // timer for animation on score/collision
    // indicates that animation has been called 
    // (if false first call being made
    // if true subsequent calls being made to animation)
    this.animationInitialized = false;
    // Keeps track of shaking state
    this.animationShakeState = "left";
}

// CELEBRATION_DELAY:  how long to celebrate a score
// seconds to delay before resetting piece to starting position.
GamePiece.prototype.CELEBRATION_DELAY = (function(){
    return 2;  
})();

// COLLISION_ANIMATION_DELAY:  how long to animate a collision
// seconds to delay before resetting piece to starting position.
GamePiece.prototype.COLLISION_ANIMATION_DELAY = (function(){
    return 1.5;  
})();

// functions _updateX and _updateY
// update the (x, y) coordinate of the object based on the current row and column of the object.
// 	Note: subtracts 1 from obj.col as drawing of images starts at (0, 0)
// 	Note: to make code more readable col values start at 1
// 	Note: the xOffset and yOffset are used to position the image in the square (so it looks nice)
GamePiece.prototype._updateX = function() {
    this.x = (this.col -1) * OFFSET_X + this.xOffset;
};

GamePiece.prototype._updateY = function() {
    this.y = (this.row -1) * OFFSET_Y - this.yOffset; 
};

GamePiece.prototype._incrementRow = function() {
    this.row += 1;
    this._updateY();
};

GamePiece.prototype._incrementCol = function() {
    this.col += 1;
    this._updateX();
};

GamePiece.prototype._decrementRow = function() {
    this.row -= 1;
    this._updateY();
};

GamePiece.prototype._decrementCol = function() {
    this.col -= 1;
    this._updateX();
};

// ... functions randomRow and random column return integers representing
// a row or colunm number selected randomly  
//
// Returns a random postive integer representing a row where enemies walk
// possible values returned: (2, 3, 4) to represent the stone walkway.
GamePiece.prototype.randomRow = function() {
	// floor of Math.random() * 3 returns (0, 1, 2) then add 2 to match the "road"
    return Math.floor((Math.random() * 3) + 2);
};

// returns random integer representing a column in the playing space
// possible values returned:  (1, 2, 3, 4, 5)
GamePiece.prototype.randomCol = function() {
    // floor of Math.random() * 3 returns (0, 1, 2, 3, 4) then offset by 1
    return Math.floor(Math.random() * 5) + 1; 
};

GamePiece.prototype.getSprite = function() {
	return Resources.get(this.sprite);
};

//////////////////////////////////////////////////////////////////////
// Method:  animate
//	
//  Shakes the piece back and forth to show dread or excitement.
//
// Parameters: 
// 	dt - delta of the time since last frame
//  delta - distance to move piece in animation.
//  duration - how long to wait between shake movements
//  moveHorizontal - move on x axis (horizontally)
//  moveVertical - move on y axis (vertically)
//////////////////////////////////////////////////////////////////////
GamePiece.prototype.animate = function(dt, delta, duration, moveHorizontal, moveVertical) {
	//@todo add an outer glow to the piece while animated
	this.shakeTimer += dt;
	if (this.shakeTimer > duration) {
		if (!this.animationInitialized) {
			// this is the first movement made for this animation.
			// so center the shake (stays in the middle of the square)
			delta = delta / 2;  
			this.animationInitialized = true;
		}
		if (this.animationShakeState == "left") {
			delta = (delta * -1);
			this.animationShakeState = "right";
		} else {
			this.animationShakeState = "left";
		}
		if (moveHorizontal){ this.x += delta; }
		if (moveVertical){ this.y += delta; }
		this.shakeTimer = 0;
	}

};

//////////////////////////////////////////////////////////////////////
// Class:  Enemy
//
// Represents the enemies our player must avoid.
//////////////////////////////////////////////////////////////////////
var Enemy = function() {
    this.ENEMY_SPEED_THROTTLE = 60;
    this.ENEMY_SPEED_MINIMUM = 10;
    this.xOffset = 0;
    this.yOffset = 20;
    this.col = FIRST_COL - 1; // always reset off screen
    this.row = this.randomRow();
    this._updateX();
    this._updateY();
    this.setSpeed();
    this.hasCollided = false;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = ENEMY_DEFAULT_IMAGE;
    this.initAnimationState();
};
Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setSpeed = function() {
	var speed = Math.floor(Math.random() * this.ENEMY_SPEED_THROTTLE);
	
	if (speed < this.ENEMY_SPEED_MINIMUM) {
		speed = this.ENEMY_SPEED_MINIMUM;
	}
	this.speed = speed * 10;
};

Enemy.prototype.move = function(dt) {
    if (this.x < NUM_COLS * OFFSET_X + this.xOffset) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.reset();
    }
};

Enemy.prototype.animateCollision = function(dt) {
	this.animate(dt, 2, 0.1, false, true);
};

// Places the Enemy into the starting position to the left
// selecting a random row and placing the enemy off the screen.
Enemy.prototype.reset = function() {
    this.col = FIRST_COL - 1; // always reset off screen
    this.row = this.randomRow();
    this._updateX();
    this._updateY();
    this.setSpeed();
    this.hasCollided = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!this.hasCollided){
    	this.move(dt);
    } else {
    	// ran into a player, so celebrate a collision!
		this.collisionAnimationTimer += dt;
		// while timer is running, run animation or stop when timer expires.
		if (this.collisionAnimationTimer < this.COLLISION_ANIMATION_DELAY) {
			this.animateCollision(dt);
		} else {
			this.initAnimationState();
			this.hasCollided = false;
		}
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//////////////////////////////////////////////////////////////////////
// Class:  Player
//
// The little guy running around in the arena!  
// Runs accross the screen and has a scoreboard that it updates
// when he/she makes it to the "water."  Animates when there
// is a collision with any of the enemies or when the water is reached.
//////////////////////////////////////////////////////////////////////
var Player = function (){
    this.col = this.INIT_COL;
    this.row = this.INIT_ROW;
    this.xOffset = 0;
    this.yOffset = 10;
    this._updateX();
    this._updateY(); 
    this.sprite = PLAYER_DEFAULT_IMAGE;
    this.initAnimationState();
    this.hasCollided = false;
    this.hasScored = false;
};
Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

// INIT_COL:  Starting column for Player 
Player.prototype.INIT_COL = (function(){
    return Math.round(NUM_COLS / 2);
})();

// INIT_ROW:  Starting row for Player 
Player.prototype.INIT_ROW = (function(){
    return NUM_ROWS;  
})();

Player.prototype.reset = function() {
    this.col = this.INIT_COL;
    this.row = this.INIT_ROW;
    this._updateX();
    this._updateY(); 
    this.hasCollided = false;
    this.collisionAnimationTimer = 0;
    this.celebrationTimer = 0; 
    this.shakeTimer = 0;
    this.animationInitialized = false;
    this.animationShakeState = "left";
    this.hasScored = false;
};

Player.prototype.animateCollision = function(dt) {
	this.animate(dt, 20, 0.15, true, false);
};

Player.prototype.animateScore = function(dt) {
	this.animate(dt, 2, 0.1, false, true);
};

Player.prototype.collisionCheck = function() {
	// only check if this player hasn't already collieded with an enemy.
	if (!this.hasCollided) {
		for (var i = 0; i < allEnemies.length; i++) {
			// check if the edges of the player are touching an enemy 
			// or if the player is in the same row.
	        if ((this.collisionCheckLeft(allEnemies[i]) || 
	        	 this.collisionCheckRight(allEnemies[i])) &&
	            this.row === allEnemies[i].row ) {
	            //collision! Player loses a point!
	            scoreboard.decrement(1);
	            // change player state - triggers animations and freezes player
	            this.hasCollided = true;
	            allEnemies[i].hasCollided = true;
	            break;
	        }
	    }
	}
}

Player.prototype.collisionCheckLeft = function(enemy) {
	// compare the left side of the player to the width of the enemy.
	// account for a 2 pixel margin on the enemy image 
	// account for a 10 pixel margin on the player images (blank space on left and right)
	// @todo: how could I account for PNG image margins (blank space) dynamically?
	return (this.x + 10  > enemy.x + 2 && 
	        this.x + 10  < enemy.x + enemy.getSprite().width - 2 ); 
}

Player.prototype.collisionCheckRight = function(enemy) {
	// compare the right side of the player to the width of the enemy.
	// account for a 2 pixel margin on the enemy image 
	// account for a 10 pixel margin on the player images (blank space on left and right)
	// @todo: how could I account for PNG image margins (blank space) dynamically?
	return (this.x + this.getSprite().width - 10 > enemy.x + 2 &&
	        this.x + this.getSprite().width - 10 < enemy.x + enemy.getSprite().width - 2);
}

Player.prototype.collectGems = function(){
	// if in a collision situation do not check for gems.
    if (!this.hasCollided) {
    	for (var i = 0; i < gems.length; i++) {
    		if (this.col === gems[i].col &&
    			this.row === gems[i].row &&
    			gems[i].isCollected === false) {
    			// collect the gem and remove it from the board
    			scoreboard.increment(gems[i].value);
    			gems[i].isCollected = true;
    		}
    	}
    }
}

Player.prototype.scoreCheck = function(dt) {
	 if (this.row === FIRST_ROW) {   
	 	// The player has scored!  
	    // CELEBRATE before moving to initial position
	    // and update scoreboard by 1 point, but only once during the player's celebration.
    	if (this.hasScored === false)	{  
    		this.hasScored = true; 
    		scoreboard.increment(1);
    	}
    	// increment the elapsed time to the timer.
        this.celebrationTimer += dt;
        this.animateScore(dt);
        // wait for timer to go off
        if (this.celebrationTimer > this.CELEBRATION_DELAY) {
            this.reset();
        }
    }
}

Player.prototype.update = function(dt) {
    // see if player is in the top row (score!)
    this.scoreCheck(dt);
   	// is the player in a collision animaiton?
   	if (this.hasCollided) {
		// player is in an animation so increment the elapsed time to the timer
		this.collisionAnimationTimer += dt;
		// while timer is running, run animation or stop when timer expires.
		if (this.collisionAnimationTimer < this.COLLISION_ANIMATION_DELAY) {
			this.animateCollision(dt);
		} else {
			this.reset();
		}
	} else {
		// not in a collistion situation so check for collisions.
        // is the player in a square with an enemy?
        this.collisionCheck();
	    // all clear... has the player collected any gems?
        this.collectGems();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.moveUp = function() {
    if (this.row > FIRST_ROW &&
        this.row != FIRST_ROW &&
        !this.hasCollided) {
        this._decrementRow();
    }   
};

Player.prototype.moveDown = function() {
    if (this.row < NUM_ROWS && 
        this.row != FIRST_ROW &&
        !this.hasCollided) { 
        this._incrementRow();
    }
};

Player.prototype.moveLeft = function() {
    if (this.col > FIRST_COL &&
        this.row != FIRST_ROW &&
        !this.hasCollided) {
        this._decrementCol();
    } 
};

Player.prototype.moveRight = function() {
    if (this.col < NUM_COLS  &&
        this.row != FIRST_ROW &&
        !this.hasCollided) {   
        this._incrementCol();
    } 
};

Player.prototype.handleInput = function(keyCode) {
    // determine what key has been pushed
    // move to the next square 
    switch(keyCode) {
        case "left": 
            this.moveLeft();
            break;
        case "up": 
            this.moveUp();
            break;
        case "right":
            this.moveRight();
            break;
        case "down": 
            this.moveDown();
            break;
    }
};

//////////////////////////////////////////////////////////////////////
// Class:  Gem 
// 
// Object representing the a gem worth extra points if a player  
// picks it up.
//////////////////////////////////////////////////////////////////////
var Gem = function() {
	this.row = this.randomRow();
	this.col = this.randomCol();
	// offsets to display the images in the center of the square
    this.xOffset = (OFFSET_X - this.GEM_WIDTH) / 2;
    this.yOffset = -50;
	this._updateX();
    this._updateY(); 
    this.initAnimationState();
    this.isCollected = false;
    this.countdownTimer = 12;  // this gem is displayed for 12 seconds.  default behavior.
};
Gem.prototype = Object.create(GamePiece.prototype);
Gem.prototype.constructor = Gem;

// COLLECTION:  how long to celebrate a score
// seconds to delay before resetting player to starting position.
Gem.prototype.COLLECTION_DELAY = (function(){
    return 1;  
})();

Gem.prototype.GEM_WIDTH = (function(){
	return 75;
})();

Gem.prototype.GEM_HEIGHT = (function(){
	return 75;
})();

// Draw the Gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.GEM_WIDTH, this.GEM_HEIGHT);
};

Gem.prototype.update = function(dt) {
   	if (this.isCollected) {
		// player is in an animation so increment the elapsed time to the timer
		this.collisionAnimationTimer += dt;
		// while timer is running, run animation or stop when timer expires.
		if (this.collisionAnimationTimer < this.COLLECTION_DELAY) {
			this.animateScore(dt);
		} else {
			this.remove();
		}
	} else {
		// Not collected yet. 
		// so if this timer runs out take the gem off the board.
		this.countdownTimer -= dt;
		if (this.countdownTimer < 0) {
			this.remove();
		} 
	}
};

Gem.prototype.remove = function(){
	// remove this gem from the board.
	for (var i = 0; i < gems.length; i++) {
		if (this === gems[i]){
			gems.splice(i, 1); // removes gem from array.
			break;
		}
	}
}

Gem.prototype.animateScore = function(dt) {
	// dt, delta, duration, moveHorizontal, moveVertical
	this.animate(dt, 3, 0.1, true, true);
};

var Saphire = function(){
	Gem.call(this);
	this.sprite = GEM_BLUE_IMAGE;
	this.value = 1
};
Saphire.prototype = Object.create(Gem.prototype);
Saphire.prototype.constructor = Saphire;

var Emerald = function(){
	Gem.call(this);
	this.sprite = GEM_GREEN_IMAGE;
	this.value = 2
	this.countdownTimer = 7; 
};
Emerald.prototype = Object.create(Gem.prototype);
Emerald.prototype.constructor = Emerald;

var Diamond = function(){
	Gem.call(this);
	this.sprite = GEM_ORANGE_IMAGE;
	this.value = 5
	this.countdownTimer = 5; 
};
Diamond.prototype = Object.create(Gem.prototype);
Diamond.prototype.constructor = Diamond;


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = (function() {
    var enemies = [];
    for (i = 0; i < NUM_ENEMIES; i++) {
        enemies.push(new Enemy());
    }
    return enemies;
})();

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// add a scoreboard to the screen
var scoreboard = new Scoreboard();

// cache for displayed gems, removed once collected by a player.
var gems = [];
