import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Grid from "./components/Grid";
import MineField from "./utils/mineSweeper";
import { useState } from "react";
import MinesField from "./utils/mineSweeper";

export default function App() {
  const [minesField, setMinesField] = useState(new MinesField(10, 10, 5));

  const restart = () => {
    setMinesField(new MinesField(10, 10, 5));
  };
  const rerender = () => {
    setMinesField(Object.create(minesField));
    minesField.print();
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Grid rerender={rerender} minesField={minesField} />
          <Button onPress={restart} title="Restart"></Button>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
