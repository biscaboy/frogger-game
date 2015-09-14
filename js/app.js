/*
 app.js - Frogger Game Implementation 
 Author:  David Dickinson from provided script by Udacity Instructors
*/
/*
//////////////////////////////////////////////////////////////////////
Static variable section
Since Javascript containt not static key word, I've impletemented
these variables as functions so that their value is protected
makeing them behave as statics with a global scope.
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
// @todo:  add more colums and more rows ... make it dynamic.
// NUM_COLS:  Total number of columns in the playing space (right most row)
var NUM_COLS = (function(){
    return 5;  
})();
// NUM_ROWS:  Total number of rows in the playing space (bottom row)
var NUM_ROWS = (function(){
    return 6;  
})();
// FIRST_COL: Number of the left most column in the playing space (minus 1)
var FIRST_COL = (function(){
    return 1;
})();
// FIRST_ROW:  Number of the top row in the playing space
var FIRST_ROW = (function(){
    return 1; 
})();
// INIT_COL:  Starting column for Player
var INIT_COL = (function(){
    return 3;
})();
// INIT_ROW:  Starting row for Player 
// Written as a function on the Player class to behave like a static variable.
var INIT_ROW = (function(){
    return 6;  
})();
// NUM_ENEMIES:  The starting number of enemies to render in the game.
var NUM_ENEMIES = (function(){
    return 5;
})();
// GAME_DIFFICULTY:  The lower this number the closer the enemies are to each other.
var GAME_DIFFICULTY = (function(){
    return 1; 
})();
// CELEBRATION_DELAY:  how long to celebrate a score
// seconds to delay before resetting player to starting position.
var CELEBRATION_DELAY = (function(){
    return 2;  
})();
// COLLISION_ANIMATION_DELAY:  how long to animate a collision
// seconds to delay before resetting player to starting position.
var COLLISION_ANIMATION_DELAY = (function(){
    return 2;  
})();
// Images for the game players and enemies.
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
var NUM_GEMS = (function(){
	return 3;
})();
var GEM_WIDTH = (function(){
	return 75;
})();
var GEM_HEIGHT = (function(){
	return 75;
})();
//////////////////////////////////////////////////////////////////////
// Utility functions
//////////////////////////////////////////////////////////////////////
// A word about the playing field.  The engine sets up a board that 
// is 6 rows and 5 columns.  This game uses the squares of this grid
// by assigning each a row and column the top left column is (1,1)
// the bottom right is (5,6).  Keeping that in mind...
// 
// ... functions randomRow and random column return integers representing
// a row or colunm number selected randomly  
//
// Returns a random postive integer representing a row where enemies walk
// possible values returned: (2, 3, 4) to represent the stone walkway.
var randomRow = function() {
	// floor of Math.random() * 3 returns (0, 1, 2)
    return Math.floor((Math.random() * 3) + 2);
};
// returns random integer representing a column in the playing space
// possible values returned:  (1, 2, 3, 4, 5)
var randomCol = function() {
    // floor of Math.random() * 3 returns (0, 1, 2, 3, 4)
    return Math.floor(Math.random() * 5) + 1; 
};

// Returns a random negative integer 
// Used to give an amount of time to wait before starting enemy movement
// return a negative integer (0, -1, -2)
var randomDelay = function() {
    return 0 - Math.floor(Math.random() * 2);
};

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
// diplayed.
//
// A score board also has Gems that it controls as the player's 
// score goes higher.
//////////////////////////////////////////////////////////////////////
var Scoreboard = function() {
	this.score = 0;
	this.position = { x: 430, y: 0 };
	this.textposition = { x: 50, y: 50 };
	this.dimension = { height: 50, width: 75 };
	this.bgcolor = "#000";
	this.borderwidth = 3;
	this.bordercolor = "#fff";
	this.textcolor = "#fff";
	this.textbordercolor = "#fff";
	this.textborderwidth = 1;
	this.cornerradius = 15;
	this.textsize = 18;
	// boolean that keeps the scoreboard from being updated more than once.
	this.ready = true;
	this.isVisible = true;
	this.blinkTimer = 0;
	this.animateScore = false;
	this.animateCollision = false;
	this.animationInitialized = false;
	this.animationTimer = 0;
};

Scoreboard.prototype.increment = function(value) {
	this.score += value;
	// keep other updates from happening until reset.
	// @todo: perhaps add a rolling update for multiple points (may need dt?)
	this.ready = false;
	this.animateScore = true;
	this.animationTimer = 0;
	// @todo make sure there is only one gem in a square.
	// add a new gem to the game if the score is high enough
	if (this.score % 5 == 0) {
		gems.push(new Saphire()); 
	} else if (this.score % 9 == 0) {
		gems.push(new Emerald()); 
	} else if (this.score % 17 == 0) {
		gems.push(new Diamond()); 
	}
};

Scoreboard.prototype.decrement = function(value) {
	if (this.score > 0 && this.score - value >= 0) {
		this.score -= value;
	} else {
		this.score = 0;
	}
	// keep other updates from happening until reset.
	// @todo: perhaps add a rolling update for multiple points (may need dt?)
	this.ready = false;
	this.animateCollision = true;
	this.animationTimer = 0;
};

// @todo:  if you clear a level then reset to 0
Scoreboard.prototype.reset = function(){
	this.ready = true;
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
	if (this.animateScore || this.animateCollision ) {
		    	// increment the elapsed time to the timer.
        this.animationTimer += dt;
        var color = "#00ff00";
        if (this.animateCollision) {
        	color = "#ff0000";
        } 
        this.blinkScore(dt, color);
        
        // wait for timer to go off
        if (this.animationTimer > CELEBRATION_DELAY) {
            this.reset();
        }
	}

}

//////////////////////////////////////////////////////////////////////
// Class:  GamePiece
//
// 
//////////////////////////////////////////////////////////////////////
var GamePiece = function() {};

// functions _updateX and _updateY
// update the (x, y) coordinate of the object based on the current row and column of the object.
// 	Note: subtracts 1 from obj.col as drawing of images starts at (0, 0)
// 	Note: to make code more readable col values start at 1
// 	Note: the xOffset/yOffset is used to position the image in the square (so it looks nice)
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

//////////////////////////////////////////////////////////////////////
// Class:  Enemy
//
// Represents the enemies our player must avoid.
//////////////////////////////////////////////////////////////////////
// @todo:  Make sure enemies move in sync.  Some enemies share the same square.
var Enemy = function() {
    this.ENEMY_SPEED_THROTTLE = 10;
    this.ENEMY_SPEED_MINIMUM = 50;
    this.xOffset = 0;
    this.yOffset = 20;
    this.reset();
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = ENEMY_DEFAULT_IMAGE;
};
Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.setSpeed = function() {
	var speed = Math.floor(Math.random() * 100);

	if (speed < this.ENEMY_SPEED_THROTTLE) {
		speed = this.ENEMY_SPEED_THROTTLE;
	} else if (speed > this.ENEMY_SPEED_MINIMUM) {
		speed = this.ENEMY_SPEED_MINIMUM;
	}

	this.speed = speed / 100;
}

Enemy.prototype.move = function() {
    if (this.col < NUM_COLS) {
        this._incrementCol();
    } else {
        this.reset();
    }
};

// Places the Enemy into the starting position to the left
// selecting a random row and placing the enemy off the screen.
Enemy.prototype.reset = function() {
    this.col = FIRST_COL - 1; // always reset off screen
    this.row = randomRow();
    this._updateX();
    this._updateY();
    this.timeSinceLastMove = randomDelay();
    this.setSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Instead of multiplying movement by the dt parameter 
    // I chose to use dt to track the amout of time that has
    // elapsed since the last move so that an exact amout of time
    // has to elapse before being redrawn.
    this.timeSinceLastMove += dt;

    if (this.timeSinceLastMove > this.speed) {
        this.timeSinceLastMove = 0;
        this.move();
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
// is a collision with any of the enemies or when a point is scored.
//////////////////////////////////////////////////////////////////////
var Player = function (){
    this.col = INIT_COL;
    this.row = INIT_ROW;
    this.xOffset = 0;
    this.yOffset = 10;
    this._updateX();
    this._updateY(); 

    this.sprite = PLAYER_DEFAULT_IMAGE;
    // Place the player's scoreboard on the board
    
    // flag used after an enemy collision.  Triggers animations/freezes player
    this.hasCollided = false;
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
};
Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function() {
    this.col = INIT_COL;
    this.row = INIT_ROW;
    this._updateX();
    this._updateY(); 
    this.hasCollided = false;
    this.collisionAnimationTimer = 0;
    this.celebrationTimer = 0; 
    this.shakeTimer = 0;
    this.animationInitialized = false;
    this.animationShakeState = "left";
};

Player.prototype.animateCollision = function(dt) {
	this.animate(dt, 20, 0.15, true, false, "#ff0000");
};

Player.prototype.animateScore = function(dt) {
	this.animate(dt, 2, 0.1, false, true, "#00ff00");
};

//////////////////////////////////////////////////////////////////////
// Method:  animate
//	
//  Shakes the player back and forth to show dread or excitement.
//  This method also makes the scoreboard blink to add to the drama.
//
// Parameters: 
// 	dt - delta of the time since last frame
//  delta - distance to move player in animation.
//  duration - how long to wait between shake movements
//  moveHorizontal - move on x axis (horizontally)
//  moveVertical - move on y axis (vertically)
//  color - the color to make the scoreboard during animation
//////////////////////////////////////////////////////////////////////
Player.prototype.animate = function(dt, delta, duration, moveHorizontal, moveVertical, color) {
	//@todo add an outer glow 
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

Player.prototype.update = function(dt) {
    // see if player is in the top row (score!)
    // if there, wait for a celebration before moving to initial position.
    if (this.row === FIRST_ROW) {
    	// score!  update scoreboard by 1 point
    	// only allow one score at a time, so wait for the scoreboard to be ready
    	if (scoreboard.ready) { 
    		scoreboard.increment(1);
    	}
    	// increment the elapsed time to the timer.
        this.celebrationTimer += dt;
        this.animateScore(dt);
        // wait for timer to go off
        if (this.celebrationTimer > CELEBRATION_DELAY) {
            this.reset();
        }
    } else {
    	// is the player in a collision animaiton
    	if (this.hasCollided) {
    		// in animation so increment the elapsed time to the timer
    		this.collisionAnimationTimer += dt;
    		// while timer is running, run animation or stop when timer expires.
    		if (this.collisionAnimationTimer < COLLISION_ANIMATION_DELAY) {
    			this.animateCollision(dt);
    		} else {
    			this.reset();
    		}
    	} else {
    		// not in a collistion situation so check for collisions.
	        // is the player in a square with an enemy?
	        if (!this.hasCollided) {
	        	for (var i = 0; i < allEnemies.length; i++) {
		            if (this.col === allEnemies[i].col &&
		                this.row === allEnemies[i].row ) {
		                //collision! Player loses a point!
		                scoreboard.decrement(1);
		                // change player state - triggers animations and freezes player
		                this.hasCollided = true;
		                break;
		            }
		        }
		    }
	        // all clear... has the player collected any gems?
	        if (!this.hasCollided) {
	        	for (var i = 0; i < gems.length; i++) {
	        		if (this.col === gems[i].col &&
	        			this.row === gems[i].row) {
	        			// collect the gem and remove it from the board
	        			scoreboard.increment(gems[i].value);
	        			gems.splice(i, 1); // removes gem.
	        		}
	        	}
	        }
	    }
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
// Parameter: color - possible values { orange, green, blue }
//  
// Object representing the a gem worth extra points if a player  
// picks it up.
//////////////////////////////////////////////////////////////////////
var Gem = function() {
	// var allowedTypes = [ "blue", "green", "orange" ];
	this.row = randomRow();
	this.col = randomCol();
	// offsets to display the images in the center of the square
    this.xOffset = (OFFSET_X - GEM_WIDTH) / 2;
    this.yOffset = -50;
	this._updateX();
    this._updateY(); 
    
};
Gem.prototype = Object.create(GamePiece.prototype);
Gem.prototype.constructor = Gem;
// Draw the Gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, GEM_WIDTH, GEM_HEIGHT);
};

Gem.prototype.update = function() {
	//@todo implement this using a global array 
};
// Do something exciting with the Gem
Gem.prototype.animate = function() {
    //@todo implement
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
};
Emerald.prototype = Object.create(Gem.prototype);
Emerald.prototype.constructor = Emerald;

var Diamond = function(){
	Gem.call(this);
	this.sprite = GEM_ORANGE_IMAGE;
	this.value = 5
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

// cache for gems
var gems = [];