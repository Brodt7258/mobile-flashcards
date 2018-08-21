import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { setLocalNotification, clearLocalNotification } from '../utils/api';

class QuizView extends Component {

  shuffleDeck = () => {
    return this.props.deck.cards.slice().sort(() => 0.5 - Math.random()); //not the prettiest, but good enough for this
  }

  state = {
    questionList: this.shuffleDeck(),
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    done: false,
    hideAnswer: true
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz for ${navigation.state.params.key}`
    };
  };

  handleUserResponse = (correct) => {
    const { currentQuestion, questionList, correctAnswers, incorrectAnswers } = this.state;
    
    if(currentQuestion < questionList.length - 1) {
      this.setState(prev => ({ currentQuestion: prev.currentQuestion + 1 }));
    } else {
      this.setState(prev => ({ 
        currentQuestion: prev.currentQuestion + 1,
        done: true }));
    }

    if (correctAnswers + incorrectAnswers < questionList.length) {
      if (correct) {
        this.setState((prev) => ({ correctAnswers: prev.correctAnswers + 1, hideAnswer: true }))
      } else {
        this.setState((prev) => ({ incorrectAnswers: prev.incorrectAnswers + 1, hideAnswer: true }))
      }
    }
  }

  resetNotification() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  resetQuiz = () => {
    this.setState({
      questionList: this.shuffleDeck(),
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      done: false
    });
  }

  quizComplete = () => {
    this.props.navigation.goBack();
    this.resetNotification();
  }

  completionAlert = () => {
    const {questionList, correctAnswers, done } = this.state;
    if (done) {
      const percentCorrect = Math.floor((correctAnswers / questionList.length) * 100);
      let adviceMsg = '';
      switch (true) {
        case (percentCorrect >= 90):
          adviceMsg = "You've got this!";
          break;
        case (percentCorrect >= 80):
          adviceMsg = 'Almost there!';
          break;
        default:
          adviceMsg = "Keep practicing, you'll get there!"
      }
      Alert.alert(
        'Quiz Completed!',
        `You answered ${correctAnswers}/${questionList.length} (${percentCorrect}%) questions correctly. ${adviceMsg}`,
        [
          {text: 'Try Again', onPress: this.resetQuiz},
          {text: 'Done', onPress: this.quizComplete},
        ],
        { cancelable: false }
      )
    }
  }

  HiddenAnswer = () => {
    const { questionList, currentQuestion, hideAnswer } = this.state;
    return (
      <View>
        {
          hideAnswer
          ? <Button 
              title="Show Answer"
              onPress={() => this.setState({ hideAnswer: false })}
            />
          : <View>
              <Text>{questionList[currentQuestion].answer}</Text>
              <Button
                title="Correct"
                onPress={() => this.handleUserResponse(true)}
              />
              <Button
                title="Incorrect"
                onPress={() => this.handleUserResponse(false)}
              />
            </View>
        }
      </View>
    );
  }
  
  render() {
    const { questionList, currentQuestion, correctAnswers, incorrectAnswers} = this.state;

    this.completionAlert();

    return (
      <View>
        {
          currentQuestion < questionList.length
          ? <View>
              <Text>{questionList[currentQuestion].question}</Text>
              <this.HiddenAnswer />
            </View>
          : <View>
              <Text>Done</Text>
            </View>   
        }
        <Text>{`Correct: ${correctAnswers}`}</Text>
        <Text>{`Incorrect: ${incorrectAnswers}`}</Text>
        <Text>{`Remaining: ${questionList.length - currentQuestion}`}</Text>
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