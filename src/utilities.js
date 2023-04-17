export const checkIfObjEmpty = (object) => (
  Object.keys(object).length === 0 && object.constructor === Object
)