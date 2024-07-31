import { AppColor } from "../App";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
export const AllPalettes = () => {
  const {
    state: { palettes },
    dispatch,
  } = useContext(AppColor);
  const navigate = useNavigate();

  return (
    <div className="container py-5 lg:px-40 px-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg lg:text-3xl font-semibold text-emerald-400">
          ColorCraft
        </h1>
        <button
          className="palette-button"
          onClick={() =>
            document.startViewTransition(() => navigate(`/${Date.now()}`))
          }
        >
          <IoMdAddCircle className="lg:text-2xl text-base" />
          <span>new palette</span>
        </button>
      </div>
      <div className="grid  grid-cols-2 lg:grid-cols-3 gap-2 place-items-center my-12 ">
        {Array.from(palettes, ({ name, createdAt, colors }) => {
          return (
            <div
              key={createdAt}
              className="bg-white border border-gray-300 shadow-lg w-full p-2 rounded-md h-full"
              onClick={() =>
                navigate(`/${createdAt}`, {
                  state: { name, createdAt, colors },
                })
              }
            >
              <div className="grid grid-cols-4 ">
                {colors?.map((color, index) => {
                  return (
                    <div
                      style={{ backgroundColor: color }}
                      key={index}
                      className="w-full h-full lg:h-[3rem] text-transparent"
                    >
                      {"j"}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center truncate py-2">
                <h2 className="text-start text-base lg:text-lg">{name}</h2>
                <MdDelete
                  className="text-lg lg:text-2xl text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "delete-palette", payload: createdAt });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
