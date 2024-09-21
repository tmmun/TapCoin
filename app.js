let skinArrDefold = ['./img/coin.png', './img/coin2.gif', './img/coin3.gif']
let skinCoinArrDefold = ['./img/coin_floor.gif', './img/coin_floor2.gif', './img/coin_floor3.gif']
let skinSwapCount = 0
let coin_floor2 = false
let coin_floor3 = false

let pos = 0
let savePosition = 0

let point = 0
let pointUp = 1
let record = 0

let lockRepeatCoin = true
let trap = 1
let startSwich = true
let speedBafAktive = false

let IntervalTime = 1500


for (i = 0; i < 9; i++) { //создаем пол

    $("#base_cell").append('<img id="cell" class="c' + i + '" src="./img/floor.png" alt="">')
}

function atr(num, num2) {

    $(num).attr('src', num2)

}

function SwapPos() {

    trap = randomInteger(2) // получаем рандомнае число для выбора ловушка\монета

    //возвращаем преждний стпрайт
    atr('.c' + pos, './img/floor.png')

    if (pos < 9) {

        // получаем число для смены позиции
        pos = randomInteger(8)

        // если позиция та же, рандомим по новой
        if (pos === savePosition) {
            atr('.info', './img/lock_info.gif')
            atr('.caves_gid', "./img/caves2_swap.gif")
            pos = randomInteger(8)
        }
        else {
            atr('.caves_gid', "./img/caves2.gif")

            if (trap == 1) {

                //меняем спрайт на монету
                atr('.c' + pos, skinArrDefold[skinSwapCount])
                //разблок
                lockRepeatCoin = true
                // console.log('notrap')
            }
            else {
                //меняем спрайт 
                atr('.c' + pos, './img/trap.png')
                //разблок
                lockRepeatCoin = true
                // console.log('trap')
            }
        }

    }
    else {
        pos = 0
    }

    // сохраняем позицию, избегаем повторное появление на одной ячейке
    savePosition = pos
}

$(document).on("click", function (e) {

    let posStr = 'c' + pos //конвертируем для сравнение

    let className = $(e.target).attr("class") //получаем имя класса

    if (className === posStr) { //сравниваем

        if (trap == 1) {

            if (lockRepeatCoin) { //запрещаем поврное получение балов в той же позиции
                point += pointUp
                atr('.c' + pos, './img/coin_use.gif')
                lockRepeatCoin = false //блокируем
                CoinCounter()

                if (point >= 50 && speedBafAktive === false) { // проверка кол-во поинтов для покупки ускорения, включаем анимацию на кнопке покупки
                    atr('.speed', './img/speed_akt.gif')
                }
            }

        }
        else {
            if (point > 0 && lockRepeatCoin) { // если монет больше 0 то срабатывает ловушка и отнимает 1
                point -= pointUp
                atr('.c' + pos, './img/coin_use.gif')
                lockRepeatCoin = false //блокируем
                CoinCounter()
            }
        }

        // console.log("boost aktive")
        CoinUp()

    }


})

function CoinCounter() {
    $('#coin').text(point)
}

function randomInteger(max) {
    let rand = 1 + Math.random() * (max + 1 - 1);
    return Math.floor(rand);
}

$('#rec').text(localStorage.getItem("rec")) // получаем рекорд

$(".start").click(function () {

    RecSave()

    if (startSwich) {
        atr('.start', './img/start.png')
        Interval = setInterval(() => SwapPos(), IntervalTime)
        startSwich = false

    }
    else {

        atr('.start', './img/stop.png')
        clearInterval(Interval)
        lockRepeatCoin = false //разблок
        atr('.c' + pos, './img/coin_use.gif') //меняем спрайт 
        startSwich = true

    }
})

$(".speed").click(function () { // активация ускрения

    if (point >= 50 && speedBafAktive === false) {

        atr('.speed', './img/speed_save.png')

        atr('.start', './img/stop.png')
        clearInterval(Interval)
        lockRepeatCoin = false //разблок
        atr('.c' + pos, './img/coin_use.gif')//меняем спрайт 
        startSwich = true
        IntervalTime = 1000
        speedBafAktive = true
    }

    if (point < 50) {
        atr('.info', './img/up_info.gif')
        atr('.caves_gid', "./img/caves2_up.gif")
        console.log('s')

    }
})

function RecSave() {
    record = localStorage.getItem("rec") // получаем рекорд, конвертируем и записываем
    record = Number(record)

    if (record <= point) { // если рекорд меньше, записываем
        localStorage.setItem("rec", point)
        $('#rec').text(record)
    }
}

function CoinUp() {
    if (point >= 20 && point <= 40 && coin_floor2 === false) {
        pointUp = 2
        skinSwapCount = 1
        atr('.coin_floor', skinCoinArrDefold[skinSwapCount])
        coin_floor2 = true
    }

    if (point >= 41 && point <= 60 && coin_floor3 === false) {
        pointUp = 4
        skinSwapCount = 2
        atr('.coin_floor', skinCoinArrDefold[skinSwapCount])
        coin_floor3 = true
    }
}

//clearInterval(Interval)
//Interval = setInterval(() => EnemySheld(), 1000)
//$('#enemy').attr('src', 'img/enemy.gif')
//console.log(numbersArr)
//$('').append("<div")
//$("").click(function () {})

//function randomInteger(max) {
//    let rand = 1 + Math.random() * (max + 1 - 1);
//    return Math.floor(rand);
//}
