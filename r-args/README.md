
# r-args

The custom element named _r-args_ is design to look at the URL parameters browser
side and based on the key/value pairs present update the contents if the current
pages' _r-marked_ blocks.

Here's the basic algorithm

1. get the keys of all the URL parameters
2. for each key that matches the id attribute of a _r-marked_ custom element update the href triggering a fetch and render if the content.

## Example

We have an HTML page with two _r-marked_ elements. One had the 
id attribute of "main" and the other of "other".  They start with a default
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
        </body>
    </html>
```


