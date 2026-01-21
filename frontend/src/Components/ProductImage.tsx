import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ProductDetail.css";

interface Props {
  images: string[];
}

export default function ProductImage({ images }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Thumbnails */}
      <div className="d-flex gap-2 flex-wrap mt-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={`https://localhost:7147/${img}`}
            alt={`product-${index}`}
            className="thumbnail-image"
            onClick={() => openImage(index)}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="p-0"
      >
        <Modal.Body className="position-relative p-0">
          {/* X Close button */}
          <Button
            variant="light"
            onClick={() => setShowModal(false)}
            className="position-absolute top-0 end-0 m-2 rounded-circle"
            style={{ zIndex: 10 }}
          >
            &times;
          </Button>

          {/* Prev/Next buttons */}
          <Button
            variant="light"
            onClick={prevImage}
            className="position-absolute top-50 start-0 translate-middle-y rounded-circle"
            style={{ zIndex: 10 }}
          >
            &#8592;
          </Button>

          <Button
            variant="light"
            onClick={nextImage}
            className="position-absolute top-50 end-0 translate-middle-y rounded-circle"
            style={{ zIndex: 10 }}
          >
            &#8594;
          </Button>

          {/* Imazhi */}
          <img
            src={`https://localhost:7147/${images[currentIndex]}`}
            alt="product"
            className="img-fluid w-100"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
