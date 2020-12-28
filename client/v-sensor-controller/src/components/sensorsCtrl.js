import React from 'react'
import { useEffect, useState } from 'react';
import { AiFillCar } from 'react-icons/ai';
import logo from '../logo.svg';

export const SensorsCtrl = () => {
    const [sensorsList, setSensorsList] = useState([])
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        fetch('/user/add/3/"parking-sensor"').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonResponse => {
            console.log(jsonResponse);
            setSensorsList(jsonResponse.sensors)
            setUserId(jsonResponse.userId)
        })

    }, [])

    function updateSensors() {
        fetch('/user/' + userId + '/sensor/add').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonResponse => {
            setSensorsList(jsonResponse.sensors)
        })
    }

    return (<div>
        <div>your sensor ID is : {userId}</div>

        {sensorsList.length > 0 && sensorsList.map((e, i) =>
            <ul key={i}>
                <li>{JSON.stringify(e)}</li>
                <li>{i + " : " }<b>{e.name}</b></li>
                <li>{e.type}</li>
                <li>{e.attributes.avail} </li>
                <li> <img 
                       src={logo} 
                       className="App-logo" 
                       alt="logo" 
                       onClick={updateSensors}/>
                </li>
            </ul>
        )}

        <button
            type="button"
            onClick={console.log ("clicked")}
        > 
          Click me
        </button>

    </div>
    )
}