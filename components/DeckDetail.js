import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };
  
  render() {
    const id = this.props.navigation.state.params.entryId;
    const deck  = Object.values(this.props.decks).find(d => d.title === id); //I couldn't find an easy way to do this in mapStateToProps
    return (
      <View>
        <Text>Deck Details</Text>
        <Text>{id}</Text>
        <Text>Contains {deck.cards.length} cards</Text>
        <Button
          title="Take a Quiz"
          
        />
        <Button
          title="Add a new Card"
          onPress={() => this.props.navigation.navigate('AddCard',  { entryId: id, navTitle: id })}
        />
        <Button
          title="Delete Deck"
          
        />
      </View>
    )
  }
}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default withNavigation(connect(mapStateToProps)(DeckDetail));