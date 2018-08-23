import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { white, red, purple } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { handleDeleteCard } from '../actions';
import { connect } from 'react-redux';

class CardCard extends Component {
  render() {
    const { card, index, deck, dispatch } = this.props;
    return (
      <View style={[styles.item, { flexDirection: 'row' }]}>
        <View style={{ flex: 3 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: red }}>
              {'Q: '}
            </Text>
            <Text>
              {card.question}
            </Text>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', width: '100%', marginTop: 10, marginBottom: 10 }}/>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: purple }}>
              {'A: '} 
            </Text>
            <Text>
              {card.answer}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: red }]}
            onPress={() => {dispatch(handleDeleteCard(deck, index))}}
          >
            <Ionicons
              name='ios-trash-outline'
              color={white}
              size={22}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  },
  iconContainer: {
    padding: 5,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (decks, { deck, index }) => {
  return {
    card: decks[deck].cards[index]
  }
}

export default connect(mapStateToProps)(CardCard);