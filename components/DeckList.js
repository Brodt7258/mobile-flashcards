import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, FlatList, Button } from 'react-native';
import { clearStorage, FLASHCARD_STORAGE_KEY } from '../utils/api';
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { AppLoading } from 'expo';

class DeckList extends Component {

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }

  getData = async () => {
    console.log('pressed');
    try {
      const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
      console.log('DATA READ', data);
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      console.log('pressed');

      this.setState(parsedData);

    } catch(error) {
      console.log('error');
      alert(error);
    }
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