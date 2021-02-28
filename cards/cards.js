const API_BASE_URL = 'https://deckofcardsapi.com/api';
let DECK_ID;
const $button = $('button');
const $cardPile = $('#card-pile');

$button.on('click', (evt) => {
  console.log('hit me');
  const card_url = `${API_BASE_URL}/deck/${DECK_ID}/draw/?count=1`;

  axios
    .get(card_url)
    .then((resp) => {
      const card = resp.data.cards[0];
      const { remaining } = resp.data;
      const $cardImg = $(
        `<img class="card" src="${card.image}" alt="${card.value} of ${card.suit}" />`
      );

      const angle = getRandBetweenNegPos();
      $cardImg.css('transform', `rotate(${angle}deg)`);
      $cardPile.append($cardImg);

      remaining === 0 && $button.hide();
    })
    .catch((err) => {
      console.log(err);
    });
});

const getShuffledDeck = () => {
  const url = `${API_BASE_URL}/deck/new/shuffle/?deck_count=1`;
  return axios.get(url);
};

const setDeck = () => {
  getShuffledDeck()
    .then((resp) => {
      DECK_ID = resp.data.deck_id;
    })
    .catch((err) => {
      console.log(err);
    });
};

$(() => {
  setDeck();
});

// Part2: Step1
const getSingleCard = () => {
  getShuffledDeck()
    .then((resp) => {
      // get single card from deck promise
      const deck_id = resp.data.deck_id;

      const card_url = `${API_BASE_URL}/deck/${deck_id}/draw/?count=1`;
      return axios.get(card_url);
    })
    .then((resp) => {
      // show card
      const card = resp.data.cards[0];
      console.log(`${card.value} of ${card.suit}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Part2: Step2
const getTwoCards = () => {
  let firstCard = null;
  getShuffledDeck()
    .then((resp) => {
      // get single card from deck promise
      const deck_id = resp.data.deck_id;

      const card_url = `${API_BASE_URL}/deck/${deck_id}/draw/?count=1`;
      return axios.get(card_url).then((resp) => {
        firstCard = resp.data.cards[0];
        return axios.get(`${API_BASE_URL}/deck/${deck_id}/draw/?count=1`);
      });
    })
    .then((resp) => {
      // show card
      console.log(resp);
      secondCard = resp.data.cards[0];
      console.log(`${firstCard.value} of ${firstCard.suit}`);
      console.log(`${secondCard.value} of ${secondCard.suit}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getRandBetweenNegPos = () => {
  const maxAngleDegOffset = 100;
  // source: https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
  return (
    Math.ceil(Math.random() * (maxAngleDegOffset + 1)) *
    (Math.round(Math.random()) ? 1 : -1)
  );
};
