
# r-tags 

## Wireframe websites with Markdown documents and Web Components

This started as an experiment to learn how web components worked.  I wound up writing three simple web components. Two let you easy create wireframe
websites where Markdown documents serve as content source files and HTML pages run as render engines.

+ [Client Side Rendering](page.html?main=client-side-rendering.md), a story about how this works and evolved.
+ Quick Demos
    - [r-marked](r-marked-demo.html) builds on JavaScript xhr creating a custom element retrieves a markdown document and processes it the [marked](https://github.com/chjj/marked) Markdown processor rendering HTML into the innerHTML of the custom element.
    - [r-args](r-args-demo.html) doesn't render anything, its a processing custom element. It looks at the URL parameters passed to the page finding matching _r-marked_ element *id* attributes. If it finds one then updates the _r-marked_ element's *href* attribute causing new content to be render into the page.
+ The JavaScript
    - [r-marked](r-marked/r-marked.js)
    - [r-args](r-args/r-args.js) 


The last two elements allow you to treat HTML pages as rendering engines allowing you to quickly prototype websites using Markdown for content, navigation with standard HTML elements and Brick custom elements additional UI prototyping.


r-tags depends on

+ [Brick](http://mozilla.github.io/brick/) by Mozilla
+ [Marked](https://github.com/chjj/marked) by Christopher Jeffrey


