import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { saveLoginData, loadLoginData } from '../helpers/storage';
import { useNavigation } from '@react-navigation/native';


// Components
import ButtonConfirm from '../components/ButtonConfirm';

// Images
import logo from '../assets/posteach_icon_side_bg.png';

// Outros
import { colors } from '../src/theme';


export default function LoginScreen({ navigation }) {

  const nav = navigation ?? useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';


  const handleLogin = async () => {
    console.log('Tentando logar com:', { url, email, password });
    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await saveLoginData(data);
        alert(`${`Bem vindo ${data.user.username}, esse app está em desenvolvimento, então algumas funcionalidades podem não estar disponíveis ou apresentarem erros. `}`);
        nav.replace('MainApp');
      } else {
        alert(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.screenContainer}>
          <View style={styles.loginCard}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                label="Email"
                value={email}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                label="Senha"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <ButtonConfirm title="Entrar" onPress={handleLogin} />
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 100,
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 20,
    borderBlockColor: 'black',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  textInputView: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
