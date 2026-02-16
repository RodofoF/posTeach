import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

async function saveLoginData(data) {
  // 1) token (seguro)
  await SecureStore.setItemAsync('token', data.token);

  // 2) user (simples)
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  await AsyncStorage.setItem('message', data.message);

  // 3) mensagem (se quiser)
  await AsyncStorage.setItem('loginMessage', data.message);
}

async function loadLoginData() {
  const token = await SecureStore.getItemAsync('token');
  const userRaw = await AsyncStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;
  const message = await AsyncStorage.getItem('message');

  return { token, user, message };
}

export { saveLoginData, loadLoginData };