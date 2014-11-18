
# r-args

The custom element named _r-args_ is design to look at the URL parameters browser side and based on the key/value pairs present update the contents if the current pages' _r-marked_ blocks match.

Here's the basic algorithm

1. get the keys of all the URL parameters
2. for each key that matches the id attribute of a _r-marked_ custom element update the href triggering a fetch and render if the content.

## USAGE

We have an HTML page with two _r-marked_ elements. One had the _id_ attribute of *main* and the other of *other*.  They start with a default href value in each.

```HTML
        <h1>r-args custom element</h1>
        <p>This experiment shows two custom elements working together.
        The first is <em>r-marked</em> and the second is <em>r-args</em>.
        The custom element <em>r-marked</em> has an id of &ldquo;main&rdquo; and the 
        second has an id of &ldquo;other&rdquo;. Initially both are empty showing some
        default text. Click <a href="?main=MAIN-DEMO.md&other=NAV-DEMO.md">Here</a> to
        run the demo. <a href="./demo.html">Reset</a> the demo.
        </p>
        <section class="main">
            <r-marked id="main">No &ldquo;main&rdquo; content processed.</r-marked>
        </section>
        <section class="other">
            <r-marked id="other">No &ldquo;other&rdquo; content processed.</r-marked>
        </section>
        <!-- Place one r-args custom element in the page. -->
        <r-args></r-args>

        <!-- Step 1. Load in the Marked libary from CDN -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
        <!-- Step 2: Load brick -->
        <script src="brick/brick-1.0.1.min.js"></script>
        <!-- Step 3: Load custom elements -->
        <script src="r-marked/r-marked.js"></script>
        <script src="r-args/r-args.js"></script>
        <!-- Step 4: After everything is loaded we should see a console message. -->
```

If you specify "main" and "other" in the URL parameters you'll overwrite the current contents of _r-marked_ element.

```
    page.html?main=r-args%2fMAIN-DEMO.md&other=r-args%2FNAV-DMEO.md
```

In this example the _r-marked_ element with *id="main"* will receive the content of "r-args/MAIN-DEMO.md" rendered as HTML. Likewise the *id="other"* will get the contents of "r-args/NAV-DEMO.md" rendered as HTML.

Run [r-args](r-args-demo.html) the demo.
