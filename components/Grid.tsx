import { StyleSheet, View } from "react-native";
import Row from "./Row";
import Ceil from "./Ceil";
import MinesField from "../utils/mineSweeper";
import { useContext, useState } from "react";
import { CTX } from "../store/AppContext";
import useAppContext from "../store/useAppContext";
const ceil = {
  hasMine: false,
};

const Grid = () => {
  const { minesField } = useAppContext();
  return (
    <View style={styles.container}>
      {minesField.rows.map((row, i) => {
        return <Row key={i} row={row} />;
      })}
    </View>
  );
};
export default Grid;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});
