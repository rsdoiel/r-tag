
# r-args

The custom element named _r-args_ is design to look at the URL parameters browser
side and based on the key/value pairs present update the contents if the current
pages&rdquo; _r-marked_ blocks.

Here&rdquo;s the basic algorithm

1. get the keys of all the URL parameters
2. for each key that matches the id attribute of a _r-marked_ custom element update the href triggering a fetch and render if the content.

## Example

We have an HTML page with two _r-marked_ elements. One had the 
id attribute of *main* and the other of *other*.  They start with a default
href value in each.

```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>r-args: demo</title>
        </head>
        <body>
            <section>
                <r-marked id="main">Main not loaded.</r-marked>
            </section>
            <section>
                <r-marked id="other">Other not loaded.</r-marked>
            </section>
            
            <!-- Step 1: Load brick -->
            <script src="brick/brick-1.0.1.min.js"></script>
            <!-- Step 2: Load custom elements -->
            <script src="r-marked/r-marked.js"></script>
            <script src="r-args/r-args.js"></script>
        </body>
    </html>
```

If you specify "main" and "other" in the URL parameters you'll overwrite the current contents of _r-marked_ element.

```
    http://example.com/page.html?main=feature-story.md&other=sidebar.md
```

In this example the _r-marked_ element with *id="main"* will receive the content of "feature-story.md" rendered as HTML. Likewise the *id="other"* witll get the contents of "sidebar.md" rendered as HTML.


