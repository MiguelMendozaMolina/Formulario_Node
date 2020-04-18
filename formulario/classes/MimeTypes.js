"use strict"

var mimetypes;

/* Esta clase lo que hace es que segun el tipo de contenido que tengas el archivo 
esta le asignara una extension, esto se realiza con el fin de validar la extension del archivo  */

module.exports = class Person {
    constructor() {

        mimetypes = {
            "image/jpeg": "jpg",
            "image/gif": ".gif",
            "image/bmp": ".bmp",
            "image/tiff": ".tiff",
            "image/png": ".png"
        };
    }

    getExtension(_mimeType) {
        if (_mimeType || typeof _mimeType !== 'undefined') {
            return mimetypes[_mimeType] ? mimetypes[_mimeType] : console.error('mime type no encontrado')
        }
    }
}