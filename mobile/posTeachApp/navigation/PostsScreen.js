import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Colors
import { colors } from '../src/theme';
import HeaderScreens from '../components/HeaderScreens';
import { Divider, List } from 'react-native-paper';
import FilterComponent from '../components/FilterComponent';

export default function PostsScreen() {
  return (
    <View style={styles.screenContainer}>
      <HeaderScreens isLogoVisible={true} isTextVisible={false} HeaderText="Meus Posts" isBackButtonVisible={false} />
      <View style={styles.filterContainer}>
        <FilterComponent
          placeholder="Filtrar por título"
          onChangeText={() => {}}
          value={''}
        />
        <Divider style={styles.filterDivider} />
      </View>
      <List.Section>
        <List.Item
          title="First Item"
          description="Item description"
        />
        <List.Item
          title="Second Item"
          description="Item description"
        />
        <List.Item
          title="Third Item"
          description="Item description"
        />
      </List.Section>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  filterDivider: {
    marginVertical: 16,
  },
});

