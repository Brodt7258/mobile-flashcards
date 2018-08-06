import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { setDummyData } from '../utils/api';
import DeckCard from './DeckCard';

class DeckList extends Component {

  componentDidMount() {
    this.setState(setDummyData());
  }

  render() {
    console.log(this.state);
    return (
      <View>
        <Text>DeckList</Text>
        {
          this.state && Object.values(this.state).map(({title, cards}) => <DeckCard title={title} cards={cards} />)
        }
      </View>
    );
  }
}

export default DeckList;