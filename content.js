var elements = document.getElementsByTagName('*');

function toTitleCase(str){
    return str.replace(new RegExp('[\\w’]+', 'g'), function(thing){
        if(thing.length){
            return thing.charAt(0).toUpperCase() + thing.substr(1).toLowerCase();
        }
        else{
            return thing;
        }
    });
}

var wordsToReplace = [
    ['affect', 'effect'],
    ['a lot', 'alot'],
    ['complement', 'compliment'],
    ['compliment', 'complement'],
    ['definitely', 'definately'],
    ['effect', 'affect'],
    ['into', 'in to'],
    ['its', 'it’s'],
    ['it’s', 'its'],
    ['lose', 'loose'],
    ['loose', 'lose'],
    ['peak', 'peek'],
    ['peek', 'peak'],
    ['than', 'then'],
    ['their', 'they’re'],
    ['then', 'than'],
    ['they’re', 'their'],
    ['whether', 'weather'],
    ['weird', 'wierd'],
    ['who', 'whom'],
    ['your', 'you’re'],
    ['you’re', 'your'],
];

for(var i = 0; i < elements.length; i++){
    var element = elements[i];

    if(element.tagName !== "SCRIPT" && element.tagName !== "STYLE"){
        for(var j = 0; j < element.childNodes.length; j++){
            var node = element.childNodes[j];

            if(node.nodeType === 3){
                var text = node.nodeValue;
                var replacedText = text.replace('\'', '’');
                var globalSearchString = '';
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    globalSearchString += wordToReplace[0] + '|' + toTitleCase(wordToReplace[0]) + '|' + wordToReplace[0].toUpperCase() + '|';
                }
                replacedText = replacedText.replace(new RegExp('\\b(' + globalSearchString.substring(0, globalSearchString.length - 1) + ')\\b', 'g'), 'WAIT$1WAIT');
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    replacedText = replacedText
                        .replace(new RegExp('WAIT(' + wordToReplace[0] + ')WAIT', 'g'), wordToReplace[1])
                        .replace(new RegExp('WAIT(' + toTitleCase(wordToReplace[0]) + ')WAIT', 'g'), toTitleCase(wordToReplace[1]))
                        .replace(new RegExp('WAIT(' + wordToReplace[0].toUpperCase() + ')WAIT', 'g'), wordToReplace[1].toUpperCase());
                }
                replacedText = replacedText.replace('’', '\'');
                if(replacedText !== text){
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}
