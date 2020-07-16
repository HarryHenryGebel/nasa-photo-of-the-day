import React, {useState, useEffect} from "react";
import "./App.css";
import {requester} from "easier-requests";
import Header from "./Header";
import {addDays} from "./helpers";

function getAPOD (setApodData,
                  date = undefined,
                  setDisplayDate = undefined) {
  async function _getAPOD (setApodData, data, setDisplayDate) {
    const baseURL = 'https://api.nasa.gov/planetary/apod?',
          additional = ['api_key=SrKOhrnWciCIqOHkKCsbQNBEXvjI51TD7a18iRjX',
                        'hd=True'];
    // If no date provided, default to today
    if (!date)
      date = new Date();

    // add date to GET
    additional.push(
      `date=${date.getFullYear()}-${date.getMonth() + 1}-` +
        `${date.getDate()}`);

    const id = requester.createUniqueID();
    await requester.get(baseURL + additional.join('&'), id);
    const response = requester.response(id).data;

    // if not an image, keep going back until we find an image
    if (response.media_type === 'video') {
      getAPOD(setApodData, addDays(date, -1));
    }
    else {
      // if there is no HD image, use normal as HD
      if (!('hdurl' in response))
        response.hdurl = response.url;

      setApodData(response);
      if (setDisplayDate)
        setDisplayDate(date);
      console.log(date);
    }
  }

  _getAPOD(setApodData, date, setDisplayDate);
}

function App() {
  const [apodData, setApodData] = useState(),
        [displayDate, setDisplayDate] = useState(new Date());

  useEffect(() => getAPOD(setApodData,
                          displayDate,
                          setDisplayDate), [displayDate]);

  return (
    <div className="App">
      <Header/>
      <APODHolder apodData = {apodData}/>
    </div>
  );
}

function APODHolder(props) {
  const {apodData} = props;
  if (!apodData)
    return (
      <h2>Retrieving data</h2>
    );

  const {title, explanation, url, copyright} = apodData;
  return (
    <div>
      <h3>{title}</h3>
      <img alt={title} src={url}/>
      <p>{explanation}</p>
      <p>Copyright: {copyright}</p>
    </div>
  );
}

export default App;

//  LocalWords:  hdurl
