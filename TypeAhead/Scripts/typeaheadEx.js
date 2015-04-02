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

            var dummyAhead = typeCtl.typeahead({
                autoselect: true,
                minLength: 1
            }, {
                displayKey: 'value',
                source: dummies.ttAdapter()
            });
            dummyAhead.on('typeahead:selected', function (evt, data) {
                displayCtl.val(data.value);
            });
        },
        googleMaps = function (typeCtl, lat, lng, location) {
            var locations = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=%QUERY',
                    filter: function (locations) {
                        return $.map(locations.results, function (location) {
                            return {
                                value: location.formatted_address,
                                geolat: location.geometry.location.lat,
                                geolong: location.geometry.location.lng
                            };
                        });
                    }
                }
            });

            locations.initialize();

            typeCtl.typeahead({
                highlight: true,
                autoselect: true
            }, {
                name: 'value',
                displayKey: 'value',
                source: locations.ttAdapter()
            });


            var searchboxItemSelectedHandler = function (e, datum, lat, lng, location) {
                lat.val(datum.geolat),
                lng.val(datum.geolong);
                location.val(datum.value);
            };

            typeCtl.on('typeahead:selected', function (e, datum) {
                searchboxItemSelectedHandler(e, datum, lat, lng, location);
            } );
            typeCtl.on('typeahead:autocompleted', function (e, datum) {
                searchboxItemSelectedHandler(e, datum, lat, lng, location);
            });
        },
        withTemplate = function (typeCtl, url, displayCtl) {
            var items = new Bloodhound({
                limit: 10,
                datumTokenizer: function (datum) {
                    return Bloodhound.tokenizers.whitespace(datum.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: url + '?nameContains=%QUERY',
                    filter: function (items) {
                        return $.map(items, function (item) {
                            return {
                                name: item.Name,
                                description: item.Description,
                                key: item.Id
                            };
                        });
                    }
                }
            });

            items.initialize();

            var itemsAhead = typeCtl.typeahead({
                autoselect: true,
                minLength: 1
            }, {
                displayKey: 'value',
                source: items.ttAdapter(),
                templates: {
                    suggestion: Handlebars.compile("<strong>Name: </strong>{{name}}<br /><strong>Description:</strong> {{description}}")
                }
            });
            itemsAhead.on('typeahead:selected', function (evt, data) {
                displayCtl.val("you selected " + data.name);
            });
        }

    return {
        simpleRemote: simpleRemote,
        googleMaps: googleMaps,
        withTemplate: withTemplate
    };
}();

