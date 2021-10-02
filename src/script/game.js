const block = document.querySelector('.questions__item'),
    buttons = document.querySelectorAll('.question__item__options__item'),
    rocket = document.querySelector('.rocket'),
    crash = document.querySelector('.crash'),
    audioLose = document.querySelector('.audio__game__lose'),
    audioWin = document.querySelector('.audio__game__win'),
    rocketFire = document.querySelector('.rocket__fire');



const questions = [{
    question: 'Начнем с простого: кто был первым человеком в открытом космосе?',
    items: ['Алексей Леонов', 'Юрий Гагарин', 'Нил Армстронг', 'Валентина Терешкова'],
    answer: 0,
    annotation: '18 марта 1965 года космонавт Алексей Леонов вышел с борта корабля «Восход-2» в открытый космос. В общей сложности он 12 минут находился в свободном полете. Не обошлось без нештатных ситуаций: из-за разницы давления скафандр раздулся. Это препятствовало возвращению космонавта в шлюзовую камеру, так как диаметр люка был критически малым. Поэтому Леонов, рискуя жизнью, вынужден был стравливать в скафандре давление почти до критического (с 0,4 до 0,27 атмосфер).'
},
{
    question: 'Сколько в мире действующих космодромов?',
    items: ['3', '8', '15', '19'],
    answer: 3,
    annotation: 'Всего в мире 19 космодромов: два в России, пять в Китае, один в Казахстане, пять в США, два в Японии, один в Индии, один в Новой Зеландии, один в Иране, один во Франции.'
},
{
    question: 'Сколько раз в сутки космонавты на МКС наблюдают восход солнца?',
    items: ['1', '4', '16', '30'],
    answer: 2,
    annotation: 'В течение дня восход солнца на орбите можно наблюдать шестнадцать раз, так как каждые 90 минут МКС совершает виток вокруг планеты.'
},
{
    question: 'Рекорд по нахождению на орбите — у космонавта Геннадия Падалки. Сколько суток суммарно он провел в космосе? ',
    items: ['878', '632', '412', '200'],
    answer: 0,
    annotation: 'Предыдущий рекорд принадлежит Сергею Крикалеву — 803 дня.'
},
{
    question: 'Что названо в честь Юрия Гагарина?',
    items: ['Кратер на Луне', 'Малая планета', 'Минерал', 'Город', 'Все вышеперечисленное'],
    answer: 4,
    annotation: ''
},
{
    question: 'Первое животное в космосе — это:',
    items: ['Собаки Белка и Стрелка', 'Собака Лайка', 'Шимпанзе Хэм', 'Персидский кот Салют'],
    answer: 1,
    annotation: 'Лайка была первым животным, отправившимся в космос. Собака погибла из-за технической неисправности системы вентиляции. А вот Белка и Стрелка совершили суточный орбитальный полет и живыми вернулись на Землю. Кстати, эти имена они получили незадолго до полета. До этого Белка была Вильной, а Стрелка — Каплей. Считалось, что эти имена более благозвучны и солидны.'
},
{
    question: 'Ракеты и космические аппараты почти со всех космодромов в мире запускаются на восток, по направлению вращения Земли. И лишь одна страна — на запад. Какая?',
    items: ['Иран', 'Россия', 'Япония', 'Израиль'],
    answer: 3,
    annotation: 'С востока Израиль окружен недружественными государствами: падение ступеней ракет туда может спровоцировать военный конфликт. А если ракета летит на запад, ступени падают в Средиземное море, однако для запуска в этом направлении требуется гораздо больше горючего, что экономически не выгодно.'
},
{
    question: 'В честь персонажей какого комикса названы транспортные модули МКС?',
    items: ['Черепашки-ниндзя', 'Хранители', 'Люди Икс', 'Мстители'],
    answer: 0,
    annotation: 'По официальной версии многоцелевые модули снабжения для МКС названы в честь итальянских деятелей Возрождения: «Леонардо», «Рафаэль» и «Донателло». Однако на логотипе модулей изображен черепашка-ниндзя в скафандре.'
}, {
    question: 'Благодаря космическим разработками у нас есть:',
    items: ['Костюмы для медицинской реабилитации', 'Холодильники', 'Термокраска', 'Зубные нити'],
    answer: 0,
    annotation: 'Советские ученые разработали костюм «Пингвин», который имитирует гравитацию в невесомости и предотвращает атрофию мышц у космонавтов. На его основе был разработан костюм «Регент» для реабилитации больных, перенесших инсульт и черепно-мозговую травму. '
},
{
    question: 'Что оставили на Луне астронавты миссии Аполлон-11?',
    items: ['Лунные ботинки', 'Мячи для гольфа', 'Флаг', 'Отходы жизнедеятельности', 'Все вышеперечисленное'],
    answer: 4,
    annotation: 'Помимо посадочных ступеней, флагов и отпечатков ботинок американские астронавты оставили на Луне множество предметов, чтобы взять в обратный полет образцы лунного грунта.'
}
];

let mistakes = 0;
let points = 0;
let tour = 0;
let trueAnswer = true;
let tl = new TimelineMax({ repeat: 1 }).to('.rocket', 0, { y: 0 });
let tlbat = new TimelineMax({ repeat: 1 }).to('.batut', 0, { y: 0 });
let tlrfire = new TimelineMax({ repeat: 1 }).to('.rocket__fire', 0, { y: 0 });
let fireStage = 1;
let gameScroll = 0;

$('.test__block__content__button').click((e) => {
    $('.preloader').fadeIn(0);
    gameScroll = window.pageYOffset;
    $('.content__wrapper').addClass('fixed');    
    e.preventDefault();
    $('.game').fadeIn();
    newGame();
    setTimeout(() => {
        $('.preloader').fadeOut(400);
    }, 1000)
});
$('.game__close__btn').click((e) => {
    $('body').removeClass('body__game__inactive');
    $('.game').fadeOut();
    $('.content__wrapper').removeClass('fixed');  
    window.scrollTo(0, gameScroll);  
});

async function startGame() {
    tl = await new TimelineMax({ repeat: 1 }).to('.rocket', 0, { y: 0, opacity: 1 });
    tlbat = await new TimelineMax({ repeat: 1 }).to('.batut', 0, { y: 0, opacity: 1 });
    tlrfire = await new TimelineMax({ repeat: 1 }).to('.rocket__fire', 0, { y: 0, opacity: 0 });
    gsap.to('.crash__left', {
        duration: 0,
        y: 0,
        x: 0,
        rotation: 0
    });
    gsap.to(crash, {
        duration: 0,
        opacity: 0,
    })
    gsap.to('.crash__right', {
        duration: 0,
        y: 0,
        x: 0,
        rotation: 0
    });
    gsap.to('.crash__center', {
        duration: 0,
        y: 0,
        x: 0,
        rotation: 0
    });
    gsap.to('.rocket__explosion', {
        duration: 0,
        opacity: 1,
    });
    rocket.src = 'src/img/game/rockets/1.1.png';
    mistakes = 0;
    points = 0;
    tour = 0;
    await $(block).fadeOut(200);
    block.innerHTML = `<div class="questions__item__text">${questions[0].question}</div>
                            <ul class="questions__item__options">
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[0]}</div></li>
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[1]}</div></li>
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[2]}</div></li>
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[3]}</div></li>
                            </ul>`;
    await $(block).fadeIn(0);
}

async function newGame() {
    tlbat.kill(null);
    if (tl != 0) {
        await tl.kill(null);

        await gsap.to('.rocket', {
            duration: 0,
            y: 0,
            rotation: 0,
            opacity: 1
        })
        await gsap.to('.batut', {
            duration: 0,
            y: 0,
            rotation: 0,
            opacity: 1
        })
        await gsap.to('.rocket__fire', {
            duration: 0,
            y: 0,
            rotation: 0,
            opacity: 0
        })
        rocket.src = 'src/img/game/rockets/1.1.png';
    }

    gsap.to('.crash__left', {
        duration: 0,
        y: 0,
        x: 0,
        rotation: 0
    });
    gsap.to('.crash__right', {
        duration: 0,
        y: 0,
        x: 0,
        rotation: 0
    });
    gsap.to('.crash__center', {
        duration: 0,
        y: 0,
        x: 0,
        rotation: 0
    });
    gsap.to('.rocket__explosion', {
        duration: 0,
        opacity: 1,
    });
    mistakes = 0;
    points = 0;
    tour = 0;
    tl = 0;
    block.innerHTML = `<div class="questions__item__text">Кажется, ракета готова к запуску...</div>
                            <div class="questions__start">ПОЕХАЛИ!</div>`;
}

block.addEventListener('click', async (e) => {
    if (e.target.classList.contains('question__item__options__item')) {
        if (e.target.getAttribute('data-id') == '1') {
            return;
        }
        e.target.setAttribute('data-id', '1');
        if (e.target.innerHTML == questions[tour].items[questions[tour].answer]) {
            e.target.style.backgroundColor = await 'green';
            await points++;
            trueAnswer = await true;
        } else {
            e.target.style.backgroundColor = 'red';
            mistakes++;
            trueAnswer = await false;
        }
        await gsap.to(block, {
            opacity: 0,
            duration: 0.2,
        })
        await checkLose();
        await showAnnotation(questions[tour].annotation);
        await tour++;
        await rocketAnimation();
        await gsap.to(block, {
            opacity: 0,
            duration: 0.5,
        })
        await gsap.to(block, {
            opacity: 1,
            duration: 0.2,
        })
    }
    if (e.target.classList.contains('questions__start')) {
        startGame();
    }
    if (e.target.classList.contains('questions__next')) {
        await gsap.to(block, {
            opacity: 0,
            duration: 0.2,
        })
        await nextQuestion();
        await gsap.to(block, {
            opacity: 1,
            duration: 0.5,
        })
    }
});

function showAnnotation(text) {
    block.innerHTML = `<div class="questions__item__annotation">${text}</div>
                            <div class="questions__next">Далее</div>`;
}

function nextQuestion() {
    if (points >= 9) {
        block.innerHTML = `<div class="questions__item__text">Ура! Вам удалось запустить ракету. До встречи в космосе!</div>
                            <div class="questions__start">Начать заново</div>`;
    } else if (mistakes >= 6) {
        block.innerHTML = `<div class="questions__item__text">Упс, ракета взорвалась. Кажется, вы плохо подготовились. Попробуйте еще раз!</div>
                            <div class="questions__start">Пройти тест заново</div>`;
    } else {
        if (questions[tour].items.length == 4) {
            block.innerHTML = `<div class="questions__item__text">${questions[tour].question}</div>
        <ul class="questions__item__options">
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[0]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[1]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[2]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[3]}</div></li>
        </ul>`;
        } else {
            block.innerHTML = `<div class="questions__item__text">${questions[tour].question}</div>
        <ul class="questions__item__options">
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[0]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[1]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[2]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[3]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[4]}</div></li>
        </ul>`;
        }

    }
}



async function rocketAnimation() {
    if (points == 1 && !lose() && trueAnswer) {
        if (tl != 0) {
            tl.kill(null);
        }
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
                .to('.rocket', 0.3, { y: 0 })
                .to('.rocket', 0.3, { y: -25 })
                .to('.rocket', 0.3, { y: 0 })


            tlbat = new TimelineMax({ repeat: -1 })
                .to('.batut', 0.3, { y: 0 })
                .to('.batut', 0.2, { y: 10, scaleY: 0.95 })
                .to('.batut', 0.1, { y: 0, scaleY: 1 })
                .to('.batut', 0.3, { y: 0 })

        }, 200);

    } else if (points == 2 && !lose() && trueAnswer) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y: 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
                .to('.rocket', 0.3, { y: 0 })
                .to('.rocket', 0.3, { y: -50 })
                .to('.rocket', 0.3, { y: 0 })
        }, 200);
    } else if (points == 3 && !lose() && trueAnswer) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y: 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
                .to('.rocket', 0.3, { y: 0 })
                .to('.rocket', 0.3, { y: -75 })
                .to('.rocket', 0.3, { y: 0 })
        }, 200);
    } else if (points == 4 && !lose() && trueAnswer) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y: 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
                .to('.rocket', 0.3, { y: 0 })
                .to('.rocket', 0.3, { y: -100 })
                .to('.rocket', 0.3, { y: 0 })
        }, 200);
    } else if (points == 5 && !lose() && trueAnswer) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y: 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
                .to('.rocket', 0.3, { y: 0 })
                .to('.rocket', 0.3, { y: -125 })
                .to('.rocket', 0.3, { y: 0 })
        }, 200);
    } else if (mistakes >= 6 && !trueAnswer) {
        await tl.kill(null);
        await tlbat.kill(null);
        setTimeout(() => {
            audioLose.play();
            tl = new TimelineMax({ repeat: 0 })
                .to(rocket, 0, { opacity: 0 })
                .to(crash, 0, { opacity: 1 })
            gsap.to('.crash__left', {
                duration: 1,
                y: -1000,
                x: -700,
                rotation: 145
            });
            gsap.to('.crash__right', {
                duration: 1,
                y: -1000,
                x: 700,
                rotation: 30
            });
            gsap.to('.crash__center', {
                duration: 1,
                y: -1000,
                x: 300,
                rotation: 45
            });
            gsap.from('.rocket__explosion', {
                duration: 0.2,
                opacity: 0
            })


        }, 500)
    } else if (tour >= 10) {
        audioWin.play();
        if (tl != 0) {
            tl.clear();
        }
        tlbat.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y: 0,
        });
        await gsap.to('.batut', {
            duration: 0,
            y: 0,
        })
        gsap.to('.rocket__fire', {
            duration: 0.2,
            opacity: 1
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: 0 })
                .to('.rocket', 2, { y: -1500 })
            tlrfire = new TimelineMax({ repeat: 0 })
                .to('.rocket__fire', 2, { y: -1500 })
            tlbat = new TimelineMax({ repeat: 0 })
                .to('.batut', 0, { y: 0 })
        }, 200);
    }
}

setInterval(() => {
    changeFire();
}, 100);

function changeFire() {
    if (fireStage > 3) {
        fireStage = 1;
        return;
    }
    rocketFire.src = `src/img/game/rockets/rocket_fire_${fireStage}.png`;
    fireStage++;
}

function lose() {
    if (mistakes >= 6) {
        return true;
    } else {
        return false;
    }
}

async function checkLose() {
    if (mistakes == 1) {
        rocket.src = 'src/img/game/rockets/1.1.png';
        await setTimeout(() => {
            rocket.src = 'src/img/game/rockets/1.2.png';
        }, 500);
    } else if (mistakes == 2) {
        rocket.src = 'src/img/game/rockets/2.1.png';
        await setTimeout(() => {
            rocket.src = 'src/img/game/rockets/2.2.png';
        }, 500);
    } else if (mistakes == 3) {
        rocket.src = 'src/img/game/rockets/3.1.png';
        await setTimeout(() => {
            rocket.src = 'src/img/game/rockets/3.2.png';
        }, 500);
    } else if (mistakes == 4) {
        rocket.src = 'src/img/game/rockets/4.1.png';
        await setTimeout(() => {
            rocket.src = 'src/img/game/rockets/4.2.png';
        }, 500);
    } else if (mistakes == 5) {
        rocket.src = 'src/img/game/rockets/5.1.png';
        await setTimeout(() => {
            rocket.src = 'src/img/game/rockets/5.2.png';
        }, 500);
    }
};
