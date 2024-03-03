import { useState } from "react";
import "./ImageCard.scss";
import { Modal } from "..";

const ImageCard = ({ photo }: { photo: IPhoto }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="photo" onClick={() => setShowModal(true)}>
        <img src={photo?.urls?.regular} alt={photo?.alt_description} />
      </div>
      {showModal && <Modal setShowModal={setShowModal} photoDetails={photo} />}
    </>
  );
};

export default ImageCard;
