import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.title}>
          Your Decks
        </Text>
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

const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  }
};

const mapStateToProps = (decks) => {
  return {
    decks: decks
      ? Object.values(decks)
      : []
  }
}

export default connect(mapStateToProps)(DeckList);