import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { handleDeleteDeck } from '../actions';
import { purple, red, green } from '../utils/colors';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Deck Details for ${navigation.state.params.id}`
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
    const { deck, navigation } = this.props;
    return (
      <View>
        {
          deck
          ? <View style={styles.container}>
              <Text style={styles.deckContents}>
                Contains {deck.cards.length} cards
              </Text>
              <View style={styles.button}>
                <Button
                  title="Take a Quiz"
                  onPress={() => navigation.navigate('QuizView',  { key: deck.title })}
                  color={green}
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
          : <Text>No deck. This is probably an error</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center'
  },
  button: {
    width: 250,
    margin: 15
  },
  deckContents: {
    fontSize: 18
  }
});

const mapStateToProps = (decks, { navigation }) => {
  const id = navigation.state.params.id;
  return {
    deck: decks[id],
  }
}

export default connect(mapStateToProps)(DeckDetail);