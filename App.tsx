import { SafeAreaView } from "react-native";
import Home from "./Home";
import AppContext from "./store/AppContext";

export default function App() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <AppContext>
          <Home />
        </AppContext>
      </SafeAreaView>
    </>
  );
}
