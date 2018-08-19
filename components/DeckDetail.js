import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  render() {
    return (
      <Text>Deck Details</Text>
    )
  }
}

export default connect()(DeckDetail);