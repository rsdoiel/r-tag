
# marked-args

The custom element named _marked-args_ is design to look at the URL parameters browser
side and based on the key/value pairs present update the contents if the current
pages' _marked-content_ blocks.

Here's the basic algorithm

1. get the keys of all the URL parameters
2. for each key that matches the id attribute of a _marked-content_ custom element update the href triggering a fetch and render if the content.

## Example

We have an HTML page with two _marked-content_ elements. One had the 
id attribute of "main" and the other of "other".  They start with a default
href value in each.

```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>marked-args: demo</title>
        </head>
        <body>
            <section>
                <marked-content id="main">Main not loaded.</marked-content>
            </section>
            <section>
                <marked-content id="other">Other not loaded.</marked-content>
            </section>
        </body>
    </html>
```


