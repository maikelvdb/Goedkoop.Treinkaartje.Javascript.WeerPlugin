$(window).ready( function () {
    var scriptUrl = $('script[src*="weather-plugin.js?k="]').attr('src');

    const apiUnit = "metric";
    const iconUrl = "//openweathermap.org/img/w/";
    const iconSubfix = ".png";
    const apiKey = getUrlParameter(scriptUrl, 'k');
    const apiUrl = "//api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&units=" + apiUnit + "&q=";

    $('[data-weather-country][data-weather-city]').each( function () {

        var country = $(this).data('weather-country');
        var city = $(this).data('weather-city');
        var newId = uniqueId();
        var wrapper = $(this);

        var url = apiUrl + city + "," + country;
        $.get(url, function (data) {
            
            var dates = groupBy(data.list, item => item.dt_txt.substr(0, 10));
            var row = CreateDiv({id: newId, class: 'w-row'});

            var isFirst = true;
            dates.forEach((values, key) => {
                var first;

                if  (isFirst) {
                    first = values[0];
                }
                else if (values.length >= 5) {
                    first = values[4];
                }
                else {
                    first = values[3];
                }

                var col = CreateDiv({class: 'w-col'});
                var panel = CreateDiv({class: 'w-panel'});

                var dt = new Date(key);
                var plFooter = CreateDiv({class: 'w-header'}, dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear());
                plFooter.appendTo(panel);

                var plCover = CreateDiv({class: 'w-cover'});
                var plCoverImg = CreateTag('img', {src: iconUrl + first.weather[0].icon + iconSubfix});
                plCoverImg.appendTo(plCover);
                plCover.appendTo(panel);
                
                var plContent = CreateDiv({class: 'w-content'}, Math.floor(first.main.temp) + ' &ordm;', true);
                plContent.appendTo(panel);

                panel.appendTo(col);
                col.appendTo(row);

                isFirst = false;

            });

            wrapper.before(CreateStyle(styles, '#' + newId));
            wrapper.after(row);
            wrapper.remove();
        });

    });

});

function CreateStyle(styleObject, wrapper) {

    
    return $('<style>' + objectToCss(styleObject, wrapper) + ' }</style>');

}

function objectToCss(obj, prefix) {
    var css = '';
    if (!prefix) prefix = '';

    var start = true;
    for (var k in obj) {
        if (typeof obj[k] === 'string') {
            css += k.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + obj[k] + ';';
        }
        else if (typeof obj[k] === 'object') {
            if (!start) css += ' }';
            var cssName = prefix + '.' + k.replace(/([A-Z])/g, '-$1').toLowerCase();
            
            css += cssName + ' { ';

            css += objectToCss(obj[k], cssName + ' ');
        }

        start = false;
    }
    
    return css;
}

function CreateDiv(attributes, text, isHtmlText) {
    return CreateTag('div', attributes, text, isHtmlText);
}

function CreateTag(tag, attributes, text, isHtmlText) {
    var tag = $('<' + tag + '></' + tag + '>');

    if (attributes) {
        for (var attr in attributes) {
            tag.attr(attr.replace(/([a-z])([A-Z])/g, '$1-$2'), attributes[attr]);
        }
    }

    if (!isHtmlText && text) {
        tag.text(text);
    }
    else if (isHtmlText && text) {
        tag.html(text);
    }

    return tag;
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function uniqueId () {
    return Math.random().toString(36).substr(2, 9);
};

function getUrlParameter(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const styles = {
    wRow: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch',
        fontFamily: 'arial',

        wCol: {
            flex: '1 auto',
            boxSizing: 'border-box',
            padding: '5px',

            wPanel: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'space-around',
                WebkitBorderRadius: '5px',
                borderRadius: '5px',
                border: 'solid 1px #cccccc',

                wHeader: {
                    padding: '4px 8px',
                    WebkitBorderRadius: '5px 5px 0 0',
                    borderRadius: '5px 5px 0 0',
                    backgroundColor: '#4786b7',
                    color: '#ffffff',
                    textAlign: 'center'
                },

                wCover: {
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px 0'
                },

                wContent: {
                    textAlign: 'center',
                    padding: '5px 0',
                    fontSize: '20px'
                }
            }
        }
    },

}