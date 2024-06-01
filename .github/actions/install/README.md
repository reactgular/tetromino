# 📥 Install GitHub Action

This GitHub Action is designed to install dependencies for your project. It does so by first attempting to cache the `node_modules` directory to improve subsequent installation speeds. If the dependencies have not changed (i.e., the `yarn.lock` file remains unchanged), it retrieves the cached `node_modules`. Otherwise, it performs a fresh install.

## Features:

1. 📦 **Caching of `node_modules`**: This step caches the `node_modules` directory to improve the speed of subsequent installations. It uses the `actions/cache@v4` action for this purpose.
2. 📥 **Installation of Dependencies**: If the cache was not hit (i.e., the dependencies or the `yarn.lock` file changed), it installs the dependencies using Yarn.

## How it Works:

1. **Cache Key Generation**: The key for the cache is generated using the operating system of the runner and a hash of the `yarn.lock` file. This ensures that the cache is only hit when the `yarn.lock` file remains unchanged across workflow runs.
2. **Cache Retrieval**: If the cache is hit, the `node_modules` directory is restored, skipping the installation step.
3. **Dependency Installation**: If the cache is not hit, it installs the dependencies using `yarn install --frozen-lockfile`.

## Usage:

To use this action in your workflow, add the following steps to your `.github/workflows/your-workflow-file.yml`:

```yaml
name: Your Workflow Name

on:
    push: # or any other GitHub event
        branches:
            - main

jobs:
    install:
        runs-on: ubuntu-latest # or any other runner

        steps:
            -   name: Checkout code
                uses: actions/checkout@v2

            -   name: 📥 Install
                uses: ./.github/actions/install
```
