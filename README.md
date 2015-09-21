# Udacity FEND Project 3: Frogger Arcade Game

## Description
This game is a development exercise to demonstrate understanding of object oriented programming concepts
implemented in Javascript using HTML5 Canvas.

The game replicates the concept of the 1980's arcade game **Frogger**, with a path to be crossed by the player
all the while avoiding *Enemies* who march across the screen from left to right.

Currently there is only a single level, and the play never stops.

[Rubric for this project](https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797)

## Additional Functionality Beyond Rubic

This project completes all the requirements.  In addition to the rubric requirements, the following functionality was added:

### 1.  Scoreboard
A simple scoreboard that increments when the player scores and decrements when there is a collision.
The player scores a point for every time he crosses the road to the water at the top of the screen.

### 2.  Collectibles
The player can score extra points by picking up different types of Gems.

| Gems | Color | Points | Lifetime |
| :---------------- | :----------- | ------------: | ---------------: |
| Saphires | Blue  | 1 point | 15 sec |
| Emeralds | Green  | 3 points | 10 sec |
| Diamonds | Yellow  | 10 points | 8 sec |

### 3.  Animations
All playing pieces move, shake or blink based on collisions, scores or collections.

### 4.  Board size
The board has been modified from the provided board in `engine.js`.
To change the size of the playing space modify the static variables `NUM_ROWS` and/or `NUM_COLS` in the `app.js` file.


## Starting the Game
Execute frogger-game/index.html in your favorite HTML5 enabled browser.

Enjoy!

## Contributors

### Author
David Dickinson

The project is based on scripts provided by Udacity instructors (`js/resources.js` and `js/engine.js`)

### Other Sources Used
UUID by Jeff Ward (jcward.com) - A [modualized library](http://jcward.com/UUID.js) for creating a Universally Unique Identifier is
included in the project. (see `js/app.js`)

[Stakeoverflow - Stripping Path from a Filename.](http://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript)

[MDN Canvas API Docs - Drawing Shapes with Canvas.]( https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

JSDoc Documentation generated using [JSDoc](https://github.com/jsdoc3/jsdoc)

Class Documentation below generated using [JSDoc to Markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)

## Documentation

[JSDoc files](https://github.com/biscaboy/frogger-game/tree/master/doc) have been provided in the `doc` directory.


## Classes
<dl>
<dt><a href="#Scoreboard">Scoreboard</a></dt>
<dd></dd>
<dt><a href="#GamePiece">GamePiece</a></dt>
<dd></dd>
<dt><a href="#Enemy">Enemy</a></dt>
<dd></dd>
<dt><a href="#Player">Player</a></dt>
<dd></dd>
<dt><a href="#Gem">Gem</a></dt>
<dd></dd>
<dt><a href="#Saphire">Saphire</a></dt>
<dd></dd>
<dt><a href="#Emerald">Emerald</a></dt>
<dd></dd>
<dt><a href="#Diamond">Diamond</a></dt>
<dd></dd>
</dl>
## Members
<dl>
<dt><a href="#OFFSET_X">OFFSET_X</a></dt>
<dd><p>Horizontial offset for each square on the playing space</p>
</dd>
<dt><a href="#OFFSET_Y">OFFSET_Y</a></dt>
<dd><p>Vertical offset for each square on the playing space</p>
</dd>
<dt><a href="#NUM_COLS">NUM_COLS</a></dt>
<dd><p>Total number of columns in the playing space
TODO:  make it dynamic instead of static (maybe based on levels?)</p>
</dd>
<dt><a href="#NUM_ROWS">NUM_ROWS</a></dt>
<dd><p>Total number of rows in the playing space
TODO:  make it dynamic instead of static (maybe based on levels?)</p>
</dd>
<dt><a href="#FIRST_COL">FIRST_COL</a></dt>
<dd><p>Number of the left most column in the playing space</p>
</dd>
<dt><a href="#FIRST_ROW">FIRST_ROW</a></dt>
<dd><p>Number of the top row in the playing space</p>
</dd>
<dt><a href="#NUM_ROWS_OF_START_AREA">NUM_ROWS_OF_START_AREA</a></dt>
<dd><p>Number of rows on which player can safely walk.</p>
</dd>
<dt><a href="#NUM_ROWS_PATH_OFFSET">NUM_ROWS_PATH_OFFSET</a></dt>
<dd><p>Offset from the top of the playing area to the first row of path.</p>
</dd>
<dt><a href="#NUM_ROWS_OF_ENEMY_PATH">NUM_ROWS_OF_ENEMY_PATH</a></dt>
<dd><p>Number of rows on which enemies walk.</p>
</dd>
<dt><a href="#NUM_ENEMIES">NUM_ENEMIES</a></dt>
<dd><p>The starting number of enemies to render in the game.
TODO:  make it dynamic. (based on level?)</p>
</dd>
<dt><a href="#UUID">UUID</a></dt>
<dd><p>Fast UUID generator, RFC4122 version 4 compliant.
(This is overkill for this application, but why not?)</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#compareFilenames">compareFilenames(filename1, filename2)</a> â‡’ <code>boolean</code></dt>
<dd><p>compares the file names of two files, stripping the file path if necessary</p>
</dd>
<dt><a href="#_getFilenameNoPath">_getFilenameNoPath(name)</a> â‡’ <code>string</code></dt>
<dd><p>returns just the filename of the given string striping the file path.</p>
</dd>
</dl>
<a name="Scoreboard"></a>
## Scoreboard
**Kind**: global class

* [Scoreboard](#Scoreboard)
  * [new Scoreboard()](#new_Scoreboard_new)
  * [.CELEBRATION_DELAY](#Scoreboard+CELEBRATION_DELAY) â‡’ <code>number</code>
  * [.increment(value)](#Scoreboard+increment)
  * [.decrement(value)](#Scoreboard+decrement)
  * [.reset()](#Scoreboard+reset)
  * [.render()](#Scoreboard+render)
  * [.blinkScore(dt, color)](#Scoreboard+blinkScore)
  * [.animate(dt, duration, color)](#Scoreboard+animate)
  * [.update(dt)](#Scoreboard+update)

<a name="new_Scoreboard_new"></a>
### new Scoreboard()
Represents the scoreboard where the player's score is displayed.

<a name="Scoreboard+CELEBRATION_DELAY"></a>
### scoreboard.CELEBRATION_DELAY â‡’ <code>number</code>
how long to celebrate a score

**Kind**: instance property of <code>[Scoreboard](#Scoreboard)</code>
**Returns**: <code>number</code> - number of seconds to celebrate (continue animation)
<a name="Scoreboard+increment"></a>
### scoreboard.increment(value)
increases the game's score

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | number of points by which to increase the score |

<a name="Scoreboard+decrement"></a>
### scoreboard.decrement(value)
decreases the game's score

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | number of points by which to decrease the score |

<a name="Scoreboard+reset"></a>
### scoreboard.reset()
restores the scoreboard to its initial state after an animation changes it.

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>
<a name="Scoreboard+render"></a>
### scoreboard.render()
draws the scoreboard.

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>
<a name="Scoreboard+blinkScore"></a>
### scoreboard.blinkScore(dt, color)
makes the score blink.

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | time delta information |
| color | <code>string</code> | color code for the to use color for the numbers on the scoreboard. |

<a name="Scoreboard+animate"></a>
### scoreboard.animate(dt, duration, color)
animate the score making it blink.

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | time delta information |
| duration | <code>number</code> | how long to hold between blinks. |
| color | <code>string</code> | color code for the to use color for the numbers on the scoreboard. |

<a name="Scoreboard+update"></a>
### scoreboard.update(dt)
Updates the scoreboard: Engine calls this method for each iteration of the animation frame

**Kind**: instance method of <code>[Scoreboard](#Scoreboard)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | time delta information |

<a name="GamePiece"></a>
## GamePiece
**Kind**: global class

* [GamePiece](#GamePiece)
  * [new GamePiece()](#new_GamePiece_new)
  * [.CELEBRATION_DELAY](#GamePiece+CELEBRATION_DELAY) â‡’ <code>number</code>
  * [.COLLISION_ANIMATION_DELAY](#GamePiece+COLLISION_ANIMATION_DELAY) â‡’ <code>number</code>
  * [.initAnimationState()](#GamePiece+initAnimationState)
  * [._updateX()](#GamePiece+_updateX)
  * [._updateY()](#GamePiece+_updateY)
  * [.randomRow()](#GamePiece+randomRow) â‡’ <code>number</code>
  * [.randomCol()](#GamePiece+randomCol) â‡’ <code>number</code>
  * [.getSpriteImg()](#GamePiece+getSpriteImg) â‡’ <code>Image</code>
  * [.animate(dt, delta, duration, moveHorizontal, moveVertical)](#GamePiece+animate)
  * [.animateBlink(dt, duration)](#GamePiece+animateBlink)

<a name="new_GamePiece_new"></a>
### new GamePiece()
Represents a playing piece on the board (Base class of: Player, Enemy, Gem).
Provides common animation methods for subclasses and some utility methods

<a name="GamePiece+CELEBRATION_DELAY"></a>
### gamePiece.CELEBRATION_DELAY â‡’ <code>number</code>
how long to celebrate a score

**Kind**: instance property of <code>[GamePiece](#GamePiece)</code>
**Returns**: <code>number</code> - seconds to delay for celebration animations
<a name="GamePiece+COLLISION_ANIMATION_DELAY"></a>
### gamePiece.COLLISION_ANIMATION_DELAY â‡’ <code>number</code>
how long to animate a collision

**Kind**: instance property of <code>[GamePiece](#GamePiece)</code>
**Returns**: <code>number</code> - seconds to delay for collision animations
<a name="GamePiece+initAnimationState"></a>
### gamePiece.initAnimationState()
resets this GamePiece back to a state where it is ready to perform an animation.

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>
<a name="GamePiece+_updateX"></a>
### gamePiece._updateX()
update the x coordinate of the object based on its current column.

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>
<a name="GamePiece+_updateY"></a>
### gamePiece._updateY()
update the y coordinate of the object based on its current randomRow.

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>
<a name="GamePiece+randomRow"></a>
### gamePiece.randomRow() â‡’ <code>number</code>
provides a row number selected randomly

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>
**Returns**: <code>number</code> - a random postive integer representing a row where enemies walk
(i.e. possible values returned represent the row numbers of the the stone walkway.)
<a name="GamePiece+randomCol"></a>
### gamePiece.randomCol() â‡’ <code>number</code>
provides a row number selected randomly

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>
**Returns**: <code>number</code> - returns random integer representing a column in the playing space
<a name="GamePiece+getSpriteImg"></a>
### gamePiece.getSpriteImg() â‡’ <code>Image</code>
Retrieves the image for this piece from the resource cache.

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>
**Returns**: <code>Image</code> - returns images representing this piece on the board.
<a name="GamePiece+animate"></a>
### gamePiece.animate(dt, delta, duration, moveHorizontal, moveVertical)
Shakes the piece back and forth to show dread or excitement.

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | delta of the time since last frame |
| delta | <code>number</code> | distance to move piece in animation. |
| duration | <code>number</code> | how long to wait between shake movements |
| moveHorizontal | <code>boolean</code> | move on x axis (horizontally) |
| moveVertical | <code>boolean</code> | move on y axis (vertically) |

<a name="GamePiece+animateBlink"></a>
### gamePiece.animateBlink(dt, duration)
Blink piece on and off (to show the piece is going to diappear for good).

**Kind**: instance method of <code>[GamePiece](#GamePiece)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | delta of the time since last frame |
| duration | <code>number</code> | how long to wait between shake movements |

<a name="Enemy"></a>
## Enemy
**Kind**: global class

* [Enemy](#Enemy)
  * [new Enemy()](#new_Enemy_new)
  * [.setSpeed()](#Enemy+setSpeed)
  * [._setSpeed()](#Enemy+_setSpeed) â‡’ <code>number</code>
  * [.move()](#Enemy+move)
  * [.animateCollision()](#Enemy+animateCollision)
  * [.reset()](#Enemy+reset)
  * [.update(dt,)](#Enemy+update)

<a name="new_Enemy_new"></a>
### new Enemy()
Represents the enemy our player must avoid at all costs.

<a name="Enemy+setSpeed"></a>
### enemy.setSpeed()
Assigns a random speed to this enemy.

**Kind**: instance method of <code>[Enemy](#Enemy)</code>
<a name="Enemy+_setSpeed"></a>
### enemy._setSpeed() â‡’ <code>number</code>
utility function to find an accpetable speed for this enemy
recurses until speed that is fast enough is retruned from the randomizer.

**Kind**: instance method of <code>[Enemy](#Enemy)</code>
**Returns**: <code>number</code> - - a usable speed
<a name="Enemy+move"></a>
### enemy.move()
Moves the Enemy farther right.
Moves to the right unless the end of the row is reached,
in which case, reset the Enemy back to the left side of the screen.

**Kind**: instance method of <code>[Enemy](#Enemy)</code>
<a name="Enemy+animateCollision"></a>
### enemy.animateCollision()
make the enemy dance (because of a Collision with a player)

**Kind**: instance method of <code>[Enemy](#Enemy)</code>
<a name="Enemy+reset"></a>
### enemy.reset()
Places the Enemy into the starting position to the left
selecting a random row and placing the enemy off the screen.

**Kind**: instance method of <code>[Enemy](#Enemy)</code>
<a name="Enemy+update"></a>
### enemy.update(dt,)
Update the enemy's position, required method for game

**Kind**: instance method of <code>[Enemy](#Enemy)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt, | <code>number</code> | a time delta between ticks |

<a name="Player"></a>
## Player
**Kind**: global class

* [Player](#Player)
  * [new Player()](#new_Player_new)
  * [.INIT_COL](#Player+INIT_COL)
  * [.INIT_ROW](#Player+INIT_ROW)
  * [.reset()](#Player+reset)
  * [.collisionCheck()](#Player+collisionCheck)
  * [.collisionCheckLeft(enemy)](#Player+collisionCheckLeft)
  * [.collisionCheckRight(enemy)](#Player+collisionCheckRight)
  * [.collectGems()](#Player+collectGems)
  * [.scoreCheck(dt)](#Player+scoreCheck)
  * [.update(dt,)](#Player+update)

<a name="new_Player_new"></a>
### new Player()
Represents the little guy running around in the arena!
Runs accross the screen and has a scoreboard that it updates
when he/she makes it to the 'water.'  Animates when there
is a collision with any of the enemies or when the water is reached.

<a name="Player+INIT_COL"></a>
### player.INIT_COL
Starting column for Player

**Kind**: instance property of <code>[Player](#Player)</code>
<a name="Player+INIT_ROW"></a>
### player.INIT_ROW
Starting row for Player

**Kind**: instance property of <code>[Player](#Player)</code>
<a name="Player+reset"></a>
### player.reset()
Places the player back to the original position
after a collision and initializes all the parameters needed
to run animation after a collision.

**Kind**: instance method of <code>[Player](#Player)</code>
<a name="Player+collisionCheck"></a>
### player.collisionCheck()
Determine if the player has collided with an enemy.

**Kind**: instance method of <code>[Player](#Player)</code>
<a name="Player+collisionCheckLeft"></a>
### player.collisionCheckLeft(enemy)
Determine if the left side of the player has touched an enemy.

**Kind**: instance method of <code>[Player](#Player)</code>

| Param | Type |
| --- | --- |
| enemy | <code>[Enemy](#Enemy)</code> |

<a name="Player+collisionCheckRight"></a>
### player.collisionCheckRight(enemy)
Determine if the right side of the player has touched an enemy.

**Kind**: instance method of <code>[Player](#Player)</code>

| Param | Type |
| --- | --- |
| enemy | <code>[Enemy](#Enemy)</code> |

<a name="Player+collectGems"></a>
### player.collectGems()
Check if the player is in the same square as a gem.
If so, award the player the points for the gem.

**Kind**: instance method of <code>[Player](#Player)</code>
<a name="Player+scoreCheck"></a>
### player.scoreCheck(dt)
Determine if the player has scored by reaching the top of the playing space.

**Kind**: instance method of <code>[Player](#Player)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | time delta information |

<a name="Player+update"></a>
### player.update(dt,)
Update the players's position, required method for game.

**Kind**: instance method of <code>[Player](#Player)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt, | <code>number</code> | a time delta between ticks |

<a name="Gem"></a>
## Gem
**Kind**: global class

* [Gem](#Gem)
  * [new Gem()](#new_Gem_new)
  * [.getSpriteImg()](#Gem+getSpriteImg)
  * [.hideSpriteImg()](#Gem+hideSpriteImg)
  * [.showSpriteImg()](#Gem+showSpriteImg)
  * [.isSpriteImgVisible()](#Gem+isSpriteImgVisible)
  * [.setUniqueLocation()](#Gem+setUniqueLocation)
  * [.animateScore(dt)](#Gem+animateScore)
  * [.animateCountdown(dt)](#Gem+animateCountdown)

<a name="new_Gem_new"></a>
### new Gem()
representing the a gem worth extra points if a player
picks it up.

<a name="Gem+getSpriteImg"></a>
### gem.getSpriteImg()
Overrides parent (GamePiece) method to handle a Gem's local image.
The resources cache cannot be used for gems because the

**Kind**: instance method of <code>[Gem](#Gem)</code>
<a name="Gem+hideSpriteImg"></a>
### gem.hideSpriteImg()
Overrides parent (GamePiece) method to handle a Gem's local image

**Kind**: instance method of <code>[Gem](#Gem)</code>
<a name="Gem+showSpriteImg"></a>
### gem.showSpriteImg()
Overrides parent (GamePiece) method to handle a Gem's local image

**Kind**: instance method of <code>[Gem](#Gem)</code>
<a name="Gem+isSpriteImgVisible"></a>
### gem.isSpriteImgVisible()
Overrides parent (GamePiece) method to handle a Gem's local image

**Kind**: instance method of <code>[Gem](#Gem)</code>
<a name="Gem+setUniqueLocation"></a>
### gem.setUniqueLocation()
Find a square on the board free of other gems.
Keeps a gem from being placed on top of another gem.

**Kind**: instance method of <code>[Gem](#Gem)</code>
<a name="Gem+animateScore"></a>
### gem.animateScore(dt)
Make the gem move back and forth (when collected)

**Kind**: instance method of <code>[Gem](#Gem)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | the time delta information |

<a name="Gem+animateCountdown"></a>
### gem.animateCountdown(dt)
Blinking on and off (during the countdown before diappearing)

**Kind**: instance method of <code>[Gem](#Gem)</code>

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | the time delta information |

<a name="Saphire"></a>
## Saphire
**Kind**: global class
<a name="new_Saphire_new"></a>
### new Saphire()
Represents a Saphire the least valuable of the Gems
and the easiest of the Gems to collect because it stays on the board the longest.

<a name="Emerald"></a>
## Emerald
**Kind**: global class

* [Emerald](#Emerald)
  * [new Emerald()](#new_Emerald_new)
  * [.randomRow()](#Emerald+randomRow)

<a name="new_Emerald_new"></a>
### new Emerald()
Represents an Emerald a more valuable Gem

<a name="Emerald+randomRow"></a>
### emerald.randomRow()
Overrides parent method to place Emeralds only in the top 3 rows.

**Kind**: instance method of <code>[Emerald](#Emerald)</code>
<a name="Diamond"></a>
## Diamond
**Kind**: global class

* [Diamond](#Diamond)
  * [new Diamond()](#new_Diamond_new)
  * [.randomRow()](#Diamond+randomRow)

<a name="new_Diamond_new"></a>
### new Diamond()
Represents a Diamond the most valuable of the Gems
and the hardest of the Gems to collect because it stays on the board for a short time.

<a name="Diamond+randomRow"></a>
### diamond.randomRow()
Overrides parent method to place Diamonds only in the top 2 rows.

**Kind**: instance method of <code>[Diamond](#Diamond)</code>
<a name="OFFSET_X"></a>
## OFFSET_X
Horizontial offset for each square on the playing space

**Kind**: global variable
<a name="OFFSET_Y"></a>
## OFFSET_Y
Vertical offset for each square on the playing space

**Kind**: global variable
<a name="NUM_COLS"></a>
## NUM_COLS
Total number of columns in the playing space
TODO:  make it dynamic instead of static (maybe based on levels?)

**Kind**: global variable
<a name="NUM_ROWS"></a>
## NUM_ROWS
Total number of rows in the playing space
TODO:  make it dynamic instead of static (maybe based on levels?)

**Kind**: global variable
<a name="FIRST_COL"></a>
## FIRST_COL
Number of the left most column in the playing space

**Kind**: global variable
<a name="FIRST_ROW"></a>
## FIRST_ROW
Number of the top row in the playing space

**Kind**: global variable
<a name="NUM_ROWS_OF_START_AREA"></a>
## NUM_ROWS_OF_START_AREA
Number of rows on which player can safely walk.

**Kind**: global variable
<a name="NUM_ROWS_PATH_OFFSET"></a>
## NUM_ROWS_PATH_OFFSET
Offset from the top of the playing area to the first row of path.

**Kind**: global variable
<a name="NUM_ROWS_OF_ENEMY_PATH"></a>
## NUM_ROWS_OF_ENEMY_PATH
Number of rows on which enemies walk.

**Kind**: global variable
<a name="NUM_ENEMIES"></a>
## NUM_ENEMIES
The starting number of enemies to render in the game.
TODO:  make it dynamic. (based on level?)

**Kind**: global variable
<a name="UUID"></a>
## UUID
Fast UUID generator, RFC4122 version 4 compliant.
(This is overkill for this application, but why not?)

**Kind**: global variable
**Link**: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
**Link**: http://jcward.com/UUID.js

Copyright (c) 2015 Jeff Ward
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
**Author:** Jeff Ward (jcward.com).
**License**: MIT license
<a name="compareFilenames"></a>
## compareFilenames(filename1, filename2) â‡’ <code>boolean</code>
compares the file names of two files, stripping the file path if necessary

**Kind**: global function
**Returns**: <code>boolean</code> - true if file names match

| Param | Type | Description |
| --- | --- | --- |
| filename1 | <code>string</code> | filename that may or may not include path.  Can be a encoded URI as well |
| filename2 | <code>string</code> | the filename (with full path or relative path and/or URI) to comapare to filename1 |

<a name="_getFilenameNoPath"></a>
## _getFilenameNoPath(name) â‡’ <code>string</code>
returns just the filename of the given string striping the file path.

**Kind**: global function
**Returns**: <code>string</code> - name of the file without the path.

source http://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | filename that may or may not include path.  Can be a encoded URI as well |


