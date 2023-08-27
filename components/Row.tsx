import { StyleSheet, View } from "react-native";
import { FieldRow } from "../utils/mineSweeper";
import Ceil from "./Ceil";

type Props = {
  row: FieldRow;
};
const Row = ({ row }: Props) => {
  return (
    <View style={styles.container}>
      {row.ceils.map((ceil, i) => (
        <Ceil ceil={ceil} key={i} />
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
