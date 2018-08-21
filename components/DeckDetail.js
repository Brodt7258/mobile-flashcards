import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.id
    }
  };
  
  render() {
    const { deck, navigation } = this.props;
    return (
      <View>
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
          onPress={() => console.log('pressed DeleteDeck')}
        />
      </View>
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  //console.log(navigation)
  const id = navigation.state.params.id;
  return {
    deck: decks[id],
  }
}

export default connect(mapStateToProps)(DeckDetail);