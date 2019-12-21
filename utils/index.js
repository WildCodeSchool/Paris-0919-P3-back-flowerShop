const setKeysValuesToString = (keys, values) => {
  return keys.map((key, index) => `${key}="${values[index]}"`).join(",");
};

module.exports = { setKeysValuesToString };
