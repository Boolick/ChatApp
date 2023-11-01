export type DataType = Record<string, unknown>;

export const parseObjectToArray = (data: DataType): Array<unknown> => {
  let result: Array<unknown> = [];

  for (const key in data) {
    if (typeof data[key] === "object" && data[key] !== null) {
      result = result.concat(parseObjectToArray(data[key] as DataType));
    } else {
      result.push(data[key] as DataType);
    }
  }
  return result;
};
