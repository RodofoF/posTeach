import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../src/theme";
import { useState, useEffect } from 'react';
import { loadLoginData } from '../helpers/storage';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

export default function SettingsUserCreateScreen() {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileId, setProfileId] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [errors, setErrors] = useState({ username: '', email: '', password: '', profileId: '', userDescription: '' });

    const url = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await loadLoginData();
            setUser(userData);
        };
        loadUserData();
    }, []);

    const handleCreateUser = async () => {
        if (!username) {
            setErrors(prevErrors => ({ ...prevErrors, username: 'Por favor, preencha o nome de usuário' }));
            return;
        }
        if (!email) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Por favor, preencha o email' }));
            return;
        }
        if (!profileId) {
            setErrors(prevErrors => ({ ...prevErrors, profileId: 'Por favor, preencha o ID do perfil' }));
            return;
        }
        if (!userDescription) {
            setErrors(prevErrors => ({ ...prevErrors, userDescription: 'Por favor, preencha a descrição do usuário' }));
            return;
        }
        try {
            const response = await fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`,
                },
                body: JSON.stringify(
                    {
                        username,
                        email,
                        password,
                        profileId,
                        userDescription,
                        profile_id: profileId,
                    }),
            });
            console.log({ username, email, password, profileId, userDescription })
            const data = await response.json();
            if (response.ok) {
                alert('Usuário criado com sucesso!');
                navigation.goBack({ refresh: true });
            } else {
                alert(data.message + response.status || 'Erro ao criar usuário');
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor');
        }
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={profileId}
                    onValueChange={(value) => {
                        setProfileId(value);
                        setErrors(prev => ({ ...prev, profileId: '' }));
                    }}
                >
                    <Picker.Item label="Selecione um perfil" value="" />
                    <Picker.Item label="1 - Professor" value="1" />
                    <Picker.Item label="2 - Aluno" value="2" />
                </Picker>
            </View>
            {errors.profileId && <Text style={styles.errorText}>{errors.profileId}</Text>}
            <TextInput
                label="Nome de Usuário"
                mode="outlined"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.input}
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
                label="Descrição"
                mode="outlined"
                value={userDescription}
                onChangeText={setUserDescription}
                style={styles.inputDescription}
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
                multiline
            />
            {errors.userDescription && <Text style={styles.errorText}>{errors.userDescription}</Text>}
            <TextInput
                label="Senha"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                autoCapitalize="none"
                outlineColor={colors.darkLetter}
                activeOutlineColor={colors.primary}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <Text style={{ color: colors.darkLetter, fontSize: 14, marginTop: 4 }}>
                A feature de imagem será adicionada nas próximas atualizações, permitindo que você customize sua imagem de perfil.
            </Text>

            <Button mode="contained" onPress={handleCreateUser} style={styles.button}>
                Criar Usuário
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
    inputDescription: {
        width: '100%',
        marginBottom: 16,
        height: 100,
        backgroundColor: colors.lightLetter,
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
    pickerWrapper: {
        width: '100%',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.darkLetter,
        borderRadius: 4,
        backgroundColor: colors.lightLetter,
    }
});