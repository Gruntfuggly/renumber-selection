# Renumber Selection

Simply renumbers lines in the selection. Finds the first number (ignoring leading whitespace) in each line and replaces it with a new number starting from 1.

## Configuration

`renumber-selection.startValue` can be used to start from a different number.

`renumber-selection.increment` can be used to change the increment.

`renumber-selection.regex` can be used to adjust the pattern for matching numbers at the start of lines.

## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.renumber-selection).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

    > ext install renumber-selection

### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/renumber-selection).
