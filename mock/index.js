// @flow

function setFlagDefaults(
  flags?: {
    [flagKey: string]: string
  } = {}
): { [flag: string]: false } {
  const flagNames = Object.values(flags);

  return flagNames.reduce((acc, flag) => {
    acc[flag] = false;
    return acc;
  }, {});
}

let flagStore = setFlagDefaults();

function forceFlag(flag: string, value: any): void {
  flagStore[flag] = value;
}

function initialize() {
  return true;
}

function reset(flags): void {
  flagStore = setFlagDefaults(flags);
}

function isEnabled(flag: string): any {
  return flagStore[flag];
}

function getAllFlags() {
  return flagStore;
}

module.exports = {
  isEnabled,
  forceFlag,
  reset
};
