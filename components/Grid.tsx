import { StyleSheet, View } from "react-native";
import useAppContext from "../store/useAppContext";
import Row from "./Row";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
const ceil = {
  hasMine: false,
};

const Grid = () => {
  const { minesField } = useAppContext();
  return (
    <ReactNativeZoomableView>
      <View style={styles.container}>
        {minesField.rows.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </View>
    </ReactNativeZoomableView>
  );
};
export default Grid;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});
