import React, { useState } from "react";
import dummyData from "./Data";
import "./styles.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection,setEnableMultiSelection] =useState(false)
  const [multipleSelected ,setMultipleSelected]=useState([])

  const handleSingleSelection = (getCurrentID) => {
    
    setSelected(getCurrentID === selected ? null : getCurrentID);
  };


  const handleMultiSelction=(getCurrentID)=>{
    let cpyMultiple =[...multipleSelected];
    const findIndexOfCurrentId =cpyMultiple.indexOf(getCurrentID)
    if(findIndexOfCurrentId=== -1){
        cpyMultiple.push(getCurrentID)
    }else{
        cpyMultiple.splice(findIndexOfCurrentId,1)
    }
    setMultipleSelected(cpyMultiple)
  }

  return (
    <div className="wrapper">
        <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)}>Enable multiple selection</button>
      <div className="accordion">
        {dummyData && dummyData.length > 0 ? (
          dummyData.map((data) => (
            <div className="item" key={data.id}>
              <div className="title" onClick={enableMultiSelection ? ()=>handleMultiSelction(data.id) : () => handleSingleSelection(data.id)}>
                <h3>{data.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelection ? multipleSelected.indexOf(data.id) !== -1 && <div className="content">{data.answer} </div> : selected ===data.id && (<h3>{data.answer}</h3>)
              }
              {/* {
                selected===data.id || multipleSelected.indexOf(data.id !==-1)? <h3>{data.answer}</h3>:null
              } */}
            </div>
          ))
        ) : (
          <div>No data Found !</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
