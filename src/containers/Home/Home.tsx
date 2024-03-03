import { Dispatch, useEffect } from "react";
import { fetchPhotos } from "../../apis";
import { ImageCard } from "../../components";
import { useQuery } from "@tanstack/react-query";
import "./Home.scss";

interface IHome {
  inputValue: string;
  initialData: IPhoto[];
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

const Home = ({ inputValue, initialData, page, setPage }: IHome) => {
  const searchUrl = inputValue
    ? `search/photos?query=${inputValue}&per_page=20&order_by=popular&page=${page}`
    : `photos?per_page=20&order_by=popular&page=${page}`;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["photos", inputValue, page],
    queryFn: () => fetchPhotos(searchUrl, inputValue ? 1 : 0),
    enabled: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        setPage((prev) => prev + 1);

        if (data) {
          initialData.push(...data);
        }
      } catch (error) {
        throw new Error(`Something went wrong: ${error}`);
      }
    };

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
    <div className="photos">
      {inputValue ? (
        <h2>
          <span>{inputValue.toUpperCase()}</span> images & photos
        </h2>
      ) : (
        <h2>Discover and review images!</h2>
      )}
      <div className="photos__wrapper">
        {initialData?.map((photo, i) => (
          <ImageCard key={i} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
