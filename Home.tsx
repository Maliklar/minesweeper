import { Button, View, StyleSheet, Image, Text, Pressable } from "react-native";
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
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { GameStateEnum } from "./store/AppContext";

const gradient = ["#3d95ff", "#0054e3", "#036bfb"];

const Home = () => {
  const { newGame, gameState, timer } = useAppContext();
  const [fontsLoaded] = useFonts({
    DigitalDisplay: require("./assets/fonts/Digital Display.ttf"),
  });

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
      <View style={styles.controls}>
        {fontsLoaded && <Text style={styles.digitalDisplay}>0</Text>}
        {gameState === GameStateEnum.START ||
        gameState === GameStateEnum.PROGRESS ? (
          <Pressable onPress={() => newGame()} style={styles.buttonsContainer}>
            <Image source={Start} style={styles.image} />
          </Pressable>
        ) : gameState === GameStateEnum.LOSE ? (
          <Pressable onPress={() => newGame()} style={styles.buttonsContainer}>
            <Image source={Lose} style={styles.image} />
          </Pressable>
        ) : (
          <Pressable onPress={() => newGame()} style={styles.buttonsContainer}>
            <Image source={Win} style={styles.image} />
          </Pressable>
        )}
        {fontsLoaded && <Text style={styles.digitalDisplay}>{timer}</Text>}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "gray",
        }}
      >
        <Grid />
      </View>
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
  controls: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#c0c0c0",
    padding: 6,
    // borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 6,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",
  },
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

  flagsCount: {
    backgroundColor: "black",
    height: "100%",
    flex: 2,
  },
  buttonsContainer: {
    flex: 10,
    height: "100%",
  },
  timer: {
    backgroundColor: "black",
    height: "100%",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  digitalDisplay: {
    backgroundColor: "black",
    display: "flex",
    height: "100%",
    minWidth: 60,
    verticalAlign: "middle",
    textAlignVertical: "center",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "red",
    fontFamily: "DigitalDisplay",
    fontSize: 30,
  },
});
