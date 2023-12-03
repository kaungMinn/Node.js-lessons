const validationmaker = (obj) => {
  let validationList = [];
  let result = "";
  let output = "";

  Object.entries(obj).forEach(
    ([key, value]) => !value && validationList.push(key)
  );

  ["name", "email", "password"];

  if (validationList.length > 0) {
    result += validationList.join(" and ");
    output += result + `${validationList.length > 1 ? " are" : " is"} required`;
    return output;
  }

  return null;
};

module.exports = { validationmaker };
