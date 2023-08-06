    /**
     * .visualization
     * @main sgvizler.visualization
     */
    S.visualization = (function () {

        // Module dependencies:
        var util = S.util,
            namespace = S.namespace,
            charts = S.charts,

            C = {}, // sgvizler.visualization

            modSC = "sgvizler.visualization";

        /** 
         * Make a html dt list.
         *
         * Format, 2--N columns:
         * 1. Term
         * 2--N. Definition
         * 
         * @class sgvizler.visualization.DefList
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         */

        /** 
         * Available options:
         * 
         *  - 'cellSep'   :  string (can be html) to separate cells in definition columns. (default: ' ')
         *  - 'termPrefix  :  string (can be html) to prefix each term with. (default: '')
         *  - 'termPostfix :  string (can be html) to postfix each term with. (default: ':')
         *  - 'definitionPrefix  :  string (can be html) to prefix each definition with. (default: '')
         *  - 'definitionPostfix :  string (can be html) to postfix each definition with. (default: '')
         * 
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.3.0
         **/
        C.DefList = charts.add(modSC, 'DefList',
            function (data, chartOpt) {
                var r, noRows = data.getNumberOfRows(),
                    c, noColumns = data.getNumberOfColumns(),
                    opt = $.extend({ cellSep: ' ',
                                     termPrefix: '',
                                     termPostfix: ':',
                                     definitionPrefix: '',
                                     definitionPostfix: '' },
                                   chartOpt),
                    list = "",
                    term,
                    definition;

                for (r = 0; r < noRows; r += 1) {
                    term = '<dt>' +
                        opt.termPrefix +
                        C.util.linkify2String(data.getValue(r, 0)) +
                        opt.termPostfix +
                        '</dt>';
                    definition = '<dd>' +
                        opt.definitionPrefix;

                    for (c = 1; c < noColumns; c += 1) {
                        definition += C.util.linkify2String(data.getValue(r, c));
                        if (c + 1 !== noColumns) {
                            definition += opt.cellSep;
                        }
                    }
                    definition += opt.definitionPostfix +
                        '</dd>';
                    list += term + definition;
                }

                $(this.container)
                    .empty()
                    .html(list);

                this.fireListener('ready');
            }
            );

        /** 
         * Make a standard simple html table.
         * 
         * @class sgvizler.visualization.Table
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.5.1
         **/

        /** 
         * Available options:
         *  - 'headings'   :  "true" / "false"  (default: "true")
         *
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.5.1
         **/
        C.Table = charts.add(modSC, "Table",
            function (data, chartOpt) {
                var c, noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    opt = $.extend({ headings: true }, chartOpt),
                    table,
                    rows = [],
                    cells = [];

                if (opt.headings) {
                    for (c = 0; c < noColumns; c += 1) {
                        cells.push(['th', null, data.getColumnLabel(c)]);
                    }
                    rows.push(['tr', null, cells]);
                }

                for (r = 0; r < noRows; r += 1) {
                    cells = [];
                    for (c = 0; c < noColumns; c += 1) {
                        cells.push(['td', null, [C.util.linkify2HTMLElementArray(data.getValue(r, c))]]);
                    }
                    rows.push(['tr', null, cells]);
                }

                table = util.createHTMLElement('table', null, rows);
                $(this.container).empty().html(table);

                this.fireListener('ready');
            }
            );

        /**
         * @class sgvizler.visualization.MapWKT
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.6.0
         **/

        /**
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.6.0
         */
        C.MapWKT = charts.add(modSC, "MapWKT",
            function (data, chartOpt) {
                /*global google, OpenLayers */
                var //c,
                    noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    //that = this,
                    opt = $.extend(
                        {
                            zoom: 5,
                            centerLat: 62,
                            centerLong: 2,
                            //mapTypeId: google.maps.MapTypeId.TERRAIN,
                            //douglasPeuckerKink: 5000,
                            geoDatumIn: "EPSG:4326",//"EPSG:4230",
                            geoDatumOut: "EPSG:4326"
                        },
                        chartOpt
                    ),

                    mapOptions = {
                        projection: opt.geoDatumOut,
                        layers: [
                            new OpenLayers.Layer.OSM(),
                            // new OpenLayers.Layer.WMS(
                            //     "OpenLayers WMS",
                            //     "http://vmap0.tiles.osgeo.org/wms/vmap0?", {layers: 'basic'}
                            // ),
                            new OpenLayers.Layer.Google(
                                "Google Physical",
                                {type: google.maps.MapTypeId.TERRAIN}
                            ),
                            new OpenLayers.Layer.Google(
                                "Google Streets",
                                {numZoomLevels: 20}
                            ),
                            new OpenLayers.Layer.Google(
                                "Google Hybrid",
                                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
                            ),
                            new OpenLayers.Layer.Google(
                                "Google Satellite",
                                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
                            )
                        ],
                        controls: [
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.PanZoomBar(),
                            new OpenLayers.Control.LayerSwitcher({ ascending: false }),
                            new OpenLayers.Control.Permalink(),
                            new OpenLayers.Control.ScaleLine(),
                            new OpenLayers.Control.MousePosition(),
                            new OpenLayers.Control.OverviewMap(),
                            new OpenLayers.Control.KeyboardDefaults()
                        ],
                        center: new OpenLayers.LonLat(opt.centerLong, opt.centerLat),
                        zoom: 5
                    },
                    mapBounds,
                    map = new OpenLayers.Map(this.container, mapOptions),

                    formatterWKT = new OpenLayers.Format.WKT(
                        {
                            internalProjection: map.baseLayer.projection,
                            externalProjection: new OpenLayers.Projection(opt.geoDatumIn)
                        }
                    ),

                    resultLayer = new OpenLayers.Layer.Vector(
                        "Results",
                        {
                            styleMap: new OpenLayers.StyleMap(
                                {
                                    'default': new OpenLayers.Style(
                                        {
                                            fillColor: "#33CC00",
                                            fillOpacity: 0.2,
                                            strokeColor: "#000000",
                                            strokeWidth: 1
                                        }
                                    )
                                }
                            )
                        }
                    ),
                    labelLayer = new OpenLayers.Layer.Vector(
                        "Labels",
                        {
                            eventListeners: {
                                featureselected: function (evt) {
                                    var feature = evt.feature,
                                        popup = new OpenLayers.Popup.FramedCloud(
                                            "popup",
                                            OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
                                            null,
                                            "<div style='font-size:.8em'>"
                                                + "<b>" + feature.attributes.name + "</b><br/>"
                                                + C.util.linkify2String(feature.attributes.uri) + "<br/>"
                                                + feature.attributes.description
                                                + "</div>",
                                            null,
                                            true
                                        );
                                    feature.popup = popup;
                                    map.addPopup(popup);
                                },
                                featureunselected: function (evt) {
                                    var feature = evt.feature;
                                    map.removePopup(feature.popup);
                                    feature.popup.destroy();
                                    feature.popup = null;
                                }
                            },
                            styleMap: new OpenLayers.StyleMap(
                                {
                                    "default": new OpenLayers.Style(
                                        {
                                            strokeColor: "#FF0000",
                                            strokeOpacity: 1,
                                            strokeWidth: 5,
                                            fillColor: "#FF0000",
                                            fillOpacity: 0.5,
                                            pointRadius: 2,
                                            //pointerEvents: "visiblePainted",

                                            label : "${name}",
                                            fontSize: "10px",
                                            fontFamily: "Arial",
                                            labelAlign: "l",
                                            labelOutlineColor: "white",
                                            labelOutlineWidth: 1,
                                            labelXOffset : 7
                                        }
                                    )
                                }
                            )
                        }
                    ),

                    selector = new OpenLayers.Control.SelectFeature(
                        labelLayer,
                        {
                            click: true,
                            autoActivate: true
                        }
                    ),

                    wktFeature,
                    labelFeature,

                    addWKT = function (layer, valueWKT) {
                        var features = formatterWKT.read(valueWKT),
                            i;

                        if (features) {
                            if (!util.isArray(features.constructor)) {
                                features = [features];
                            }
                            for (i = 0; i < features.length; i += 1) {
                                if (!mapBounds) {
                                    mapBounds = features[i].geometry.getBounds();
                                } else {
                                    mapBounds.extend(features[i].geometry.getBounds());
                                }
                            }
                            layer.addFeatures(features);
                        }
                        return features;
                    };

                //Proj4js.defs["EPSG:4230"] = "+proj=longlat +ellps=intl +no_defs";

                //////////////////////////////////////////////////////////////////////

                for (r = 0; r < noRows; r += 1) {
                    // add WKT
                    wktFeature = addWKT(resultLayer, data.getValue(r, 0));

                    // add Label
                    labelFeature = new OpenLayers.Feature.Vector(wktFeature[0].geometry.getCentroid());

                    labelFeature.attributes.name =
                        (noColumns > 1 && data.getValue(r, 1)) ? data.getValue(r, 1) : "";
                    labelFeature.attributes.uri =
                        (noColumns > 2 && data.getValue(r, 2)) ? data.getValue(r, 2) : "";
                    labelFeature.attributes.description =
                        (noColumns > 3 && data.getValue(r, 3)) ? data.getValue(r, 3) : "";

                    labelLayer.addFeatures([labelFeature]);
                }

                map.addLayer(resultLayer);
                map.addLayer(labelLayer);

                map.addControl(selector);

                map.zoomToExtent(mapBounds);

                this.fireListener('ready');

            },
            // Dependencies. { function: what-to-load }
            {
                'google.maps.Map': 'google.maps.Map',
                'OpenLayers': '//cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/OpenLayers.min.js'
                //'GDouglasPeucker': 'http://www.bdcc.co.uk/Gmaps/GDouglasPeuker.js',
                //'Proj4js': 'http://localhost/sgvizler/trunk/lib/proj4js-compressed.js'
            }
            );

        /**
         * Draws a graph with clickable and movable nodes.
         *
         * Input format:
         *
         *  - 7 columns, last three are optional.
         *  - each row represents a source node, a target node and an edge from source to target.
         *  - the URIs are the id's for the nodes, and make the nodes clickable.
         *
         * Columns:
         *
         *  1. sourceURI
         *  2. sourceLabel
         *  3. targetURI
         *  4. targetLabel
         *  5. edgeLabel
         *  6. sourceColor
         *  7. targetColor
         *
         * @class sgvizler.visualization.DraculaGraph
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @beta
         * @author Magnus Stuhr, Martin G. Skjæveland
         */

        /**
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.5.1
         */
        /*global Dracula */
        C.DraculaGraph = charts.add(modSC, "DraculaGraph",
            function (data, chartOpt) {

                var row, numberOfRows = data.getNumberOfRows(),
                    i, len,
                    numberOfColumns = data.getNumberOfColumns(),

                    // set defaults.
                    opt = $.extend({
                        noderadius: 0.5,
                        nodefontsize: "10px",
                        nodeheight: 20,
                        nodestrokewidth: "1px",
                        directed: false,
                        nodecornerradius: "1px",
                        nodepadding: 7,
                        nodecolor: "green",
                        edgestroke: "blue",
                        edgefill: "blue",
                        edgestrokewidth: 1,
                        edgefontsize: "10px",
                        edgeseparator: ", "
                    }, chartOpt),

                    graph = new Dracula.Graph(),
                    layouter,
                    renderer,
                    edge,
                    source,
                    target,
                    label,

                    // custom node rendering using Raphael.
                    nodeRenderer = function (color, URL) {
                        return function (r, n) {
                            return r.set()
                                // rectangle
                                .push(r.rect(n.point[0],
                                             n.point[1],
                                             n.label.length * opt.nodepadding,
                                             opt.nodeheight)
                                      .attr({fill: color,
                                             'stroke-width': opt.nodestrokewidth,
                                             r : opt.nodecornerradius}))
                                // label inside rectangle
                                .push(r.text(n.point[0] + n.label.length * opt.nodepadding / 2,
                                             n.point[1] + opt.nodeheight / 2,
                                             n.label)
                                      .attr({'font-size': opt.nodefontsize})
                                      .click(function () { if (URL) { window.open(namespace.unprefixify(URL)); } })
                                     );
                        };
                    },

                    // helper function.
                    addNode = function (URL, name, color) {
                        graph.addNode(URL, {label: name, render: nodeRenderer(color, URL)});
                        //console.log("add node - name: " + name + ", URL: " + URL);
                    },
                    edges = {},
                    keys_edges = [];

                for (row = 0; row < numberOfRows; row += 1) {
                    source = data.getValue(row, 0);
                    target = data.getValue(row, 2);

                    // add source node
                    // Note: does dracula take care of duplicates?
                    if (source) {
                        addNode(source,
                                data.getValue(row, 1) || source,
                                numberOfColumns > 5 ? data.getValue(row, 5) : opt.nodecolor);
                    }
                    // add target node
                    if (target) {
                        addNode(target,
                                data.getValue(row, 3) || target,
                                numberOfColumns > 6 ? data.getValue(row, 6) : opt.nodecolor);
                    }

                    // collect edge labels. Only one edge per pair of nodes,
                    // so we concatinate labels of multiple edges into one.
                    if (source && target) {
                        label = "";
                        // test if source--target pair is seen before:
                        if (edges[source + target] !== undefined) {
                            label = edges[source + target].label; // retrieve accumulated label.
                        } else {
                            keys_edges.push(source + target);
                        }

                        if (numberOfColumns > 4 && data.getValue(row, 4).length > 0) {
                            if (label.length > 0) {
                                label += opt.edgeseparator;
                            }
                            label += data.getValue(row, 4);
                        }

                        edges[source + target] = {
                            source: source,
                            target: target,
                            label: label
                        };
                    }
                }

                // add edges
                for (i = 0, len = keys_edges.length; i < len; i += 1) {
                    edge = edges[keys_edges[i]];
                    //console.log("add edge - source: " + edge.source + ", target " + edge.target);
                    graph.addEdge(edge.source, edge.target,
                                  { stroke: opt.edgestroke,
                                    directed: opt.directed,
                                    fill: opt.edgefill,
                                    label: edge.label,
                                    width: opt.edgestrokewidth,
                                    fontsize: opt.edgefontsize
                                  });
                }

                layouter = new Dracula.Graph.Layout.Spring(graph);
                layouter.layout();

                $(this.container).empty();
                renderer = new Dracula.Graph.Renderer.Raphael(
                    this.container,
                    graph,
                    opt.width,
                    opt.height,
                    { noderadius : opt.nodeheight * opt.noderadius}
                );
                renderer.draw();

                this.fireListener('ready');
            },
            { Dracula: 'http://www.data2000.no/sgvizler/lib/raphael-dracula.min.js' }
            );
        /** 
         * Write text.
         *
         * Any number of columns. Everything is displayed as text.
         * 
         * @class sgvizler.visualization.Text
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.3.0
         **/

        /** 
         * Available options:
         * 
         *  - 'cellSep'       :  string (can be html) to separate cells in each column. (default: ', ')
         *  - 'cellPrefix     :  string (can be html) to prefix each cell with. (default: '')
         *  - 'cellPostfix    :  string (can be html) to postfix each cell  with. (default: '')
         *  - 'rowPrefix      :  string (can be html) to prefix each row with. (default: '<p>')
         *  - 'rowPostfix     :  string (can be html) to postfix each row with. (default: '</p>')
         *  - 'resultsPrefix  :  string (can be html) to prefix the results with. (default: '<div>')
         *  - 'resultsPostfix :  string (can be html) to postfix the results with. (default: '</div>')
         *
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.3.0
         **/
        C.Text = charts.add(modSC, "Text",
            function (data, chartOpt) {
                var c, noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    opt = $.extend({ cellSep: ', ',
                                     cellPrefix: '', cellPostfix: '',
                                     rowPrefix: '<p>', rowPostfix: '</p>',
                                     resultsPrefix: '<div>', resultsPostfix: '</div>' },
                                   chartOpt),
                    text = opt.resultsPrefix,
                    row;


                for (r = 0; r < noRows; r += 1) {
                    row = opt.rowPrefix;
                    for (c = 0; c < noColumns; c += 1) {
                        row += opt.cellPrefix + C.util.linkify2String(data.getValue(r, c)) + opt.cellPostfix;
                        if (c + 1 !== noColumns) { // Don't add for last element in row.
                            row += opt.cellSep;
                        }
                    }
                    text += row + opt.rowPostfix;
                }
                text += opt.resultsPostfix;

                $(this.container)
                    .empty()
                    .html(text);

                this.fireListener('ready');
            }
            );


        /**
         * Extends google.visualization.Map in markers dataMode. Draws
         * textboxes with heading, paragraph, link and image. 
         * 
         * Data Format 2--6 columns:
         * 
         *   1. lat
         *   2. long
         *   3. name  (optional)
         *   4. text  (optional)
         *   5. link  (optional)
         *   6. image (optional)
         * 
         * - If < 4 columns, then behaves just as gMap
         * - Only 6 columns will be read, columns > 6 are ignored.
         * 
         * @class sgvizler.visualization.Map
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.3.0
         **/

        /**
         * Same options available as for google.visualization.Map.
         * 
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.3.0
         */
        C.Map = charts.add(modSC, "Map",
            function (data, chartOpt) {
                /*global google */
                var c, noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    that = this,
                    opt = $.extend({ dataMode: 'markers',
                                     showTip: true,
                                     useMapTypeControl: true
                                   },
                                   chartOpt),
                    chart,
                    newData,
                    newValue;

                C.util.loadCSS();

                // The idea is to put all columns > 2 into the
                // 3. column with html formatting.

                if (noColumns > 3) {
                    newData = data.clone();
                    // drop columns > 3 from new
                    for (c = noColumns - 1; c > 2; c -= 1) {
                        newData.removeColumn(c);
                    }

                    // build new 3. column
                    for (r = 0; r < noRows; r += 1) {
                        newValue = "<div class='sgvizler sgvizler-sMap'>";
                        newValue += "<h1>" + data.getValue(r, 2) + "</h1>";
                        if (5 < noColumns && data.getValue(r, 5) !== null) {
                            newValue += "<div class='img'><img src='" + data.getValue(r, 5) + "'/></div>";
                        }
                        if (3 < noColumns && data.getValue(r, 3) !== null) {
                            newValue += "<p class='text'>" + data.getValue(r, 3) + "</p>";
                        }
                        if (4 < noColumns && data.getValue(r, 4) !== null) {
                            newValue += "<p class='link'><a href='" + namespace.unprefixify(data.getValue(r, 4)) + "'>" + data.getValue(r, 4) + "</a></p>";
                        }
                        newValue += "</div>";
                        newData.setCell(r, 2, newValue);
                    }
                } else { // do nothing.
                    newData = data;
                }

                chart = new google.visualization.Map(this.container);
                chart.draw(newData, opt);

                google.visualization.events.addListener(
                    chart,
                    'ready',
                    function () { that.fireListener('ready'); }
                );
            },
            {'google.visualization.Map': 'map' }
            );

        /**
         * Make a html list, either numbered (ol) or bullets
         * (ul). Each row becomes a list item.
         * 
         * Any number of columns in any format. Everything is
         * displayed as text.
         * 
         * @class sgvizler.visualization.List
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.3.0
         **/

        /** 
         * Available options:
         * 
         *  - 'list'      :  "ol" / "ul"  (default: "ul")
         *  - 'cellSep'   :  string (can be html) to separate cells in row. (default: ', ')
         *  - 'rowPrefix  :  string (can be html) to prefix each row with. (default: '')
         *  - 'rowPostfix :  string (can be html) to postfix each row with. (default: '')
         * 
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.3.0
         **/
        C.List = charts.add(modSC, "List",
            function (data, chartOpt) {
                var c, noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    opt = $.extend({ list: 'ul',
                                     cellSep: ', ',
                                     rowPrefix: '',
                                     rowPostfix: '' },
                                   chartOpt),
                    list = '<' + opt.list + '>';

                for (r = 0; r < noRows; r += 1) {
                    list += '<li>' + opt.rowPrefix;
                    for (c = 0; c < noColumns; c += 1) {
                        list += C.util.linkify2String(data.getValue(r, c));
                        if (c + 1 !== noColumns) { // Don't add after last element in a row.
                            list += opt.cellSep;
                        }
                    }
                    list += opt.rowPostfix + '</li>';
                }
                list += '</' + opt.list + '>';

                $(this.container)
                    .empty()
                    .html(list);

                this.fireListener('ready');
            }
            );


        /** 
         * @class sgvizler.visualization.D3ForceGraph
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @beta
         */

        /** 
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.5.0
         */
        /*global d3 */
        C.D3ForceGraph = charts.add(modSC, 'D3ForceGraph',
            function (data, chartOpt) {
                var r, noRows = data.getNumberOfRows(),
                    i, len,
                    noColumns = data.getNumberOfColumns(),

                    opt = $.extend({'maxnodesize': 15, 'minnodesize': 2 }, chartOpt), // set defaults
                    colors = d3.scale.category20(),
                    w = chartOpt.width,
                    h = chartOpt.height,
                    isNumber = function (n) {  return !isNaN(parseFloat(n)) && isFinite(n); },

                    // build arrays of nodes and links.
                    nodes = [],
                    edges = [],
                    t_color = {},
                    t_size = {},
                    t_maxnodesize = 0,

                    source,
                    target,

                    nodesizeratio,
                    color,
                    size,

                    vis,
                    force,
                    link,
                    node,
                    ticks;

                C.util.loadCSS();

                for (r = 0; r < noRows; r += 1) {
                    source = data.getValue(r, 0);
                    target = data.getValue(r, 1);
                    // nodes
                    if (source !== null && $.inArray(source, nodes) === -1) {
                        nodes.push(source);
                        t_size[source] = (noColumns > 2) ? Math.sqrt(data.getValue(r, 2)) : 0;
                        t_color[source] = (noColumns > 3) ? data.getValue(r, 3) : 0;
                        if (t_size[source] > t_maxnodesize) {
                            t_maxnodesize = t_size[source];
                        }
                    }
                    if (target !== null && $.inArray(target, nodes) === -1) {
                        nodes.push(target);
                    }
                    // edges
                    if (source !== null && target !== null) {
                        edges.push({'source': $.inArray(source, nodes),
                                    'target': $.inArray(target, nodes)
                                }
                            );
                    }
                }
                if (t_maxnodesize === 0) {
                    t_maxnodesize = 1;
                }
                nodesizeratio = opt.maxnodesize / t_maxnodesize;
                for (i = 0, len = nodes.length; i < len; i += 1) {
                    color = t_color[nodes[i]] !== undefined ?
                            t_color[nodes[i]] :
                            1;
                    size = isNumber(t_size[nodes[i]]) ?
                            opt.minnodesize + t_size[nodes[i]] * nodesizeratio :
                            opt.minnodesize;

                    nodes[i] = {'name': nodes[i], 'color': color, 'size': size };
                }

                $(this.container).empty();

                vis = d3.select(this.container)
                    .append("svg:svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("pointer-events", "all")
                    .append('svg:g')
                    .call(d3.behavior.zoom().on("zoom", function () {
                        vis.attr("transform", "translate(" + d3.event.translate + ")" +
                             " scale(" + d3.event.scale + ")");
                    }))
                    .append('svg:g');

                vis.append('svg:rect')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('fill', 'white');

                force = d3.layout.force()
                    .gravity(0.05)
                    .distance(100)
                    .charge(-100)
                    .nodes(nodes)
                    .links(edges)
                    .size([w, h])
                    .start();

                link = vis.selectAll("line.link")
                    .data(edges)
                    .enter().append("svg:line")
                    .attr("class", "link")
                    //.style("stroke-width", function (d) { return Math.sqrt(d.value); })
                    .attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                node = vis.selectAll("g.node")
                    .data(nodes)
                    .enter().append("svg:g")
                    .attr("class", "node")
                    .call(force.drag);

                node.append("svg:circle")
                    .style("fill", function (d) { return colors(d.color); })
                    .attr("class", "node")
                    .attr("r", function (d) { return d.size; });

                node.append("svg:title")
                    .text(function (d) { return d.name; });

                node.append("svg:text")
                    .attr("class", "nodetext")
                    .attr("dx", 12)
                    .attr("dy", ".35em")
                    .text(function (d) { return d.name; });

                ticks = 0;
                force.on("tick", function () {
                    ticks += 1;
                    if (ticks > 250) {
                        force.stop();
                        force.charge(0)
                            .linkStrength(0)
                            .linkDistance(0)
                            .gravity(0)
                            .start();
                    }

                    link.attr("x1", function (d) { return d.source.x; })
                        .attr("y1", function (d) { return d.source.y; })
                        .attr("x2", function (d) { return d.target.x; })
                        .attr("y2", function (d) { return d.target.y; });

                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                });

                this.fireListener('ready');
            },
            { d3: '//cdnjs.cloudflare.com/ajax/libs/d3/2.10.0/d3.v2.min.js' }
            );

        /**
         * Utility functions for chart functions.
         *
         * .visualization
         * @class sgvizler.visualization.util
         * @static
         */

        C.util = (function () {
            var

                /**
                 * Converts a url into a prefixified link.
                 * @method linkify
                 * @private
                 * @param {String} url The url to linkify.
                 * @param {boolean} arraySyntax Flag if results should
                 * be rendered in array syntax (true), or as an HTML
                 * string (false).
                 * @return {String}
                 */
                linkify = function (url, arraySyntax) {
                    var prefixed = namespace.prefixify(url),
                        base = namespace.getBaseURL,
                        href = url, // the hyperlink.
                        link,       // what to click.
                        result;

                    // Is it linkable, or something else?
                    if (prefixed !== url) {
                        link = prefixed;
                    } else if (S.util.isURL(url)) {
                        link = url;
                    }

                    // If it is linkable, then HTML encode it as one.
                    if (link) {
                        // Append base URL to front, if specified.
                        if (base) {
                            href = base + url;
                        }
                        // Returns a result according to the format used by
                        // sgvizler.util.createHTMLElement.
                        if (arraySyntax) {
                            result = ['a', { href: href }, link];
                        } else { // straight html
                            result = '<a href=' + href + '>' + link + '</a>';
                        }
                    } else { // If it is not a link, then just pass it through.
                        result = url;
                    }
                    return result;
                },
                cssloaded = false;

            return {

                /**
                 * Converts a url into a <a href=""> element with the
                 * link prefixified.
                 * @method linkify2String
                 * @protected
                 * @param {String} url The url to linkify.
                 * @return {String}
                 */
                linkify2String: function (url) {
                    return linkify(url, false);
                },
                /**
                 * Converts a url into a `<a href="url">link</a>` element with the
                 * link prefixified. Returns an array on the format
                 * described in `sgvizler.util.createHTMLElement`.
                 * @method linkify2String
                 * @protected
                 * @param {String} url The url to linkify.
                 * @return {Array}
                 */
                linkify2HTMLElementArray: function (url) {
                    return linkify(url, true);
                },

                /**
                 * Loads the css file `sgvizler.charts.css`.
                 * @method loadCSS
                 * @protected
                 * @injects
                 */
                loadCSS: function () {
                    if (!cssloaded) {
                        $('head').append('<link rel="stylesheet" href="' + S.core.CHARTSCSS + '" type="text/css" />');
                        cssloaded = true;
                    }
                }
            };
        }());

        return C;
    }());
