import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showOrderModel : false
}


const placeOrderSlice = createSlice({
    name : "placeOrder",
    initialState,
    reducers : {

        setShowOrderModel(state , action)
        {
            state.showOrderModel = action.payload ;

        },
    }
})

export const {setShowOrderModel} = placeOrderSlice.actions ;
export default placeOrderSlice.reducer ;