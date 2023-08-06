/*  Setup of Sgvizler trunk version on Trac 0.11.  */

// Wait until page is ready to configure Sgvizler:
$(document).ready(
    function (){
        sgvizler
            .defaultEndpointOutputFormat('json')
            // Add prefixes used in examples:
            .prefix('w',     "http://sws.ifi.uio.no/ont/world.owl#")
            .prefix('dbpo',  "http://dbpedia.org/ontology/")
            .prefix('geo',   "http://www.w3.org/2003/01/geo/wgs84_pos#")
            .prefix('dct',   "http://purl.org/dc/terms/")
            .prefix('fn',    "http://www.w3.org/2005/xpath-functions#")
            .prefix('afn',   "http://jena.hpl.hp.com/ARQ/function#")
            .prefix('npdv',  "http://sws.ifi.uio.no/vocab/npd#")
            .prefix('npdv2', "http://sws.ifi.uio.no/vocab/npd-v2#")
            .prefix('geos',  "http://www.opengis.net/ont/geosparql#")
            .prefix('mlr1',  "http://purl.iso.org/iso-iec/19788/-1/")
            .prefix('mlr2',  "http://purl.iso.org/iso-iec/19788/-2/")
            .prefix('mlr3',  "http://purl.iso.org/iso-iec/19788/-3/")
            .prefix('mlr4',  "http://purl.iso.org/iso-iec/19788/-4/")
            .prefix('mlr5',  "http://purl.iso.org/iso-iec/19788/-5/")
            .prefix('mlr6',  "http://purl.iso.org/iso-iec/19788/-6/")
            .prefix('mlr7',  "http://purl.iso.org/iso-iec/19788/-7/")
            .prefix('mlr8',  "http://purl.iso.org/iso-iec/19788/-8/")
            .prefix('mlr9',  "http://purl.iso.org/iso-iec/19788/-9/")
            .prefix('mlrfr', "http://www.ens-lyon.fr/")
            .prefix('mlrfrens', "http://www.ens-lyon.fr/")

            // Draw all sgvizler containers on page:
            .containerDrawAll();
    }
);
