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

## Documentation

[JSDoc files](https://github.com/biscaboy/frogger-game/tree/master/doc) have been provided in the `doc` directory.

## Contributors

### Author
David Dickinson

The project is based on scripts provided by Udacity instructors (`js/resources.js` and `js/engine.js`)

### Other Sources Used
UUID by Jeff Ward (jcward.com) - A [modualized library](http://jcward.com/UUID.js) for creating a Universally Unique Identifier is
included in the project. (see `js/app.js`)

[Stakeoverflow - Stripping Path from a Filename.](http://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript)

[MDN Canvas API Docs - Drawing Shapes with Canvas.]( https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

