import './App.css'


function FlightCheap({prop}){
    if(typeof(prop)!=='object'){return (<>Invalid Search </>)}
    else if(Object.keys(prop).length===0){return (<>Search Results </>)}

    const {flight_number,origin,destination,departure_at,airline,price,duration_to:duration,transfers} = prop;

    let dep_at = new Date(departure_at.slice(0,19))
    let arr_at = new Date(new Date(departure_at.slice(0,19)).getTime()+duration*60000);

    return (
    <div id='invi1' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>

        <span style={{fontSize:25,fontFamily:'system-ui',color:'white'}}>
            <b>Cheapest<br></br>Fare</b>
        </span>

    <div className='flight_cheap'>
        
        <span style={{display:'flex',alignItems:'center'}}>
            <img style={{border:'hidden black'}} src={`https://pics.avs.io/90/60/${airline}.png`}></img>&emsp;{airline+flight_number}
        </span>
        
        <span id='dep'>
            {dep_at.toLocaleTimeString()}<br></br>
            🛫 {origin}<br></br>
            {dep_at.toDateString()}
        </span>

        <span>
            {Math.floor(duration/60)}h:{duration%60}m
            <hr style={{border:'solid lightgreen 1px'}}></hr>
            {transfers} {(transfers>1)?'Stops':'Stop'}
        </span>

        <span id='arr'>
            {arr_at.toLocaleTimeString()}<br></br>
            {destination} 🛬<br></br>
            {arr_at.toDateString()}
        </span>

        <span style={{fontSize:18}} id='price'>
            <b>₹ {price}</b>
        </span>
    </div>
    
    </div>
);

}

export default FlightCheap;
