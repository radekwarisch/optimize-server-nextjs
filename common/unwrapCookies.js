import * as R from "ramda";

const finalParse = ([key, variant]) => {
  const [, id] = key.split(".");

  return {
    id,
    variant,
  };
};

export const unwrapCookies = R.pipe(
  R.toPairs,
  R.filter(R.pipe(R.prop(0), R.includes("__exp"))),
  R.map(finalParse)
);
