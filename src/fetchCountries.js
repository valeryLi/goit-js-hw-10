const URL = 'https://restcountries.com/';
const FILTERED_FIELDS = 'fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(
    `${URL}v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.status === 404) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
