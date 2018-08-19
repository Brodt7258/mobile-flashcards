import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { setDummyData, fetchDeckData, FLASHCARD_STORAGE_KEY } from '../utils/api';
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { AppLoading } from 'expo';

class DeckList extends Component {

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
    //fetchDeckData().then((res) => this.setState(res))
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
    console.log(this.state);
    const { decks } = this.props;
    return (
      <View>
        <Text>DeckList</Text>
        {
          this.state && Object.values(this.state).map(({title, cards}) => <DeckCard title={title} cards={cards} key={title} />)
        }
        <TouchableOpacity onPress={this.getData}>
          <Text>Load Data</Text>
        </TouchableOpacity>
        <Text>Decks from redux</Text>
        {
          decks.map(({title, cards}) => <DeckCard title={title} cards={cards} key={title} />)
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