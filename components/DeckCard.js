import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { white } from '../utils/colors';
import { withNavigation } from 'react-navigation';

class DeckCard extends Component {
  
  render() {

    const { title, cards } = this.props;
    //console.log(title);

    return (
      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('DeckDetail',  { id: title })}>
        <Text>{title}</Text>
        <Text>{cards ? cards.length : 0} cards</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

export default withNavigation(DeckCard);