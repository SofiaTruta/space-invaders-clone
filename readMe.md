# Space Invaders Clone
## Project 1 -  General Assembly's Software Engineering Bootcamp

The first project of this coding bootcamp, I was asked to code a clone of a game - being a lover of space invaders I had to choose this one!

I will be using mostly JavaScript, but also HTML and CSS. 

This readMe will serve both as an explanation of the process but also somewhat of a diary - I will outline my thoughts, steps in developing and rough timestamps, and what my difficulties are at each step of the way!

## initial wireframe

First board layout

![board layout drawing for game](https://i.imgur.com/5EV2qRQ.png)

first full project whiteboard

![project whiteboard ideas, inc board layout and steps antecipated to code the whole game](https://i.imgur.com/s77nhBD.png)

(feel free to make the image bigger and have a read [here](https://imgur.com/s77nhBD))


## project details

### duration
the deadline for completing this project is 7 days. 

### MVP goals
- to be able to make the game playable, with at least 1 wave of enemies 
- a counter for how many enemies the player has killed. 

#### additional goals
- create 3 waves of difficulty
- high score tracking
- add music and sound effects
- create a "you lost" screen that displays player score vs high score
- create a "start game" screen

## Project Diary
Here I will jot down my daily thoughts throughout the development of this game. It is mostly a self-reflection tool but also a way to share the struggle with others!

### Day 1

Goals
- to lay down the grid for the game (dynamically, using Javascript)
- to create the hero character and program it's movement
- create a single enemy and automate it's movement

Difficulties
- styling cells using JS (used CSS instead)
- centering my grid in the middle of the page (I know, basic, but still struggling with it!)
- setting the boundaries of my hero movement dynamically (for now, hard coded a cell number)

### Day 2

Goals
- to create a row of enemies and spawn them in the desired places
- to automate their movement
- define boundaries for enemy movement

Difficulties
- accessing array elements properly in order to compare two arrays
- ordering the action of checking for out of bounds now that I am using arrays rather than single numbers
- still hardcoding the boundaries of the board as set arrays

### Day 3

Goals
- discuss current progression with the teachers
- fix my grid border situation
- automate the shooting mechanic
- (optional) collision mechanic

Difficulties
- still struggling with CSS not being perfect, but have decided to focus on functionality as it is passable at this point
- struggling with clearing intervals of specific actions - for example, if there is a collision, stop each bullet moving rather than stop all bullets moving -> fixed this by incorporating the collision detection within the initial bullet movement function, so it is all tied down to the same bullet
- the setInterval for the movement of the enemies is clearing up my collisions and the enemies are all respawning -> fixed it by taking the enemy away from the original enemies array



