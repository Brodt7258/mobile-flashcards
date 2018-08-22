import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { handleAddDeck } from '../actions';
import { purple } from '../utils/colors';

class AddDeck extends Component {
  
  DECK_MAX = 33;

  state = {
    title: ''
  }

  handleTextChange = (title) => {
    if (title.length <= this.DECK_MAX) {
      this.setState({ title });
    }
  }

  handleSubmit = () => {
    const { decks, dispatch, navigation } = this.props;
    const { title } = this.state;
    
    if (decks.includes(title.toLocaleLowerCase())) {
      Alert.alert(
        'Duplicate Name',
        `You already have a deck called "${title}", please choose something else.`,
        [
          {text: 'Ok'},
        ]
      )
    } else {
      navigation.navigate('DeckList'); //I don't love this, but I couldn't find good info on navigating tabs from a different location in the stack
      dispatch(handleAddDeck(this.state)).then(res => navigation.navigate('DeckDetail',  { id: res.deck.title }));
      this.setState({ title: '' });
    }
  }

  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.formTitle}>
          What should your new deck be called?
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Deck Title"
          value={title}
          onChangeText={this.handleTextChange}
        />
        <View style={{ flexDirection: 'row', height: 20 }}>
          <View style={{ flex: 1 }}></View>
          { 
            this.DECK_MAX - title.length <= 10 &&
            <Text style={{ marginRight: 30 }}>
              {this.DECK_MAX - title.length}
            </Text>
          }
        </View>
        <View style={styles.submitBtn}>
          <Button
            title="Submit"
            onPress={this.handleSubmit}
            disabled={!title.length}
            color={purple}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 20,
    margin: 20
  },
  formInput: {
    height: 50,
    width: 350,
    fontSize: 18
  },
  submitBtn: {
    width: 200,
    margin: 25
  }
});

const mapStateToProps = (decks) => {
  return {
    decks: decks
      ? Object.keys(decks).map(d => d.toLocaleLowerCase())
      : []
  }
}

export default connect(mapStateToProps)(AddDeck);