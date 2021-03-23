import React from 'react';
import {
  Alert,
  Text,
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {LinearGradient} from 'expo';

import {
  FieldDivider,
  FieldHalf,
  ImageButtonContainer,
  ImageButton,
  Scoreboard,
  Username,
} from './components';
import {Colors} from './constants';
import {
  calculateWhoWins,
  generateAlertMessage,
  generateComputerChoice,
} from './utilities';

const {width, height} = Dimensions.get('screen');
export default class App extends React.Component {
  state = {
    playerScore: 0,
    computerScore: 0,
    showOpeningScreen: true,
  };

  onPressImageButton(playerChoice) {
    const computerChoice = generateComputerChoice();
    const winner = calculateWhoWins(playerChoice, computerChoice);
    this.showAlertDialog(winner, playerChoice, computerChoice);
  }

  showAlertDialog(winner, playerChoice, computerChoice) {
    const alertMessage = generateAlertMessage(playerChoice, computerChoice);
    Alert.alert(
      `${winner} Wins`,
      `Player chose ${choices[playerChoice]}\nComputer chose ${choices[computerChoice]}\n${alertMessage}`,
      [{text: 'OK', onPress: () => this.addPointsToScoreboard(winner)}],
    );
  }

  addPointsToScoreboard(winner) {
    switch (winner) {
      case 'Player':
        this.setState({
          playerScore: this.state.playerScore + 1,
        });
        break;
      case 'Computer':
        this.setState({
          computerScore: this.state.computerScore + 1,
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {showOpeningScreen} = this.state;

    if (showOpeningScreen) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: height / 2,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'sans-serif-condensed',
                fontSize: height * 0.07,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'rgb(180,0,0)',
              }}>
              ROCK PAPER SCISSOR
            </Text>
            <TouchableOpacity
              style={{
                width: '80%',
                backgroundColor: 'rgb(180,0,0)',
                alignItems: 'center',
              }}
              onPress={() => this.setState({showOpeningScreen: false})}>
              <Text
                style={{
                  padding: 10,
                  color: '#ffffff',
                  fontFamily: 'sans-serif-condensed',
                  fontSize: height * 0.04,
                }}>
                START PLAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View
          style={[styles.fieldBounds, {backgroundColor: 'rgba(0,0,240,0.4)'}]}>
          <FieldHalf typeOfPlayer={players[0]}>
            <Scoreboard
              score={this.state.computerScore}
              typeOfPlayer={players[0]}
            />
          </FieldHalf>
          <FieldHalf typeOfPlayer={players[1]}>
            <Scoreboard
              score={this.state.playerScore}
              typeOfPlayer={players[1]}
            />
            <ImageButtonContainer
              buttons={choices}
              onPress={index => this.onPressImageButton(index)}
            />
          </FieldHalf>
          <Username username={players[0]} />
          <FieldDivider />
          <Username username={players[1]} />
        </View>
      </View>
    );
  }
}

const choices = ['Rock', 'Paper', 'Scissors'];
const players = ['Computer', 'Player'];

const styles = {
  container: {
    flex: 1,
  },
  fieldBounds: {
    flex: 1,
    borderWidth: 3,
    borderColor: Colors.white,
  },
};
