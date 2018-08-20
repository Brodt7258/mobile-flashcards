import { fetchDeckData, addNewDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export const handleReceiveDecks = () => (dispatch) => {
  return fetchDeckData()
    .then(decks => dispatch(receiveDecks(decks)));
}

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}



export const handleAddDeck = (deck) => (dispatch) => {
  return addNewDeck(deck)
    .then(() => dispatch(addDeck(deck)))
    //.then(res => console.log('handleAddDeck', res))
}

export function addDeck (deck) {
  console.log('ACTION - addDeck', deck)
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard (deck, card) {
  console.log('ACTION - addCard', deck, card);
  return {
    type: ADD_CARD,
    deck,
    card
  }
}