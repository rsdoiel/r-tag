
# Client side rendering

Over lunch I was thinking about client side content rendering of markdown content.  My current custom element _marked-content_ works nicely.  Even on my cell phone. I'm lacking a way to build navigation. Treating navigation as content seems like a good
way to go. What I need is a UL list and that's easy in Markdown.  What metadata do I need to carry forward to make it all work? Do I need more web components? Here's what I think I'd need--

1. I need a way to link to a HTML file that knows how to render some content
2. I need a way to transform a UL list of links calling those HTML files with the appropriate markdown documents

Let's sketch out a markdown file that would render a UL list--

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

Markdown is pleasently minimal. I don't want to add anything to it. I need to care more context though. Let's take a look at the href side of the Markdown expression. 

A webpage can evaluate the GET args easily.  Why not use a GET arg named render to describe which markdown file needs to be processed. No modification to Markdown syntax, just leveraging old fashioned webbyness. Here's what my modified navigation file
might look like--

```
    + [Home](index.html?render=index.md)
    + [Articles](article.html?render=articles.md)
        - [Young Person's Guide to Web Compenents](article.html?render=articles/web-components.md)
    + [CV](cv.html?render=cv.md)
    + [About Me](index.html?render=bio.md)
```

And that should render out pretty close to what I need.

```
    <ul>
        <li><a href="index.html?render=index.md">Home</a></li>
        <li><a href="article.html?render=articles.md">Article</a>
            <ul>
                <li><a href="article.html?render=articles/web-components.md">Young Person's Guide to Web Compenents</a></li>
            </ul>
        </li>
        <li><a href="cv.html?render=cv.md">CV</a></li>
        <li><a href="index.html?render=bio.md">About Me</a></li>
    </ul>
```

That works but how do I know which _marked-content_ element to send the markdown data to?  What I really need is--

1. I need a way to link to a HTML file that knows how to render some content
2. I need a way to transform a UL list of links calling those HTML files with the appropriate markdown documents
3. I need a way to target specific _marked-content_ elements by some sort of id


So my current custom element doesn't do this. It just fetches the content then renders it. I need a second custom element to process the get args, find the targeted _marked-content_ elements. How do I target the element.  Adding more GET args seems
ugly.  Is ther another way.  What about *render*. Can I use the key side of the get arg to map to the element id of the
targeted _marked-content_ element?  That actually might work. The _marked-args_ custom element could process the list of get args if it find a _marked-content_ element with a matching id attribute it knows the right hand side is a path to the Markdown file.
Let's say I have an HTML file, *story.html*, that has two _marked-content_ elements. One has a id attribute value of "navigation" the second has an id attribute of "main-content".  _marked-args_ would process a URL that might looks like 

```
    story.html?navigation=nav.md&main-content=my-store.md
```

If *story.html* explicitly defines a markdown file for nav by setting the _href_ attribute then the URL might look like

```
    story.html?main-content=my-store.md
```

That seems flexible enough.  Now let's try our nav again.

```
    + [Home](index.html?main-content=index.md)
    + [Articles](article.html?main-content=articles.md)
        - [Young Person's Guide to Web Compenents](article.html?main-content=articles/web-components.md)
    + [CV](cv.html?main-content=cv.md)
    + [About Me](index.html?main-content=bio.md)
```

Humm that' would work. The _marked-args_ custom element gets a list of all the _marked-content_ elements in the page using
querySelectorAll() remembering the elements and their id attributes.  Next it traverses the GET args and when it finds 
parameters names matching the id attribute it set the _marked-content_ href to the parameters value after normalizing the URL reference. That works. Two custom elements gives me the rendering control I find in most CMS without running one or running 
server side scripts to generate navigation blocks. Time to get Coding.

Sweetness.
