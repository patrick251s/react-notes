import React, { useState } from 'react';
import './InputSection.css';

function InputSection() {

  const [header, setHeader] = useState('Hola Español!');

  const spanishFlagClick = () => {
    // Kod do wykonania po kliknięciu
    console.log('Flaga Hiszpanii została kliknięta!');
    setHeader('Hola Español!')
  };

  const englandFlagClick = () => {
    // Kod do wykonania po kliknięciu
    console.log('Flaga Wielkiej Brytanii została kliknięta!');
    setHeader('Hello English!')
  };

    return (
        <main className="mx-auto">
          <h2 id="head" className="text-primary py-3">{header}</h2>
          <form>
            <div className="row pb-4">
                <div className="col-sm-4 mx-auto mb-3 mb-sm-0">
                    <div id="flagDiv" className="row mb-2">
                      <button id="polish" type="button" className="col-2 p-0 m-0 mx-auto"><img src="polska.jpg" className="col-12" alt="Polish flag"/></button>
                    </div>
                    <textarea id="polishArea" className="col-12"></textarea>
                </div>
                <div className="col-sm-4 mx-auto">
                    <div id="flagDiv" className="row mb-2">
                      <button onClick={spanishFlagClick} id="spain" type="button" className="col-2 p-0 m-0 mx-auto"><img src="spain.png" className="col-12" alt="Spanish flag"/></button>
                      <button onClick={englandFlagClick} id="england" type="button" className="col-2 p-0 m-0 mx-auto"><img src="british.jpg" className="col-12" alt="English flag"/></button>
                    </div>
                    <textarea id="foreignArea" className="col-12"></textarea>
                </div>  
            </div>
            <input type="submit" className="btn btn-success col-6 col-sm-2 mx-auto" value="Zapisz"/>
          </form>
        </main>
      
    )
  }
  
  export default InputSection;
  