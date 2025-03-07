import { FunctionComponent, useState } from "react";
import { createDataMap, scoreSingleLetter, scoreWord } from "./index.ts";
import data from "./dataMap.json";

export const Engine: FunctionComponent = () => {
  const [dataMap] = useState(() => createDataMap(data));
  return (
    <div>
      <h2>2D Map Example</h2>
      <p>Value at (Row 2, Key "c"): {scoreSingleLetter(dataMap, 2, "c")}</p>
      <p>Value at (Row 4, Key "e"): {scoreSingleLetter(dataMap, 4, "e")}</p>
      <p>Value at (Row 1, Key "i"): {scoreSingleLetter(dataMap, 1, "i")}</p>
      <p>Score word SOAPY: {scoreWord(dataMap, "SOAPY")}</p>
      <p>Score word SLANT: {scoreWord(dataMap, "SLANT")}</p>
      <p>Score word SHADY: {scoreWord(dataMap, "SHADY")}</p>
      <p>Score word SHAKY: {scoreWord(dataMap, "SHAKY")}</p>
      <p>Score word SHALT: {scoreWord(dataMap, "SHALT")}</p>
      <p>Score word BRINY: {scoreWord(dataMap, "BRINY")}</p>
      <p>Score word POINT: {scoreWord(dataMap, "POINT")}</p>
      <p>Score word PRINT: {scoreWord(dataMap, "PRINT")}</p>
      <p>Score word IRONY: {scoreWord(dataMap, "IRONY")}</p>
      <p>Score word PRIVY: {scoreWord(dataMap, "PRIVY")}</p>
    </div>
  );
};
