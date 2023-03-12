import { useState, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";
import Label from "../form/Label";
import AuthContext from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditReviewMutation } from "../../store";
import { toast } from "react-toastify";
import './editReview.css';

const success = new Promise((resolve) => setTimeout(resolve, 3000));
const loading = new Promise((pending) => setTimeout(pending, 3000));

function EditReview() {
  const location = useLocation();
  const [reviewVal, setReviewVal] = useState(location.state.review.comment);
  const [rateVal, setRateVal] = useState(location.state.review.rate);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user.id;
  
  const [EditReview, result] = useEditReviewMutation();
  const review = {
    userId: userId,
    placeId: location.state.review.placeId,
    comment: reviewVal,
    rate: rateVal,
  };
  console.log()
  const handleEditReview = (e) => {
    e.preventDefault();
    EditReview(review);
  };
  if (result.isLoading) {
    toast.promise(loading, {
      pending: "Editing...",
    });
  }

  if (result.isError) {
      toast.error("🤯 " + result.error.data, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
  }
  if (result.isSuccess) {
    toast.promise(success, {
      success: "Thanks for your feedback 👌",
    });
    navigate("/PlaceDetails/" + review.placeId);
  }
  return (
    <Form id='formEdit' onSubmit={handleEditReview}>
      <Label>Edit your feedback</Label>
      <ReactStars
      size={36}
      value={rateVal}
        onChange={(e) => {
          setRateVal(e);
        }}
      />
      <Input style={{ height: '200px', width: '500px' }} value={reviewVal} onChange={(e) => setReviewVal(e.target.value)} />
      <Button defaultColor="#503791" style={{ width: '500px'}} activeColor="#623791">
        Edit Review
      </Button>
    </Form>
  );
}

export default EditReview;
