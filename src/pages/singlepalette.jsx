import { FaBrush } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { SketchPicker } from "react-color";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Toastify } from "../components/toastify";
import { toast } from "react-toastify";
import { AppColor } from "../App";
export const SinglePalette = () => {
  const location = useLocation();
  const param = useParams();
  const {
    state: { palettes, openpalette, showfiledialog },
    dispatch,
  } = useContext(AppColor);
  const navigate = useNavigate();
  const [color, setColor] = useState("#ffffff");
  const [disablebtn, setDisablebtn] = useState(false);
  const [iscolorcopied, setIscolorcopied] = useState(false);
  const [palettedetails, setPalettedetails] = useState(
    () =>
      location.state ?? {
        name: "",
        createdAt: param.paletteId,
        colors: [],
      }
  );
  const handleChange = (col) => {
    setColor(col.hex);
  };
  const toastify = (colorname) => {
    toast("color copied");
    setIscolorcopied(true);
    navigator.clipboard.writeText(colorname);
  };
  useEffect(() => {
    if (palettedetails.colors.length > 19) {
      setDisablebtn(true);
    } else {
      setDisablebtn(false);
    }
  }, [palettedetails.colors.length]);
  const savedetails = () => {
    dispatch({ type: "add-color-palette", payload: palettedetails });
    dispatch({ type: "show-file-dialog" });
    navigate("/");
    setPalettedetails({
      name: "",
      createdAt: null,
      colors: [],
    });
  };
  return (
    <>
      <header className="w-full shadow-lg bg-white px-8 py-1 flex justify-between">
        <button
          className="px-4 py-1 bg-stone-700 hover:bg-stone-800 transition-colors text-white rounded-lg drop-shadow-lg capitalize"
          onClick={() => document.startViewTransition(() => navigate("/"))}
        >
          back
        </button>
        <div></div>
        <div className="flex gap-2">
          <button
            className="px-2 py-2 bg-fuchsia-600 text-white text-xl rounded-lg"
            title="save-palette"
            onClick={() => dispatch({ type: "show-file-dialog" })}
          >
            <FaSave />
          </button>
          <button
            className="p-2 bg-neutral-600 text-white text-xl rounded-lg"
            title="add-color"
            onClick={() => dispatch({ type: "show-color-picker" })}
          >
            <FaBrush />
          </button>
        </div>
      </header>
      {openpalette && (
        <div
          className="overlay"
          onClick={() => dispatch({ type: "show-color-picker" })}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SketchPicker
              color={color}
              onChange={handleChange}
              onChangeComplete={handleChange}
            />
            <button
              className="add"
              onClick={(e) => {
                e.stopPropagation();
                setPalettedetails((prev) => ({
                  ...prev,
                  colors: [...new Set([...palettedetails.colors, color])],
                }));
              }}
              disabled={disablebtn}
            >
              Add
            </button>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-10 grid-cols-3">
        {Array.from(palettedetails?.colors, (colorlist, index) => {
          return (
            <div
              key={index}
              id={colorlist}
              className="min-h-32 lg:min-h-96 text-transparent font-lato flex flex-col justify-center items-center text-white"
              style={{ backgroundColor: colorlist }}
              onClick={() => toastify(colorlist)}
            >
              {colorlist}
              <div className="flex  lg:gap-4 gap-2 lg:text-xl text-base pt-4">
                <FaTrashAlt
                  onClick={(e) => {
                    e.stopPropagation();
                    const Removecolor = palettedetails.colors.filter(
                      (el) => el !== colorlist
                    );
                    setPalettedetails((prev) => ({
                      ...prev,
                      colors: Removecolor,
                    }));
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {iscolorcopied && <Toastify />}
      {showfiledialog && (
        <div
          className="overlay"
          onClick={() => dispatch({ type: "show-file-dialog" })}
        >
          <form
            className="lg:w-1/4 bg-white border p-2 shadow-xl rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              required
              className="border-b-2 border-blue-500 w-full focus:outline-none mt-5 mb-3"
              value={palettedetails?.name}
              onChange={(e) => {
                setPalettedetails((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <button
              className="float-right px-4 py-2 bg-blue-600 text-white rounded-md my-2 active:bg-blue-700 transition-colors"
              type="submit"
              onClick={(e) => savedetails(e)}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};
