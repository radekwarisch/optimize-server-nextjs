/**
 * @description
 * Meta gathering could be automated
 * if we create dedicated service that runs optimize client in puppeteer
 * and sends the meta to Redis cache
 */
import meta from "../../common/experimentsMeta.json";
import stringHash from "string-hash";

const resolveExperiments = (experiments, userHash, cache = {}) => {
  return experiments.map((experiment) => {
    if (cache[userHash] && cache[userHash][experiment.id]) {
      return {
        id: experiment.id,
        variant: cache[experiment.id],
      };
    }

    const weight = Math.random();
    let chosenVariant = null;
    let pendingWeight = 0;

    for (let [variant, variantWeight] of Object.entries(experiment.variants)) {
      pendingWeight += variantWeight;

      if (weight <= pendingWeight) {
        chosenVariant = variant;
        break;
      }
    }

    /**
     * @description
     * Write cache here
     */

    return {
      id: experiment.id,
      variant: chosenVariant,
    };
  });
};

export default function handler(req, res) {
  /**
   * @description
   * Cache could be a Redis store
   */
  const cache = {};
  const userHash = stringHash(req.headers["user-agent"]);
  const resolved = resolveExperiments(meta.experiments, userHash, cache);

  res.status(200).json({ experiments: resolved });
}
