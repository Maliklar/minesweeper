import { SafeAreaView, StatusBar } from "react-native";
import Home from "./Home";
import AppContext from "./store/AppContext";

export default function App() {
  return (
    <AppContext>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <StatusBar />

        <Home />
      </SafeAreaView>
    </AppContext>
  );
}
