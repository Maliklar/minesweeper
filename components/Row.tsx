import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { FieldRow } from "../utils/mineSweeper";
import Ceil from "./Ceil";

type Props = {
  row: FieldRow;
  rerender: Function;
};
const Row = ({ row, rerender }: Props) => {
  return (
    <View style={styles.container}>
      {row.ceils.map((ceil, i) => (
        <Ceil rerender={rerender} ceil={ceil} key={i} />
      ))}
    </View>
  );
};
export default Row;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
