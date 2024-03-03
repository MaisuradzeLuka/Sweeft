import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { History, Home } from "./containers";
import { Navbar } from "./components";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "./apis";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(2);

  const searchUrl = inputValue
    ? `search/photos?query=${inputValue}&per_page=20&order_by=popular`
    : `photos?per_page=20&order_by=popular`;

  const { data, refetch } = useQuery({
    queryKey: ["photos", inputValue, 1],
    queryFn: () => fetchPhotos(searchUrl, inputValue ? 1 : 0),
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
        setPage(2);
        handleSesstionStorage();
        refetch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      refetch();
      setPage(2);
    }
  }, [handleSesstionStorage, inputValue, refetch]);

  return (
    <>
      <Navbar inputValue={inputValue} changeHandler={changeHandler} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              inputValue={inputValue}
              initialData={data}
              setPage={setPage}
              page={page}
            />
          }
        />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
