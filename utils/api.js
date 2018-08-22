import { AsyncStorage } from 'react-native';
import { setDummyData } from './helpers';

export const FLASHCARD_STORAGE_KEY = 'UdaciQuiz:Flashcards';

export function fetchDeckData () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(res => res === null ? setDummyData() : JSON.parse(res));
}

export function addNewDeck (deck) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({ [deck.title]: { ...deck } }));
}

export function addNewCard (deck, card) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(res => {
      let decks = JSON.parse(res);
      decks = {
        ...decks,
        [deck]: {
          ...decks[deck],
          cards: [
            ...decks[deck].cards,
            card
          ]
        }
      };
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function clearStorage () {
  AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
}

export function removeDeck (deck) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(res => {
      let decks = JSON.parse(res);
      delete decks[deck];
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
    })
}