import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  list: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  let name = event.target.value.trim();
  fetchCountries(name)
    .then(getCountries)
    .catch(error => Notify.failure('Oops, there is no country with that name'));

  refs.countryInfo.innerHTML = '';
  refs.list.innerHTML = '';
}
function getCountries(arrayOfCountries) {
  if (arrayOfCountries.length === 1) {
    return renderCountryCard(arrayOfCountries);
  }
  if (arrayOfCountries.length >= 2 && arrayOfCountries.length <= 10) {
    return renderCountryList(arrayOfCountries);
  }

  if (arrayOfCountries.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function renderCountryList(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class='item'>
    <img src='${flags.svg}' alt'${name}' width= 30px height= 20px>
    <h2 class='country-name'>${name}</h2>
    </li>`;
    })
    .join('');
  refs.list.insertAdjacentHTML('afterbegin', markup);
}

function renderCountryCard(country) {
  const markup = country
    .map(({ flags, name, capital, population, languages }) => {
      return `
      <div>
        <img src="${flags.svg}" alt="${name}" width=250px height=150px>
        <h2>${name}</h2>
        <p><span class='markup-text'>Capital:</span> ${capital}</p>
        <p><span class='markup-text'>Population:</span> ${population}</p>
        <p><span class='markup-text'>Languages:</span> ${languages.map(
          language => language.name
        )}</p>
      </div>`;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('afterbegin', markup);
}
