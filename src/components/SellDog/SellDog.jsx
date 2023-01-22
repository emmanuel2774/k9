import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./SellDog.css";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

function SellDog() {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    price: "",
    images: {},
  });
  const [loading, setLoading] = useState(false);

  const { name, breed, price, images } = formData;

  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    // const docRef = await addDoc(collection(db, "dogs"), formDataCopy);
    setLoading(false);

    toast.success("Dog details saved");
    navigate(`/breed/${formDataCopy.breed}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      } else {
        navigate("/sign-in");
      }
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar />

      <main className="sell-dog-container">
        <form className="form" onSubmit={onSubmit}>
          <div className="text-success">
            <h4>Sell a Dog</h4>
          </div>

          <input
            type="text"
            className="form-control "
            id="name"
            placeholder="Name"
            value={name}
            onChange={onMutate}
            maxLength="20"
            minLength="3"
          />

          <input
            type="text"
            className="form-control mt-3 "
            id="breed"
            placeholder="Breed"
            value={breed}
            onChange={onMutate}
            maxLength="40"
            minLength="3"
          />

          <input
            type="number"
            className="form-control mt-3"
            id="price"
            placeholder="Price"
            value={price}
            onChange={onMutate}
            max="20000"
            min="100"
          />

          <label className="mt-3 text-success images">
            <h6>Images</h6>
          </label>
          <input
            type="file"
            className="form-control mt-2"
            id="images"
            placeholder="Images"
            onChange={onMutate}
            max="6"
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />
          <p className="text-success mt-2 image-text">
            {" "}
            The first image will be the cover <br /> (max 6)
          </p>

          <button className="btn btn-outline-success Sell-button mt-4">
            Sell
          </button>
        </form>
      </main>
    </div>
  );
}

export default SellDog;
