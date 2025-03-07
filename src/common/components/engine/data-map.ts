// Define types for the data structure
export type InnerMap = Map<string, number>;
export type OuterMap = Map<number, InnerMap>;

// Function to create a Map<number, Map<string, number>> from an array of objects
export const createDataMap = (
  dataArray: Record<string, number>[],
): OuterMap => {
  const outerMap: OuterMap = new Map();

  dataArray.forEach((obj, index) => {
    const innerMap: InnerMap = new Map(Object.entries(obj));
    outerMap.set(index, innerMap);
  });

  return outerMap;
};

export const scoreSingleLetter = (
  dataMap: OuterMap,
  index: number,
  letter: string,
): number => {
  return dataMap.get(index)?.get(letter) ?? 0;
};

export const scoreWord = (dataMap: OuterMap, word: string): number => {
  let score = 0;
  word.split("").map((char, index) => {
    score = score + scoreSingleLetter(dataMap, index, char.toLowerCase());
  });
  return score;
};
