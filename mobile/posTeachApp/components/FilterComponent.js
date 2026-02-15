import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { colors } from '../src/theme';

export default function FilterComponent({placeholder, onChangeText, value}) {
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={[styles.searchbar]}

    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: colors.light,
  },
});

