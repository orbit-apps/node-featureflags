export type FeatureFlagUser = {
  key: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  custom?: {
    groups?: string[]
  }
};

export type LaunchDarklyStore = {
  valid: boolean,
  allValues: () => { [flag: string]: boolean },
  getFlagValue: flag => boolean,
  getFlagReason: flag => any,
  /*
    .toJSON() returns {
      'test-flag-1': false,
      '$flagsState':
        { 'test-flag-1': { version: 5, variation: 1 }},
      '$valid': true }
  */
  toJSON: () => Object
};

export type FeatureFlagConfig = {
  logger?: any
};
