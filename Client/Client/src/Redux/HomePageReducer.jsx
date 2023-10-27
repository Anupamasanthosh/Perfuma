import { createSlice } from "@reduxjs/toolkit";

const HomePageSlice=createSlice({
    name:'Home',
    initialState:{
        Category:[],
        Brand:[],
        Products:[]
    },
    reducers:{
        setCategory:(state,action)=>
        {
            state.Category=action.payload
        },
        setBrand:(state,action)=>
        {
            state.Brand=action.payload
        },
        addProducts:(state,action)=>
        {
            state.Products=action.payload
        }
    }
})

export const {setCategory,setBrand,addProducts} =HomePageSlice.actions

export default HomePageSlice.reducer