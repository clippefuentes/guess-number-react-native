import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import CustomButton from "./components/CustomButton";

import StartScreen from "./screens/StartScreen";
import PlayingScreen from "./screens/PlayingScreen";

export default function App() {
  const [gameState, setGameState] = useState("starting");
  const [confirmedNumber, setConfirmedNumber] = useState(null);

  const startPlaying = (number) => {
    setConfirmedNumber(number);
    setGameState("playing");
  };

  const handleReset = () => {
    setConfirmedNumber(null);
    setGameState("starting");
  };

  const onGuessCorrect = () => {
    setConfirmedNumber(null);
    setGameState("over");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {gameState === "starting" && <StartScreen onConfirm={startPlaying} />}
      {gameState === "playing" && (
         <PlayingScreen onConfirm={onGuessCorrect} confirmedNumber={confirmedNumber} />
      )}
      {gameState === "over" && (
        <View>
          <Text>Game over</Text>
        </View>
      )}
      {/* Add other game state conditions as needed */}
      <CustomButton title="Reset" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 50,
    backgroundColor: "yellow",
  },
});
