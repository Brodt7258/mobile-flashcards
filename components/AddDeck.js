import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class AddDeck extends Component {
  
  state = {
    title: ''
  }

  handleTextChange = (title) => {
    this.setState({ title });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    console.log('submitted');
    console.log(this.state);
    dispatch(addDeck({ title: 'test' }));
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

export default connect()(AddDeck);