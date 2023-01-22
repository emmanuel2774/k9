import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";

import Header from "../Header/Header";
import DogsCards from "../DogsCards/DogsCards";
import Spinner from "../Spinner/Spinner";

function Breed() {
  const { loggedIn } = useAuthStatus();
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const dogsRef = collection(db, "dogs");
        const q = query(
          dogsRef,
          where("breed", "==", params.breedName),
          limit(10)
        );

        const querySnapshot = await getDocs(q);

        const dogs = [];

        querySnapshot.forEach((doc) => {
          return dogs.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setDogs(dogs);
        setLoading(false);
      } catch (error) {
        toast.error("Could not load dogs");
      }
    };

    fetchDogs();
  }, [params.breedName]);

  return (
    <>
      <Navbar />
      <Header />
      <DogsCards dogs={dogs} loading={loading} />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Available breeds
              </h5>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <a href="/breed/pitbull">
                <button className="btn btn-success">Pitbull</button>
              </a>{" "}
              <br />
              <a href="/breed/German Shepherd">
                <button className="btn btn-success mt-2">
                  German Shepherd
                </button>
              </a>{" "}
              <br />
              <a href="/breed/bulldog">
                <button className="btn btn-success mt-2">Bulldog</button>
              </a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Breed;
