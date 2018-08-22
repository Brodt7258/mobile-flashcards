import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions';
import { purple } from '../utils/colors';

class AddCard extends Component {

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
    this.setState({ [key]: e });
  }

  handleSubmit = () => {
    const id = this.props.navigation.state.params.key;
    this.props.dispatch(handleAddCard(id, this.state));
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formTitle}>
          Question:
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Ask a question"
          value={this.state.question}
          onChangeText={this.handleTextChange('question')}
        />
        <Text style={styles.formTitle}>
          Answer:
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Answer it here"
          value={this.state.answer}
          onChangeText={this.handleTextChange('answer')}
        />
        <View style={styles.submitBtn}>
          <Button 
            title="Submit"
            onPress={this.handleSubmit}
            color={purple}
          />
        </View>
      </View>
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

export default connect()(AddCard);