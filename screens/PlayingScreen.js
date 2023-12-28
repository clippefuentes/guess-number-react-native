import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function PlayingScreen({ onConfirm, confirmedNumber }) {
  const [lowBound, setLowBound] = useState(1);
  const [highBound, setHighBound] = useState(100);
  const [pastOpponentGuesses, setPastOpponentGuesses] = useState([]);
  const [opponentGuess, setOpponentGuess] = useState(generateRandomBetween(lowBound, highBound, confirmedNumber));

  function generateRandomBetween(min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rndNum;
    do {
      rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (rndNum === exclude);
    return rndNum;
  }

const nextGuessHandler = direction => {
  let newLowBound = lowBound;
  let newHighBound = highBound;

  if (direction === 'lower') {
    newHighBound = opponentGuess - 1;
  } else {
    newLowBound = opponentGuess + 1;
  }

  const nextNumber = generateRandomBetween(newLowBound, newHighBound, opponentGuess);

  setLowBound(newLowBound);
  setHighBound(newHighBound);

  setOpponentGuess(prevOpponentGuess => {
    const updatedOpponentGuess = nextNumber;
    setPastOpponentGuesses(curPastGuesses => [prevOpponentGuess, ...curPastGuesses]);

    
    if (confirmedNumber === updatedOpponentGuess) {
      onConfirm(updatedOpponentGuess);
    }

    return updatedOpponentGuess;
  });
};


  const handleHigher = () => {
    if (opponentGuess >= confirmedNumber) {
      Alert.alert('Invalid Action', 'The opponent\'s guess has already reached or exceeded the confirmed number.');
      return;
    }
    nextGuessHandler('greater');
  };
  
  const handleLower = () => {
    if (opponentGuess <= confirmedNumber) {
      Alert.alert('Invalid Action', 'The opponent\'s guess has already reached or fallen below the confirmed number.');
      return;
    }
    nextGuessHandler('lower');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Number Guessing Game</Text>
      <Text style={styles.instructions}>Is the number higher or lower?</Text>
      <Text style={styles.rangeText}>{`Range: ${lowBound} - ${highBound}`}</Text>
      <Text style={styles.opponentGuess}>{`Opponent's Guess: ${opponentGuess}`}</Text>
      <Text style={styles.pastGuesses}>{`Past Opponent's Guesses: ${pastOpponentGuesses.join(', ')}`}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton title="Higher" styleButton={styles.button} onPress={handleHigher} disabled={opponentGuess === highBound} />
        <CustomButton title="Lower" styleButton={styles.button} onPress={handleLower} disabled={opponentGuess === lowBound} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  rangeText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  opponentGuess: {
    fontSize: 16,
    marginBottom: 10,
  },
  pastGuesses: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  buttonContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  button: {
    width: '30%',
  },
});
