
# http-get custom element

This custom element retrieves the content of a URL specified as an href attribute and replaces itself 
with the retrieved content (i.e. outerHTML setting). A default value can be expressed in the innerHTML
of the http-get element.

## Usage

```HTML
    <h1>Here's some data loaded into a &lt;pre&gt; element</h1>
    
    <!-- 
    <pre><http-get href="http://example.com/json-api-result">[]</http-get></pre>
    
    <!-- Step 1: Load Brick so we have x-tag core available -->
    <script src="brick/brick-1.0.1.min.js"></script>
    <!-- Step 2: Load our custom element -->
    <script src="http-get/http-get.js"></script>
    <script>
        document.addEventListener('DOMComponentsLoaded', function () {
            // Our custom component should be loaded and the contents of <pre>
            // Updated with values.
        });
    </script>
```

## someday, maybe improvements

+ Add alternative URLs if first one fails
+ Add timeout settings
+ Add other error handling options
+ Allow check for mime-type
+ Allow check to process the results with another JS function
