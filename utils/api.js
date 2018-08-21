import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'

export const FLASHCARD_STORAGE_KEY = 'UdaciQuiz:Flashcards';
export const FLASHCARD_NOTIFICATION_KEY = 'UdaciQuiz:Notifications';

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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASHCARD_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification () {
  return {
    title: 'Get some practice!',
    body: "Don't forget to quiz yourself today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(FLASHCARD_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(FLASHCARD_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}