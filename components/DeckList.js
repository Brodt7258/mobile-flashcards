import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { setDummyData, fetchDeckData, FLASHCARD_STORAGE_KEY } from '../utils/api';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { AppLoading } from 'expo';

class DeckList extends Component {

  componentDidMount() {
    const data = setDummyData()
    console.log('dummy data', data);
    
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data)).then(console.log("SAVED DUMMY DATA"))
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
    //console.log(this.state);
    return (
      <View>
        <Text>DeckList</Text>
        {
          this.state && Object.values(this.state).map(({title, cards}) => <DeckCard title={title} cards={cards} key={title} />)
        }
        <TouchableOpacity onPress={this.getData}>
          <Text>Load Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList);