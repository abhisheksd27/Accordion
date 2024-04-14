import React, { useState } from "react";
import dummyData from "./Data";
import "./styles.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  const handleSingleSelection = (getCurrentID) => {
    setSelected(getCurrentID === selected ? null : getCurrentID);
  };

  const handleMultiSelection = (getCurrentID) => {
    let cpyMultiple = [...multipleSelected];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentID);
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentID);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultipleSelected(cpyMultiple);
  };

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection ? "Disable multiple selection" : "Enable multiple selection"}
      </button>
      <div className="accordion">
        {dummyData && dummyData.length > 0 ? (
          dummyData.map((data) => (
            <div className="item" key={data.id}>
              <div className="title" onClick={enableMultiSelection ? () => handleMultiSelection(data.id) : () => handleSingleSelection(data.id)}>
                <h3>{data.question}</h3>
                {enableMultiSelection || selected !== data.id ? <span>+</span> : <span>-</span>}
              </div>
              {enableMultiSelection ? (multipleSelected.indexOf(data.id) !== -1 && <h3 className="content">{data.answer}</h3>) : (selected === data.id && <h3>{data.answer}</h3>)}
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
