import { Pressable, StyleSheet, Text, Touchable, View } from "react-native";
import { FieldCeil } from "../utils/mineSweeper";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useAppContext from "../store/useAppContext";
function Ceil({ ceil }: { ceil: FieldCeil }) {
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    setFlagged(false);
  }, [ceil]);
  let fontColor = "black";

  if (ceil.value === 1) {
    fontColor = "blue";
  }
  if (ceil.value === 2) {
    fontColor = "green";
  }
  if (ceil.value === 3 || ceil.value === 5) {
    fontColor = "red";
  }
  if (ceil.value === 4) {
    fontColor = "purple";
  }

  const { update } = useAppContext();
  return (
    <Pressable
      onPress={() => {
        if (flagged) return;
        ceil.open();
        update();
      }}
      onLongPress={(e) => {
        if (ceil.isOpen) return;
        setFlagged((i) => !i);
      }}
      style={{
        ...styles.container,
        ...(ceil.isOpen ? { borderColor: "#7b7b7b", borderWidth: 1 } : {}),
      }}
    >
      {flagged && <Icon name="flag-triangle" size={25} color="red" />}
      {ceil.isOpen && (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: fontColor,
          }}
        >
          {ceil.value === -1 ? (
            <Icon name="mine" size={25} color="black" />
          ) : ceil.value > 0 ? (
            ceil.value
          ) : (
            ""
          )}
        </Text>
      )}
    </Pressable>
  );
}
export default Ceil;

const size = 35;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#bdbdbd",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderBottomColor: "#7b7b7b",
    borderRightColor: "#7b7b7b",
    height: size,
    width: size,
    minWidth: size,
    minHeight: size,
  },
});
