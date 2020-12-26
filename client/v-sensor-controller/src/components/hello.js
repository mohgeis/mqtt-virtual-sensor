import React from 'react'
import {useEffect, useState} from 'react';

export const Hello = ()=> {
    const [initState, setInitState] = useState([])

    useEffect( ()=>{
        fetch('/test').then(res => {
            if (res.ok){
                return res.json()
            }
        }).then(jsonResponse => setInitState(jsonResponse.hello))
    }, [])
    console.log(initState);
    return (<div>
        {initState.length > 0 && initState.map( e => <li key={e}>{e}</li>)}
    </div>
    )
}