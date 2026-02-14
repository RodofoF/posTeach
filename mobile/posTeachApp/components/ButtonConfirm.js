import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../src/theme';

export default function ButtonConfirm({ onPress, title }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});