# X

## Motivation

Nowadays we have a few options for package managers on the Frontend world. Some famous ones are _npm,_ _yarn_ and _pnpm_. Because of that, we worked on some projects that have `yarn`, other has
`pnpm`, and other uses `npm` and it was always hard to follow which project uses what. Of course, you already passed through a situation where you were in a project that uses _npm_ and then when you change to another project by accident you were always trying to add new dependencies using the _npm_ CLI but the project uses yarn, and so on.

X is the command to try to solve this problem. Using `x` you can configure a `.x-rc` file with which command the project uses or let `x` determine which package manager to use based on the `lockfile` the project has.

## Installation

To use `x` you just need to install it globally using one of the package managers (npm, pnpm or yarn):

npm:

```
npm install -g @matheusrocha89/x
```

yarn:

```
yarn global add @matheusrocha89/x
```

pnpm:

```
pnpm add -g @matheusrocha89/x
```

## How to use

You can just run any command of the package manager of the project but replace the package manager name with `x`. For example:

### Adding new dependency:

Npm:

```
npm install lodash
```

X:

```
x install lodash
```

It also accepts the flags of the package managers and forwards them to the command:

Npm installs as dev dependecy:

```
npm install -D lodash
```

X:

```
x install -D lodash
```

## .x-rc

You can create a `.x-rc` in your project with the package manager that `x` should use.

For NPM:

```
echo "npm" >> .x-rc
```

For Yarn:

```
echo "yarn" >> .x-rc
```

For PNPM:

```
echo "pnpm" >> .x-rc
```
