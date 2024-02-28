import { IPhoto } from "../../types";
import "./ImageCard.scss";

const ImageCard = ({ photo }: { photo: IPhoto }) => {
  return (
    <div key={photo.id} className="photo">
      <img src={photo.urls.regular} alt={photo.alt_description} />
    </div>
  );
};

export default ImageCard;
