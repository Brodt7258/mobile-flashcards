import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { handleDeleteDeck } from '../actions';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.id
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
          ? <View>
              <Text>Deck Details</Text>
              <Text>{deck.title}</Text>
              <Text>Contains {deck.cards.length} cards</Text>
              <Button
                title="Take a Quiz"
                onPress={() => navigation.navigate('QuizView',  { key: deck.title })}
              />
              <Button
                title="Add a new Card"
                onPress={() => navigation.navigate('AddCard',  { key: deck.title })}
              />
              <Button
                title="Delete Deck"
                onPress={this.confirmDelete}
              />
            </View>
          : <Text>No deck</Text>
        }
      </View>
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const id = navigation.state.params.id;
  return {
    deck: decks[id],
  }
}

export default connect(mapStateToProps)(DeckDetail);