import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { handleDeleteDeck } from '../actions';
import { purple, red, green, white, black } from '../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDateString, getTimeColor } from '../utils/helpers';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Details for ${navigation.state.params.id}`
    }
  };

  confirmDelete = () => {
    const { deck, navigation, dispatch } = this.props;
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${deck.title}"? This cannot be undone.`,
      [
        {text: 'Maybe not', onPress: () => {}, style: 'cancel'},
        {text: "Yes, I'm sure", onPress: () => {
          navigation.goBack();
          dispatch(handleDeleteDeck(deck.title));
        }},
      ]
    )
  }
  
  render() {
    const { navigation, deck } = this.props;
    return (
      <View>
        { 
          deck
          ? <View style={styles.container}>
              <View style={{ flexDirection: 'row', margin: 20 }}>
                <View style={[styles.iconContainer, { backgroundColor: deck.color ? deck.color : black }]}>
                  <MaterialCommunityIcons
                    name='cards-outline'
                    color={white}
                    size={35}
                  />
                </View>
                <View>
                  <Text style={styles.deckContents}>
                    Contains {deck.cards.length} cards
                  </Text>
                  <Text>
                    Created: {getDateString(deck.createdAt)}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>
                      Reviewed:
                    </Text>
                    <Text style={{ color: getTimeColor(deck.lastReviewed) }}>
                      {` ${getDateString(deck.lastReviewed)}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.button}>
                <Button
                  title="Take a Quiz"
                  onPress={() => navigation.navigate('QuizView',  { key: deck.title })}
                  color={green}
                  disabled={!deck.cards.length}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Add a new Card"
                  onPress={() => navigation.navigate('AddCard',  { key: deck.title })}
                  color={purple}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Delete Deck"
                  onPress={this.confirmDelete}
                  color={red}
                />
              </View>
            </View>
          : <Text>No deck found. This is probably an error</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  button: {
    width: 250,
    margin: 15
  },
  deckContents: {
    fontSize: 18
  },
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 6
  }
});

const mapStateToProps = (decks, { navigation }) => {
  const id = navigation.state.params.id;
  return {
    deck: decks[id]
      ? decks[id]
      : null
  }
}

export default connect(mapStateToProps)(DeckDetail);