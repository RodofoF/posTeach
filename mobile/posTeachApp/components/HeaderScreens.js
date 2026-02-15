
import { StyleSheet, Text, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// Colors
import { colors } from '../src/theme';

// Imagens
import logo from '../assets/posteach_icon_side_bg.png';

export default function HeaderScreens({isLogoVisible = true, isTextVisible = false, HeaderText = '', isBackButtonVisible = false}) {
  const navigation = useNavigation();
  const handleBackAction = () => {
    navigation.goBack();
  };
  
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.sideSlot}>
        {isBackButtonVisible && <Appbar.BackAction iconColor={colors.lightLetter} onPress={handleBackAction} />}
      </View>
      <View style={styles.centerSlot}>
        {isLogoVisible && <Image source={logo} style={{ height: 40, width: 120 }} resizeMode="contain" />}
        {isTextVisible && <Text style={styles.headerText}>{HeaderText}</Text>}
      </View>
      <View style={styles.sideSlot} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    color: colors.lightLetter,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideSlot: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: colors.lightLetter,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
