
# todo

+ r-marked
    - Extend r-marked attributes to allow full configuration of marked rendering
    - Allow alternative markdown rendering engines to be used with the r-marked component.
+ release
    - update to conform with Mozilla coding style for Brick
    - Tag release of 0.0.1
    - Cleanup and submit to a web component catalog/repository

## prototyping

+ r-assert - create a custom element that can be used easily to create fallback script or image elements based on an assertion.

## Someday, maybe implementation

+ Consider adding a timer element that can swap content sources based on network congestion.
    - needs to make good guesses about network speed in less than 1 second so overall page loads in less than 3 seconds
+ Come up with better name for project and custom elements
+ Add support for contenteditable in r-marked block
+ Add a previewer for input type file
+ Add a analog clock face element that can serve as a time input
    - extend HTML5 time input type
    - allow setting multiple times
    - emmit various events (e.g. change)
+ Add x-calendar with textual date type input supporting multi-date
    - extend HTML5 date input type
    - emmit various events (e.g. change)
+ Add a random content picker element (per discusion about interactive fiction with Joe Peters)
    - non-rendering custom element
    - attributes
        + query-selector
        + attribute target
        + replacement value array
+ Add custom element to dropin Fargo outliner

