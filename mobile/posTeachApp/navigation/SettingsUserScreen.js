import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { colors } from '../src/theme';
import userDefault from '../assets/user_default.png';
import { useState, useEffect } from 'react';
import { loadLoginData } from '../helpers/storage';
import { useRoute } from '@react-navigation/native';
import { Divider, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function SettingsUserScreen({ navigation }) {
    const nav = navigation ?? useNavigation();
    const [usersData, setUsersData] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const url = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000/api';

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await loadLoginData();
            setUser(userData);
        };
        loadUserData();
    }, []);
    const fetchUsersData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUsersData(data);
            } else {
                alert(data.message || 'Erro ao carregar usuários');
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!user) return;
        fetchUsersData();
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuários</Text>
            <Divider />
            {loading ? (
                <Text>Carregando usuários...</Text>
            ) : (
                <FlatList
                    data={usersData}
                    keyExtractor={(item) => item.id.toString()}
                    onRefresh={() => {
                        if (!user) return;
                        fetchUsersData();
                        console.log('Users Updated')
                    }}
                    refreshing={loading}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item }) => (
                        <View 
                            key={item.id} 
                            style={styles.userContainer}
                            >
                            <Image source={userDefault} style={styles.userImage} />
                            <View 
                            style={styles.userInfo}
                            onTouchEnd={() => nav.navigate('SettingsUserEditScreen', { userId: item.id })}
                            >
                                <Text style={styles.userName}>{item.username}</Text>
                                <Text style={styles.userEmail}>{item.email}</Text>
                                <Text style={styles.profile_id}>Perfil:
                                    {item.profile_id === 1 ? ' Professor' : ' Aluno'}</Text>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => {
                        return <Text>Nenhum usuário encontrado.</Text>;
                    }}
                />
            )}
            <FAB style={styles.fab} icon="plus"
                onPress={() => nav.navigate('SettingsUserCreateScreen')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,
        color: colors.primary,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 12,
        backgroundColor: colors.lightBackground,
        borderRadius: 8,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    userInfo: {
        flexDirection: 'column',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkLetter,
    },
    userEmail: {
        fontSize: 16,
        color: colors.darkLetter,
    },
    profile_id: {
        fontSize: 12,
        color: colors.darkLetter,
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