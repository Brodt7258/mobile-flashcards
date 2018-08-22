import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { red, orange, blue, lightPurp, pink, green } from './colors';

export const FLASHCARD_NOTIFICATION_KEY = 'UdaciQuiz:Notifications';

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

export const getRandomColor = () => {
  const color = Math.floor(Math.random() * 6);
  switch (color) {
    case 0:
      return red;
    case 1:
      return orange;
    case 2:
      return blue;
    case 3:
      return lightPurp;
    case 4:
      return pink;
    case 5:
      return green;
  }
}