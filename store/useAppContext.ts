import { useContext } from "react";
import { CTX } from "./AppContext";

const useAppContext = () => {
  try {
    const ctx = useContext(CTX);
    if (ctx) return ctx;
    else throw Error();
  } catch (error) {
    throw Error("CONTEXT ERROR");
  }
};
export default useAppContext;
