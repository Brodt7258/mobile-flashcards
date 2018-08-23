import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { AppLoading } from 'expo';
import { clearStorage } from '../utils/api';
import { purple } from '../utils/colors';

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
        <AppLoading />
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
              ListFooterComponent={<View style={{ height: 20 }}/>}
            />
          : <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: 18 }}>
                Nothing to see here yet...
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 25 }}>
                Create a deck to get started!
              </Text>
              <Button 
                title="Create Deck"
                onPress={() => navigation.navigate('AddDeck')}
                color={purple}
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