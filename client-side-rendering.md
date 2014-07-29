
# client side rendering

r-tags supports easy client side rendering of markdown content using standard HTML pages as rendering engines. It does this by adding two custom elements (a.k.a. Web Components).  They are _r-marked_ and _r-args_.  With those two it is easy to create complex HTML pages that use markdown documents to fill content areas and even describe navigation elments. This is the story of how _r-tags_ evolved and came to hold its present shape. Hopefully this experiment will prove useful. I had fun building it.
-- rsd, 2014-06-13


## r-tags evolution

Over a lunch I was thinking about client side content rendering of markdown. Previously I had build a custom element for processing markdown files for my personal [website](http://rsdoiel.github.io). It worked nicely even on my cell phone web browser. Could I use this approach to make more complicated content pages? I needed a way to use the the same HTML page as a content rendering engine for one or more markdown documents. I needed a way to generate navigation between pages easily.

A sip of coffee and I focused on site navigation. With server side engines like Wordpress navigation/menus are part of the theme and administrative setup. I remembered this because one of the clients at work need to tweak the default permissions for editors so that the editors could edit menus. Sometimes that is a good idea sometimes not. If the menus (navigation) had been content to begin with then the existing permissions would have worked fine.

After a few more sips of coffee I decide treating navigation as content seems like a good way to go. Navigation can be built from a *ul* element.  That is easy in markdown.  I wondered, "what metadata do I need to carry forward to make it all work? Do I need more web components?"  My initial requirements look like--

1. I need a way to link to an HTML file where it knows how to process the mardkdown content into HTML
2. I need a way to transform a UL list of links calling those HTML files with the appropriate markdown documents

I sketched a markdown file that would render a *ul* list linking to markdown documents.

```markdown
    + [Home](index.md)
    + [Articles](articles.md)
        - [Young Person's Guide to Web Compenents](articles/web-components.md)
    + [CV](cv.md)
    + [About Me](bio.md)
```

That is a good start but think links are directly to the markdown document and not to the HTML. The markdown above renders out something like--

```
    <ul>
        <li><a href="index.md">Home</a></li>
        <li><a href="articles.md">Article</a>
            <ul>
                <li><a href="articles/web-components.md">Young Person's Guide to Web Compenents</a></li>
            </ul>
        </li>
        <li><a href="cv.md">CV</a></li>
        <li><a href="bio.md">About Me</a></li>
    </ul>
```

Markdown is pleasently minimal. Adding to its syntax seems ugly. How could I cary additional context of html page and markdown file? I started thinking about the *href* side of the markdown expression and that showed the way forward.

A webpage can evaluate the URL parameters easily, "Why not use a URL parameter to describe which markdown file needs to be processed?" No modification to Markdown syntax. I use plain old fashioned URL webness. That lead to markdown like--

```
    + [Home](index.html?render=index.md)
    + [Articles](article.html?render=articles.md)
        - [Young Person's Guide to Web Compenents](article.html?render=articles%2Fweb-components.md)
    + [CV](cv.html?render=cv.md)
    + [About Me](index.html?render=bio.md)
```

I thought, "that should render out pretty close to what I need."

```
    <ul>
        <li><a href="index.html?render=index.md">Home</a></li>
        <li><a href="article.html?render=articles.md">Article</a>
            <ul>
                <li><a href="article.html?render=articles%2Fweb-components.md">Young Person's Guide to Web Compenents</a></li>
            </ul>
        </li>
        <li><a href="cv.html?render=cv.md">CV</a></li>
        <li><a href="index.html?render=bio.md">About Me</a></li>
    </ul>
```

All the data I need is there, the HTML file to use, the markdown file to fill with. More coffee.

Soon I realized that works except it only allows from a single _r-marked_ element per HTML document.  What I really needed was--

1. a way to specify the HTML file rendering the content
2. a way to specify one or more markdown documents
3. a way to target specific _r-marked_ elements with a specific markdown document

I started thinking about the _r-marked_ custom element I had already prototyped for rendering my home page and CV. It was only half right. The *href* in the _r-marked_ in the HTML was hard coded. When the element was created it immediately fetched the content. If the *href* was missing it died.  I needed more flexibility. I needed to allow the *href* to change and when it changed update the content rendered.  Fortunately [x-tags](http://x-tags.org) made that very easy to add by modifying the Web Component's lifecycle.

I also needed an element that would process those URL parameters. It could find the appropriate _r-marked_ targets then trigger an update by populating the *href*. That was the start of a working solution. This might actually work.

+ _r-marked_ custom element renders HTML from markdown from the *href* or when the *href* is changed
+ _r-args_ custom element reads the URL parameters then updates the appropriated _r-marked_ elements's *href*

I still needed a way to map a specific markdown file to a specific _r-marked_ element.  I needed to resolve to an "id".  I could user a parameter "render=" and an "id=". Seems wrong though to make pairwise pairs to two pieces of related data. It would also lead to longer URLs quickly.  Nope, not the right path.  I was almost out coffee.

To know which _r-marked_ attribute *id*s to process I could assume the *id* was the key (left side) or a URL parameter. Then the value (right side) would be the path to the markdown document. Replacing "render" with the *id*'s name would simplify handling the key/value pairs too. All I need to do is process the browser's *window.location.search* object. Add a little url encoding/decoding and we're set.


## Walking through _r-args_

Let's say I have an HTML file, *story.html*, that has two _r-marked_ elements. One has a *id* attribute value of "nav" the second has an *id* attribute of "main-content".  _r-args_ would process a URL that might looks like 
 
```
    story.html?navigation=nav.md&main-content=my-store.md
```

Great I can tell what HTML page I'm targetting and which _r-marked_ element gets its markdown file.

What happens if *story.html* defines two _r-marked_ element with *id* of **nav** and of **main-content** and the URL only has one?

```
    story.html?main-content=my-store.md
```

Then *main-content* works fine. I wouldn't update the _r-marked_ element with an *id* of **nav**.  It would remain inert. Additional if the URL included an *id* that didn't match a _r-marked_ element it would just be ignored. Bingo.

That seems flexible enough.  Now let's try out a basic markdown document example of website navigation.

```
    + [Home](index.html?main-content=index.md)
    + [Articles](article.html?main-content=articles.md)
        - [Young Person's Guide to Web Compenents](article.html?main-content=articles%2Fweb-components.md)
    + [CV](cv.html?main-content=cv.md)
    + [About Me](index.html?main-content=bio.md)
```

Each link specifies the HTML page to use as renderer, and which elements gets filled with a specific markdown document.
Humm, a working solution. All the information is available to know which markdown files to include and which elements should get updated. 


## Here's our algorithm

+ _r-args_ custom element gets a list of all the _r-marked_ elements in the page using
querySelectorAll() remembering the elements and their id attributes.  
+ next traverse the URL parameters (found in *window.location.search*)
    - if matching an *id* attribute of a  _r-marked_ then it can update the *href* attribute. 
        + markdown content to be retrieved, converted and inserted into our HTML document
    - else do nothing
+ Two custom elements, _r-marked_ and _r-args_, gives me the rendering control I normally would have in a server side CMS like Wordpress. 

Sweetness.

That's what I wound up [implementing](https://github.com/rsdoiel/r-tags).
