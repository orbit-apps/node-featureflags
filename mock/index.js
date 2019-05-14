function setFlagDefaults(flags = {}) {
  const flagNames = Object.values(flags);

  return flagNames.reduce((acc, flag) => {
    acc[flag] = false;
    return acc;
  }, {});
}

let flagStore = setFlagDefaults();

function forceFlag(flag, value) {
  flagStore[flag] = value;
}

function initialize() {
  return true;
}

function reset(flags) {
  flagStore = setFlagDefaults(flags);
}

function isEnabled(flag) {
  return flagStore[flag];
}

function getAllFlags() {
  return flagStore;
}

module.exports = {
  initialize,
  isEnabled,
  forceFlag,
  reset
};
