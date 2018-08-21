import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { clearStorage, } from '../utils/api';
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { AppLoading } from 'expo';

class DeckList extends Component {

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text>DeckList</Text>
        <TouchableOpacity onPress={clearStorage}>
          <Text>Clear Data</Text>
        </TouchableOpacity>
        { 
          decks.length > 0
          ? <FlatList 
              data={decks}
              renderItem={({item}) => <DeckCard title={item.title} cards={item.cards} />}
              keyExtractor={(item) => item.title.toString()}
            />
          : <View>
              <Text>No Decks yet</Text>
              <Text>Create one to get started!</Text>
              <Button 
                title="Create Deck"
                onPress={() => navigation.navigate('AddDeck')}
              />
            </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks: decks
      ? Object.values(decks)
      : []
  }
}

export default connect(mapStateToProps)(DeckList);