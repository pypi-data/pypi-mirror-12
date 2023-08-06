[![Build Status](https://travis-ci.org/Frojd/Fabrik-CLI.svg?branch=master)](https://travis-ci.org/Frojd/Fabrik-CLI)
[![PyPI version](https://badge.fury.io/py/fabrik-cli.svg)](http://badge.fury.io/py/fabrik-cli)

# Fabrik-Cli
This is a Cli tool for Fabrik that will generate files and supply base settings.

## Requirements
To install Fabrik you need Python 2.7, virtualenv and pip.

## Installation

### Stable
- `pip install fabrik_cli`

### Unstable
- `pip install git+git://github.com/Frojd/Fabrik-CLI.git@develop`

### For development
- `git clone git@github.com:Frojd/Fabrik-CLI.git`
- `virtualenv venv`
- `source venv/bin/activate`
- `pip install --editable .`

## Getting started

### Walkthrough

1. First go to your project folder.

	`cd myproject`
	
2. Setup a virtual environment
	
	`virtualenv venv`
	
3. Activate it

	`source venv/bin/activate`
	
4. Now time to install

	`pip install fabrik_cli`
	
5. **(Optional)** Now is a good time to setup git, the cli will auto detect this if present

	`git init ...`
	
6. Time to run the script. lets create a deploy environment that concist of two servers using a wordpress recipe.

	`fabrik --stages=stage,prod --recipe=wordpress`
	
	This command will create the following files.
	
	```
	/fabfile.py
	/stages/
		__init__.py
		stage.py
		prod.py
	```
	
	This script will create the necessary files and add git repro setting (if present) and recipe import. Once generated, you'll need to add SSH settings and recipe unique settings by editing the files.


	
### Commands

#### Setup

Generates deploy files

```
fabrik-cli
    --stages=local,stage,prod (Your deploy stages)
    --path=/tmp/ (Path to the project, optional)
    --recipe=wordpress (The recipe you will be use, optional)
```

#### Cleanup

Removes deploy files

```
cleanup
    --path=/tmp/ (Path to the project, optional)
    --force (Override prompt)
```


## Roadmap

### Implemented
- Generate stage folder
- __init__ in stage folder
- Individual stage files
- Cli interface
- Repro url

### Not yet implemented
- Additional stage file config data
- A way of auto generating fabricrc / stage config depending on recipe
- Merged back into Fabrik


## Developing
- Coverage
	- `coverage run runtests.py`
	- `coverage report -m`
	- `coverage html`
	- `open htmlcov/index.html`
	- `coverage erase`
- Test
	- `python runtests.py`

## Code guide
- Pep8
- TDD

## Contributing
Want to contribute? Awesome. Just send a pull request.

## Licence
Fabrik-Cli is released under the [MIT License](http://www.opensource.org/licenses/MIT).
