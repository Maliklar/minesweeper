import { ScrollView, StyleSheet, View } from "react-native";
import useAppContext from "../store/useAppContext";
import Row from "./Row";
const ceil = {
  hasMine: false,
};

const Grid = () => {
  const { minesField } = useAppContext();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        {minesField.rows.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </View>
    </ScrollView>
  );
};
export default Grid;
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
