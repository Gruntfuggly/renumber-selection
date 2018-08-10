# Renumber Selection

Simply renumbers lines in the selection. Finds the first number in each line and replaces it with a new number starting from 1.

Examples:

|Before|After|
|------|-----|
|3 One<br>4 Two<br>2 Three|1 One<br>2 Two<br>3 Three|
|One 1!<br>Two 1!<br>Three 1!|One 1!<br>Two 2!<br>Three 3!|
|2<br>Red<br>3<br>Green<br>2|1<br>Red<br>2<br>Green<br>3|
|1.2<br>1.3<br>1.5|1.2<br>2.3<br>3.5|
|REQ001 - do stuff<br>REQ001 - more stuff<br>REQ512 - other stuff|REQ001 - do stuff<br>REQ002 - more stuff<br>REQ003 - other stuff|

## Configuration

`renumber-selection.startValue` can be used to start from a different number.

`renumber-selection.increment` can be used to change the increment.

`renumber-selection.regex` can be used to adjust the pattern for matching lines with numbers. 

*Note: The regex must contain at least two capture groups. The first should match everything before the 'number' and the second should match the 'number' itself, or watch you want to replace with the incrementing counter. The default regex preserves decimal parts of the number.*

`renumber-selection.highlightChanges` can be set to `false` to disable highlighting the replaced numbers

`renumber-selection.highlightDark` can be used to change the highlight (for dark themes)

`renumber-selection.highlightLight` can be used to change the highlight (for light themes)

`renumber-selection.highlightRulerColour` can be used to change the colour of the ruler indications

`renumber-selection.highlightRulerLane` can be used to change the ruler lane

*Note: The highlight uses CSS outlines. So valid values should include a style (e.g. dashed, dotted, etc. ), a width (e.g. 1px) and a colour. E.g. "solid 2px red"*

### Ignoring comments

If you have commented lines which would normally match the regex, you can ignoring them by modifying the regex to include the comment character. For example, to ignore commented lines in markdown, change the regex to:
`"^([^#]*?)(\\d+)(\\.\\d+)?"`


## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.renumber-selection).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

    > ext install renumber-selection

### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/renumber-selection).
