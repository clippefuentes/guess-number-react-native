import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, styleButton }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
        styleButton
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  buttonPressed: {
    backgroundColor: 'darkblue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;