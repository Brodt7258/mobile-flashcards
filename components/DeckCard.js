import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { white, black } from '../utils/colors';

class DeckCard extends Component {


  render() {

    const { title, cards, color } = this.props;

    return (
      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('DeckDetail',  { id: title })}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={[styles.iconContainer, { backgroundColor: color ? color : black }]}>
            <MaterialCommunityIcons
              name='cards-outline'
              color={white}
              size={35}
            />
          </View>
          <View>
            <Text style={{ fontSize: 22 }}>
              {title}
            </Text>
            <Text>{cards.length} cards</Text>
          </View>
        </View>
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
  },
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  }
});

export default withNavigation(DeckCard);