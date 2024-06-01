# 📦 Node Modules - GitHub Action

This GitHub Action is designed to restore the `node_modules` cache, improving the speed of workflows by using cached versions of dependencies. It specifically targets Node.js projects and uses the cache based on the content of the `yarn.lock` file.

## 🚀 Features

- Uses the `actions/cache` action to manage the caching of `node_modules`.
- Takes into account the OS of the runner to ensure platform-specific dependencies are properly cached.
- Relies on the `yarn.lock` file to ensure that the cache is as up-to-date as your dependencies.

## 📝 Usage

To use this action in your workflow, follow the steps below:

1. Create (if you haven't already) a workflow `.yml` file in your `.github/workflows` directory.
2. Incorporate the `📦 Node Modules` action from the local action path `./.github/actions/restore` as illustrated in the example below:

```yaml
name: Your Workflow Name

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: 📦 Node Modules
      uses: ./.github/actions/restore

    - name: Install dependencies
      run: yarn install

    # Add your other steps like running tests, build, etc.
```

## 📌 Notes

- The action uses the `fail-on-cache-miss: true` setting, which means the workflow will fail if the cache can't be restored. Depending on your use-case, you might want to adjust this behavior.

## 💡 Example

Considering you've installed the action in the `./.github/actions/restore` directory:

Your workflow will automatically attempt to restore the `node_modules` cache before installing the dependencies using `yarn install`. If the cache is found and matches the current `yarn.lock`, it will restore the `node_modules` directory from the cache. If not, the workflow will proceed to install the dependencies normally and cache them for future use.

## 📖 Conclusion

By utilizing this action, you can potentially save significant time during your workflow runs, especially for projects with a large number of dependencies. Make sure your workflow is set up correctly to make the most out of the caching capabilities provided by this action.
