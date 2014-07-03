
# r-assert

_r-assert_ custom element will create a new child element based on the 
success or failure of an assertion.  The common use case is to create
a fallback script reference is a resource failed to be available from
a CDN.

```html
    <script src="//cdn.example.com/myscript.js"></script>
    <r-assert element="script" attribute="src" assert="typeof myfunc === 'function'" onfail="local-copy/myscript.js"></r-assert>

```

It could also be used to load an image if something exists.

```HTML
    <r-assert element="img" attribute="src" onsuccess="img/smiley-face.svg" onfail="img/sad-face.svg"></r-assert>
```

