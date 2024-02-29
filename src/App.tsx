import { ChangeEvent, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { History, Home } from "./containers";
import { Navbar } from "./components";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "./apis";

function App() {
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { data: photos, refetch } = useQuery({
    queryKey: ["photos"],
    queryFn: () => fetchPhotos(`search/photos?query=${inputValue}&`),
    initialData: [],
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  useEffect(() => {
    if (inputValue) {
      const delayDebounceFn = setTimeout(() => {
        refetch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      fetchPhotos("photos?").then((data) => setInitialPhotos(data));
    }
  }, [inputValue, refetch]);

  return (
    <>
      <Navbar inputValue={inputValue} changeHandler={changeHandler} />
      <Routes>
        <Route
          path="/"
          element={<Home photos={photos.length ? photos : initialPhotos} />}
        />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
