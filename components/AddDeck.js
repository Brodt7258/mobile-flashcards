import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class AddDeck extends Component {
  
  render() {
    return (
      <View style={{padding: 10}}>
        <Text>Add Deck</Text>
        <TextInput
          style={{height: 40}}
          placeholder="What are these cards about?"
        />
        <Button
          title="Submit"
          onPress={() => console.log("deck added")}
        />
      </View>
    );
  }
}