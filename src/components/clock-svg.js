import React, {useState, useEffect} from 'react'

export default function ClockSVG(props) {
    const [date, setDate] = useState(new Date());

    var interval = 250;
    useEffect(() => {
        var id = setInterval(() => {
            setDate(new Date());
        }, interval);

        return () => {
            clearInterval(id);
        }

    }, [interval])

    var width = 200;
    var height = 200;
    
    var circleRadius = 5;
    
    var centerX = width/2;
    var centerY = height/2;

    var spokes = [];
    var spokeWidth = 2;

    /* Create spokes for the clock display */

    var numSpokes = 60;
    var spokeDegrees = 360 / 60;

    var spokeHeight = 10;

    for(var i = 0; i < numSpokes; i++) {

        if(i % 5 === 0) {
            spokeHeight = 20;
        } else {
            spokeHeight = 10;
        }

        spokes.push(<line key={i} x1={centerX} y1="0" x2={centerX} y2={spokeHeight} stroke="black" strokeWidth={spokeWidth} transform={`rotate(${i * spokeDegrees}, ${centerX}, ${centerY})`} />)
    }


    //Use the number of degrees per spoke to determine where the hour, minute and second hands
    //should be placed.

    var hourPassedRatio = date.getMinutes() / 60;
    var hour = date.getHours() - 12;
    var hourRotationPos = hour * (5 * spokeDegrees); //5 spokes per hour, e.g. from 12 o'clock to 1 o'clock
    var nextHour = hour + 1 > 12 ? 1 : hour + 1;
    var nextHourRotationPos = nextHour * (5 * spokeDegrees);
    var hourRotation = hourRotationPos + ((nextHourRotationPos - hourRotationPos) * hourPassedRatio);
    var minuteRotation = date.getMinutes() * spokeDegrees;
    var secondRotation = date.getSeconds() * spokeDegrees;

    var hourArrow = <line x1={centerX} y1="50" x2={centerX} y2={centerY} stroke="black" strokeWidth="2" transform={`rotate(${hourRotation}, ${centerX}, ${centerY})`}/>;
    var minuteArrow = <line x1={centerX} y1="40" x2={centerX} y2={centerY} stroke="black" strokeWidth="2" transform={`rotate(${minuteRotation}, ${centerX}, ${centerY})`}/>;
    var secondArrow = <line x1={centerX} y1="30" x2={centerX} y2={centerY} stroke="black" strokeWidth="1" transform={`rotate(${secondRotation}, ${centerX}, ${centerY})`}/>;

    return(<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <circle cx={centerX} cy={centerY} r={circleRadius} />
        {spokes}
        {hourArrow}
        {minuteArrow}
        {secondArrow}
    </svg>)

}