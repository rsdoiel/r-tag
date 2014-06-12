
# marked-content

## A markdown custom element

marked-content uses an xhr wrapper to retrieve a markdown file and then uses the [marked]() JavaScript library
to translate that content into HTML.  

## Usage

```HTML
    <h1>My markdown file</h1>
    <!-- This is the custom element that loads my-file.md and transforms it into HTML -->
    <marked-content href="my-file.md">
      <!-- Since JavaScript may be disabled, provide a friendly link to the raw Markdown content -->
      <noscript><a href="my-file.md" title="Markdown formatted file">my-file.md</a></noscript>
    </marked-content>
    
    <!-- Step 1: Load Brick so we pickup x-tag core -->
    <script src="brick/brick-1.0.1.mins.js"></script>
    <!-- Step 2: Load in the marked library needed to transform markdown to HTML -->
    <script src="marked.min.js"></script>
    <!-- Step 3: Create your custom component -->
    <script src="marked-content/marked-content.js"></script>
    <script>
    // When the DOM fires DOMComponentsLoaded we should see our Markdown processed.
    document.addEventListener('DOMComponentsLoaded', function () {
         console.log("My markdown file should render now.");
    });
    </script>
```

In this configuration we can pull in the markdown file, process it client side and see HTML when
it is ready. It also uses progressive enhancement so if JavaScript is disabled the markded-content 
element gets ignored and a link to the raw markdown file is displayed.

