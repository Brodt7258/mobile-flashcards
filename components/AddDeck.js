import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { handleAddDeck } from '../actions';

class AddDeck extends Component {
  
  state = {
    title: ''
  }

  handleTextChange = (title) => {
    this.setState({ title });
  }

  handleSubmit = () => {
    const { dispatch, navigation } = this.props;
    
    dispatch(handleAddDeck(this.state));
    this.setState({ title: '' });

    navigation.navigate('DeckList');

  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text>What should your new deck be called?</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Deck Title"
          value={this.state.title}
          onChangeText={this.handleTextChange}
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks: decks
      ? Object.keys(decks)
      : []
  }
}

export default connect(mapStateToProps)(AddDeck);