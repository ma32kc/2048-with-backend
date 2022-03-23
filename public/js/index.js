document.addEventListener ('DOMContentLoaded', () => {


    // values

    const grid = document.querySelector ('.game__field')
    const scoreTable = document.querySelector ('.score-header__number-now')
    const bestTable = document.querySelector ('.score-header__number-best')
    const newGame = document.querySelector ('.new-game')
    const result = document.querySelector ('.result')
    const game = document.querySelector ('.game')
    const secondTable = document.querySelector ('.seconds')
    const minuteTable = document.querySelector ('.minutes')
    const n = 5
    let squares = []
    let score = 0
    let best
    if (localStorage.getItem('best')) {
        best = localStorage.getItem('best')
    } else {
        best = 0
        localStorage.setItem('best', best)
    }
    bestTable.innerHTML = localStorage.getItem('best')
    let x1 = null
    let y1 = null
    let direction = ''
    let minutes = 0o0, seconds = 0o0, milliseconds = 0o0, interval

    // start game

    interval = setInterval (startTimer, 10)
    createBoard ()
    checkZero ()

    // eventListeners
    function preventArrows (event) {
        event.preventDefault ()
    }

    newGame.addEventListener ('click', resetBoard)
    document.querySelector ('.header__btn-open').addEventListener ('click', openFullscreen)
    document.querySelector ('.header__btn-close').addEventListener ('click', closeFullscreen)
    document.addEventListener ('keyup', control)
    document.addEventListener ('keydown', preventArrows)

    // functions

    // generate random number (2 or 4)

    function getNum () {
        while (1) {
            let fieldNumber = getRandomInt (n * n)
            if (squares[fieldNumber].innerText == 0) {
                const chance = Math.random ()
                if (chance > 0.1) {
                    squares[fieldNumber].innerHTML = 2
                } else {
                    squares[fieldNumber].innerHTML = 4
                }
                checkForLose ()
                break;
            }
        }
    }

    // create board

    function createBoard () {
        document.addEventListener ('touchstart', handleTouchStart, false)
        document.addEventListener ('touchmove', handleTouchMove, false)
        game.addEventListener ('mousedown', handleMouseStart)
        game.addEventListener ('mousemove', handleMouseMove)

        let square;
        for (let index = 0; index < n * n; index ++) {
            square = document.createElement ('div')
            square.classList.add ('field-game__square')
            square.innerHTML = 0
            grid.appendChild (square)
            squares.push (square)
        }

        for (let index = 0; index < 2; index ++) {
            getNum ()
        }
    }

    // reset board

    function resetBoard () {
        minutes = 0o0, seconds = 0o0, milliseconds = 0o0
        secondTable.innerHTML = '00'
        minuteTable.innerHTML = '00'
        clearInterval (interval)
        interval = setInterval (startTimer, 10)
        score = 0
        scoreTable.innerHTML = 0
        squares = []
        result.innerHTML = ''
        let square;
        for (let index = 0; index < n * n; index ++) {
            square = document.querySelector ('.field-game__square')
            square.remove ()
        }
        document.addEventListener ('keyup', control)
        createBoard ()
        checkZero ()
    }

    // mouse/touch events functions

    function handleMouseStart (event) {
        x1 = event.clientX;
        y1 = event.clientY;
    }

    function handleMouseMove (event) {
        if (!x1 || !y1) {
            return false;
        }
        let x2 = event.clientX;
        let y2 = event.clientY;
        let xDif = x2 - x1;
        let YDif = y2 - y1;

        if (Math.abs (xDif) > Math.abs (YDif)) {
            if (xDif > 0) {
                keyRight ()
                checkZero ()
            } else {
                keyLeft ()
                checkZero ()
            }
        } else {
            if (YDif > 0) {
                keyDown ()
                checkZero ()
            } else {
                keyUp ()
                checkZero ()
            }
        }
        x1 = null
        y1 = null
    }

    function handleTouchStart (event) {
        const firstTouch = event.touches[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }

    function handleTouchMove (event) {
        if (!x1 || !y1) {
            return false;
        }
        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;
        let xDif = x2 - x1;
        let YDif = y2 - y1;

        if (Math.abs (xDif) > Math.abs (YDif)) {
            if (xDif > 0) {
                keyRight ()
                checkZero ()
            } else {
                keyLeft ()
                checkZero ()
            }
        } else {
            if (YDif > 0) {
                keyDown ()
                checkZero ()
            } else {
                keyUp ()
                checkZero ()
            }
        }
        x1 = null
        y1 = null
    }

    function getRandomInt (max) {
        return Math.floor (Math.random () * max);
    }

    // right

    function moveRight () {
        for (let i = 0; i < n * n; i ++) {
            if (i % n == 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let totalFive = squares[i + 4].innerHTML
                let row = [parseInt (totalOne), parseInt (totalTwo), parseInt (totalThree), parseInt (totalFour), parseInt (totalFive)]
                let filteredRow = row.filter (el => el)
                let missing = n - filteredRow.length
                let spaces = Array (missing).fill (0)
                let newRow = spaces.concat (filteredRow)
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
                squares[i + 4].innerHTML = newRow[4]

            }
        }
    }

    // left

    function moveLeft () {
        for (let i = 0; i < n * n; i ++) {
            if (i % n == 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let totalFive = squares[i + 4].innerHTML
                let row = [parseInt (totalOne), parseInt (totalTwo), parseInt (totalThree), parseInt (totalFour), parseInt (totalFive)]
                let filteredRow = row.filter (el => el)
                let missing = n - filteredRow.length
                let spaces = Array (missing).fill (0)
                let newRow = filteredRow.concat (spaces)
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
                squares[i + 4].innerHTML = newRow[4]

            }
        }
    }

    // up

    function moveUp () {
        for (let i = 0; i < n; i ++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + n].innerHTML
            let totalThree = squares[i + n * 2].innerHTML
            let totalFour = squares[i + n * 3].innerHTML
            let totalFive = squares[i + n * 4].innerHTML
            let column = [parseInt (totalOne), parseInt (totalTwo), parseInt (totalThree), parseInt (totalFour), parseInt (totalFive)]
            let filteredColumn = column.filter (el => el)
            let missing = n - filteredColumn.length
            let spaces = Array (missing).fill (0)
            let newRow = filteredColumn.concat (spaces)
            squares[i].innerHTML = newRow[0]
            squares[i + n].innerHTML = newRow[1]
            squares[i + n * 2].innerHTML = newRow[2]
            squares[i + n * 3].innerHTML = newRow[3]
            squares[i + n * 4].innerHTML = newRow[4]
        }
    }

    // down

    function moveDown () {
        for (let i = 0; i < n; i ++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + n].innerHTML
            let totalThree = squares[i + n * 2].innerHTML
            let totalFour = squares[i + n * 3].innerHTML
            let totalFive = squares[i + n * 4].innerHTML
            let column = [parseInt (totalOne), parseInt (totalTwo), parseInt (totalThree), parseInt (totalFour), parseInt (totalFive)]
            let filteredColumn = column.filter (el => el)
            let missing = n - filteredColumn.length
            let spaces = Array (missing).fill (0)
            let newRow = spaces.concat (filteredColumn)
            squares[i].innerHTML = newRow[0]
            squares[i + n].innerHTML = newRow[1]
            squares[i + n * 2].innerHTML = newRow[2]
            squares[i + n * 3].innerHTML = newRow[3]
            squares[i + n * 4].innerHTML = newRow[4]
        }
    }

    // combine rows

    function combineRow () {
        for (let i = 0; i < n * n - 1; i ++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combineTotal = parseInt (squares[i].innerHTML) + parseInt (squares[i + 1].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i + 1].innerHTML = 0
                score += combineTotal
                scoreTable.innerHTML = score
                if (score > parseInt(best)) {
                    localStorage.setItem('best', score)
                    best = score
                    bestTable.innerHTML = localStorage.getItem('best')
                }
            }
        }
        checkForWin ()
        checkZero ()
    }
    // combine columns

    function combineColumn () {
        for (let i = 0; i < n * n - n; i ++) {
            if (squares[i].innerHTML === squares[i + n].innerHTML) {
                let combineTotal = parseInt (squares[i].innerHTML) + parseInt (squares[i + n].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i + n].innerHTML = 0
                score += combineTotal
                scoreTable.innerHTML = score
                if (score > parseInt(best)) {
                    localStorage.setItem('best', score)
                    best = score
                    bestTable.innerHTML = localStorage.getItem('best')
                }
            }
        }
        checkForWin ()
        checkZero ()
    }

    //control

    function control (e) {
        if (e.keyCode === 39) {
            keyRight ()
            checkZero ()
        } else if (e.keyCode === 37) {
            keyLeft ()
            checkZero ()
        } else if (e.keyCode === 38) {
            keyUp ()
            checkZero ()
        } else if (e.keyCode === 40) {
            keyDown ()
            checkZero ()
        }
    }

    function keyRight () {
        moveRight ()
        combineRow ()
        moveRight ()
        getNum ()
        checkZero ()
    }

    function keyLeft () {
        moveLeft ()
        combineRow ()
        moveLeft ()
        getNum ()
        checkZero ()
    }

    function keyUp () {
        moveUp ()
        combineColumn ()
        moveUp ()
        getNum ()
        checkZero ()
    }

    function keyDown () {
        moveDown ()
        combineColumn ()
        moveDown ()
        getNum ()
        checkZero ()
    }

    // check for win
    function checkForWin () {
        if (squares.some (el => el.innerHTML == 64)) {
            document.removeEventListener ('keydown', preventArrows)
            document.removeEventListener ('keyup', control)
            document.removeEventListener ('touchstart', handleTouchStart)
            document.removeEventListener ('touchmove', handleTouchMove)
            result.innerHTML = 'You win!!'
            // const userName = document.querySelector ('.input').value
            document.querySelector('body').insertAdjacentHTML('beforeend', `<div class="popup">
    <form class="popup__form" action="/api/v1/record/" method="post">
        <input type="text" name="username" placeholder="Введите имя" class="input">
        <input readonly type="text" name="time" class="input" value="${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}">
        <button type="submit" class="submit">Подтвердить</button>
        <span class="minutes"></span>
    </form>
</div>`)
         //    document.querySelector ('.leaderboard__body').insertAdjacentHTML ('beforeend', `<div class="leaderboard__item"><div class="leaderboard__label leaderboard__label_name">${userName}</div>
         // <div class="leaderboard__label leaderboard__label_time"><span class="minutes">${minutes > 9 ? minutes : '0' + minutes}</span>:<span class="seconds">${seconds > 9 ? seconds : '0' + seconds}</span></div></div>`)
            clearInterval (interval)
            // const user = {
            //     username: userName,
            //     time: `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
            // }
            // const data = request ('/api/v1/record/')
            // console.log (data)
        }
    }

    // check for lose
    function checkForLose () {
        let zeros = 0
        for (let i = 0; i < squares.length; i ++) {
            if (squares[i].innerHTML == 0) {
                zeros ++
            }
        }
        if (zeros === 0) {
            document.removeEventListener ('keyup', control)
            document.removeEventListener ('touchstart', handleTouchStart)
            document.removeEventListener ('touchmove', handleTouchMove)
            result.innerHTML = 'You lose(('
            clearInterval (interval)
        }
    }

    function checkZero () {
        for (let i = 0; i < squares.length; i ++) {
            if (squares[i].innerHTML == 0) {
                squares[i].style.background = 'rgb(248, 248, 248)'
            } else if (squares[i].innerHTML == 2) {
                squares[i].style.background = '#74AFDF'
            } else if (squares[i].innerHTML == 4) {
                squares[i].style.background = '#91ABE5'
            } else if (squares[i].innerHTML == 8) {
                squares[i].style.background = '#A7A8E9'
            } else if (squares[i].innerHTML == 16) {
                squares[i].style.background = '#BFA4ED'
            } else if (squares[i].innerHTML == 32) {
                squares[i].style.background = '#CAA3EF'
            } else if (squares[i].innerHTML == 64) {
                squares[i].style.background = '#DCA1F3'
            } else if (squares[i].innerHTML == 128) {
                squares[i].style.background = '#E0A0F4'
            } else if (squares[i].innerHTML == 256) {
                squares[i].style.background = 'rgb(214, 122, 244)'
            } else if (squares[i].innerHTML == 512) {
                squares[i].style.background = 'rgb(209, 93, 247)'
            } else if (squares[i].innerHTML == 1024) {
                squares[i].style.background = 'rgb(202, 66, 247)'
            } else if (squares[i].innerHTML == 2048) {
                squares[i].style.background = 'rgb(197, 25, 255)'
            }
            if (squares[i].innerHTML == 0) {
                squares[i].style.color = 'transparent'
            } else {
                squares[i].style.color = '#EEE4DA'
            }
        }
    }

    const elem = document.documentElement;

    function openFullscreen () {
        if (elem.requestFullscreen) {
            elem.requestFullscreen ();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen ();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen ();
        }
    }

    function closeFullscreen () {
        if (document.exitFullscreen) {
            document.exitFullscreen ();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen ();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen ();
        }
    }

    // set timer

    function startTimer () {

        // milliseconds

        milliseconds ++

        if (milliseconds > 99) {
            seconds ++
            secondTable.innerHTML = '0' + seconds
            milliseconds = 0
        }

        // seconds

        if (seconds < 9) {
            secondTable.innerHTML = '0' + seconds

        }
        if (seconds > 9) {
            secondTable.innerHTML = seconds

        }
        if (seconds > 60) {
            minutes ++
            minuteTable.innerHTML = '0' + minutes
            seconds = 0
            secondTable.innerHTML = '0' + seconds
        }

        //minutes

        if (minutes > 9) {
            minuteTable.innerHTML = minutes
        }
    }

    async function request (url, method = 'GET', data = null) {

    }
})