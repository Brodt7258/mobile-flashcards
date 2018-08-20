import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class QuizView extends Component {

  shuffleDeck = () => {
    return this.props.deck.cards.slice().sort(() => 0.5 - Math.random()); //not the prettiest, but good enough for this
  }

  state = {
    questionList: this.shuffleDeck(),
    currentQuestion: 0
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz for ${navigation.state.params.key}`
    };
  };
  
  render() {
    const { deck } = this.props;
    console.log(deck)
    return (
      <View>
        <Text>QuizView</Text>
        {
          this.state.questionList.map((q, i) => (
              <View key={i}>
                <Text>{q.question}</Text>
                <Text>{q.answer}</Text>
              </View>
            ))
        }
      </View>
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const key = navigation.state.params.key
  return {
    deck: decks[key]
  };
}

export default connect(mapStateToProps)(QuizView);