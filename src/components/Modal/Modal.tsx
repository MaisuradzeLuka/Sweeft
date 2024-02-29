import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../apis";

interface IModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  photoDetails: IPhoto;
}

interface IPhotoDetails {
  downloads: {
    total: string;
  };
  views: {
    total: string;
  };
  likes: {
    total: string;
  };
}

const Modal = ({ setShowModal, photoDetails }: IModal) => {
  const [mountElement, setMountElement] = useState<HTMLElement | null>(null);
  const { data }: { data: IPhotoDetails | undefined } = useQuery({
    queryKey: ["photoDetails", photoDetails.id],
    queryFn: () =>
      fetchPhotos(`photos/${photoDetails.id}/statistics?quantity=1`),
  });

  useEffect(() => {
    setMountElement(document.getElementById("overlay"));
  }, []);

  return (
    mountElement &&
    createPortal(
      <div className="modal">
        <img src={photoDetails.urls.full} alt={photoDetails.alt_description} />
        <div className="modal__info">
          {data && <span>{`${data.likes.total} likes`}</span>}
          {data && <span>{`${data?.downloads?.total} downloads`}</span>}
          {data && <span>{`${data?.views?.total || 0} views`}</span>}
        </div>
        <button onClick={() => setShowModal(false)}>close</button>
      </div>,
      mountElement
    )
  );
};

export default Modal;
