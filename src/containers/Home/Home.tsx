import { ImageCard } from "../../components";
import { IPhoto } from "../../types";
import "./Home.scss";

const Home = ({ photos }: { photos: IPhoto[] }) => {
  console.log(photos);

  return (
    <main className="photos">
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default Home;
