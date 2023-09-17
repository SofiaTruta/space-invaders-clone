function init() {

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

    let bulletPosition = (currentHeroPosition - height)

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
            //give it a number so we can see it better
            // cell.innerText = i
            //give it an dataset attribute so we can target it later without being fancy
            cell.setAttribute('dataset-index', i)
            //style the cell itself
            // cell.style.width = `${100 / width}%`
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
        const cell = cells[position]
        if (cell.classList.contains('hero')) {
            cell.classList.remove('hero');
        } else {
            cell.classList.add('hero');
        }
    }

    function heroMovement(event) {
        const key = event.key
        toggleHero(currentHeroPosition)

        if (key === "ArrowLeft" && currentHeroPosition > 280) {
            currentHeroPosition -= 1
        }
        else if (key === "ArrowRight" && currentHeroPosition < 299) {
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
    function showBullet(position){
        const cell = cells[position]
        cell.classList.add('bullet')
    }
    function hideBullet(position){
        const cell = cells[position]
        cell.classList.remove('bullet')
    }

    function shooting(event) {
        const key = event.key
        
        if(key === " "){
            bulletMovement(bulletPosition)
        }

    function bulletMovement(){
        //create a new variable to store the inital position
        //so you can trigger the function several times for several positions
        hideBullet(bulletPosition)
        showBullet(bulletPosition)
        bulletPosition -= height
        hideBullet(bulletPosition)
    } 
    



    }

    //! EVENT LISTENERS
    document.addEventListener('keydown', heroMovement)
    document.addEventListener('keyup', shooting)

    //! CALL THE FUNCTIONS HERE PLEASE
    createGrid()
    

}
window.addEventListener('DOMContentLoaded', init)