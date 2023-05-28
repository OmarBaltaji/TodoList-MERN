export const checkIfObjEmpty = (object: Object) => (
  Object.keys(object).length === 0 && object.constructor === Object
)