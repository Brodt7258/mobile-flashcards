import { AsyncStorage } from 'react-native';

export const FLASHCARD_STORAGE_KEY = 'UdaciQuiz:Flashcards';

export function setDummyData () {

  let dummyData = {
    Deck1: {
      title: 'Deck1',
      createdAt: 1,
      cards: [
        { question: 'lorem ipsum1', answer: '42' },
        { question: 'lorem ipsum2', answer: '43' },
        { question: 'lorem ipsum3', answer: '44' },
        { question: 'lorem ipsum4', answer: '45' },
        { question: 'lorem ipsum5', answer: '46' }
      ]
    },
  };

  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(dummyData));
  console.log('dummy data', dummyData);
  return dummyData;
}

export function fetchDeckData () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(res => res === null ? setDummyData() : JSON.parse(res));
}

export function addNewDeck (deck) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck));
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