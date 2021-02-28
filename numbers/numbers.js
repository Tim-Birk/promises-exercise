const API_BASE_URL = 'http://numbersapi.com';

const getFavoriteNumberInfo = (number) => {
  const url = `${API_BASE_URL}/${number}?json`;
  return axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMultipleNumbersInfo = (numbers) => {
  const url = `${API_BASE_URL}/${numbers}?json`;
  return axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayFavoriteNumberFacts = (number) => {
  $('#favorite-number-facts').empty();
  const numberPromises = [];
  for (let i = 0; i < 4; i++) {
    numberPromises.push(axios.get(`${API_BASE_URL}/${number}?json`));
  }
  Promise.all(numberPromises).then((facts) => {
    for (fact of facts) {
      $('#favorite-number-facts').append($(`<li>${fact.data.text}</li>`));
    }
  });
};
