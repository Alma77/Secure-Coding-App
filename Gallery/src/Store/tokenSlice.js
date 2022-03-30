import { createSlice } from "@reduxjs/toolkit"

const TokenSlice = createSlice({
    name: "tokenSlice",
    initialState: {
        token: {
            UserName: null,
            expiresOn: null,
            extExpiresOn: null,
            idToken: null,
        }
    },
    reducers: {
        setToken: (state, action) => {
            state.token = {
                UserName: action.payload.UserName,
                expiresOn: action.payload.expiresOn,
                extExpiresOn: action.payload.extExpiresOn,
                idToken: action.payload.idToken,
            }
        }
    }
})

export const tokenActions = TokenSlice.actions;
export default TokenSlice;