# Introduction
**pytest-tblineinfo** is a *py.test* plugin that insert the node id in the
final py.test report when `--tb=line` option is used.

## Rationale
By default in the `--tb=line` mode, py.test only report the python file and
line where the assertion occurs. 
When the exception occurs in an helper or plugin function, it is not easy to
relate the error with a test.

This plugin is intended to resolve this issue.

# Installation
```
pip install pytest-tblineinfo
```

# Usage
Simply call py.test with `--tb=line` once the plugin is installed,  and the
end report of *py.test* will prefix the errors with the test name.


