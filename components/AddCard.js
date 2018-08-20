import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions';
import { withNavigation } from 'react-navigation';

//import { addCard as apiAddCard } from '../utils/api';

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add a new card to ${navigation.state.params.navTitle}`
    };
  };

  handleTextChange = key => e => {
    this.setState({ [key]: e });
  }

  handleSubmit = () => {
    const id = this.props.navigation.state.params.entryId;
    this.props.dispatch(handleAddCard(id, this.state));
    //apiAddCard(id, this.state);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <Text>Question:</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Ask a question"
          value={this.state.question}
          onChangeText={this.handleTextChange('question')}
        />
        <Text>Answer:</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Answer it here"
          value={this.state.answer}
          onChangeText={this.handleTextChange('answer')}
        />
        <Button 
          title="Submit"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default withNavigation(connect()(AddCard));