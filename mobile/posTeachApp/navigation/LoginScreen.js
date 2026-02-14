import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScrollView, KeyboardAvoidingView } from 'react-native';


// Components
import ButtonConfirm from '../components/ButtonConfirm';

// Images
import logo from '../assets/posteach_icon_side_bg.png';

// Colors
import { colors } from '../src/theme';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de login aqui
    alert('Entrar' + email + ' - ' + password);
    navigation.replace('MainApp');
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
