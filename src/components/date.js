import React, {useEffect} from 'react'
import anime from 'animejs'
import './date.css'

export default function DateLabel(props) {

    useEffect(() => {
        anime({
            targets: ".date-label-box",
            height: "30px",
            duration: 250
        })
    }, [])

    return (<div className="date-label-box">
                {new Date().toDateString()}
            </div>)
}