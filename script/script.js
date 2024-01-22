const cityOpen = document.querySelector('.js-city-open');
const city = document.querySelector('.city');

cityOpen.addEventListener('click', () => {
  city.classList.add('city_open')
});

city.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target.closest('.city__choice');
  if (target) {
    cityOpen.textContent = target.textContent;
    city.classList.remove('city_open');
  }
});


$('.header__burger').on('click', function () {

  $('.navigation').animate({
    left: 0,
  }, 500, function () {
    $('.navigation__close').animate({
      opacity: 1,
    }, 300);
  });
});

$('.navigation__close').on('click', function () {
  $('.navigation__close').animate({
    opacity: 0,
  }, 300, function () {
    $('.navigation').animate({
      left: '-400px',
    }, 500);
  });
});


$('.present__btn').on('click', function () {
  $('.modal-order').show(300);
})

$('.modal-order__close').on('click', function () {
  $('.modal-order').hide(300);
})


$('.header__sign, .header__sign2').click(() => {
  $('.alert').attr("role", "alert");

  $('.alert').addClass('visible');
  setTimeout(() => {
    $('.alert').removeClass('visible');

    $('.alert').removeAttr("role", "alert");

  }, 3000)
})


const characteristicsListElem = document.querySelector('.characteristics__list');
const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

characteristicsItemElems.forEach(elem => {
  if (elem.children[1].classList.contains('active')) {
    elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
  }
})

const open = (button, dropDown) => {
  closeAllDrops(button, dropDown);
  button.ariaExpanded = true;

  dropDown.style.height = `${dropDown.scrollHeight}px`;
  button.classList.add('active');
  dropDown.classList.add('active');
};

const close = (button, dropDown) => {
  button.ariaExpanded = false;
  button.classList.remove('active');
  dropDown.classList.remove('active');
  dropDown.style.height = '';
};

const closeAllDrops = (button, dropDown) => {
  characteristicsItemElems.forEach((elem) => {
    if (elem.children[0] !== button && elem.children[1] !== dropDown) {

      close(elem.children[0], elem.children[1]);
    }
  })
}

characteristicsListElem.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('characteristics__title')) {
    const parent = target.closest('.characteristics__item');
    const description = parent.querySelector('.characteristics__description');
    if (description.classList.contains('active')) {
      close(target, description);
    } else {
      open(target, description);
    }
  }
});

const cookieAlert = document.querySelector(`.alert-cookie`);
const cookieButton = document.querySelector(`.alert-cookie__button`);

cookieButton.addEventListener(`click`, () => {
    cookieAlert.classList.remove(`alert-cookie_no-ready`);
    Cookies.set(`dom-ready-cookie`, `true`, {
        expires: 10,
    });
});

if (!Cookies.get(`dom-ready-cookie`)) {
    cookieAlert.classList.add(`alert-cookie_no-ready`);
}

const modalOrderTitle = document.querySelector(`.modal-order__title`);
const inputTel = document.querySelector(`.modal-order__input_tel`);
const telMask = new Inputmask(`+7 (999)-999-99-99`);

telMask.mask(inputTel);

const justValidate = new JustValidate('.modal-order__form');
justValidate.addField(`.modal-order__input`, [
    {
        rule: `required`,
        errorMessage: `Vashe ima`
    },
])
.addField(`.modal-order__input_email`, [
  {
    rule: `required`,
    errorMessage: `Vashe email`
},
{
  rule: `email`,
  errorMessage: `Vash email ne correct`
},
])
.addField(`.modal-order__input_tel`, [
  {
    rule: `required`,
    errorMessage: `Vashe tel`
},
{
  validator(value) {
    const phone = inputTel.inputmask.unmaskedvalue();
    return !!(Number(phone) && phone.length === 10);
  }
},
])
.onSuccess(event => {
  const target = event.target
  axios.post(`https://jsonplaceholder.typicode.com/posts`, {
  name: target.name.value,
  tel: inputTel.inputmask.unmaskedvalue(),
  email: target.email.value,
  })
  .then(response => {
    target.reset();
    modalOrderTitle.title.textContent = `Spasibo`
  })
  .catch(err => {
    target.reset();
    modalOrderTitle.title.textContent = `${err}`
  })
});

new Swiper('.swiper', {
  sliderPerView: 3,
  loop: true,
  autoplay: {
    delay: 3000
  },

  navigation: {
    nextEl: '.button-right',
    prevEl: '.button-left',
  },
  mousewheel: true,
});

new Swiper('.swiper', {
  sliderPerView: 3,
  loop: true,
  autoplay: {
    delay: 3000
  },

  navigation: {
    nextEl: '.button-right',
    prevEl: '.button-left',
  },
  mousewheel: true,
});

$(`.acc__list`).accordion({
  active: true,
  collapsible: true,
  heightStyle: `content`,
  icons: {
    header: `acc__accord`,
    activeHeader: `acc__accord acc__acord-active`,
  }
});

initMap();

async function initMap() {

    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    const map = new YMap(
        document.getElementById('map_kant'),
        {
            location: {
                center: [37.588144, 55.733842],
                zoom: 10
            }
        }
    );
    // map.controls.remove(`geolocationControl`)    
    map.addChild(new YMapDefaultSchemeLayer());
}
