import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// Colors
import { colors } from '../src/theme';
import HeaderScreens from '../components/HeaderScreens';
import { Divider, List, FAB } from 'react-native-paper';
import FilterComponent from '../components/FilterComponent';
import { useState, useEffect } from 'react';
import { loadLoginData } from '../helpers/storage';

export default function PostsScreen() {
  const [filterText, setFilterText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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
      <HeaderScreens isLogoVisible={true} isTextVisible={false} HeaderText="Meus Posts" isBackButtonVisible={false} />
      <View style={styles.filterContainer}>
        <FilterComponent
          placeholder="Filtrar por título"
          onChangeText={setFilterText}
          value={filterText}
        />
        <Divider style={styles.filterDivider} />
      </View>
      <List.Section>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={posts.filter(post => post.title.toLowerCase().includes(filterText.toLowerCase()))}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <List.Item style={styles.listItem}
              onPress={() => alert(`Post selecionado: ${item.title}`)}
              title={item.title}
              titleStyle={styles.listItemTitle}
              description={item.description}
              descriptionStyle={styles.listItemDescription}
              />
            )}
            ListEmptyComponent={() => (
              <Text>Nenhum post encontrado</Text>
            )}
            />
          )}
          <Divider />
      </List.Section>
      <FAB style={styles.fab} icon="plus" 
      onPress={() => alert('Adicionar novo post')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  filterDivider: {
    marginVertical: 16,
  },
  listItem: {
    padding: 16,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: colors.lightLetter,
    backgroundColor: colors.success,
  },
});

