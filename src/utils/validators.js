import RegExpValues from "./regexp";

const Validators = {
  isEmpty: (value) => value === undefined || value === null || value === "",
  isEmail: (value) => RegExpValues.VALID_EMAIL.test(value),
};

export default Validators;
export const { isEmpty, isEmail } = Validators;
