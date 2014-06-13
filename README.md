
# r-tags 

## Wireframe websites with Markdown documents and Web Components

This started as an experiment to learn how web components worked.  I wound up writing
three simple web components. 

+ [http-get](http-get/demo.html) brings content into its innerHTML via an Ajax call.
+ [marked-content](marked-content/demo.html) builds on _http-get_ custom element by process the contents it fetches with the [marked](https://github.com/chjj/marked) Markdown processor rendering HTML into the innerHTML of the custom element.
+ [marked-args](marked-args/demo.html) doesn't render anything, its a processing custom element. It looks at the URL parameters passed to the page finding matching _marked-content_ element *id* attributes. If it finds one then updates the _marked-content_ element's *href* attribute causing new content to be render into the page.

The last two elements allow you to treat HTML pages of rendering engines allowing you to quickly prototype websites using Markdown for content and menus and standard HTML elements and Brick custom elements wireframing the UI.


r-tags depends on

+ [Brick](http://mozilla.github.io/brick/) by Mozilla
+ [Marked](https://github.com/chjj/marked) by Christopher Jeffrey

