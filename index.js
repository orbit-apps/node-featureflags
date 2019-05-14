//

const LaunchDarkly = require("ldclient-node");

let featureFlagClient;

const clientStub = {
  allFlagsState: () => ({
    allValues: () => ({})
  }),
  variation: function(flag, user, value) {
    return Promise.resolve(false);
  },
  once: function(_, func) {
    func();
  },
  close: function() {
    return false;
  }
};

const defaultConfig = {
  logger: console
};

function initialize(config = {}) {
  config = { ...defaultConfig, ...config };

  if (featureFlagClient) {
    config.logger.warn("[FeatureFlags] Initializing twice!");

    return featureFlagClient;
  }

  const launchDarklySDK = process.env.LAUNCHDARKLY_SDK;

  if (launchDarklySDK) {
    featureFlagClient = LaunchDarkly.init(launchDarklySDK, config);

    return featureFlagClient;
  } else {
    featureFlagClient = clientStub;

    config.logger.warn(
      "[FeatureFlags] No SDK provided, all flags checks will return false."
    );
  }

  return featureFlagClient;
}

function isEnabled(flag, user) {
  return featureFlagClient.variation(flag, user, false);
}

async function getAllFlags(user) {
  try {
    const rawFlags = await featureFlagClient.allFlagsState(user);
    return rawFlags.allValues();
  } catch (error) {
    console.warn(`[FeatureFlags] Error retrieving allFlagsState ${error}`);
    return {};
  }
}

function shutDown() {
  featureFlagClient.close();
}

// Cleanly shutdown our connection to LaunchDarkly
process.on("SIGTERM", shutDown);

module.exports = {
  initialize,
  isEnabled
};
