import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK, SET_REVIEWED, DELETE_CARD } from '../actions';

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
        [deck.title]: { ...deck }
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
    case DELETE_DECK: {
      const { deck } = action;
      return Object.values(state)
        .filter(d => d.title !== deck)
        .reduce((acc, d) => ({ ...acc, [d.title]: { ...d } }), {})
    }
    case SET_REVIEWED: {
      const { deck, time } = action;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          lastReviewed: time
        }
      }
    }
    case DELETE_CARD: {
      const { deck, card } = action;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          cards: state[deck].cards.filter((c, i) => i !== card)
        }
      }
    }
    default:
      return state;
  }
}

export default decks;