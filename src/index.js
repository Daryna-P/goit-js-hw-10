import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountries } from "./js/fetch";

import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


refs.inputName.addEventListener ('input', debounce(onInputChange), DEBOUNCE_DELAY);

function onInputChange(evt) {
    evt.preventDefault();
    const name = refs.inputName.value.trim();
    clearContent();
    if (name !== '') {
        fetchCountries(name).then(data => {
            if (data.length >10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (data.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (data.length === 1) {
                createCoutryMarkup(data);
            } else if (data.length >= 2 && data.length <=10) {
                createCountryListMarkup(data);
            }
        })
    }
}

function clearContent() {
    refs.countriesInfo.innerHTML = '';
    refs.countriesList.innerHTML = '';
}
function createCountryListMarkup(countries) {
    const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  refs.countriesList.innerHTML = markup;
}

function createCoutryMarkup(countries) {
    const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
         <b>${country.name.official}</b>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>
                </li>`;
        })
        .join('');
      refs.countriesList.innerHTML = markup;
}