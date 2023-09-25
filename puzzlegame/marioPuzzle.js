document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div')) 
    document.addEventListener('keyup', control)
    const startBtn = document.querySelector('#start-button')
    let timerId
    let scoreDisplay = document.querySelector('#score')
    let scoreKeep = 0
    
  


    const gridLine1 = [0, 1, 2, 3, 4]
    const gridLine2 = [5, 6, 7, 8, 9]
    const gridLine3 = [10, 11, 12, 13, 14]
    const gridLine4 = [15, 16, 17, 18, 19]
    const gridLine5 = [20, 21, 22, 23, 24]
    const gridLine6 = [25, 26, 27, 28, 29]
    const gridLine7 = [30, 31, 32, 33, 34]
    const gridLine8 = [35, 36, 37, 38, 39]
    const gridLine9 = [40, 41, 42, 43, 44]
    const gridLine10 = [45, 46, 47, 48, 49]

    const gridMap = [gridLine1, gridLine2, gridLine3, gridLine4, gridLine5, gridLine6, gridLine7, gridLine8, gridLine9, gridLine10]


    let blockSet = [0, 5]
    const colors = ['blue', 'red','green','yellow', 'blue'] //added blue
    let randomUpperColor = 0
    let randomLowerColor = 0
    let randomUpperPlacement = 0
    let randomLowerPlacement = 0

    function newBlockSet() {
        randomUpperPlacement = Math.floor(Math.random() * 4)
        randomLowerPlacement = randomUpperPlacement + 5
        blockSet = [randomUpperPlacement, randomLowerPlacement]

        randomUpperColor = Math.floor(Math.random() * 4) //colors.length
        randomLowerColor = Math.floor(Math.random() * 4) //colors.length

        console.log("Start Upper: ", colors[randomUpperColor], randomUpperColor)
        console.log("Start lower: ", colors[randomLowerColor], randomLowerColor)

        if(randomUpperColor === randomLowerColor) {
            randomUpperColor ++
        }

    }

    newBlockSet()


    function draw() {
        //squares[blockSet[0]].classList.add('first');

        if(randomUpperColor === 0 || randomUpperColor === 4) {
           squares[blockSet[0]].classList.add('blue')
        } else if (randomUpperColor === 1) {
            squares[blockSet[0]].classList.add('red')
        } else if (randomUpperColor === 2) {
            squares[blockSet[0]].classList.add('green')
        } else if (randomUpperColor === 3) {
            squares[blockSet[0]].classList.add('yellow')
        } 

        if(randomLowerColor === 0 || randomLowerColor === 4) {
            squares[blockSet[1]].classList.add('blue')
        } else if (randomLowerColor === 1) {
            squares[blockSet[1]].classList.add('red')
        } else if (randomLowerColor === 2) {
            squares[blockSet[1]].classList.add('green')
        } else if (randomLowerColor === 3) {
            squares[blockSet[1]].classList.add('yellow')
        } 

        freeze() 
    }

    draw()

    function undraw() {
        squares[blockSet[0]].classList.remove('blue', 'red', 'green', 'yellow')
        squares[blockSet[1]].classList.remove('blue', 'red', 'green', 'yellow')
    }

    function moveDown() {
        undraw()
        blockSet[0] += 5
        blockSet[1] += 5
        draw()  
    }

    function rotate() {
        undraw()
        tempRotate = randomUpperColor
        randomUpperColor = randomLowerColor
        randomLowerColor = tempRotate

        draw()
    }
    
    function moveLeft() {
        undraw()
        let edgeMarker = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45]
        if(edgeMarker.includes(blockSet[0] && blockSet[0])) {
            blockSet[0] += 0 
            blockSet[1] += 0
        } else {
            blockSet[0] -= 1
            blockSet[1] -= 1
        }
        draw()
    }

    function moveRight() {
        undraw()
        let edgeMarker = [4, 9, 14, 19, 24, 29, 34, 39, 44, 49]
        if(edgeMarker.includes(blockSet[0] && blockSet[0])) {
            blockSet[0] += 0 
            blockSet[1] += 0
        } else {
            blockSet[0] += 1
            blockSet[1] += 1
        }
        draw()
    }

    function control(a) {
        if(a.keyCode === 40) {
            moveDown()
        } else if(a.keyCode === 38) {
            rotate()
        } else if(a.keyCode === 37) {
            moveLeft()
        } else if(a.keyCode === 39) {
            moveRight()
        }
    }


    function freeze() {

        if(squares[blockSet[1] + 5 || blockSet[0] + 5].classList.contains('taken')) { 
            squares[blockSet[0]].classList.add('taken')
            squares[blockSet[1]].classList.add('taken')

            newBlockSet()
            draw()
            score()
        }
    }


    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            timerId = setInterval(moveDown, 1000)
        }
    })



    function score() {
        //vertical check
        for(i = 0; i < 5; i ++) {
            for(j = 0; j < gridMap.length -1; j ++){
                for(c = 0; c < 4; c++ ){
                    if(squares[gridMap[j][i]].classList.contains(colors[c]) && squares[gridMap[j+1][i]].classList.contains(colors[c])){
                        console.log('MATCH')
                        squares[gridMap[j][i]].classList.remove('taken', colors[c])
                        squares[gridMap[j+1][i]].classList.remove('taken', colors[c])
                        scoreKeep ++
                        scoreDisplay.innerHTML = scoreKeep
        
                        if((squares[gridMap[j-1][i]]).classList.contains('red')){
                            console.log("RED")
                            squares[gridMap[j-1][i]].classList.remove('red')
                            squares[gridMap[j-1][i]].classList.remove('taken')
                            squares[gridMap[j+1][i]].classList.add('red')
                            squares[gridMap[j+1][i]].classList.add('taken')
                        }
        
                        if((squares[gridMap[j-1][i]]).classList.contains('yellow')){
                            console.log("YELLOW")
                            squares[gridMap[j-1][i]].classList.remove('yellow')
                            squares[gridMap[j-1][i]].classList.remove('taken')
                            squares[gridMap[j+1][i]].classList.add('yellow')
                            squares[gridMap[j+1][i]].classList.add('taken')
                        }
        
                        if((squares[gridMap[j-1][i]]).classList.contains('green')){
                            console.log("GREEN")
                            squares[gridMap[j-1][i]].classList.remove('green')
                            squares[gridMap[j-1][i]].classList.remove('taken')
                            squares[gridMap[j+1][i]].classList.add('green')
                            squares[gridMap[j+1][i]].classList.add('taken')
                        }
        
                        if((squares[gridMap[j-1][i]]).classList.contains('blue')){
                            console.log("BLUE")
                            squares[gridMap[j-1][i]].classList.remove('blue')
                            squares[gridMap[j-1][i]].classList.remove('taken')
                            squares[gridMap[j+1][i]].classList.add('blue')
                            squares[gridMap[j+1][i]].classList.add('taken')
                        }
                    }
                }

                

            } 
        }
        //horizontal check  [i] [i+1]
        for(j = 0; j < gridMap.length; j ++){
            for(i = 0; i < 4; i ++){
                for(c = 0; c < 4; c++ ){
                    //console.log("Row: ", j, " Ele: ", i)
                    if(squares[gridMap[j][i]].classList.contains(colors[c]) && squares[gridMap[j][i+1]].classList.contains(colors[c])){
                        console.log(' HORIZONTAL MATCH')
                        squares[gridMap[j][i]].classList.remove('taken', colors[c])
                        squares[gridMap[j][i+1]].classList.remove('taken', colors[c])
                        scoreKeep ++
                        scoreDisplay.innerHTML = scoreKeep
    
                            //RED
                        if((squares[gridMap[j-1][i]]).classList.contains('red')){
                            console.log("RED")
                            squares[gridMap[j-1][i]].classList.remove('red', 'taken')
                            squares[gridMap[j][i]].classList.add('red', 'taken')
                        }
    
                        if((squares[gridMap[j-1][i+1]]).classList.contains('red')){
                            console.log("RED")
                            squares[gridMap[j-1][i+1]].classList.remove('red', 'taken')
                            squares[gridMap[j][i+1]].classList.add('red', 'taken')
                        }
    
                            //YELLOW
                        if((squares[gridMap[j-1][i]]).classList.contains('yellow')){
                            console.log("YELLOW")
                            squares[gridMap[j-1][i]].classList.remove('yellow', 'taken')
                            squares[gridMap[j][i]].classList.add('yellow', 'taken')
                        }
    
                        if((squares[gridMap[j-1][i+1]]).classList.contains('yellow')){
                            console.log("YELLOW")
                            squares[gridMap[j-1][i+1]].classList.remove('yellow', 'taken')
                            squares[gridMap[j][i+1]].classList.add('yellow', 'taken')
                        } 
        
                            //GREEN
                        if((squares[gridMap[j-1][i]]).classList.contains('green')){
                            console.log("GREEN")
                            squares[gridMap[j-1][i]].classList.remove('green', 'taken')
                            squares[gridMap[j][i]].classList.add('green', 'taken')
                        }
    
                        if((squares[gridMap[j-1][i+1]]).classList.contains('green')){
                            console.log("GREEN")
                            squares[gridMap[j-1][i+1]].classList.remove('green', 'taken')
                            squares[gridMap[j][i+1]].classList.add('green', 'taken')
                        } 
                            //BLUE
                        if((squares[gridMap[j-1][i]]).classList.contains('blue')){
                            console.log("BLUE")
                            squares[gridMap[j-1][i]].classList.remove('blue', 'taken')
                            squares[gridMap[j][i]].classList.add('blue', 'taken')
                        }
    
                        if((squares[gridMap[j-1][i+1]]).classList.contains('blue')){
                            console.log("BLUE")
                            squares[gridMap[j-1][i+1]].classList.remove('blue', 'taken')
                            squares[gridMap[j][i+1]].classList.add('blue', 'taken')
                        } 
                    }
                }

            }
        }

        
    }

})

                //within score()
                //check by class name
                //cant log a null value
                // console.log("Im on ", i, " ", j, " which is ", squares[gridMap[j][i]].className)
                // console.log("Im on ", i, " ", j + 1, " which is ", squares[gridMap[j + 1][i]].className)
                // console.log("Im on ", i, " ", j - 1, " which is ", squares[gridMap[j - 1][i]].className)
                // console.log(" ");

