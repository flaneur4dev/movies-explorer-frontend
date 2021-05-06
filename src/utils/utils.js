export const portfolio = [
  {
    title: 'Статичный сайт',
    link: 'https://flaneur4dev.github.io/how-to-learn/index.html'
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://flaneur4dev.github.io/russian-travel/index.html'
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://flaneur4dev.github.io/mesto'
  }
]

export const origin = {
  header: {
    '/': true,
    '/movies': true,
    '/saved-movies': true,
    '/profile': true
  },
  movies: {
    '/movies': true,
    '/saved-movies': true
  }
}

const errorMessage = {
  '^[а-яёЁА-Я\\w,.-]+(\\s[а-яёЁА-Я\\w,.-]+)*': 'Введите текст, содержащий буквенные символы',
  '^https?:\\/\\/(www\\.)?.+\\..+$': 'Введите корректный URL',
  '^[\\w.-]{2,}@([\\w-]{2,}\\.)+[\\w-]{2,}': 'Введите корректный email (например, example@pochta.com)',
  '^\\w{8,16}': 'Введите цифры или латинские буквы (8-16 символов)'
}

export function setCustomErrorMessages(input) {
  input.setCustomValidity('');
  if (input.validity.patternMismatch) input.setCustomValidity(errorMessage[input.pattern])
}

export function minsToHours(duration = 0) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours ? `${hours}ч` : ''}${minutes ? ` ${minutes}м` : ''}`
}
