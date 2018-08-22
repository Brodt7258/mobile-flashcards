import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import DeckDetail from './DeckDetail';
import CardCard from './CardCard';

class DeckDetailList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Details for ${navigation.state.params.id}`
    }
  };

  render() {
    const { deck } = this.props;

    console.log('deck', deck)
    
    return (
      <View>
      {
        deck &&
        <FlatList
          data={deck.cards}
          ListHeaderComponent={<DeckDetail id={deck.title}/>}
          renderItem={({item}) => <CardCard question={item.question} answer={item.answer} />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 20 }}/>}
        />
      }
      </View>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const id = navigation.state.params.id;
  return {
    deck: decks[id]
      ? decks[id]
      : null
  }
}

export default connect(mapStateToProps)(DeckDetailList);