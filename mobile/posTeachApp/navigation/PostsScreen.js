import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// Colors
import { colors } from '../src/theme';
import HeaderScreens from '../components/HeaderScreens';
import { Divider, List, FAB } from 'react-native-paper';
import FilterComponent from '../components/FilterComponent';
import { useState, useEffect } from 'react';
import { loadLoginData } from '../helpers/storage';
import { useNavigation } from '@react-navigation/native';

export default function PostsScreen({ navigation }) {
  const nav = navigation ?? useNavigation();
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
        const sortedData = data.sort((a, b) =>
          new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        const currentUserId = user?.user?.id;
        const onlyMine = sortedData.filter(post => post.user_id === currentUserId);
        setPosts(onlyMine);
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
  useEffect(() => {
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
      <View style={{ flex: 1 }}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={posts.filter(post => post.title.toLowerCase().includes(filterText.toLowerCase()))}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            style={{ flex: 1 }}
            onRefresh={() => {
              if (!user) return;
              else {
                fetchPosts()
                console.log('Posts atualizados');
              }
            }}
            refreshing={loading}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <List.Item style={styles.listItem}
                onPress={() => nav.navigate('PostsEditScreen', { postId: item.id })}
                title={item.title}
                titleNumberOfLines={1}
                titleStyle={styles.listItemTitle}
                description={item.description}
                descriptionNumberOfLines={2}
                descriptionStyle={styles.listItemDescription}
              />
            )}
            ListEmptyComponent={() => (
              <Text>Nenhum post encontrado</Text>
            )}
          />
        )}
        <Divider />
      </View>
      <FAB style={styles.fab} icon="plus"
        onPress={() => nav.navigate('PostsCreateScreen')} />
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

