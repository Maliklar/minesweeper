import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import { FieldCeil } from "../utils/mineSweeper";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useAppContext from "../store/useAppContext";
import { getCeilFontColor } from "../utils/helper";
import { GameStateEnum } from "../store/AppContext";

const Flag = require("../assets/flag.png");

function Ceil({ ceil }: { ceil: FieldCeil }) {
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    setFlagged(false);
  }, [ceil]);
  const fontColor = getCeilFontColor(ceil.value);

  const { update, setGameState, minesField, gameState } = useAppContext();
  return (
    <Pressable
      onPress={() => {
        if (gameState === GameStateEnum.LOSE) return;
        if (flagged) return;
        if (ceil.value === -1) setGameState(GameStateEnum.LOSE);
        if (gameState === GameStateEnum.START) {
          setGameState(GameStateEnum.PROGRESS);
          minesField.startGame(ceil);
        } else ceil.open();

        update();
      }}
      onLongPress={() => {
        if (ceil.isOpen) return;
        setFlagged((i) => !i);
      }}
      style={{
        ...styles.container,
        ...(ceil.isOpen ? { borderColor: "#7b7b7b", borderWidth: 2 } : {}),
      }}
    >
      {flagged && <Icon name="flag" size={20} color="red" />}
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

const size = "auto";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "#bdbdbd",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderBottomColor: "#7b7b7b",
    borderRightColor: "#7b7b7b",
    // height: size,
    // width: size,
    // minWidth: size,
    // minHeight: size,
    // maxHeight: size,
    // maxWidth: size,
  },

  image: {
    height: "100%",
    width: "100%",
  },
});
