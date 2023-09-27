import { Fragment, useState } from 'react'
import Component from './Component'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import minus from './assets/minus.png'
import './App.css'


function App() {
  const [list,setList] = useState([]);
  const [refresh,setRefresh] = useState(0)

  function add(){
    setList(list.concat(crypto.randomUUID()));
  }
  function referesh(){
    setRefresh(refresh+1)
    console.log(refresh);
  }
  function handleDelete(ind){
    setList(list.filter((ele,i)=>i!==ind));
  }

  return (
    <>
    <div className='box'>
      
      <button style={{margin:'3vh 0px 3vh 9vw',fontSize:18}} className="button-41" onClick={add}>Add +</button>
      <button style={{margin:'3vh 0px 3vh 5vw',fontSize:18}} className="button-41" onClick={referesh}>Refresh ⟳</button>

      {list.map((element,index)=><Fragment key={element}><div style={{border:'hidden',display:'flex',alignItems:'center'}}>
        <input type="image" style={{width:'35px',height:'35px',marginLeft:'2vw'}} src={minus} onClick={()=>handleDelete(index)}></input>
        <Component prop={refresh}/></div><br></br>
        </Fragment>)}

    </div>
   
    </>
  )
}

export default App
