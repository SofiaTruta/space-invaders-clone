
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

let enemyArr = [0, 2, 4, 6, 8, 10, 40, 42, 44, 46, 48, 50, 80, 82, 84, 86, 88, 90]
const originalEnemyArr = [0, 2, 4, 6, 8, 10, 40, 42, 44, 46, 48, 50, 80, 82, 84, 86, 88, 90]


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

let enemySpeed = 1000
let bombSpeed = 300

const hero = document.querySelector('.hero')

//HEADER
const body = document.querySelector('body')
const header = document.querySelector('header')
const title = document.createElement('h1')
const subtitle = document.createElement('p')

//SECTION
const section = document.querySelector('section')
const livesDisplay = document.createElement('h2')
const scoreDisplay = document.createElement('h2')

//timers as variables so I can call them in other places
let enemyMovementInterval
let bombGeneratingInterval
let displayLivesAndScore

//PLAY / PAUSE GAME

let gamePaused = true

//GAME OVER SCREEN
const scoreDisplayGameOver = document.getElementById('score-display')

const scoreHeader = document.getElementById("score-header")
scoreHeader.appendChild(scoreDisplayGameOver)
const gameOverScreen = document.getElementById('game-over-screen')

let gameOverDisplay = 0

const playAgainBtn = document.getElementById('play-again')

//INTRO SCREEN
const introScreen = document.getElementById('intro-screen')
const playBtn = document.getElementById('play')

let introDisplay = 0

//AUDIO
const gun = new Audio('../project-1-space-invaders-clone-sofia-truta/audio/gun-shooting.mp3')
const damage = new Audio('../project-1-space-invaders-clone-sofia-truta/audio/hurt_c_08-102842.mp3')
const gameOverMusic = new Audio('../project-1-space-invaders-clone-sofia-truta/audio/game-over-arcade-6435.mp3')
const gameMusic = new Audio('./project-1-space-invaders-clone-sofia-truta/audio/space-invaders-classic-arcade-game-116826.mp3')
const nextWave = new Audio('../project-1-space-invaders-clone-sofia-truta/audio/next-wave.wav')

let gameMusicFlag = 0

//LEADERBOARD
const nameInput = document.getElementById('name')
let highScore = 0
let highScoreName = null
const highScoreDisplay = document.getElementById('highscore')

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
        // clearInterval(enemyMovementInterval)
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
        gun.play()
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

    }, bombSpeed)
}


//* HERO DAMAGE AND LIVES
function dealDamage() {
    damage.play()
    if (lives === 1) {
        gameOver()
    }
    else if (lives === 2) {
        // hero.classList.add('last-life')
        livesDisplay.style.color = 'red';
        const changingBackgroundColor = setInterval(() => {
            const backgroundColorsArr = ['blue', 'green', 'pink']
            const colorRandomiser = Math.floor(Math.random() * backgroundColorsArr.length)
            const colorPicker = backgroundColorsArr[colorRandomiser]
            livesDisplay.style.backgroundColor = colorPicker
        }, 500)
        lives--
    }
    else {
        lives--
    }
}

//*NEXT WAVE
function checkScore() {
    if (score % 18 === 0) {
        nextEnemyWave()
    }
    else if (score % 36 === 0) {
        nextBombWave()
    }
}

function resetEnemies() {
    enemyArr = [...originalEnemyArr]
}

function nextEnemyWave() {
    nextWave.play()
    resetEnemies()
    clearInterval(enemyMovementInterval)
    enemyMovementInterval = setInterval(() => {
        if (enemyArr.length !== 0) {
            moveAllEnemies(enemyArr, cells)
        }
    }, enemySpeed /= 1.5)
}

function nextBombWave() {
    clearInterval(bombGeneratingInterval)
    bombGeneratingInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enemyArr.length)
        let randomBomb = enemyArr[randomIndex]
        if (enemyArr.length > 1) {
            bombMovement(randomBomb)
        }
    }, 3000)
}


//*GAME OVER
function gameOver() {
    scoreDisplayGameOver.textContent = `${score}`
    scoreDisplayGameOver.style.textAlign = 'center'
    toggleGameOver()
    clearInterval(enemyMovementInterval)
    clearInterval(bombGeneratingInterval)
    gameOverMusic.play()
    storeScore()
    getHighScore()
}

//*PLAY AGAIN
function playAgain() {
    location.reload()
}


//*HEADER POPULATING
function createHeader() {

    title.textContent = 'stress creators'
    subtitle.textContent = 'it is totally not space invaders'
    header.prepend(title)
    header.appendChild(subtitle)

    livesDisplay.classList.add('lives')
    scoreDisplay.classList.add('hits')

    section.appendChild(livesDisplay)
    section.appendChild(scoreDisplay)
}

//*GAME OVER SCREEN
function toggleGameOver() {
    gameMusic.pause()
    if (gameOverDisplay === 0) {
        gameOverScreen.style.display = 'flex'
        gameOverDisplay = 1
    }
    else {
        gameOverScreen.style.display = 'none'
        gameOverDisplay = 0
    }
}

//*INTRO SCREEN
function toggleIntro() {
    if (introDisplay === 0) {
        introScreen.style.display = 'flex'
        introDisplay = 1
        checkMusic()
        checkMusic() //two calls for this function on purpose - user interaction with DOM
    }
    else {
        introScreen.style.display = 'none'
        introDisplay = 0
        checkMusic()
    }
}

//* PLAY AND PAUSE GAME
function pauseGame() {
    console.log('pause')
    clearInterval(enemyMovementInterval)
    clearInterval(bombGeneratingInterval)
    console.log('moving enemies', enemyMovementInterval)
    gamePaused = true
    checkMusic()
}

function resumeGame() {
    enemyMovementInterval = setInterval(() => {
        if (enemyArr.length !== 0) {
            moveAllEnemies(enemyArr, cells);
        }
    }, enemySpeed)

    bombGeneratingInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enemyArr.length);
        let randomBomb = enemyArr[randomIndex];
        if (enemyArr.length > 1) {
            bombMovement(randomBomb);
        }
    }, 5000)

    gamePaused = false
    checkMusic()
}

//*MUSIC 
function checkMusic() {
    if (gameMusicFlag === 1) {
        gameMusic.pause()
        gameMusicFlag = 0
    }
    else {
        gameMusic.play()
        gameMusicFlag = 1
    }
}

//* LEADERBOARD
function storeScore() {
    localStorage.setItem(nameInput.value, score)
}

function getHighScore() {
    const keys = Object.keys(localStorage)

    for (const key of keys) {
        const value = localStorage.getItem(key)
        const score = value
        if (score > highScore) {
            highScore = score
            highScoreName = key
        }
    }

    highScoreDisplay.textContent = `Highscore: ${highScoreName} - ${highScore}`
}


//! EVENT LISTENERS
document.addEventListener('keydown', heroMovement)
document.addEventListener('keyup', shooting)
playAgainBtn.addEventListener('click', playAgain)
playBtn.addEventListener('click', () => {
    toggleIntro()
})
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        checkMusic()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
        
        if (gamePaused) {
            resumeGame()
            checkMusic()
            gamePaused = false
        }
        else if (!gamePaused) {
            pauseGame()
            checkMusic()
            gamePaused = true
        }
    }
})

//! CALL THE FUNCTIONS HERE PLEASE
window.addEventListener('DOMContentLoaded', () => {
    createHeader()
    createGrid()

    enemyMovementInterval = setInterval(() => {
        if (enemyArr.length !== 0) {
            moveAllEnemies(enemyArr, cells)
        }
    }, enemySpeed)


    bombGeneratingInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enemyArr.length)
        let randomBomb = enemyArr[randomIndex]
        if (enemyArr.length > 1) {
            bombMovement(randomBomb)
        }
    }, 5000)

    displayLivesAndScore = setInterval(() => {
        livesDisplay.textContent = `lives = ${lives}`
        scoreDisplay.textContent = `score = ${score}`
    }, 100)
})