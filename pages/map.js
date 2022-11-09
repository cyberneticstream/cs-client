import Script from "next/script";
import {useEffect, useState} from "react";



export default function Map(){

    const [address, setAddress] = useState({})



    if(typeof mapkit != "undefined") {
        main()
    }

    const setupMapKitJs = async() => {
        if (!window.mapkit || window.mapkit.loadedLibraries.length === 0) {
            // mapkit.core.js or the libraries are not loaded yet.
            // Set up the callback and wait for it to be called.
            await new Promise(resolve => { window.initMapKit = resolve });

            // Clean up
            delete window.initMapKit;
        }

        // TODO: For production use, the JWT should not be hard-coded into JS.
        const jwt = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllIWlgzNjlHN0gifQ.eyJpc3MiOiJRUzhTM01LVTZMIiwiaWF0IjoxNjY3OTcwNTU2LCJleHAiOjE2NzA1NjI1MDR9.86HtzzR6G-Cb4mluBQ9YkBrIBlOMCpZA_zNWGR_en_shRinfy8DDyCgGOwHmpXQU_qr1wTDIgwFRqA5NpSub3Q";
        mapkit.init({
            authorizationCallback: done => { done(jwt); }
        });
    };

    /**
    * Script Entry Point
    */
    const main = async() => {
        await setupMapKitJs();

        const cupertino = new mapkit.CoordinateRegion(
                new mapkit.Coordinate(37.628724, -122.195537),
                new mapkit.CoordinateSpan(0.6, 0.6)
                );

        // Create a map in the element whose ID is "map-container"
        const map = new mapkit.Map("map-container");
        map.mapType = mapkit.Map.MapTypes.Hybrid
        const geocoder = new mapkit.Geocoder()
        geocoder.lookup("539 bosom way san leandro ca", (error, res) => {

            console.log(res)
            console.log(res.results[0].coordinate)
        })


        const prop = new mapkit.CoordinateRegion(
                new mapkit.Coordinate(address.longitude, address.latitude),
                new mapkit.CoordinateSpan(1.5, 1.5)
                );

        map.region = cupertino;


        // Create the "Event" annotation, setting properties in the constructor.
        const event = new mapkit.Coordinate(37.7831, -122.4041);
        const eventAnnotation = new mapkit.MarkerAnnotation(event, {
            color: "#4eabe9",
            title: "Event",
            glyphText: "\u{1F37F}" // Popcorn Emoji
        });

        // Create the "Work" annotation, setting properties after construction.
        const work = new mapkit.Coordinate(37.729566, -122.152157);
        const workAnnotation = new mapkit.MarkerAnnotation(work);
        workAnnotation.color = "#969696";
        workAnnotation.title = "Work";
        workAnnotation.subtitle = "Apple Park";
        workAnnotation.selected = "true";
        workAnnotation.glyphText = "\u{F8FF}"; // Apple Symbol

        // Add and show both annotations on the map
        map.addItems([eventAnnotation, workAnnotation]);

        console.log(3)
        console.log(address)


        console.log(mapkit)
    };




    return(
             <>
             <Script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js" crossorigin async data-callback="initMapKit" data-libraries="map,annotations,services" data-initial-token="" onReady={() => (main())}></Script>


             <div id="map-container" className={"map-container map"}></div>
             <h1>page</h1>

             <button className={"btn"}>{"<--"}</button>
            </>
    )
}



//    main();