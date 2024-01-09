import {
  maxMessage,
  minLengthMessage,
  minMessage,
  requiredMessage,
  emailMessage,
  checkedMessage,
  strongMessage,
} from "./messages";

import Translator from "./translator";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export type Validation = (fieldName: string) => {
  check: (input: string) => boolean;
  message: string;
};

type Rules = {
  [key: string]: any[];
};

type Input = {
  [key: string]: string | number | boolean;
};

type Errors = string[];

export const required: Validation = (field) => ({
  check: (input) => input !== "",
  message: requiredMessage(Translator(field)),
});

export const minLength =
  (n: number): Validation =>
  (field) => ({
    check: (input) => input.length >= n,
    message: minLengthMessage(Translator(field), n),
  });

export const min =
  (n: number): Validation =>
  (field) => ({
    check: (input) => parseInt(input) >= n,
    message: minMessage(Translator(field), n),
  });

export const max =
  (n: number): Validation =>
  (field) => ({
    check: (input) => parseInt(input) <= n,
    message: maxMessage(Translator(field), n),
  });

export const email: Validation = (field) => ({
  check: (input) => input.includes("@"),
  message: emailMessage(Translator(field)),
});

export const checked: Validation = (field) => ({
  check: (input) => !!input,
  message: checkedMessage(Translator(field)),
});

export const strong: Validation = (field) => ({
  check: (input) => passwordRegex.test(input),
  message: strongMessage(Translator(field)),
});

export const validate = (inputs: Input, rules: Rules): Errors => {
  const objKeys = Object.keys(inputs);
  const result: Errors = [];

  objKeys.forEach((item: string) => {
    if (rules[item]) {
      rules[item].forEach((rule) => {
        const validator = rule(item);
        if (!validator.check(inputs[item])) {
          result.push(validator.message);
        }
      });
    }
  });

  return result;
};
