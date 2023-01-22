import { useLocation } from "react-router-dom";
import "./DogItem.css";

function Dogitem({ dog, id, deleteIcon, onDelete }) {
  return (
    <>
      <div className="card text-center ">
        <img src={dog.imageUrls[0]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title ">{dog.name}</h5>
          <p className="card-text ">{dog.breed}</p>
          <a href="#" className="btn btn-outline-success  ">
            $ {dog.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </a>{" "}
          <br />
          {deleteIcon ? (
            <button
              onClick={() => onDelete(dog.id)}
              className="btn btn-outline-danger mt-2"
            >
              delete
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Dogitem;
