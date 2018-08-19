import { fetchDeckData } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';

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

export function addDeck (deck) {
  console.log('ACTION', deck)
  return {
    type: ADD_DECK,
    deck
  }
}