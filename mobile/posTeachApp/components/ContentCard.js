import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';



const ContentCard = ({ title, subtitle, image, info }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: image }} />
    <Text style={styles.cardInfo}>{info}</Text>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 1,
    paddingBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: -10,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardInfo: {
    padding: 10,
    color: '#888',
    textAlign: 'right',
  },
});
export default ContentCard;