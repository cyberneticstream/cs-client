
import fetch from 'node-fetch';
import {myFont} from "../public/myFont.js";
import Links from "../public/components/Links";
import { useEffect, useState} from "react"
import {db} from "../public/firestoreInit.js";
import { doc, onSnapshot } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export async function getStaticProps(){

    const info = await fetch("https://undefxx.com/api", {method: "GET", headers: {propertyID: process.env.NEXT_PUBLIC_PROPERTY_ID, includeFields: "autopay,emailAddresses,phoneNumbers"}}).then(x => x.json());
    return {
        props: { info },
        revalidate: 1
    }
}

export default function Autopay(props){


    const emailAddresses = props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].emailAddresses
    const phoneNumbers = props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].phoneNumbers
    const initialAutopayActive =  props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].autopay

    const [autopayActive, setAutopayActive] = useState(initialAutopayActive)
    const [authContacts, setAuthContacts] = useState({emailAddresses: emailAddresses, phoneNumbers: phoneNumbers})

    let buttons = []
    for(let key in authContacts["emailAddresses"]) {
        buttons.push(<button className = " my-2 outline outline-blue-4 rounded-lg mx-auto border w-11/12 md:w-96 " onClick={(x) => alert(5)}> <p>{authContacts["emailAddresses"][key]}</p></button>)
    }
    for(let key in authContacts["phoneNumbers"]) {
        buttons.push(<button className = " my-2 outline outline-blue-4  rounded-lg mx-auto border  w-11/12 md:w-96 " onClick={(x) => alert(5)}> <p>{authContacts["phoneNumbers"][key]}</p></button>)
    }


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "units/"+process.env.NEXT_PUBLIC_PROPERTY_ID), (doc) => {
            setAutopayActive(doc.data().autopay);
            console.log("Current data: ", doc.data());
        });
        return () => unsub()
    },[])

    let links = [{label: "<---", href: "/"}, {label:  autopayActive ? ("autopay: active") : ("autopay: inactive"), href: "/"}]

    function onChange(x){
        setAutopayActive(x.target.checked)
        console.log(autopayActive)
    }


    return(
            <div className={myFont.className}>
            <Links links = {links} />

                <div className={"my-2 mx-auto h-96 outline outline-blue-4 rounded-lg border w-11/12 md:w-96"}>

            <FormGroup className={"ml-6 mt-2"}>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label="autopay setting"   onChange = {x => onChange(x)}
                />
            </FormGroup>


                </div>


            </div>
            )
}

const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
        ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


