

# r-get custom element

This custom element retrieves the content of a URL specified as an *href* attribute and replaces its *innerHTML* with the retrieved content. A default/fallback value can be expressed in the innerHTML of the r-get element.

## Usage

```HTML
    &lt;h1&gt;Here's some data loaded into a &lt;pre&gt; element&lt;/h1&gt;

    &lt;pre&gt;&lt;r-get href="hello-world.json"&gt;[]&lt;/r-get&gt;&lt;/pre&gt;

    &lt;!-- Step 1: Load Brick so we have x-tag core available --&gt;
    &lt;script src="brick/brick-1.0.1.min.js"&gt;&lt;/script&gt;
    &lt;!-- Step 2: Load our custom element --&gt;
    &lt;script src="r-get/r-get.js"&gt;&lt;/script&gt;
```

## someday, maybe improvements

+ Add alternative URLs if first one fails
+ Add timeout settings
+ Add other error handling options
+ Allow check for mime-type
+ Allow check to process the results with another JS function

