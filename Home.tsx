import { Button, View, StyleSheet, Image, Text } from "react-native";
import Grid from "./components/Grid";
import useAppContext from "./store/useAppContext";
const Win = require("./assets/win.jpg");
const Lose = require("./assets/lose.jpg");
const Start = require("./assets/start.png");
const Maximize = require("./assets/maximize.png");
const Minimize = require("./assets/minimize.png");
const Close = require("./assets/close.png");
const Logo = require("./assets/logo.png");
const Background = require("./assets/background.jpg");

import { LinearGradient } from "expo-linear-gradient";

const gradient = ["#3d95ff", "#0054e3", "#036bfb"];
const Home = () => {
  const { newGame } = useAppContext();

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={Background} />

      <View style={styles.appBar}>
        <LinearGradient colors={gradient} style={styles.linearGradient} />
        <Image style={styles.image} source={Logo} />
        <Text style={styles.title}>Minesweeper</Text>
        <View style={styles.windowOptions}>
          <Image style={styles.image} source={Minimize} />
          <Image style={styles.image} source={Maximize} />
          <Image style={styles.image} source={Close} />
        </View>
      </View>
      <View style={styles.controls}></View>
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
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  windowOptions: {
    height: "100%",
    flexDirection: "row",
    marginStart: "auto",
  },

  appBar: {
    flexDirection: "row",
    overflow: "hidden",
    gap: 8,
    alignItems: "center",
    height: 40,

    width: "100%",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  linearGradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  controls: {},
  image: {
    height: "100%",
    width: "auto",
    minWidth: 33,
    objectFit: "contain",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",

    flex: 1,
  },
});
