
# r-marked

## A markdown custom element

r-marked uses an xhr wrapper to retrieve a markdown file and then uses the [marked]() JavaScript library
to translate that content into HTML.  

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

Give it a [try](r-marked-demo.html)

## Someday, maybe, improvements

Present implementation doesn't optimize the number out bound xhr requests. That could be a big performance
hit depending on how many you had on a page.  It specifying alternate URLS, priority of request, error
handling options would all be nice.

Current implentation places the rendered HTML inside the _r-marked_ element. It would be nice to have
a choice of using the *outerHTML* as well as the *innerHTML*.

Nesting doesn't really make sense for _r-marked_ elements since you don't have a way of insuring the order of the HTTP GET requests.

Another inmprovement would be to allow different Markdown engines by specifying in an attribute
for the r-marked element.


