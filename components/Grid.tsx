import { StyleSheet, View } from "react-native";
import Row from "./Row";
import Ceil from "./Ceil";
import MinesField from "../utils/mineSweeper";
import { useState } from "react";
const ceil = {
  hasMine: false,
};

const Grid = ({
  minesField,
  rerender,
}: {
  rerender: Function;
  minesField: MinesField;
}) => {
  return (
    <View style={styles.container}>
      {minesField.rows.map((row, i) => {
        return <Row rerender={rerender} key={i} row={row} />;
      })}
    </View>
  );
};
export default Grid;
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
