import { NextResponse } from "next/server";
/**
 * @description
 * Meta gathering could be automated
 * if we create dedicated service that runs optimize client in puppeteer
 * and sends the meta to Redis cache
 */
import meta from "../common/experimentsMeta.json";
import { unwrapCookies } from "../common/unwrapCookies";

const experimentVending = (experiment) => {
  const weight = Math.random();
  let chosenVariant = null;
  let pendingWeight = 0;

  for (let [variant, variantWeight] of Object.entries(experiment.variants)) {
    pendingWeight += Number(variantWeight);

    if (weight <= pendingWeight) {
      chosenVariant = variant;
      break;
    }
  }

  return chosenVariant;
};

const resolveExperiments = ({ cookiesCache = [] }) => {
  return meta.experiments.map((experiment) => {
    const cookiesMatch = cookiesCache.find(
      (cookie) => cookie.id === experiment.id
    );

    return {
      id: experiment.id,
      variant: cookiesMatch
        ? cookiesMatch.variant
        : experimentVending(experiment),
    };
  });
};

export function middleware(req) {
  const cookiesCache = unwrapCookies(req.cookies);

  const experiments = resolveExperiments({ cookiesCache });

  let res = NextResponse.next();
  const url = req.nextUrl.clone();

  experiments.forEach(({ variant }) => {
    url.pathname += variant != 0 ? `variant${variant}` : "";
  });

  res = NextResponse.rewrite(url);

  experiments.forEach(({ id, variant }) => {
    res.cookie(`__exp.${id}`, variant);
  });

  return res;
}
