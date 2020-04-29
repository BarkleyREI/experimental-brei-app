# generator-brei-next


[![Version npm][version]](http://browsenpm.org/package/generator-brei-next)
[![Build Status](https://travis-ci.org/BarkleyREI/experimental-brei-app.svg?branch=master)](https://travis-ci.org/BarkleyREI/experimental-brei-app)

[version]: http://img.shields.io/npm/v/generator-brei-next.svg?style=flat-square

## Getting Started with a Project

Install Yeoman

```bash
npm install -g yo
```

Install the BREI-Next Generator

```bash
npm install -g generator-brei-next
```

Finally, initiate the generator in an empty directory:

```bash
yo brei-next
```

From here you will be presented with a series of options:
```bash
What would you like to do? (Use arrow keys)
❯ Create a New Project
  Create a Template
  Create an Organism
  Create a Molecule
  Create an Atom
  Create a Partial (LEGACY)
  Create a Module (LEGACY)
  ```
Just follow the prompts and off you go!

### Dropbox

- Do not stage the project (run npm install or other dependency managers) from Dropbox. The dependency folders, especially `node_modules`, contain thousands of files and directories, and Dropbox can freeze the disk or cause permissions errors while it syncs.

## Sub-Generators

#### All Sub-Generators install the properly formatted .hbs and .scss file according to BarkleyREI front-end coding standard conventions.

#### Note: you can either run `yo brei-app` and select the desired sub generator task, or you can use the following commands to do it manually.

Create a new Project:
```bash
yo brei-next:new
```

Create a new Template:
```bash
yo brei-next:template
```

Create a new Organism
```bash
yo brei-next:organism
```

Create a new Molecule
```bash
yo brei-next:partial
```

Create a new Atom
```bash
yo brei-next:partial
```

Create a new Partial (LEGACY)
```bash
yo brei-next:partial
```

Create a new Module (LEGACY)
```bash
yo brei-next:module
```

## Testing the Generator

**This only needs run if you are locally modifying the generator files in this repo, not a project created with it.**

To Test:
```bash
npm test
```

The test takes about 3-4 minutes to run.
