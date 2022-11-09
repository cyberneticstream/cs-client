import Script from "next/script";
import {useEffect, useState} from "react";
import {useRouter } from "next/router"
import {myFont} from "../public/myFont";
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: "#O00000",
        },
        secondary: {
            main: "#000000",
        },
    },
    typography: {
        fontFamily: myFont,
        h1:{
            fontFamily: myFont
        },
    },
});



export default function Map(){
    const router = useRouter()




    return(

             <div className={myFont.className} >

            <Script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js" crossorigin async data-callback="initMapKit" data-libraries="map,annotations,services" data-initial-token="" onReady={()=> {main(); router.prefetch("/")}}></Script>
                 <div id="map-container" className={" map" }></div>
             <button onClick={()=> router.push("/")} className={"bg-white md:text-7xl w-96  top-3  rounded-lg text-5xl btn opacity-75"}>{process.env.NEXT_PUBLIC_PROPERTY_ID}</button>
            </div>
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


