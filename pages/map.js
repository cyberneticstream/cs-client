import Script from "next/script";
import {useEffect} from "react";

export default function Map(){

    if(typeof mapkit != "undefined") {
        main()
    }





    return(
             <>
             <Script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js" crossorigin async data-callback="initMapKit" data-libraries="map" data-initial-token="" onReady={() => (main())}></Script>


             <div id="map-container" className={"map-container map"}></div>
             <h1>page</h1>

             <button className={"btn"}>{"<--"}</button>
            </>
    )
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
        new mapkit.Coordinate(37.3316850890998, -122.030067374026),
        new mapkit.CoordinateSpan(0.167647972, 0.354985255)
      );

      // Create a map in the element whose ID is "map-container"
      const map = new mapkit.Map("map-container");
      map.region = cupertino;

      console.log(mapkit)
    };

//    main();