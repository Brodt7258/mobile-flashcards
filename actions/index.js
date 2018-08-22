import { fetchDeckData, addNewDeck, addNewCard, removeDeck } from '../utils/api';
import { getRandomColor } from '../utils/helpers';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';

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



export const handleAddDeck = deck => dispatch => {
  const color = getRandomColor();
  return addNewDeck(deck, color)
    .then(() => dispatch(addDeck(deck, color)))
}

export function addDeck (deck, color) {
  console.log('ACTION - addDeck', deck)
  return {
    type: ADD_DECK,
    deck,
    color
  }
}



export const handleAddCard = (deck, card) => dispatch => {
  return addNewCard(deck, card)
    .then(() => dispatch(addCard(deck, card)));
}

export function addCard (deck, card) {
  console.log('ACTION - addCard', deck, card);
  return {
    type: ADD_CARD,
    deck,
    card
  };
}

export const handleDeleteDeck = deck => dispatch => {
  return removeDeck(deck)
    .then(() => dispatch(deleteDeck(deck)));
}

export function deleteDeck (deck) {
  console.log('ACTION - deleteDeck', deck);
  return {
    type: DELETE_DECK,
    deck
  };
}