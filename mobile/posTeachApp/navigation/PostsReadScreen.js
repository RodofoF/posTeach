import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../src/theme';
import userDefault from '../assets/user_default.png';
import { useState, useEffect } from 'react';
import { loadLoginData } from '../helpers/storage';
import { useRoute } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



export default function PostsReadScreen({ navigation }) {
    const nav = navigation ?? useNavigation();
    const route = useRoute();
    const postId = route.params?.postId;
    const [postData, setPostData] = useState(null);
    const [user, setUser] = useState(null);

    const id = 1;
    const url = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await loadLoginData();
            setUser(userData);
        };
        loadUserData();
    }, []);


    const fetchPostData = async (postId) => {
        try {
            const response = await fetch(`${url}/posts/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setPostData(data);
            } else {
                alert(data.message || 'Erro ao carregar post');
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor');
        }
    }
    useEffect(() => {
        if (user) {
            fetchPostData(postId);
        }
    }, [user, postId]);

    if (!postData) {
        return <Text>Carregando...</Text>;
    }
    return (
        <View style={styles.screenContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{postData.title}</Text>
                <Text style={styles.subtitle}>{postData.subtitle}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.postContent}>
                    {postData.content}
                </Text>
            </View>
            <View style={styles.creatorContainer}>
                <View style={styles.userImage}>
                    <Image source={userDefault} style={styles.userImage} />
                </View>
                <View>
                    <Text style={styles.creatorName}>{postData.user.username}</Text>
                    <Text style={styles.postDate}>Publicado em {new Date(postData.createdAt).toLocaleDateString()}</Text>
                </View>
            </View>
            {postData.user_id === user?.user?.id && (
            <FAB style={styles.fab} icon="pencil"
                onPress={() => nav.navigate('PostsEditScreen', { postId })} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    titleContainer: {
        padding: 16,
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.lightLetter,
    },
    subtitle: {
        fontSize: 16,
        color: colors.lightLetter,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    postContent: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.darkLetter,
    },
    creatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.lightLetter,
    },
    creatorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.darkLetter,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    postDate: {
        fontSize: 14,
        color: colors.darkLetter,
    },
    fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 80,
    right: 0,
    bottom: 0,
    color: colors.lightLetter,
    backgroundColor: colors.success,
  },
});
