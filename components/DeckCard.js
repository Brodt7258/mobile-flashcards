import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class DeckCard extends Component {
  
  render() {

    const { title, cards } = this.props;
    console.log(title);

    return (
      <View>
        <Text>{title}</Text>
        <Text>{cards.length} cards</Text>
      </View>
    );
  }
}