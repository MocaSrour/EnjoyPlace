import AddReview from "./AddReview";
import BoxReview from "./BoxReview";
import { useFetchReviwsQuery } from "../../store/apis/reviewsApi";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext"; 
import './reviews.css';

function Reviews() {
  const { placeId } = useParams();
  const { data, error, isFetching } = useFetchReviwsQuery(placeId);
  const { user } = useContext(AuthContext);
  
  let showAdd = true;
  let content;
  
  if (isFetching) {
    content = <AiOutlineLoading3Quarters />;
  } else if (error) {
    content = <div>{ toast.error(
      "Couldn't get reviews",
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }
    )}</div>;
  } else {
    const userid = user.id;
    content = data.rates.map((review) => {
      const shouldEdit = review.userId === userid;
      if (shouldEdit) showAdd = false;
      return (
        <BoxReview
          edit={shouldEdit}
          key={review.userId + review.placeId}
          review={review}
        />
      );
    });
  }
  return (
  <>
      {showAdd && <AddReview placeId={placeId} />}
      <div className="reviewBoxes">
      {content}
      </div>
    </>
  );
}

export default Reviews;
