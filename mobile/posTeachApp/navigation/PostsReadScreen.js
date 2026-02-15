import { StyleSheet, Text, View, Image } from 'react-native';
// Colors
import { colors } from '../src/theme';
//images
import userDefault from '../assets/user_default.png';


export default function PostsReadScreen() {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Meu primeiro post</Text>
                <Text style={styles.subtitle}>Esse Post fala sobre o latim</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.postContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur commodo.
                    Curabitur ac ligula a metus efficitur tincidunt. Sed at felis nec nisl convallis fermentum.
                    Proin in odio a enim efficitur bibendum. Nulla facilisi.
                    Donec ut velit id justo efficitur varius.
                    Suspendisse potenti.
                </Text>
            </View>
            <View style={styles.creatorContainer}>
                <View style={styles.userImage}>
                    <Image source={userDefault} style={styles.userImage} />
                </View>
                <View>
                    <Text style={styles.creatorName}>Rodolfo Ferreira</Text>
                    <Text style={styles.postDate}>Publicado em 20 de setembro de 2024</Text>
                </View>
            </View>
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
});
