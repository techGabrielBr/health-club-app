import StackRoutes from './src/routes/stackRoutes';
import Toast from 'react-native-toast-message';

import * as Notifications from 'expo-notifications';

import { useEffect } from 'react';

import { StatusBar } from 'react-native';

import DatabaseInit from './src/database/dbInit';
import { UserProvider } from './src/context/userContext';

/**
 * Config Notification Feature 
*/
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    sendLocalNotification('Hidrate-se', 'Não esqueça de tomar seu copo de água', 3600);
    sendLocalNotification('Movimente-se', 'Faça uma pequena pausa e realize um exercício', 5393);

    new DatabaseInit()
    console.log("initialize database");
  }, []);

  return (
    <>
      <UserProvider>
        <StatusBar style="light" />
        <StackRoutes></StackRoutes>
        <Toast></Toast>
      </UserProvider>
    </>
  );
}

/**
 * Send Local Notifications function
 *
 * @param {string} title
 * @param {string} body
 * @param {number} delay
 */
async function sendLocalNotification(title, body, delay) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body
    },
    trigger: {
      seconds: delay,
      repeats: true
    },
  });
}
