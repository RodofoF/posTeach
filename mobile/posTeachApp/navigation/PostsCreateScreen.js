import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../src/theme";
import { useState, useEffect } from 'react';
import { loadLoginData } from '../helpers/storage';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from "react-native-paper";

export default function PostsCreateScreen() {

    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({ title: '', subtitle: '', content: '' });

    const url = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await loadLoginData();
            setUser(userData);
        };
        loadUserData();
    }, []);

    const handleCreatePost = async () => {
        if (!title) {
            setErrors(prevErrors => ({ ...prevErrors, title: 'Por favor, preencha o título do post' }));
            return;
        }
        if (!subtitle) {
            setErrors(prevErrors => ({ ...prevErrors, subtitle: 'Por favor, preencha o subtítulo do post' }));
            return;
        }
        if (!content) {
            setErrors(prevErrors => ({ ...prevErrors, content: 'Por favor, preencha o conteúdo do post' }));
            return;
        }
        try {
            const response = await fetch(`${url}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`,
                },
                body: JSON.stringify(
                    {
                        title,
                        subtitle,
                        content,
                        user_id: user?.user?.id || null,
                    }),
            });
            console.log({ title, subtitle, content, user_id: user?.user?.id || null })
            const data = await response.json();
            if (response.ok) {
                alert('Post criado com sucesso!');
                navigation.goBack();
            } else {
                alert(data.message + response.status || 'Erro ao criar post');
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor');
        }
    };

    return (
        <View style={styles.screenContainer}>
            <TextInput
                label="Título"
                mode="outlined"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            <TextInput
                label="Subtítulo"
                mode="outlined"
                value={subtitle}
                onChangeText={setSubtitle}
                style={styles.input}
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
            />
            {errors.subtitle && <Text style={styles.errorText}>{errors.subtitle}</Text>}
            <TextInput
                label="Conteúdo"
                mode="outlined"
                value={content}
                onChangeText={setContent}
                style={styles.inputContent}
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
                multiline
            />
            {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
            <Text style={{ color: colors.darkLetter, fontSize: 14, marginTop: 4 }}>
                A feature de imagem será adicionada nas próximas atualizações, permitindo que você customize a capa do seu post.
            </Text>

            <Button mode="contained" onPress={handleCreatePost} style={styles.button}>
                Criar Post
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: colors.primary,
    },
    placeholderImage: {
        width: 150,
        height: 150,
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: colors.darkLetter,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: colors.lightLetter,
    },
    inputContent: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: colors.lightLetter,
        height: 150,
        textAlignVertical: 'top',
    },
    button: {
        width: '100%',
        backgroundColor: colors.primary,
        color: colors.lightLetter,
        borderRadius: 8,
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});