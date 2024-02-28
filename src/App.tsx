import { ChangeEvent, useEffect, useState } from "react";
import { fetchPhotos } from "./apis";
import { Route, Routes } from "react-router";
import { History, Home } from "./containers";
import { Navbar } from "./components";

function App() {
  const [photos, setPhotos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    // fetchPhotos(`search/photos?query=${inputValue}&`).then((data) =>
    //   setPhotos(data.results)
    // );
  };

  useEffect(() => {
    fetchPhotos("photos?").then((data) => setPhotos(data));
  }, []);

  return (
    <>
      <Navbar inputValue={inputValue} changeHandler={changeHandler} />
      <Routes>
        <Route path="/" element={<Home photos={photos} />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
