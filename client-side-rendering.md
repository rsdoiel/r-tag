
# client side rendering

        r-tags supports easy client side rendering of markdown content using standard HTML pages
        as rendering engines. It does this by adding two custom elements (a.k.a. Web Components).
        They are r-marked and r-args.  With those two it is easy to create complex HTML pages that
        use Markdown to fill content areas and even describe navigation elments. This documents looks
        at how _r-tags_ evolved came to hold its present shape. At the end of the day it is only an
        experiment but one I found useful. I had fun building it.
        -- rsd, 2014-06-13


## r-tags evolutoin

Over a lunch I was thinking about client side content rendering of markdown.  I had build a custom markdown element for my personal site. It worked nicely. Even on my cell phone's web brower. I started thinking how I could use this approach to make more complicated content pages. I didn't want to have to write HTML wrapers for each markdown document. I needed a way to use the the same HTML page as a content rendering engine for one or more markdown documents. I needed a way to generate navigation between pages. What I needed was commonly provided server side by rendering scripts or blog engines like Wordpress.  I didn't want to resort to those.

A sip of coffee and I focused on site navigation. Wordpress treats navigation as part of the theme or site design. I remembered this because one of the clients at work need to tweak the default permissions for editors so that the editors could edit menus. Sometimes that is a good idea sometimes not. If the menus (navigation) had been content to begin with then the existing permissions would have worked fine.

A few more sips of coffee and treating navigation as content seems like a good way to go. What I needed was a *UL* list and that's easy in markdown.  I wondered, "what metadata do I need to carry forward to make it all work? Do I need more web components?"  Here's what I started thinking the requirements would be--

1. I need a way to link to an HTML file where it knows the mardkdown content to render
2. I need a way to transform a UL list of links calling those HTML files with the appropriate markdown documents

I sketched a markdown file that would render a *UL* list linking to markdown documents.

```markdown
    + [Home](index.md)
    + [Articles](articles.md)
        - [Young Person's Guide to Web Compenents](articles/web-components.md)
    + [CV](cv.md)
    + [About Me](bio.md)
```

That was a good start but we're linking directly to the markdown document and they're not HTML. The markdown above renders out something like--

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

Markdown is pleasently minimal. Adding to syntax seemed ugly. How could I cary more context? I started thinking about the *href* side of the markdown expression and that showed the way forward.

A webpage can evaluate the URL parameters easily.  "Why not use a URL parameter to describe which markdown file needs to be processed?", No modification to Markdown syntax, just leveraging old fashioned URL webness. That lead to markdown like--

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

1. a way to link to a HTML file that knows how to render some content
2. a way to transform a UL list of links calling those HTML files with the appropriate markdown documents
3. a way to target specific _r-marked_ elements by some sort of id

I started thinking about the _r-marked_ custom element I had already prototyped for rendering my home page and CV. It was only half right. The *href* in the _r-marked_ in the HTML was hard coded. When the element was created it immediately fetched the content. If the *href* was missing it died.  I needed more flexibility. I needed to allow the *href* to change and when it changed update the content rendered.  Fortunately [x-tags](http://x-tags.org) made that very easy to add.

I also needed an element that would process those URL parameters. It could find the appropriate _r-marked_ targets then trigger an update by populating the *href*. That was the start of a working solution. It might even be useful for someone.

    + _r-marked_ custom element renders HTML from markdown from the *href* or when the *href* is changed
    + _r-args_ custom element reads the URL parameters then updates the appropriated _r-marked_ elements's *href*

I still needed a way to map a specific markdown file to a specific _r-marked_ element.  I needed to resolve to an "id".  I could user a parameter "render=" and an "id=".  It make me track the order of the pairs of pairwise values. And it would get long quick.  Nope, not the right path.  I was almost out coffee.

To know which _r-marked_ attribute *id*s to process I could assume the *id* was the key (left side) and the value (right side) was the path to the markdown document. Updating my early version "render" would be replaced with an attribute *id*. It is easy to find the key/value (id/path to markdown doc) pairs in the browser's *window.location.search* object. Add a little url encoding/decoding and we're set.


## Walking through the concept

Let's say I have an HTML file, *story.html*, that has two _r-marked_ elements. One has a *id* attribute value of "nav" the second has an *id* attribute of "main-content".  _r-args_ would process a URL that might looks like 
 
```
    story.html?navigation=nav.md&main-content=my-store.md
```

What happens if *story.html* defines two _r-marked_ element with *id* of **nav** and of **main-content** and the URL only one?

```
    story.html?main-content=my-store.md
```

Then I wouldn't update the _r-marked_ element with he *id* of **nav**.  It would remain inert. No update to the *href*. If the URL included an *id* that didn't match it would just be ignored.

That seems flexible enough.  Now let's try out a basic markdown document
example to create some navigation around a website.

```
    + [Home](index.html?main-content=index.md)
    + [Articles](article.html?main-content=articles.md)
        - [Young Person's Guide to Web Compenents](article.html?main-content=articles%2Fweb-components.md)
    + [CV](cv.html?main-content=cv.md)
    + [About Me](index.html?main-content=bio.md)
```

Each link specifies the HTML page to use as renderer, and which elements get filled with a specific markdown document.
Humm that' would work. All the information is available to know which markdown files to include and which elements should get updated. 


## Here's out process

The _r-args_ custom element gets a list of all the _r-marked_ elements in the page using
querySelectorAll() remembering the elements and their id attributes.  Next it traverses the URL parameters (found in *window.location.search*). If it finds parameter names matching an *id* attribute of a  _r-marked_ then it can update the *href* attribute. That causes the markdown content to be retrieved, converted and inserted into our HTML document. That works. Two custom elements, _r-marked_ and _r-args_, gives me the rendering control I normally would have in a server side CMS like Wordpress. 

Sweetness. 

Time to get Coding.

