import Links from "../public/components/Links";
import {myFont} from "../public/myFont.js";
import { Loader } from "@googlemaps/js-api-loader"



export async function getStaticProps(){
    const info = await fetch("https://undefxx.com/api", {method: "GET", headers: {propertyID: process.env.NEXT_PUBLIC_PROPERTY_ID, includeFields: "name,applicationsOpen"}}).then(x => x.json());
    const unpaid = await fetch("https://undefxx.com/api/p", {method: "GET", headers: {status: "unpaid", propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x=> x.json());
    return{
        props:{info , unpaid},
        revalidate: 1
    }
}

export default function Page(props){

    const loader = new Loader({
        apiKey: "AIzaSyBMPVcEHYsdRn89Qle44zVgijJJBCud2v8",
        version: "weekly",
    });

    loader.load().then(() => {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8,
            mapId: 'ff0468e089b212af'
        });
    });



    const name = props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].name
    const applicationsOpen = props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].applicationsOpen
    const unpaid =  props.unpaid[process.env.NEXT_PUBLIC_PROPERTY_ID].unpaid


    let links = [{label: name, href: "/"}]
    let dynamicRoutes = []

    if (props.applicationsOpen) {
        links.push({label: "apply", href: "/apply"})
        links.push({label: "lease", href: "/lease"})
        links.push({label: "...", href: "/explainer"})

    } else {
        links.push({label: "autopay", href: "/autopay"})
        for(let key in unpaid){
            links.push({label: unpaid[key].name, href: unpaid[key].href})
            dynamicRoutes.push("/" + unpaid[key].href)
        }
        links.push({label: "...", href: "/log"})
    }

    return(
            <div className={myFont.className}>
                <div >
                    <Links links ={links}/>
                </div>
            </div>
            )
}