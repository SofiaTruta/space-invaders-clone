
//! VARIABLES
//GRID
const grid = document.querySelector('.flex-grid')
const width = 15
const height = 20
const cellCount = width * height
const cells = [] //all the cells in an array! remember to use it!
const bordersRight = [19, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299]
const bordersLeft = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280]

let currentDirection = 'right'

const enemyArr = [0, 2, 4, 6, 8, 10, 40, 42, 44, 46, 48, 50, 80, 82, 84, 86, 88, 90]

const startingHeroPosition = 289
let currentHeroPosition = startingHeroPosition

const startingEnemyPosition = enemyArr
let currentEnemyPosition = startingEnemyPosition

let startingBulletPosition = currentHeroPosition - height
let bulletPosition = startingBulletPosition

const bulletsOutThere = []
const bombsOutThere = []

let score = 0
let lives = 3

//HEADER




//! FUNCTIONS
//* GRID
function createGrid() {
    for (let i = 0; i < cellCount; i++) {
        //we create a new div for every cell
        const cell = document.createElement('div')
        //append it to the grid so it shows
        grid.appendChild(cell)
        //add it to the array so we can iterate and access each cell later on
        cells.push(cell)
        // cell.innerText = i
        //give it an dataset attribute so we can target it later without being fancy
        // cell.setAttribute('dataset-index', i)

    }

    //adding the hero at the start position whenever we refresh the grid
    toggleHero(startingHeroPosition)

    //adding enemy when we refresh the grid
    // showEnemy(startingEnemyPosition)
    showAllEnemies(enemyArr, cells)
}

//* HERO CHARACTER
//show and hide the character
function toggleHero(position) {
    const heroCell = cells[position]
    if (heroCell.classList.contains('hero')) {
        heroCell.classList.remove('hero');
    } else {
        heroCell.classList.add('hero');
    }
}

function heroMovement(event) {
    const key = event.key
    toggleHero(currentHeroPosition)

    if ((key === "ArrowLeft" || key === "a") && currentHeroPosition > 280) {
        currentHeroPosition -= 1
    }
    else if ((key === "ArrowRight" || key === "d") && currentHeroPosition < 299) {
        currentHeroPosition += 1
    }
    toggleHero(currentHeroPosition)
}

//* ENEMIES
function showAllEnemies(array1, array2) {
    array1.forEach(item => {
        const cell = array2[item]
        if (cell) {
            cell.classList.add('enemy')
        }
    })
}

function hideAllEnemies(array1, array2) {
    array1.forEach(item => {
        const cell = array2[item]
        if (cell) {
            cell.classList.remove('enemy')
        }
    })
}

function moveAllEnemies(array1, array2) {

    const outOfBoundsBottom = array1.some(item => item > 279)
    if (outOfBoundsBottom) {
        hideAllEnemies(array1, array2)
        currentDirection = null
        clearInterval(enemyMovementInterval)
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

//* SHOOTING
function showBullet(position) {
    const bulletCell = cells[position]
    bulletCell.classList.add('bullet')
}
function hideBullet(position) {
    const bulletCell = cells[position]
    bulletCell.classList.remove('bullet')
}

function shooting(event) {
    const key = event.key
    if (key === " " || key === "Enter") {
        bulletMovement(currentHeroPosition, bulletsOutThere.length)
    }
}

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
                console.log('bomb')
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

                hideBullet(position)

                if (bulletIndex !== -1) {
                    bulletsOutThere.splice(bulletIndex, 1)
                }
            }
        }
    }, 200)

    bulletsOutThere.push(bulletMovementInterval)
}

//* BOMBS
function hideBomb(position) {
    const bombCell = cells[position]
    bombCell.classList.remove('bomb')
}

function showBomb(position) {
    const bombCell = cells[position]
    bombCell.classList.add('bomb')
}

function bombMovement(position) {

    const bombMovementInterval = setInterval(() => {
        const bombCell = cells[position]
        //4. check for bullets
        if (bombCell && bombCell.classList.contains('bullet')) {
            clearInterval(bombMovementInterval)
            hideBomb(position)
        }
        //3. check for hero
        else if (bombCell && bombCell.classList.contains('hero')) {
            clearInterval(bombMovementInterval)
            hideBomb(position)
            dealDamage()
        }
        //2. check for boundaries
        else if (position > 279) {
            clearInterval(bombMovementInterval)
            hideBomb(position)
        }
        else {
            //1. movement of bomb
            showBomb(position)
            hideBomb(position)
            position += height
            showBomb(position)
        }
        
    }, 1000)
}

//*COLLISION DETECTION -> now incorporated within the bulletMovement and bombMovement
// function collisionDetection(position){
//     const hero = document.getElementsByClassName('hero')
//     const cell = cells[position]

//     for(const element of hero){
//         if(element.classList.contains('hero') && element.classList.contains('bomb')){
         
//         }
//     }

// }



//* HERO DAMAGE AND LIVES
function dealDamage() {
    if (lives <= 1) {
        gameOver()
    }
    else {
        lives--
    }
}

//*GAME OVER
function gameOver() {
    console.log('game over')
}

//*HEADER STYLING AND POPULATING
function createHeader() {
    // const body = document.querySelector('body')
    // const header = document.createElement('header')
    // const title = document.createElement('h1')
    // title.textContent = 'Project 1'

    // header.appendChild(title)
    // body.prepend(header)
}


//! EVENT LISTENERS
document.addEventListener('keydown', heroMovement)
document.addEventListener('keyup', shooting)

//! CALL THE FUNCTIONS HERE PLEASE


window.addEventListener('DOMContentLoaded', () => {
    createHeader()
    createGrid()


    const enemyMovementInterval = setInterval(() => {
        moveAllEnemies(enemyArr, cells)
    }, 1000)

    const bombGeneratingInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enemyArr.length)
        let randomBomb = enemyArr[randomIndex]
        bombMovement(randomBomb)
    }, 5000)

    // const collisionDetectionTimer = setInterval(collisionDetection, 1000)

})