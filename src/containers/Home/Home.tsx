import { ImageCard } from "../../components";
import "./Home.scss";

const Home = ({ photos }: { photos: IPhoto[] }) => {
  return (
    <main className="photos">
      {photos.map((photo) => (
        <ImageCard key={photo?.id} photo={photo} />
      ))}
    </main>
  );
};

export default Home;
