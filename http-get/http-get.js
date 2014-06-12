/*!
 * http-get.js - a simple wrapper for an xhr HTTP GET as Web Component.
 * @author: R. S. Doiel <rsdoiel@gmail.com>
 * copyright (c) 2014
 * Released under the BSD 2-clause license.
 * Based on example from http://docs.webplatform.org/wiki/apis/xhr/XMLHttpRequest
 */
/*jslint browser: true, indent: 4, maxlen: 120 */
/*global ActiveXObject, XDomainRequest */
(function (window, document) {
    "use strict";
    // httpGet - Grab content via xhr.
    // @param url - the URL to get the content from
    // @param callback - the function to execute when the content is available.
    // callback's parameters are error, response object.
    // @param progress - an optional parameter to process progress from get.
    // progress has two parameters a string for readState and response object
    // @return request object or false.
    function httpGET(url, callback, progress) {
        var request;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            request = new XMLHttpRequest();
        } else if (typeof XDomainRequest !== 'undefined') { // IE 9
            request = new XDomainRequest();
        } else if (typeof window.ActiveXObject) { // IE 8 and older
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (err1) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (err2) {
                    throw err2;
                }
            }
        }

        if (!request) {
            if (callback !== undefined) {
                callback("Can't create request object");
            }
            return false;
        }
        if (callback !== undefined) {
            request.onreadystatechange = function () {
                if (progress !== undefined) {
                    switch (request.readyState) {
                    case 0:
                        progress("uninitialized", request);
                        break;
                    case 1:
                        progress("loading", request);
                        break;
                    case 2:
                        progress("loaded", request);
                        break;
                    case 3:
                        progress("interactive", request);
                        break;
                    case 4:
                        progress("complete", request);
                        if (request.status === 200) {
                            callback(null, request.responseText);
                        } else {
                            callback({status: request.status, error: "http request failed"}, request.responseText);
                        }
                        break;
                    }
                }
            };
        }
        request.open("GET", url);
        request.send();
        return request;
    }
    
    function resolveURL(doc_url, href) {
       var protocol_re = new RegExp('://'),
           last_slash = doc_url.lastIndexOf('/');
       if (href.indexOf('://') === -1) {
           // Concatentate the doc_url and the href
           if (last_slash === -1) {
              return doc_url + '/' + href;
           } 
           return doc_url.substring(0, last_slash) + '/' + href;
       }
       return href;
    }


    // Now create my custom element wrapper.
    xtag.register('http-get', {
	lifecycle: {
            created: function () {
                var self = this, url = resolveURL(document.URL, this.href);
                httpGET(url, function (err, data) {
                    if (err) {
                        console.log("ERROR", err);
                        return;
                    }
                    if (self.outerHTML !== undefined) { 
                    	self.outerHTML = data.toString(); 
                    } else {
                        self.innerHTML = data.toString();
                    }
                }, function (status) {
                   // erros will get handled on complete.
                });
            }
        },
        accessors: {
            href: {
                attribute: { url: "" }
            },
            innerHTML: {
               attribute: { String: "" },
               set: function (value) {
                   this.innerHTML = value;
               },
               get: function () {
                  return this.innerHTML;
               }
            }
        }
    });
}(window, document));
