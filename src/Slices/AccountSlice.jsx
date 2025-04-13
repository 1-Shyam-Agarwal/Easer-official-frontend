import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    account : null
}

const AccountSlice = createSlice({
    "name" : "account",
    initialState,
    reducers : {

        setAccount(state, action){
            state.account = action.payload 
        }
    }
})

export const{setAccount} = AccountSlice.actions;
export default AccountSlice.reducer;



