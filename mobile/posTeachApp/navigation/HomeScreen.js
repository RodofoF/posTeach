import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Colors
import { colors } from '../src/theme';

// Componentes
import ContentCard from '../components/ContentCard';
import HeaderScreens from '../components/HeaderScreens';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <HeaderScreens />
      <View style={styles.contentContainer}>
        <ContentCard 
          title="Meu primeiro post" 
          subtitle="Clique para ver mais" 
          image="https://picsum.photos/700" 
          info="Publicado em 20 de setembro de 2024"
          onPress={() => navigation.navigate('PostsReadScreen', { postId: 1 })}
        />
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

