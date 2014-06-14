

# r-get custom element

This custom element retrieves the content of a URL specified as an *href* attribute and replaces its *innerHTML* with the retrieved content. A default/fallback value can be expressed in the innerHTML of the r-get element.

## Usage

```HTML
    <h1>Load some data</h1>
    <p>Fill the <em>pre</em> element with <a href="hello-world.json">hello-world.json</a></h1>

    <pre><r-get href="hello-world.json">[]</r-get></pre>

    <!-- Step 1: Load Brick so we have x-tag core available -->
    <script src="brick/brick-1.0.1.min.js"></script>
    <!-- Step 2: Load our custom element -->
    <script src="r-get.js"></script>
```

Give is a [try](r-get-demo.html).

## someday, maybe improvements

+ Add alternative URLs if first one fails
+ Add timeout settings
+ Add other error handling options
+ Allow check for mime-type
+ Allow check to process the results with another JS function

