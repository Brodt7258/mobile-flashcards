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

  //AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}

export function fetchDeckData() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(results => console.log('API', JSON.parse(results)));
}