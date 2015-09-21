#Udacity FEND Project 3: Arcade Game - Frogger Clone

This game is a development exercise to demonstrate understanding of object oriented programming concepts 
implemented in Javascript.  

Rubric for this project: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

##Additional Functionality
--------------

This project completes all the requirements;  in addition the folloing functionality was added:

###1.  Scoreboard 
A simple scoreboard that increments when the player scores and decrements when there is a collision.  
The player scores a point for every time he crosses the road to the water at the top of the screen. 

###2.  Collectsbles.  
The player can score extra points by picking up different types of Gems.  

| Gem Class Name | Color | Points | Time displayed | 
| ---------------- | ----------- | ------------ | --------------- |
| Saphires | Blue  | 1 point | 15 sec |
| Emeralds | Green  | 3 points | 10 sec |
| Diamond | Yellow  | 10 points | 8 sec |

###3.  Animations
All playing pieces move, shake or blink based on collisions, scores or collections.

###4.  Board size
The board has been modified to be dynamic from the provided board in `engine.js`.  
To change the size of the playing space modify `NUM_ROWS` and/or `NUM_COLS in the `app.js` file.
 
##Starting the Game
Execute frogger-game/index.html in your favorite browser

Currently there is only a single level and the play never stops.  

Enjoy!


