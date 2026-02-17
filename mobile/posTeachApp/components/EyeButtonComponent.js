import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function EyeButtonComponent({ onPress, visible }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.eyeButton}>
      <MaterialCommunityIcons name={visible ? 'eye-off' : 'eye'} size={24} color="gray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
  },
});

