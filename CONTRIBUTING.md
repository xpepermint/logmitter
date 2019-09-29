# Contributing

## Issues

We use GitHub issues to track bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## Pull requests

Always fork the repo and create your branch from master. If you've added code that should be tested, add tests. Please ensure the test suite passes before submitting the PR.

## Coding style

Please follow the [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines).

## Release process

Update package version, install dependencies, then make sure all tests are passing.

```
$ npm i
$ npm test
```

Build and publish the package.

```
$ npm build
$ npm publish
```

Commit changes and push them to the Github.
