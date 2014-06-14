
# r-marked

## A markdown custom element

r-marked uses an xhr wrapper to retrieve a markdown file and then uses the [marked]() JavaScript library
to translate that content into HTML.  

## Usage

```HTML
    <h1>My markdown file as HTML</h1>
    <!-- This is the custom element that loads my-file.md and transforms it into HTML -->
    <r-marked href="my-file.md">
      <!-- Since JavaScript may be disabled, provide a friendly link to the raw Markdown content -->
      <noscript><a href="my-file.md" title="Markdown formatted file">my-file.md</a></noscript>
    </r-marked>
    
    <!-- Step 1: Load Brick so we pickup x-tag core -->
    <script src="brick/brick-1.0.1.mins.js"></script>
    <!-- Step 2: Load in the marked library needed to transform markdown to HTML -->
    <script src="marked.min.js"></script>
    <!-- Step 3: Create your custom element that renders Markdown files to HTML using marked -->
    <script src="r-marked/r-marked.js"></script>
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

## Sometday, maybe, improvements

In the present implementation the HTTP GET request is fired on element creation. This could be blocking. A
better way would be to get the markdown content only when inserted into the DOM. This would allow you to
conditionally include the r-marked element with having the overhead of the HTTP GET request.

Good software practice would also suggest making the HTTP GET it's own component and have r-marked
take data from its innerHTML. When that was changed it would trigger a refresh and translation from markdown
to HTML by marked library.

A third inmprovement would be to allow different Markdown engines by specifying the URL in an attribute
for the r-marked element. It would also be useful for the custom element to replace it's outer HTML
with the translated HTML result from the markdown. 


