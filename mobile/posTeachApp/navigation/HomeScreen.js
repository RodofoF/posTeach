import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Divider } from 'react-native-paper';

// Outros
import { colors } from '../src/theme';
import { loadLoginData } from '../helpers/storage';


// Componentes
import ContentCard from '../components/ContentCard';
import HeaderScreens from '../components/HeaderScreens';
import FilterComponent from '../components/FilterComponent';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');


  const url = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await loadLoginData();
      setUser(userData);
    };
    loadUserData();
  }, []);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token || ''}`,
          },

        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data)
          setLoading(false);

        } else {
          alert(data.message || 'Erro ao carregar posts');
          setLoading(false);
        }
      } catch (error) {
        alert('Erro ao conectar ao servidor');
        setLoading(false);
      }
    };
    if (!user) return;
    fetchPosts();
  }, [user]);


  return (
    <View style={styles.screenContainer}>
      <HeaderScreens />
      <View style={styles.contentContainer}>
        <View style={styles.filterContainer}>
          <FilterComponent
            placeholder="Filtrar por título"
            onChangeText={setFilterText}
            value={filterText}
          />
        </View>
        <Divider style={{ marginVertical: 20 }} />

        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={posts.filter(post => post.title.toLowerCase().includes(filterText.toLowerCase()))}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            keyExtractor={(post) => post.id.toString()}
            ItemSeparatorComponent={() => <Divider style={{ marginVertical: 8 }} />}
            renderItem={({ item: post }) => (
              <ContentCard
                style={styles.contentCard}
                title={post.title}
                subtitle={`Publicado em ${new Date(post.createdAt).toLocaleDateString()}`}
                image={post.imageUrl || 'https://picsum.photos/700'}
                info={post.updatedAt ? `Atualizado em ${new Date(post.updatedAt).toLocaleDateString()}` : 'Sem atualizações'}
                onPress={() => navigation.navigate('PostsReadScreen', { postId: post.id })}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>Nenhum post encontrado</Text>
            )}
          />
        )}
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
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 80,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.darkLetter,
    marginTop: 20,
  },
  filterContainer: {
    maxWidth: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
})

