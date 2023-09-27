import {useState, useEffect} from 'react'
import FlightCheap from './FlightCheap';
import FlightNonStop from './FlightNonStop';
import { airports } from './object';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './App.css'
import { format } from 'date-fns'


let temp = 0

export default function Component({prop}){
const [flight_dep_iata,setFlight_dep_iata] = useState('');
const [flight_arr_iata,setFlight_arr_iata] = useState('');
const [flight_dep_date,setFlight_dep_date] = useState('');
const [cheapData,setCheapData]  = useState({});
const [nonStopData,setNonStopData]  = useState({});
const [selectedOptions, setSelectedOptions] = useState();
const [selectedOptions2, setSelectedOptions2] = useState();


useEffect(()=>{
    if(prop>temp){
        search();
        temp = prop;
    }
},[])

async function search(){

    let responseArray = await Promise.all([fetch('http://localhost:3000/cheap',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            dep_iata:selectedOptions.value,
            arr_iata:selectedOptions2.value,
            depart_date:format(flight_dep_date,'yyyy-MM-dd')
            // depart_date:flight_dep_date
        }}),fetch('http://localhost:3000/nonstop',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                dep_iata:selectedOptions.value,
                arr_iata:selectedOptions2.value,
                depart_date:format(flight_dep_date,'yyyy-MM-dd')
                // depart_date:flight_dep_date
            }})]).then((result)=>Promise.all(result.map((element)=>element.json())))
            .catch((err)=>alert(`Invalid ${err}`))

       
            
            setCheapData(responseArray[0].data[0]);
            setNonStopData(responseArray[1].data[0]);
    
       
}

function handleSelect(data) {
    console.log(data);
    setSelectedOptions(data);
}
function handleSelect2(data) {
    console.log(data);
    setSelectedOptions2(data);
}

console.log(`Render ${prop}`);

return (
    <div className='component'>
    
    <div className='flight_input'>
    {/* <input placeholder='FROM' value={flight_dep_iata} onChange={(e)=>setFlight_dep_iata(e.target.value)}></input>&emsp;&emsp; */}
    <span className='input'>
    <Select 
          options={airports}
          placeholder="FROM"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
        /></span>&emsp;&emsp;
    {/* <input placeholder='TO' value={flight_arr_iata} onChange={(e)=>setFlight_arr_iata(e.target.value)}></input>&emsp;&emsp; */}
    <span className='input'>
    <Select 
          options={airports}
          placeholder="TO"
          value={selectedOptions2}
          onChange={handleSelect2}
          isSearchable={true}
        /></span>&emsp;&emsp;
    {/* <input placeholder='DATE' value={flight_dep_date} onChange={(e)=>setFlight_dep_date(e.target.value)}></input>&emsp;&emsp; */}
    <span className='input'>
    <DatePicker
        // dateFormat='yyyy-MM-dd'
        selected={flight_dep_date}
        onChange={(date)=>{setFlight_dep_date(date)}}
        minDate={new Date()}
        showIcon
        showMonthDropdown
        showYearDropdown
    /></span>&emsp;&emsp;   
    <button className="button-34" onClick={search}>Search&ensp;🔍</button>
    </div>

    <div className='flight_result'>
        <FlightCheap prop={cheapData}/>
        <FlightNonStop prop={nonStopData}/>
    </div>
    </div>
);
};