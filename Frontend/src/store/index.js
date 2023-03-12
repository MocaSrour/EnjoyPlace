import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { reviewsApi } from "./apis/reviewsApi";
import { usersApi } from "./apis/usersApi";

export const store = configureStore({
    reducer: {
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(reviewsApi.middleware)
        .concat(usersApi.middleware)
    }
});

setupListeners(store.dispatch);

export { useFetchReviwsQuery, useAddReviewMutation, useEditReviewMutation } from './apis/reviewsApi';
export { useAddUserMutation } from './apis/usersApi';