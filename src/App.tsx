import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { History, Home } from "./containers";
import { Navbar } from "./components";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "./apis";

function App() {
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const {
    data: { results: photos = [] },
    refetch,
  } = useQuery({
    queryKey: ["photos", inputValue],
    queryFn: () =>
      fetchPhotos(
        `search/photos?query=${inputValue}&per_page=20&order_by=popular`
      ),
    initialData: [],
    enabled: false,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleSesstionStorage = useCallback(() => {
    const sesstionArray = sessionStorage.getItem("searchHistory");

    const historyArray = sesstionArray ? JSON.parse(sesstionArray) : [];

    if (!historyArray.includes(inputValue)) {
      sessionStorage.setItem(
        "searchHistory",
        JSON.stringify([...historyArray, inputValue])
      );
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue) {
      const delayDebounceFn = setTimeout(() => {
        handleSesstionStorage();
        refetch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      fetchPhotos("photos?per_page=20&order_by=popular").then((data) =>
        setInitialPhotos(data)
      );
    }
  }, [inputValue, refetch, handleSesstionStorage]);

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
