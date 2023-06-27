import React, { useState, useEffect } from 'react';
import './InputSection.css';
import Note from "./Note";

function InputSection() {

  const [header, setHeader] = useState('Hola Español!');
  const [spanishBTN, setSpanishBTN] = useState(true);
  const [englishBTN, setEnglishBTN] = useState(false);
  const [language, setLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [isFirstLanguageChange, setIsFirstLanguageChange] = useState(true);
  const [notesFromDB, setNotesFromDB] = useState([]);
  

  //UseState działa asynchroniecznie, można dawać lekkie opóźnienia, daltego stosujemy useEffect, aby wyswietlic wartość po jej zmianie

  const spanishFlagClick = () => {
    setHeader('Hola Español!')
    setSpanishBTN(true);
    setEnglishBTN(false);
    setLanguage("es");
  };

  const englandFlagClick = () => {
    setHeader('Hello English!');
    setSpanishBTN(false);
    setEnglishBTN(true);
    setLanguage("en-GB");
  };

  useEffect(() => {
    getNotes(language);
    sendForTranslating();
  }, [language]);

  const sendForTranslating = () => {
      if(isFirstLanguageChange) {
        setIsFirstLanguageChange(false);
        return;
      }
      let polishText = document.getElementById('polishArea').value;
      if(polishText === "") return;
      fetch(`http://127.0.0.1:5000/getTranslation?text=${polishText}&language=${language}`)
      .then(response => response.json())
      .then(data => {
        // Obsłuż odpowiedź serwera
        console.log(data);
        setTranslatedText(data);
      })
      .catch(error => {
        // Obsłuż błąd żądania
        console.error(error);
      });
  };

  const saveNote = () => {
    let polishText = document.getElementById('polishArea').value;
    let foreignText = document.getElementById('foreignArea').value;
    if(polishText.trim() === "" || foreignText.trim() === "") return;
    fetch("http://127.0.0.1:5000/saveNote", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        polishText: polishText,
        foreignText: foreignText,
        short: language
      })
    })
    .then(data => {
        console.log("Notatka została zapisana!");
        getNotes(language);
    })
    .catch(error => {
      console.log("Błąd!")
    });
  };

  const getNotes = () => {
    fetch("http://127.0.0.1:5000/getNotes/"+language, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setNotesFromDB(data);
    })
    .catch(error => {
      console.log("Błąd!")
    });
  };

  return (
      <main className="mx-auto">
        <h2 id="head" className="text-primary py-3">{header}</h2>
          <div className="row pb-4">
              <div className="col-sm-5 mx-auto mb-3 mb-sm-0">
                  <div id="flagDiv" className="row mb-2">
                    <button id="polish" type="button" className="col-2 p-0 m-0 mx-auto flagBTN"><img src="polska.jpg" className="col-12" alt="Polish flag"/></button>
                  </div>
                  <textarea id="polishArea" className="col-12"></textarea>
              </div>
              <div className="col-sm-5 mx-auto">
                  <div id="flagDiv" className="row mb-2">
                    <button onClick={spanishFlagClick} id="spain" type="button" className={`col-2 p-0 m-0 mx-auto flagBTN ${spanishBTN ? '':'halfOpacity'}`}><img src="spain.png" className="col-12" alt="Spanish flag"/></button>
                    <button onClick={englandFlagClick} id="england" type="button" className={`col-2 p-0 m-0 mx-auto flagBTN ${englishBTN ? '':'halfOpacity'}`}><img src="british.jpg" className="col-12" alt="English flag"/></button>
                  </div>
                  <textarea id="foreignArea" className="col-12" defaultValue={translatedText}></textarea>
              </div>  
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-primary col-5 col-sm-2 mx-5 my-2 my-sm-0" onClick={sendForTranslating} >Tłumacz</button>
            <button className="btn btn-success col-5 col-sm-2 mx-5 my-2 my-sm-0" onClick={saveNote}>Zapisz</button>
          </div>

          <section>
            <h3 className="mt-5 text-warning ">Lista notatek</h3>
            <table className="mt-3 table table-dark">
              <thead>
                <tr>
                  <th>Tekst po polsku</th>
                  <th>Tłumaczenie</th>
                </tr>
              </thead>
              <tbody>
              {notesFromDB.map((note) => (
                <Note key={note[0]} keyProp={note[0]} polishText={note[1]} foreignText={note[2]}/>
              ))}
              </tbody>
            </table>
          </section>
      </main>
    
  )
}
  
export default InputSection;
  