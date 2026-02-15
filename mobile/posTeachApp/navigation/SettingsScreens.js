import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, List } from 'react-native-paper';

// Colors
import { colors } from '../src/theme';

// Componentes
import HeaderScreens from '../components/HeaderScreens';

// Imagens
import userDefault from '../assets/user_default.png';
export default function SettingsScreen() {
  return (
    <>
    <HeaderScreens isLogoVisible={false} isTextVisible={true} HeaderText="Configurações" isBackButtonVisible={false} />
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.userInfoContainer}>
        <View>
          <Image source={userDefault} style={styles.userImage} />
        </View>
        <View style={styles.userInfoTextContainer}>
          <Text style={styles.userName}>Fulano de tal</Text>
          <Text style={styles.userEmail}>fulano@email.com</Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 20 }} />
      <List.Section style={styles.optionsContainer}>
        <List.Item
          title="Gerencie usuários"
          left={() => <List.Icon icon="account-group" />}
        />
        <List.Item
          title="Fale com a escola"
          left={() => <List.Icon icon="school" />}
        />
        <List.Item
          title="Reporte uma falha ao desenvolvedor"
          left={() => <List.Icon icon="alert-circle" />}
        />
        <List.Item
          title="Em breve"
          left={() => <List.Icon icon="clock-outline" />}
        />
        <List.Item
          title="Sair"
          left={() => <List.Icon icon="logout" />}
        />
      </List.Section>
      <StatusBar style="auto" />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: colors.background,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoTextContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  optionsContainer: {
    marginTop: 20,
  },

});

