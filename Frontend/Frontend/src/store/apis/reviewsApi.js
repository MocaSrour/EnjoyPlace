import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewsApi = createApi({
  reducerPath: "rates",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3117",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      fetchReviws: builder.query({
        providesTags: (result, error, review) => {
          const tags = result.rates.map((rev) => {
            return {
              type: "EditReview",
              placeId: rev.placeId,
              userId: rev.userId,
            };
          });
          tags.push({
            type: "AddReview",
            placeId: review.placeId,
            userId: review.userId,
          });

          return tags;
        },
        query: (placeId) => {
          return {
            url: `/getRatesByPlace/${placeId}`,
            method: "GET",
          };
        },
      }),
      addReview: builder.mutation({
        invalidatesTags: (result, error, review) => {
          return [
            {
              type: "AddReview",
              placeId: review.placeId,
              userId: review.userId,
            },
          ];
        },
        query: (review) => {
          return {
            url: "/add-rate",
            method: "POST",
            body: {
              userId: review.userId,
              placeId: review.placeId,
              rate: review.rate,
              comment: review.comment,
            },
          };
        },
      }),
      editReview: builder.mutation({
        invalidatesTags: (result, error, review) => {
          return [
            {
              type: "EditReview",
              placeId: review.placeId,
              userId: review.userId,
            },
          ];
        },
        query: (review) => {
          return {
            url: "/edit-rate",
            method: "PUT",
            body: {
              userId: review.userId,
              placeId: review.placeId,
              rate: review.rate,
              comment: review.comment,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchReviwsQuery,
  useAddReviewMutation,
  useEditReviewMutation,
} = reviewsApi;
export { reviewsApi };
