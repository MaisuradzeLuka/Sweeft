import { MouseEvent, useEffect } from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import "./History.scss";
import { fetchPhotos } from "../../apis";
import { useState } from "react";

interface IData {
  results: IPhoto[];
}

interface IUseQuery {
  data?: IData;
  refetch: () => Promise<QueryObserverResult<IData, Error>>;
}

const History = () => {
  const [historyItem, setHistoryItem] = useState("");
  const { data, refetch }: IUseQuery = useQuery<IData, Error>({
    queryKey: ["photos", historyItem],
    queryFn: () =>
      fetchPhotos(
        `search/photos?query=${historyItem}&per_page=20&order_by=popular`
      ),
  });

  const searchHistory = sessionStorage.getItem("searchHistory");
  const searchHistoryArray: string[] = searchHistory
    ? JSON.parse(searchHistory)
    : [];

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setHistoryItem(e.currentTarget.value);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="history">
      {searchHistoryArray?.map((item, i) => (
        <button key={i} value={item} onClick={handleClick}>
          {item}
        </button>
      ))}
      <div>
        {data?.results?.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.alt_description}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
