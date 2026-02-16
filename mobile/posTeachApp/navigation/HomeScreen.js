import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

// Outros
import { colors } from '../src/theme';
import { loadLoginData } from '../helpers/storage';

// Componentes
import ContentCard from '../components/ContentCard';
import HeaderScreens from '../components/HeaderScreens';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
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
        const response = await fetch(`${url}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token || ''}`,
          },
        
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          alert(data.message || 'Erro ao carregar posts');
        }
      } catch (error) {
        alert('Erro ao conectar ao servidor');
      }
    };
    fetchPosts();
  }, [user]);

  return (
    <View style={styles.screenContainer}>
      <HeaderScreens />
      <View style={styles.contentContainer}>
        {posts.map((post) => (
          <ContentCard 
            key={post.id}
            title={post.title} 
            subtitle={`Publicado em ${new Date(post.createdAt).toLocaleDateString()}`}
            image={post.imageUrl || 'https://picsum.photos/700'} 
            info={post.description}
            onPress={() => navigation.navigate('PostsReadScreen', { postId: post.id })}
          />
        ))}
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

