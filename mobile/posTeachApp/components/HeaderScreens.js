
import { StyleSheet, Text, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
// Colors
import { colors } from '../src/theme';

// Imagens
import logo from '../assets/posteach_icon_side_bg.png';
export default function HeaderScreens() {
  return (
    <Appbar.Header style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={logo} style={{ height: 40, width: 120 }} resizeMode="contain" />
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    color: colors.lightLetter,
    width: '100%',
  },
});
