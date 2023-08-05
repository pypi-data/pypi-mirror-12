# ksr - commandline kickstarter

ksr is a mini kickstarter platform for the commandline.

You can use `ksr --help` for a quick reference of all the commands, or `ksr command --help`
 for more details about a particular command.

If you are in bash, you can activate shell completion with `eval "$(_KSR_COMPLETE=source ksr)"`

## Installation and Testing

To install ksr system/virtualenv-wide: `pip install .`
To use without installing: `alias ksr=$PWD/bin/ksr`
The tests require [assert.sh](https://github.com/dansoton/assert.sh), which can be installed with: `cd assert.sh; git submodule init; git submodule update; cd ..`
Run the tests via `./tests.sh`
This has only been tested on python 3.5 on osx.

## Quick Reference

Here is an example session:

```bash
> project Awesome_Sauce 500
Added Awesome_Sauce project with target of $500

> back John Awesome_Sauce 4111111111111111 50
John backed project Awesome_Sauce for $50

> back Jane Awesome_Sauce 5555555555554444 50
Jane backed project Awesome_Sauce for $50

> list Awesome_Sauce
-- John backed for $50
-- Jane backed for $50
Awesome_Sauce needs $400 more dollars to be successful

> back Mary Awesome_Sauce 5474942730093167 400
Mary backed project Awesome_Sauce for $400

> list Awesome_Sauce
-- John backed for $50
-- Jane backed for $50
-- Mary backed for $400
Awesome_Sauce is successful!

> backer John
-- Backed Awesome_Sauce for $50
```
