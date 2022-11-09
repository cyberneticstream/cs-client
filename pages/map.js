import Script from "next/script";
import {useEffect, useState} from "react";
import {useRouter } from "next/router"



export default function Map(){

    const router = useRouter()

    useEffect(() => {
        if(typeof mapkit != "undefined") {
            main()
        }
    }, [])


    return(
             <>
             <Script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js" crossorigin async data-callback="initMapKit" data-libraries="map,annotations,services" data-initial-token="" onReady={() => (main())}></Script>

             <div id="map-container" className={"map-container map"}></div>

             <button onClick={()=> router.push("/")} className={"text-5xl absolute top-96 bg-white w-20 rounded-lg opacity-75" }>{"<-"}</button>
            </>
    )
}

const main = async() => {
    await setupMapKitJs();

    const cupertino = new mapkit.CoordinateRegion(
            new mapkit.Coordinate(37.628724, -122.195537),
            new mapkit.CoordinateSpan(0.6, 0.6)
            );

    const map = new mapkit.Map("map-container");
    map.mapType = mapkit.Map.MapTypes.Hybrid

    map.region = cupertino;

    const work = new mapkit.Coordinate(37.729566, -122.152157);
    const workAnnotation = new mapkit.MarkerAnnotation(work);
    workAnnotation.color = "#969696";
    workAnnotation.selected = "true";
    workAnnotation.glyphText = "🛩️"; // Apple Symbol

    map.addItems([ workAnnotation]);


    console.log(mapkit)
};

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