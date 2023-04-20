import { fetchCountries } from "./fetch";
import { createCountryListMarkup, createCoutryMarkup } from "./markup";

import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputName: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countriesInfo: document.querySelector('.country-info'),
}

refs.inputName.addEventListener ('input', debounce(onInputChange), DEBOUNCE_DELAY);

function onInputChange(evt) {
    evt.preventDefault();
    let name = evt.target.value.trim();
    if ( name === '') {
        clearContent();
        return;
    }
    getCountries(name);
}

clearContent();

function getCountries(name) {
    fetchCountries(name.trim()).then(checkData(data)).catch(error => {
        clearInnerHtml();
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
}

function checkData(data) {
    clearContent();
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (data.length > 1 && data.length <= 10) {
        createCountryListMarkup(refs.countriesList, data);
    }
    if (data.length === 1) {
        createCoutryMarkup(refs.countriesInfo, data[0]);
    }
}

function clearContent() {
    refs.countriesInfo.innerHTML = '';
    refs.countriesList.innerHTML = '';
}