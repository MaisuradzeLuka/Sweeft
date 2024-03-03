import { MouseEvent, useEffect } from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../apis";
import { useState } from "react";
import "./History.scss";

interface IData {
  results: IPhoto[];
}

interface IUseQuery {
  data?: IData;
  refetch: () => Promise<QueryObserverResult<IData, Error>>;
}

const History = () => {
  const [historyItem, setHistoryItem] = useState("");
  const [page, setPage] = useState(2);
  // const [photos, setPhotos] = useState<IPhoto[] | null>(null);

  const { data: initialData, refetch: initialRefetch }: IUseQuery = useQuery<
    IData,
    Error
  >({
    queryKey: ["photos", historyItem],
    queryFn: () =>
      fetchPhotos(
        `search/photos?query=${historyItem}&per_page=20&order_by=popular`,
        0
      ),
    enabled: false,
  });

  const searchHistory = sessionStorage.getItem("searchHistory");
  const searchHistoryArray: string[] = searchHistory
    ? JSON.parse(searchHistory)
    : [];

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setHistoryItem(e.currentTarget.value);
    setPage(2);
  };

  useEffect(() => {
    initialRefetch();
  }, [historyItem, initialRefetch]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["photos", historyItem, page],
    queryFn: () =>
      fetchPhotos(
        `search/photos?query=${historyItem}&per_page=20&order_by=popular&page=${page}`,
        1
      ),
    enabled: false,
  });

  const fetchData = async () => {
    try {
      await refetch();
      setPage((prev) => prev + 1);

      if (data) {
        initialData?.results.push(...data);
      }
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="history">
      <div className="history__items">
        {searchHistory?.length ? (
          searchHistoryArray?.map((item, i) => (
            <button value={item} key={i} onClick={handleClick}>
              {item}
            </button>
          ))
        ) : (
          <h2>Your history is empty</h2>
        )}
      </div>

      <div className="history__photos">
        {initialData?.results?.length ? (
          initialData?.results?.map((photo, i) => (
            <img key={i} src={photo.urls.regular} alt={photo.alt_description} />
          ))
        ) : (
          <h2>Select searched history to view photos</h2>
        )}
      </div>
    </div>
  );
};

export default History;
