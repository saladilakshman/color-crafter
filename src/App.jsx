import { useReducer, createContext, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AllPalettes } from "./pages/Allpalettes";
import { SinglePalette } from "./pages/singlepalette";
import { palette } from "./utils/samplepalette";
export const AppColor = createContext();
function App() {
  const initialState = {
    palettes: palette,
    openpalette: false,
    showfiledialog: false,
    colorformatchange: undefined,
  };
  function reducerfunction(state, action) {
    if (action.type === "delete-palette") {
      const removepalette = state.palettes.filter(
        (el) => el.createdAt !== action.payload
      );
      return {
        ...state,
        palettes: removepalette,
      };
    }
    if (action.type === "show-color-picker") {
      return {
        ...state,
        openpalette: !state.openpalette,
      };
    }
    if (action.type === "add-color-palette") {
      const isfound = state?.palettes.find(
        (pln) => pln.name === action.payload.name
      );
      return {
        ...state,
        showfiledialog: false,
        palettes: isfound
          ? state?.palettes.with(state?.palettes[isfound], action.payload)
          : [...state.palettes, action.payload],
      };
    }
    if (action.type === "show-file-dialog") {
      return {
        ...state,
        showfiledialog: !state.showfiledialog,
      };
    } else return state;
  }
  const [state, dispatch] = useReducer(
    reducerfunction,
    initialState
    // (initial) => {
    //   const islocaldataavailable = JSON.parse(
    //     window.localStorage.getItem("color-palette")
    //   );
    //   return islocaldataavailable ?? initial;
    // }
  );
  // useEffect(() => {
  //   window.localStorage.setItem("color-palette", JSON.stringify(state));
  // }, [state]);
  return (
    <div className="w-screen min-h-min">
      <HashRouter>
        <AppColor.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<AllPalettes />} />
            <Route path="/:paletteId" element={<SinglePalette />} />
          </Routes>
        </AppColor.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
