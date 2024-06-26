import _ from "lodash";

function replaceKeysDeep(obj: any, keysMap: any) {
  // keysMap = { oldKey1: newKey1, oldKey2: newKey2, etc...
  return _.transform(obj, function (result: any, value, key) {
    // transform to a new object

    var currentKey = keysMap[key] || key; // if the key is in keysMap use the replacement, if not use the original key

    result[currentKey] = _.isObject(value)
      ? replaceKeysDeep(value, keysMap)
      : value; // if the key is an object run it through the inner function - replaceKeys
  });
}
export default replaceKeysDeep;
