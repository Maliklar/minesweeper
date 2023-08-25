import { Button, View, StyleSheet } from "react-native";
import Grid from "./components/Grid";
import useAppContext from "./store/useAppContext";
const Home = () => {
  const { newGame } = useAppContext();

  return (
    <View style={styles.container}>
      <Grid />
      <Button
        onPress={() => {
          newGame();
        }}
        title="Restart"
      ></Button>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
