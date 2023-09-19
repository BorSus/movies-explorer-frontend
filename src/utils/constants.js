const enviroment = process.env.NODE_ENV;
console.log(enviroment);
const baseUrl =
  enviroment === 'development'
    ? process.env.REACT_APP_LOCALHOST_URL
    : process.env.REACT_APP_SERVER_BACKEND_URL;
console.log(baseUrl);

export const errors = {
  loginBadPassword: 'Вы ввели неправильный логин или пароль.',
  loginNotToken: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  loginBadToken: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  registerConflictEmail: 'Пользователь с таким email уже существует.',
  registerBadResponse: 'При регистрации пользователя произошла ошибка.',
  profileConflictEmail: 'Пользователь с таким email уже существует.',
  profileBadResponse: 'При обновлении профиля произошла ошибка.'
};

export const optionsMainApi = {
  //Адрес сервера
  baseUrl: baseUrl,
  //[Аутентификация]
  urlSignup: '/signup', //Регистрация
  urlSignin: '/signin', //Вход
  urlSignout: '/signout', //Выход
  //[Аккаунт]
  urlUserMe: '/users/me',
  //[Фильмы]
  urlMovies: '/movies'
};

export const testCards = [
  {
    id: 1,
    duration: '2ч34м',
    image: '/testPicCards/picCard.jpg',
    nameRU: 'Криминальное чтиво',
    saved: false
  },
  {
    id: 2,
    duration: '1ч47м',
    image: '/testPicCards/2.png',
    nameRU: 'Карты, деньги, два ствола',
    saved: false
  },
  {
    id: 3,
    duration: '1ч49м',
    image: '/testPicCards/3.jpg',
    nameRU: 'Святые из Бундока',
    saved: false
  },
  {
    id: 4,
    duration: '1ч56м',
    image: '/testPicCards/4.jpg',
    nameRU: 'Цельнометаллическая оболочка',
    saved: false
  },
  {
    id: 5,
    duration: '2ч16м',
    image: '/testPicCards/5.jpg',
    nameRU: 'Заводной апельсин',
    saved: false
  },
  {
    id: 6,
    duration: '2ч02м',
    image: '/testPicCards/6.jpg',
    nameRU: 'Амели',
    saved: true
  },
  {
    id: 7,
    duration: '2ч22м',
    image: '/testPicCards/7.jpg',
    nameRU: 'Побег из Шоушенка',
    saved: true
  },
  {
    id: 8,
    duration: '2ч22м',
    image: '/testPicCards/8.jpg',
    nameRU: 'Форрест Гамп',
    saved: true
  },
  {
    id: 9,
    duration: '1ч50м',
    image: '/testPicCards/9.jpg',
    nameRU: 'Леон',
    saved: false
  },
  {
    id: 10,
    duration: '2ч55м',
    image: '/testPicCards/10.jpg',
    nameRU: 'Крестный отец',
    saved: false
  },
  {
    id: 11,
    duration: '2ч50м',
    image: '/testPicCards/11.jpg',
    nameRU: 'Лицо со шрамом',
    saved: false
  },
  {
    id: 12,
    duration: '1ч40м',
    image: '/testPicCards/12.jpg',
    nameRU: 'Бешеные псы',
    saved: false
  },
  {
    id: 13,
    duration: '1ч46м',
    image: '/testPicCards/13.jpg',
    nameRU: 'Подозрительные лица',
    saved: false
  },
  {
    id: 14,
    duration: '1ч53м',
    image: '/testPicCards/14.jpg',
    nameRU: 'Помни',
    saved: false
  },
  {
    id: 15,
    duration: '2ч19м',
    image: '/testPicCards/15.jpg',
    nameRU: 'Бойцовский клуб',
    saved: false
  },
  {
    id: 16,
    duration: '1ч52м',
    image: '/testPicCards/16.jpg',
    nameRU: '1+1',
    saved: false
  }
];
