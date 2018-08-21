import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    const { decks, dispatch, navigation } = this.props;
    const { title } = this.state;
    
    if (decks.includes(title.toLocaleLowerCase())) {
      Alert.alert(
        'Duplicate Name',
        `You already have a deck called "${title}", please choose something else.`,
        [
          {text: 'Ok'},
        ]
      )
    } else {
      dispatch(handleAddDeck(this.state));
      this.setState({ title: '' });
      navigation.navigate('DeckList');
    }
  }

  render() {
    const { title } = this.state;
    return (
      <View style={{padding: 10}}>
        <Text>What should your new deck be called?</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Deck Title"
          value={title}
          onChangeText={this.handleTextChange}
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
          disabled={!title.length}
        />
      </View>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks: decks
      ? Object.keys(decks).map(d => d.toLocaleLowerCase())
      : []
  }
}

export default connect(mapStateToProps)(AddDeck);