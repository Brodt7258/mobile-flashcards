import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };
  
  render() {
    return (
      <Text>Deck Details</Text>
    )
  }
}

export default connect()(DeckDetail);