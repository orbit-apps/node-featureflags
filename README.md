# Node.js Feature flags

## Usage

### Environment

You'll need a `LAUNCHDARKLY_SDK` environment variable configured, otherwise all
flag queries will return false by default.

### Setup

First, import and initialize the library somewhere early in the app:

```js
const { logger } = require("./some/logging/lib");
const featureflags = require("node-featureflags");

featureflags.initialize({ logger });
```

The only option so far is to pass an (optional) logging tool that you'd like the
library to use.

### Querying a single flag

To query a single flag for a user, use `isEnabled`:

```js
const { isEnabled } = require("node-featureflags");

const user = {
  key: "fancy-pants-store",
  email: "hans@fancy-pants-store.com",
  custom: {
    groups: ["shop"]
  }
};

const userGetsFeature = await isEnabled("feature-something", user);
```

### Querying all flags

To get an object of all flags for a user and their values, use `getAllFlags`:

```js
const { getAllFlags } = require("node-featureflags");

const flagsForUser = await getAllFlags(user);

/*
  {
    'feature-something': true,
    'feature-another': false,
  }
*/
```

The `user` argument in both cases should match the shape of LaumchDarkly's user
object,
[documented here](https://docs.launchdarkly.com/docs/node-sdk-reference#section-users).

Both `isEnabled` and `getAllFlags` return promises, and should be called with
`await`.

## Mocking

This package includes a mocked version of the module, intended for use with
Jest's
[node module mocking](https://jestjs.io/docs/en/manual-mocks#mocking-node-modules).

In the root of your project, add a file at `__mocks__/node-featureflags.js`.
Import, and then re-export, the mock version of the module:

```js
const mockModule = require("node-featureflags/mock");

module.exports = mockModule;
```

If using Jest, the feature flag library will be automatically mocked, with all
flags returning `false`. To declare the value of a specific flag when running
tests, importing the module and use the `forceFlag` method:

```js
const featureFlags = require("node-featureflags");

it("has feature-a enabled", () => {
  featureFlags.forceFlag("feature-a", true);

  // Any queries for 'feature-a' in your code will return true
});
```

Because the feature flag library is a singleton, we'll need to reset the values
of our forced flags so tests don't conflict with each other:

```js
beforeEach(() => {
  featureFlags.reset();
});
```

You can also pass an object of flags to `reset`:

```js
const flags = {
  featureA: "feature-a",
  featureB: "feature-b",
  featureC: "feature-c"
};

beforeEach(() => {
  featureFlags.reset(flags);
});
```

This will set the value of each flag to `false`, which may be useful when
mocking `getAllFlags`.
