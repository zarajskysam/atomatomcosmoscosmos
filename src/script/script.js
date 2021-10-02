setTimeout(() => {
    $('.preloader').fadeOut(500);
}, 1000)

let scrollPosition = 0;

$(window).on( 'load', function() {
    gsap.utils.toArray('.gsap__left').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "-100 bottom",
                end: "-100 center",
                scrub: true,
                markers: false
            },
            x : innerWidth * -0.2,
            opacity : 0.2,
            y : innerHeight * 0.2,
            scale: 0.2
        })
    });
    gsap.utils.toArray('.gsap__right').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top bottom",
                end: "center center",
                scrub: true,
                markers: false
            },
            x : innerWidth * 0.2,
            opacity : 0.2,
            scale: 0.2
        })
    });
    gsap.utils.toArray('.block__content').forEach(elem => {
        if (elem.classList.contains('from__left')) {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                    markers: false
                },
                x : innerWidth * -0.2,
            })
        } else {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                    markers: false
                },
                x : innerWidth * 0.2,
            })
        }
    })
});


$(document).ready(function(){
    //Open info content
    $('.block__content').click((e)=>{
        e.preventDefault();
        if(e.target.classList.contains('block_link')) {
            if(!($('.block__disc__hidden', e.target.closest('div')).is(':visible'))){
                e.target.innerHTML = 'Скрыть';
            } else {
                e.target.innerHTML = 'Читать';
            }
            e.target.classList.toggle('hide');
            $('.block__disc__hidden', e.target.closest('div')).slideToggle('slow');
        }
    });
    //WowJS plaguin
    new WOW().init();
    //popup
});
//Slick slider plaguin
$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    speed: 700,
    infinite: true,
    responsive: [
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});    
function mobileOnlySlider() {
    $(document).ready(function(){
        setTimeout(()=> {
            $('.playlist').slick({
                slidesToShow:3,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '0px',
                speed: 700,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }, 500);
    })
}

if (window.innerWidth <= 991) {
    mobileOnlySlider();
}

$(window).resize(function() {
    if(window.innerWidth <= 991) {
        if($('.playlist').hasClass('slick-initialized')) {
            return;
        }
        mobileOnlySlider();
    } else {
        if($('.playlist').hasClass('slick-initialized')) {
            $('.playlist').slick('unslick');
        } else {
            return;
        }
    }
});

//Переключение на статью

const articles = Array.from(document.querySelectorAll('.article'));

$('.slider__item__link').click(async function(e) {
    scrollPosition = window.pageYOffset;
    await $('.content__wrapper').addClass('fixed');
    await articles.forEach(item => {
        if (e.target.getAttribute('data-id') == item.id) {
            $('.preloader').fadeIn(0);
            $(item).fadeIn(500);
            setTimeout(() => {
                $('.preloader').fadeOut(500);
            }, 1000);
        }
    })
    $('.content__wrapper').css('opacity', '0');
});

$('.article__back__bottom').click(async function () {
    await $('.article').fadeOut(500);
    await $('.content__wrapper').removeClass('fixed');
    $('.content__wrapper').css('opacity', '1');
    window.scrollTo(0, scrollPosition);
});

$('.back__to__main__page').click(async function () {
    await $('.article').fadeOut(500);
    await $('.content__wrapper').removeClass('fixed');
    $('.content__wrapper').css('opacity', '1');
    window.scrollTo(0, scrollPosition);
});

$('.close__article').on('click', async () => {
    await $('.article').fadeOut(500);
    await $('.content__wrapper').removeClass('fixed');
    $('.content__wrapper').css('opacity', '1');
    window.scrollTo(0, scrollPosition);
})
