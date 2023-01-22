import Dogitem from "../DogItem/Dogitem";
import Spinner from "../Spinner/Spinner";

function DogsCards({ dogs, loading, deleteIcon, onDelete }) {
  return (
    <div className="dogs-cards ">
      {loading ? (
        <Spinner />
      ) : dogs && dogs.length > 0 ? (
        <>
          <main>
            <div className="cards-container">
              {dogs.map((dog) => {
                return (
                  <Dogitem
                    dog={dog.data}
                    id={dog.id}
                    key={dog.id}
                    deleteIcon={deleteIcon}
                    onDelete={() => onDelete(dog.id)}
                  />
                );
              })}
            </div>
          </main>
        </>
      ) : (
        <h6 className="text-center mt-4">Could not load dogs </h6>
      )}
    </div>
  );
}

export default DogsCards;
