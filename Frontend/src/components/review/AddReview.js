import { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { useAddReviewMutation } from "../../store/apis/reviewsApi";
import Button from "../form/Button";
import Form from "../form/Form";
import Label from "../form/Label";
import AuthContext from "../../context/AuthContext";
import './addReview.css';
import InputEmoji from 'react-input-emoji';

const loading = new Promise((pending) => setTimeout(pending, 3000));
const success = new Promise((resolve) => setTimeout(resolve, 3000));
function AddReview({ placeId }) {
  const [reviewVal, setReviewVal] = useState("");
  const [rateVal, setRateVal] = useState(0);
  const { user } = useContext(AuthContext);
  const userId = user.id;
 
  const [addReview, results] = useAddReviewMutation();
  const review = {
    userId: userId,
    placeId: placeId,
    comment: reviewVal,
    rate: rateVal,
  };
  const handleAddReview = (e) => {
    e.preventDefault(); 
    addReview(review);
  };
  if (results.isLoading) {
    toast.promise(loading, {
      pending: "Adding...",
    });
  }

  if (results.isError) {
    console.log(results.error.data)
      toast.error("🤯 " + results.error.data, {
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
  if (results.isSuccess) {
    toast.promise(success, {
      success: "Thanks for your feedback 👌",
    });
  }
 
  return (
    <Form id='formAddReview' onSubmit={handleAddReview}>
      <Label>Rate your experience:</Label>
      <ReactStars
        size={36}
        onChange={(e) => {
          setRateVal(e);
        }}
      />
      <div style={{ width: '500px'}}>
      <InputEmoji
          value={reviewVal}
          onChange={setReviewVal}
          cleanOnEnter
          height= '200px'
          borderColor = '#623791'
          borderRadius = '15px'
          fontSize= "20px"
          />
          </div>
      <Button defaultColor="#503791" style={{ width: '480px'}} activeColor="#623791">
        Add Review
      </Button>
    </Form>
  );
}

export default AddReview;
