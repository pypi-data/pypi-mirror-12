Colr
====

A python module for using terminal colors in linux. It contains a simple
`color` function that accepts style and color names, and outputs a string
with escape codes, but also has all colors and styles as chainable methods
on the `Colr` object.

Examples:
---------

###Simple:

```python
from colr import color
print(color('Hello world.', fore='red', style='bright'))
```

###Chainable:
```python
from colr import Colr as C
print(
    C()
    .bright().red('Hello ')
    .normal().blue('World')
)

# Background colors start with 'bg', and AttributeError will be raised on
# invalid method names.
print(C('Hello ', fore='red').bgwhite().blue('World'))

```

Examples (256 Colors):
----------------------

###Simple:

```python
from colr import color
# Invalid color names/numbers raise a ValueError.
print(color('Hello world', fore=125, back=80))
```

###Chainable:

```python
from colr import Colr as C
# Foreground colors start with 'f_'
# Background colors start with 'b_'
print(C().f_125().b_80('Hello World'))
```

Notes:
------

Windows is not supported yet, but I'm working on it. In the past, I used
a simple `color()` function because I'm not fond of the string concatenation
style that other libraries use. The 'clor' javascript library uses method
chaining because that style suits javascript, but I wanted to make it available
to Python also, at least as an option.

The reset code is appended to all text unless the text is empty.
This makes it possible to build background colors and styles, but
also have separate styles for separate pieces of text.

`Colr` objects are callable, and when called as a function will append text
(also with optional color kwargs).

This library may be a little too flexible, and that may change:

```python
from colr import Colr as C
warnmsg = lambda s: C('warning', 'red').join('[', ']')(' ').green(s)
print(warnmsg('The roof is on fire again.'))
```

![The possibilities are endless.](https://welbornprod.com/static/media/img/colr-warning.png)


