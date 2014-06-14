
# client side rendering

    r-tags supports easy client side rendering of markdown content using standard HTML pages with two custom elements as render engines. This documents looks at how _r-tags_ evolved and how the current implementation works. At the end of the day it was only and experiment but you may find it useful. I had fun building it.

- rsd, 2014-06-13

## r-tags evolutoin

Over lunch I was thinking about client side content rendering of markdown.  I had build a custom markdown element for my personal site. It worked nicely. Even on my cell phone. I started thinking how more then just rendering the main content of a page. I didn't want to have to write HTML wrapers for each markdown document.  I needed a way to generate navigation between pages. I needed a way that one page (or a few) could function like a rendering engine for one or more markdown documents. 

After a few more sips of coffee and I returned to navigation. Many CMS like Wordpres treat navigation as part of the theme or site design. Sometimes that is a good idea. Sometimes it now. In my case I wanted flexibility to change my site without resorting to updating HTML, CSS, JSON or JavaScript. That got me thinking in terms of navigation as content. That meant I whould focus on markdown to represent the nav.

A few more sips of coffee later and treating navigation as content seems like a good way to go. What I needed was a *UL* list and that's easy in Markdown.  I wondered, "what metadata do I need to carry forward to make it all work? Do I need more web components?"  Here's what I thought I'd need was--

1. I need a way to link to a HTML file that knows how to render some content
2. I need a way to transform a UL list of links calling those HTML files with the appropriate markdown documents

Let's sketch out a markdown file that would render a *UL* list--

```markdown
    + [Home](index.md)
    + [Articles](articles.md)
        - [Young Person's Guide to Web Compenents](articles/web-components.md)
    + [CV](cv.md)
    + [About Me](bio.md)
```

That's a good start but we're linking directly to the markdown document and that's not HTML. It renders out something like

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

Markdown is pleasently minimal. I didn't want to add anything to it. I needed to cary more context. Thinking about the href side of the Markdown expression showed the way forward.

A webpage can evaluate the URL parameters easily.  "Why not use a URL parameters' name render to describe which markdown file needs to be processed?", No modification to Markdown syntax, just leveraging old fashioned webness. This is what thre navigation file might look like--

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

Soon I realized that works for does not let me target a specific _r-marked_ element in a page.What I really needed was--

1. a way to link to a HTML file that knows how to render some content
2. a way to transform a UL list of links calling those HTML files with the appropriate markdown documents
3. a way to target specific _r-marked_ elements by some sort of id


So the current custom element didn't cut it.  It  only fetched content on creation. I need to modify it show that an update to the *href* attribute would trigger a content refresh.  Then I could use a second element, a process element, to find which _r-marked_ elements were targeted and update them.  Then I though it actually might work, might even be useful.

+ _r-marked_ custom element renders HTML from markdown from the href or when the href is changed
+ _r-args_ custom element reads the URL parameters then updates the appropriated _r-marked_ elements

To know which _r-marked_ attribute *id*s to process I would assume the *id* was the key (left side) and the value was the path to the markdown document (right side).  That is simple to do in JavaScript using the *window.location.search* value and url encoding/decoding.


Let's say I have an HTML file, *story.html*, that has two _r-marked_ elements. One has a *id* attribute value of "navigation" the second has an *id* attribute of "main-content".  _r-args_ would process a URL that might looks like 

```
    story.html?navigation=nav.md&main-content=my-store.md
```

If *story.html* explicitly defines a markdown file for **nav** by setting the _href_ only for **main-content** might look like this--

```
    story.html?main-content=my-store.md
```

That seems flexible enough.  Now let's try our a basic markdown document
example to create some navigation around a website.

```
    + [Home](index.html?main-content=index.md)
    + [Articles](article.html?main-content=articles.md)
        - [Young Person's Guide to Web Compenents](article.html?main-content=articles%2Fweb-components.md)
    + [CV](cv.html?main-content=cv.md)
    + [About Me](index.html?main-content=bio.md)
```

Humm that' would work. All the information is available to know which markdown files to include and which elements should get updated. 

## How it works

The _r-args_ custom element gets a list of all the _r-marked_ elements in the page using
querySelectorAll() remembering the elements and their id attributes.  Next it traverses the GET args and when it finds 
parameters names matching the id attribute it set the _r-marked_ href to the parameters value after normalizing the URL reference. That works. Two custom elements gives me the rendering control I find in most CMS without running one or running 
server side scripts to generate navigation blocks. Time to get Coding.

Sweetness.
