
# r-tags 

## Wireframe websites with Markdown documents and Web Components

This started as an experiment to learn how web components worked.  I wound up writing
three simple web components. 

+ [r-get](r-get/demo.html) brings content into its innerHTML via an Ajax call.
+ [r-marked](r-marked/demo.html) builds on _r-get_ custom element by process the contents it fetches with the [marked](https://github.com/chjj/marked) Markdown processor rendering HTML into the innerHTML of the custom element.
+ [r-args](r-args/demo.html) doesn't render anything, its a processing custom element. It looks at the URL parameters passed to the page finding matching _r-marked_ element *id* attributes. If it finds one then updates the _r-marked_ element's *href* attribute causing new content to be render into the page.

The last two elements allow you to treat HTML pages of rendering engines allowing you to quickly prototype websites using Markdown for content and menus and standard HTML elements and Brick custom elements wireframing the UI.


r-tags depends on

+ [Brick](http://mozilla.github.io/brick/) by Mozilla
+ [Marked](https://github.com/chjj/marked) by Christopher Jeffrey

