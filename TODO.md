
# todo

+ r-marked
    - Add support to render markdown from the innerHTML of an _r-marked_ element.
    - Extend r-marked attributes to allow full configuration of marked rendering
+ package for release
    - Setup code to build with Grunt
    - Setup script to provide minified versions in a combined file for all r-tags
    - Tag release of 0.0.1
    - Cleanup and submit to a web component catalog/repository

## prototyping

+ r-assert - create a custom element that can be used easily to create fallback script or image elements based on an assertion.

## Someday, maybe implementation

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
+ Add a custom loader element
    + support for CDN  and fallcallback src attributes
    + support for grabbing JSON blobs and assigning to an object
    + optional caching of content loaded in local storage
