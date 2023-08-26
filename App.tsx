import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import Home from "./Home";
import AppContext from "./store/AppContext";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function App() {
  return (
    <AppContext>
      {/* <ScrollView> */}
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <StatusBar />
        {/* <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.3}
          zoomStep={0.01}
          initialZoom={1}
          bindToBorders={true}
        > */}
        <Home />
        {/* </ReactNativeZoomableView> */}
      </SafeAreaView>
      {/* </ScrollView> */}
    </AppContext>
  );
}
