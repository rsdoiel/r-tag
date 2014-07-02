
# r-marked

## A markdown custom element

r-marked uses an xhr wrapper to retrieve a markdown file and then uses the [marked]() JavaScript library to translate that content into HTML.  

## Usage

```HTML
    <h1>README.md markdown file as HTML</h1>
    <!-- This is the custom element that loads my-file.md and transforms it into HTML -->
    <r-marked href="r-marked/README.md">
         <!-- Since JavaScript may be disabled, provide a friendly link to the raw Markdown content -->
         <noscript><a href="r-marked/README.md" title="Markdown formatted file">r-marked/README.md</a></noscript>
    </r-marked>

    <!-- Step 1: Load in the marked library needed to transform markdown to HTML -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
    <!-- Step 2: Load Brick so we pickup x-tag core -->
    <script src="brick/brick-1.0.1.min.js"></script>
    <!-- Step 3: Create your custom element that renders Markdown files to HTML using marked -->
    <script src="r-marked/r-marked.js"></script>
```

In this configuration we can pull in the markdown file, process it client side and see HTML when
it is ready. It also uses progressive enhancement so if JavaScript is disabled the markded-content 
element gets ignored and a link to the raw markdown file is displayed.

Current implentation emmits a progress event.  The progress event corresponds to the fetch state of the xhr request (e.g. loaded, interactive, complete).

Give it a [try](r-marked-demo.html)

