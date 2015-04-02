var type = function () {
    var
        simpleRemote = function (typeCtl, url, displayCtl) {
            var dummies = new Bloodhound({
                limit: 10,
                datumTokenizer: function (datum) {
                    return Bloodhound.tokenizers.whitespace(datum.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: url + '?nameContains=%QUERY',
                    filter: function (dummies) {
                        return $.map(dummies, function (dummy) {
                            return {
                                value: dummy.Value,
                                key: dummy.Id
                            };
                        });
                    }
                }
            });

            dummies.initialize();

            // Instantiate the Typeahead UI
            var domainAhead = typeCtl.typeahead({
                autoselect: true,
                minLength: 1
            }, {
                displayKey: 'value',
                source: dummies.ttAdapter()
            });
            domainAhead.on('typeahead:selected', function (evt, data) {
                displayCtl.val(data.value);
            });
        },
        googleMaps = function () {
            alert('googleMaps');
        },
        withTemplate = function () {
            alert('withTemplate');
        }

    return {
        simpleRemote: simpleRemote,
        googleMaps: googleMaps,
        withTemplate: withTemplate
    };
}();

