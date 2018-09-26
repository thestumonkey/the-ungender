(function() {

    var map = {
        'is her': 'is their',
        'is his': 'is their',
        'it\'s her': 'it\'s their',
        'it\'s his': 'it\'s their',
        'it’s her': 'it’s their',
        'it’s his': 'it’s their',
        'as his': 'as their',
        'on her': 'on their',
        'on his': 'on their',
        'in her': 'in their',
        'in his': 'in their',
        'has she': 'have they',
        'has he': 'have they',
        'hasn\'t she': 'haven\'t they',
        'hasn\'t he': 'haven\'t they',
        'hasn’t she': 'haven’t they',
        'hasn’t he': 'haven’t they',
        'she is': 'they are',
        'he is': 'they are',
        'she was': 'they were',
        'he was': 'they were',
        'she wasn\'t': 'they weren\'t',
        'he wasn\'t': 'they weren\'t',
        'she wasn’t': 'they weren’t',
        'he wasn’t': 'they weren’t',
        'she\'s': 'they\'re',
        'he\'s': 'they\'re',
        'she’s': 'they’re',
        'he’s': 'they’re',
        'she': 'they',
        'he': 'they',
        'her': 'them',
        'him': 'them',
        'hers': 'their',
        'his': 'their',
        'herself': 'themself',
        'himself': 'themself',
        'woman': 'person',
        'women': 'people',
        'man': 'person',
        'men': 'people'
    };

    function replace(textNode) {
        if(textNode.parentNode.nodeName in ['STYLE', 'SCRIPT', 'PRE', 'CODE'])
            return;

        var replaced = textNode.data;
        for(var key in map) {
            var value = map[key];
            replaced = replaceOne(replaced, key, value);
            replaced = replaceOne(replaced, key.charAt(0).toUpperCase() + key.slice(1),
                                  value.charAt(0).toUpperCase() + value.slice(1));
            replaced = replaceOne(replaced, key.toUpperCase(), value.toUpperCase());
        }

        if(replaced != textNode.data)
            textNode.data = replaced;
    };

    function replaceOne(string, from, to) {
        var regex = new RegExp('\\b' + from + '\\b', 'g');
        return string.replace(regex, to);
    };

    function replaceTraverse(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if(child.nodeType == 1)
                replaceTraverse(child);
            else if(child.nodeType == 3)
                replace(child);
        }
    };

    function replaceAll() {
        var nodes = document.getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            for(var j = 0; j < el.childNodes.length; j++) {
                var node = el.childNodes[j];
                if(node.nodeType == 3)
                    replace(node);
            }
        }
    };

    replaceAll();

    document.addEventListener("DOMNodeInserted", function(e) {
        replaceTraverse(e.target);
    }, false);

})();
