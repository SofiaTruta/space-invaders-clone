# Space Invaders Clone
## Project 1 -  General Assembly's Software Engineering Bootcamp

The first project of this coding bootcamp at General Assembly(GA), I was asked to code a clone of a game - being a lover of space invaders I had to choose this one!

I will be using mostly JavaScript, but also HTML and CSS. 

This readMe will serve both as an explanation of the process but also somewhat of a diary - I will outline my thoughts, steps in developing and rough timestamps, and what my difficulties are at each step of the way!

## Deployment Link

Try my game [here](https://sofiatruta.github.io/space-invaders-clone/) - and see if you can beat your previous score!

## initial wireframe

First board layout

![board layout drawing for game](https://i.imgur.com/5EV2qRQ.png)

first full project whiteboard

![project whiteboard ideas, inc board layout and steps anticipated to code the whole game](https://i.imgur.com/s77nhBD.png)


## Project Details

### Duration
The deadline for completing this project is 7 days. 
This was a solo project, with occasional input from teaching assistants from GA.

### MVP goals
- to be able to make the game playable, with at least 1 wave of enemies 
- a counter for how many enemies the player has killed. 

#### Additional goals
- create 3 waves of difficulty
- high score tracking
- add music and sound effects
- create a "you lost" screen that displays player score vs high score
- create a "start game" screen


## Project Diary
Here I will jot down my daily thoughts throughout the development of this game, with the goal of showcasing the order in which I developed each area of the game. 

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
- CSS not being perfect (decided to focus on functionality for now) 
- collision detection and clearing intervals of specific actions -> fixed this by incorporating the collision detection within the initial bullet movement function, so it is all tied down to the same event
- enemies respawning whenever interval triggered -> fixed it by taking the enemy away from the original enemies array

Here are some screenshots of what it looks like today:
(can't capture the movement very well, but it is there!)

![screenshot 1 of the initial project stages](https://i.imgur.com/gWWgj1Qb.png) and ![screenshot 2 of the initial project stages](https://i.imgur.com/gag3JQSb.png)

### Day 4

Goals
- bomb mechanic
- player lives mechanic
- header with counter (not styled)

Difficulties
- deal damage function not working (?scope related)-> asked for help from TA and moving order of the if statements fixed it
- bullet and bomb collision. This consumed most of my day, until late in the evening. Identified this is related to various setIntervals triggering at different times and speeds, so unlikely to be fixable. I have decided to drop this functionality from the game. 

![screenshot 1 of mid level progress](https://i.imgur.com/wRmeJ6Gb.png)

### Day 5

Goals
- style the page around game
- incorporate lives counter and hit counter
- game over function and screen
- (optional) waves of difficulty

Extra things done today:
- music and sound effects

Difficulties
- dynamically change the class of my hero
- clearing Intervals when enemies out of bounds -> it was scope related, so initialized the intervals globally and fixed it

![screenshot of landing screen](https://i.imgur.com/VlaYSysb.png)
![screenshot of game with styling](https://i.imgur.com/tw2wDoJb.png)
![screenshot of game over screen](https://i.imgur.com/xo1FO1Yb.png)

### Day 6

Goals
- play / pause whole game
- add high score tracking (local storage)

Difficulties
- pause and resume functions not working - dropped this in favour of only initializing game on pressing play button, not on reload

## Known issues at the end of project deadline
- bomb-bullet collision not working
- occasional bullet-enemy collision not detecting (interval related bug)
- occasional game over screen flicker
- viewport height taking a little over 100vh
- you have to click twice on the play button for it to work

## Wins

This is the function that handles the movement of a group of enemies. 
I feel like it showcases a good understanding of array manipulation and logic. 

```
function moveAllEnemies(array1, array2) {

    const outOfBoundsBottom = array1.some(item => item > 279)

    if (outOfBoundsBottom) {
        hideAllEnemies(array1, array2)
        currentDirection = null
        gameOver()
    }
    else if (currentDirection === 'right') {
        //check if any enemy is out of bounds
        const outOfBounds = array1.some(item => bordersRight.includes(item))

        if (!outOfBounds) {
            hideAllEnemies(array1, array2)

            //change the numbers of the enemy array to move along
            let newPositions = array1.map(item => item + 1)

            showAllEnemies(newPositions, array2)
            //changing the original enemy array so I can use it again
            array1.length = 0
            newPositions.forEach(item => {
                array1.push(item)
            })
        }
        else if (outOfBounds) {
            hideAllEnemies(array1, array2)

            //change the numbers of the enemy array to move down
            let newPositions = array1.map(item => item + height)

            showAllEnemies(newPositions, array2)
            //changing the original enemy array so I can use it again
            array1.length = 0
            newPositions.forEach(item => {
                array1.push(item)
            })
            currentDirection = 'left'
        }
    }
    else if (currentDirection === 'left') {
        //check if any enemy is out of bounds
        const outOfBounds = array1.some(item => bordersLeft.includes(item));

        if (!outOfBounds) {
            hideAllEnemies(array1, array2)

            //change the numbers of the enemy array to move along
            let newPositions = array1.map(item => item - 1)

            showAllEnemies(newPositions, array2)
            //changing the original enemy array so I can use it again
            array1.length = 0
            newPositions.forEach(item => {
                array1.push(item)
            })
        }
        else if (outOfBounds) {
            hideAllEnemies(array1, array2)

            //change the numbers of the enemy array to move down
            let newPositions = array1.map(item => item + height)

            showAllEnemies(newPositions, array2)
            //changing the original enemy array so I can use it again
            array1.length = 0
            newPositions.forEach(item => {
                array1.push(item)
            })
            currentDirection = 'right'
        }
    }
}
```

I also like this function which handles the bullet movement - it touches on a lot of other elements from the game and uses intervals. 

```
function bulletMovement(position, bulletIndex) {
    const bulletMovementInterval = setInterval(() => {

        if (position >= 0 && position <= 19) {
            clearInterval(bulletMovementInterval)
            hideBullet(position)

            if (bulletIndex !== -1) {
                bulletsOutThere.splice(bulletIndex, 1)
            }

        }
        else {
            //moving the bullet
            showBullet(position)
            hideBullet(position)
            position -= height
            showBullet(position)

            //check for collisions
            const bulletCell = cells[position]
            if (bulletCell.classList.contains('bomb')) {
                clearInterval(bulletMovementInterval)
                hideBullet(position)
            }
            else if (bulletCell && bulletCell.classList.contains('enemy')) {
                bulletCell.classList.remove('enemy')
                bulletCell.classList.remove('bullet')
                //remove this cell from the enemyArr?
                const enemyIndex = enemyArr.indexOf(position)
                if (enemyIndex !== -1) {
                    enemyArr.splice(enemyIndex, 1)
                }

                clearInterval(bulletMovementInterval)
                score++
                checkScore()

                hideBullet(position)

                if (bulletIndex !== -1) {
                    bulletsOutThere.splice(bulletIndex, 1)
                }
            }
        }
    }, 200)
    bulletsOutThere.push(bulletMovementInterval)
}
```

These two functions really are the soul of the game and a good example of my thought process. 

## Project Takeaways

The biggest takeaway was gaining a much more in depth understanding of vanilla JavaScript - I definitely feel much more confident in manipulating array elements and using array methods to bring my thoughts to action. 
I also have a better understanding of intervals and DOM manipulation. 

On the styling side, Flexbox was my preferred way of displaying elements and I also feel much more confident in my knowledge of this and ability to bring my vision to life. 

Last but not least, this project was my first dip into developing something from start to finish with a set deadline - it gave me a good perspective on how time constraints are important and one has to prioritize and make functionality related choices that cater to the deadline. 
It also highlighted how having a team nearby is important and talking about your code can bring clarity and spark new ideas - thank you to the teachers who have helped and shared their knowledge and to the colleagues with whom I have talked to during the project and shared ideas and obstacles with!

## Future Improvements

I would like to learn more about JavaScript methods and functionalities that allow me to better control intervals so I have better control over collision detection. 
I would also like to recreate this project using Classes, constructors and Canvas as it is an area of JavaScript I have not explored much yet and is likely to give me greater control over the core game elements.
