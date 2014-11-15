
# todo

+ Update source to conform to Mozilla Brick dependency
+ Test on Firefox OS, tweak for performance
+ r-marked
    - Extend r-marked attributes to allow full configuration of marked rendering
+ before release
    - Find, review Mozilla coding standard documents for Brick and make sure this conforms
    - Tag release of 1.0.1
    - Cleanup and submit to an appropriate web component catalog/repository
+ Investigate solution spiders crawling site and confirm empact on visibility
+ Review and improve assibility options

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

