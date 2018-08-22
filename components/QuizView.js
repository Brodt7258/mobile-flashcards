import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { purple, red, green } from '../utils/colors';
import { handleLastReviewed } from '../actions';

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
      this.setState(prev => ({ 
        currentQuestion: prev.currentQuestion + 1 
      }));
    } else {
      this.setState(prev => ({ 
        currentQuestion: prev.currentQuestion + 1,
        done: true 
      }));
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
    const { navigation, dispatch, deck } = this.props;
    this.setState({ done: false });
    navigation.goBack();
    this.resetNotification();
    dispatch(handleLastReviewed(deck.title, Date.now()));
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
      <View style={styles.answerContainer}>
        {
          hideAnswer
          ? <View style={styles.button}>
              <Button 
                title="Show Answer"
                onPress={() => this.setState({ hideAnswer: false })}
                color={purple}
              />
            </View>
          : <View>
              <Text style={[styles.Text, { width: 250 }]}>
                Answer: {questionList[currentQuestion].answer}
              </Text>
              <View style={styles.button}>
                <Button
                  title="Correct"
                  onPress={() => this.handleUserResponse(true)}
                  color={green}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Incorrect"
                  onPress={() => this.handleUserResponse(false)}
                  color={red}
                />
              </View>
            </View>
        }
      </View>
    );
  }
  
  render() {
    const { questionList, currentQuestion, correctAnswers, incorrectAnswers} = this.state;

    this.completionAlert();

    return (
      <View style={styles.container}>
        {
          currentQuestion < questionList.length
          ? <View style={{ flex: 1}}>
              <Text style={[styles.Text, { width: 250 }]}>
                Question: {questionList[currentQuestion].question}
              </Text>
              <this.HiddenAnswer />
            </View>
          : <View>
              <Text>Done</Text>
            </View>   
        }
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.Text}>
              {`Correct: ${correctAnswers}`}
            </Text>
            <Text style={styles.Text}>
              {`Incorrect: ${incorrectAnswers}`}
            </Text>
          </View>
          <Text style={styles.Text}>
            {`Remaining: ${questionList.length - currentQuestion}`}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 20
  },
  button: {
    width: 200,
    margin: 25
  }
});

const mapStateToProps = (decks, { navigation }) => {
  const key = navigation.state.params.key
  return {
    deck: decks[key]
  };
}

export default connect(mapStateToProps)(QuizView);