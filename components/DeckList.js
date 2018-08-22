import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { AppLoading } from 'expo';
import { clearStorage } from '../utils/api';

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks())
      .then(() => this.setState({ ready: true }))
  }

  render() {
    const { decks, navigation } = this.props;
    const { ready } = this.state;

    if (!ready) {
      return (
        //<AppLoading />
        <Button 
          title="reset"
          onPress={clearStorage}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Your Decks
        </Text>
        { 
          decks.length > 0
          ? <FlatList 
              data={decks}
              renderItem={({item}) => <DeckCard deck={item} />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  }
});

const mapStateToProps = (decks) => {
  return {
    decks: decks
      ? Object.values(decks)
      : []
  }
}

export default connect(mapStateToProps)(DeckList);