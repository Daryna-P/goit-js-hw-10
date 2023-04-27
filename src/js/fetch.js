export function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch (URL)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                return [];
              }
          throw new Error("Can't get data from server!");
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
    };