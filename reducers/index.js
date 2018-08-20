import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return {
        ...state,
        ...action.decks
      }
    }
    case ADD_DECK: {
      const { deck } = action;
      return {
        ...state,
        [deck.title]: {
          title: deck.title,
          cards: []
        }
      }
    }
    case ADD_CARD: {
      const { deck, card } = action;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          cards: [ ...state[deck].cards, card ]
        }
      }
    }
    default:
      return state;
  }
}

export default decks;