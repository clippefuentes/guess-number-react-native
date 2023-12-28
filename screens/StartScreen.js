import React, { useState } from 'react';
import { 
  StyleSheet, Text, View,
  TextInput, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';
import CustomButton from '../components/CustomButton';

export default function StartScreen({
  onConfirm
}) {
  const [inputText, setInputText] = useState('');

  const handleReset = () => {
    setInputText('');
  };

  const handleConfirm = () => {
    const number = parseInt(inputText);

    if (isNaN(number) || number < 1 || number > 100) {
      Alert.alert('Invalid Number', 'Please enter a number between 1 and 100.');
    } else {
      // Perform your logic for a valid number
      onConfirm(number);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Guess my number</Text>
        <TextInput
          style={styles.inputText}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          keyboardType="phone-pad"
          autoCaptalize="none"
          autoCorrect={false}
          maxLength={3}
        />
        <View style={styles.buttonContainer}>
          <CustomButton title="Reset" onPress={handleReset} />
          <CustomButton title="Confirm" onPress={handleConfirm} />
        </View>
      </View> 
    </TouchableWithoutFeedback>
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
  },
  inputText: {
    borderWidth: 1,
    width: '50%',
    height: 35,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  }
});
