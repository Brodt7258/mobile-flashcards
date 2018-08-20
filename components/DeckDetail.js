import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };
  
  render() {
    const { deck } = this.props;
    return (
      <View>
        <Text>Deck Details</Text>
        <Text>{deck.title}</Text>
        <Text>Contains {deck.cards.length} cards</Text>
        <Button
          title="Take a Quiz"
          onPress={() => console.log('pressed TakeQuiz')}
        />
        <Button
          title="Add a new Card"
          onPress={() => this.props.navigation.navigate('AddCard',  { entryId: deck.title, navTitle: deck.title })}
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
  console.log(navigation)
  const id = navigation.state.params.entryId;
  return {
    deck: decks[id],
  }
}

export default connect(mapStateToProps)(DeckDetail);