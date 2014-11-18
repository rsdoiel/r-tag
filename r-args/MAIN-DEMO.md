
# r-args

The custom element named _r-args_ is design to look at the URL parameters browser side and based on the key/value pairs present update the contents if the current pages' _r-marked_ blocks match.

Here's the basic algorithm

1. get the keys of all the URL parameters
2. for each key that matches the id attribute of a _r-marked_ custom element update the href triggering a fetch and render if the content.


In this example the _r-marked_ element with *id="main"* will receive the content of "r-args/MAIN-DEMO.md" rendered as HTML. Likewise the *id="other"* will get the contents of "r-args/NAV-DEMO.md" rendered as HTML.

Run [r-args](r-args-demo.html) the demo.

