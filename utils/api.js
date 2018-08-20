import { AsyncStorage } from 'react-native';

export const FLASHCARD_STORAGE_KEY = 'UdaciQuiz:Flashcards';

export function setDummyData() {

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

export function fetchDeckData() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(res => res === null ? setDummyData() : JSON.parse(res));
}

export function addNewDeck(deck) {
  //console.log('addNewDeck', deck)
  const formattedDeck = {
    [deck.title]: {
      title: deck.title,
      cards: []
    }
  };

  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(formattedDeck));
}

export function addNewCard(deck, card) {
  //console.log(deck, card)
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(res => {
      //console.log('GOT DECKS', res)
      let decks = JSON.parse(res);
      //console.log('PARSED DECKS', decks)
      decks = {
        ...decks,
        [deck]: {
          ...decks[deck],
          cards: [
            ...decks[deck].cards,
            card
          ]
        }
      }
      //console.log(decks)
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function clearStorage() {
  AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
}