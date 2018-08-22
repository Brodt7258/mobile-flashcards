import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions';
import { purple } from '../utils/colors';

class AddCard extends Component {

  QA_MAX = 100;

  state = {
    question: '',
    answer: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add a new card to ${navigation.state.params.key}`
    };
  };

  handleTextChange = key => e => {
    if (e.length <= this.QA_MAX) {
      this.setState({ [key]: e });
    }
  }

  handleSubmit = () => {
    const id = this.props.navigation.state.params.key;
    this.props.dispatch(handleAddCard(id, this.state));
    this.props.navigation.goBack();
    Keyboard.dismiss();
  }

  //KeyboardAvoidingView does not seem to behave at all like its (rather sparse) documents indicate.  Not impressed with it.
  //I may be using it incorrectly, but that's impossible to determine from what I can find on it.
  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding"> 
        <Text style={styles.formTitle}>
          Question:
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Ask a question"
          value={question}
          onChangeText={this.handleTextChange('question')}
          maxLength={this.QA_MAX}
        />
        <View style={{ flexDirection: 'row', height: 20 }}>
          <View style={{ flex: 1 }}></View>
          { 
            this.QA_MAX - question.length <= 30 &&
            <Text style={{ marginRight: 30 }}>
              {this.QA_MAX - question.length}
            </Text>
          }
        </View>
        <Text style={styles.formTitle}>
          Answer:
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Answer it here"
          value={answer}
          onChangeText={this.handleTextChange('answer')}
          maxLength={this.QA_MAX}
        />
        <View style={{ flexDirection: 'row', height: 20 }}>
          <View style={{ flex: 1 }}></View>
          { 
            this.QA_MAX - answer.length <= 30 &&
            <Text style={{ marginRight: 30 }}>
              {this.QA_MAX - answer.length}
            </Text>
          }
        </View>
        <View style={styles.submitBtn}>
          <Button 
            title="Submit"
            onPress={this.handleSubmit}
            color={purple}
            disabled={!(question && answer)}
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
    flex: 1
  },
  formTitle: {
    fontSize: 20,
    marginTop: 10,
  },
  formInput: {
    height: 50,
    width: 300,
    fontSize: 18,
  },
  submitBtn: {
    width: 200,
    margin: 25,
    flex: 1
  }
});

export default connect()(AddCard);