'use strict';

var DocBlock = require('../lib/docBlock');
var inspect = require('coffeebreak-inspect');

describe('DocBlock', function() {
    
    describe('create', function() {
        it('Should create a DocBlock from a DocArray', function() {
            var docArray = [
                { tag: 'title', value: 'Test block' },
                { tag: 'description', value: '' },
                { tag: 'module', value: 'testmodule' },
                { tag: 'param', value: '{object} foo Foo is footastic' },
                { tag: 'public', value: '' }
            ];

            var docBlock = new DocBlock().create(docArray);
            inspect(docBlock).toHaveProps({
                title: 'Test block',
                description: '',
                tags: {
                    module: 'testmodule',
                    params: [
                        {
                            type: 'object',
                            name: 'foo',
                            description: 'Foo is footastic'
                        }
                    ],
                    isPublic: true,
                    isProtected: false,
                    isPrivate: false,
                    isDeprecated: false,
                    ignore: false
                }
            });
        });

        it('Should create a module DocBlock', function() {
            var docArray = [
                { tag: 'title', value: 'Banana test module' },
                { tag: 'description', value: 'Very awesome banana module.' },
                { tag: 'module', value: 'banana' },
                { tag: 'example', value: '    var banana = require(\'banana\');\n    banana.peelIt();' }
            ];

            var docBlock = new DocBlock().create(docArray);
            inspect(docBlock).toHaveProps({
                title: 'Banana test module',
                description: 'Very awesome banana module.',
                tags: {
                    module: 'banana',
                    examples: [
                        {
                            content: '    var banana = require(\'banana\');\n    banana.peelIt();'
                        }
                    ],
                    isPublic: false,
                    isProtected: false,
                    isPrivate: false,
                    isDeprecated: false,
                    ignore: false
                }
            });
        });
    });
});