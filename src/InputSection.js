import React from 'react';
import './InputSection.css';

function InputSection() {

  const spanishFlagClick = () => {
    // Kod do wykonania po kliknięciu
    console.log('Flaga Hiszpanii została kliknięta!');
  };

  const englandFlagClick = () => {
    // Kod do wykonania po kliknięciu
    console.log('Flaga Wielkiej Brytanii została kliknięta!');
  };

    return (
      <form>
        <div className="row pb-4">
            <div className="col-sm-5 mx-auto mb-3 mb-sm-0">
                <div id="flagDiv" className="row mb-2">
                  <button id="polish" type="button" className="col-2 p-0 m-0 mx-auto"><img src="polska.jpg" className="col-12" alt="Polish flag"/></button>
                </div>
                <textarea id="polishArea" className="col-12"></textarea>
            </div>
            <div className="col-sm-5 mx-auto">
                <div id="flagDiv" class="row mb-2">
                  <button onClick={spanishFlagClick} id="spain" type="button" className="col-2 p-0 m-0 mx-auto"><img src="spain.png" className="col-12" alt="Spanish flag"/></button>
                  <button onClick={englandFlagClick} id="england" type="button" className="col-2 p-0 m-0 mx-auto"><img src="british.jpg" className="col-12" alt="English flag"/></button>
                </div>
                <textarea id="foreignArea" className="col-12"></textarea>
            </div>
            
        </div>
        <input type="submit" className="btn btn-success col-6 col-sm-2 mx-auto" value="Zapisz"/>
      </form>
      
    )
  }
  
  export default InputSection;
  