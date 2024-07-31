import { useReducer, createContext } from "react";
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
      const existingPaletteIndex = state.palettes.findIndex(
        (p) => p.createdAt === action.payload.createdAt
      );

      if (existingPaletteIndex > -1) {
        const updatedPalettes = [...state.palettes];
        updatedPalettes[existingPaletteIndex] = action.payload;
        return {
          ...state,
          palettes: updatedPalettes,
        };
      }

      return {
        ...state,
        showfiledialog: false,
        palettes: [...state.palettes, action.payload],
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
