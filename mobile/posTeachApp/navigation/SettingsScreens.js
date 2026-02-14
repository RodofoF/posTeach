import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Colors
import { colors } from '../src/theme';

export default function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Isso é minha tela de configurações</Text>
      <StatusBar style="auto" />
    </View>
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

