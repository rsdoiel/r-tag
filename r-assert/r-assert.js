/**
 * r-assert.js - A custom element for loading href or src content
 * based on an assertion failing or successing.
 *
 * @author: R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2014 
 * All rights reserved.
 * @license: BSD 2-clause License
 */
/*jslint browser: true, indent: 4 */
(function (window, document) {
    "use strict";
    xtag.register('r-assert', {
        lifecycle: {
            created: function () {
                var element;

                function assembleElement(element, attribute, value) {
                    var new_element = document.createElement(element);
                    new_element.setAttribute(attribute, value);
                    return new_element;
                }
                if (eval(this.assert) === true) {
                    this.appendChild(assembleElement(this.element, this.attribute, this.onsuccess));
                } else {
                    this.appendChild(assembleElement(this.element, this.attribute, this.onfail));
                }
            }
        },
        accessors: {
            assert: {
                attribute: {string: ''}
            },
            onfail: {
                attribute: {url: ''}
            },
            onsuccess: {
                attribute: {url: ''}
            },
            attribute: {
                attribute: {string: 'src'}
            },
            element: {
                attribute: {string: 'script'}
            }
        }
    });
}(window, document));
