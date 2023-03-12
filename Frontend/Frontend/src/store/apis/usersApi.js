import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3117',
        withCredentials: true
    }),
    endpoints(builder) {
        return {
            addUser: builder.mutation({
                query: (user) => {
                    return {
                        url: '/signup',
                        method: 'POST',
                        body: {
                            userName: user.userName,
                            email: user.email,
                            password: user.password
                        }
                    }
                },
                transformErrorResponse: (
                    response,
                    meta,
                    arg
                  ) => { return response }
            })
        };
    }
});

export const { useAddUserMutation } = usersApi;
export { usersApi };