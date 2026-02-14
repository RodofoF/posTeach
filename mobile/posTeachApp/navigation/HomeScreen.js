import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
// Colors
import { colors } from '../src/theme';

// Imagens
import logo from '../assets/posteach_icon_side_bg.png';

// Componentes
import ContentCard from '../components/ContentCard';

export default function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Appbar.Header style={styles.header}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image source={logo} style={{ height: 40, width: 120 }} resizeMode="contain" />
        </View>
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <ContentCard title="Meu primeiro post" subtitle="Clique para ver mais" image="https://picsum.photos/700" info="Publicado em 20 de setembro de 2024"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    color: colors.lightLetter,
    width: '100%',
  },
  headerTitle: {
    color: colors.lightLetter,
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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

