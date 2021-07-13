import {createSlice} from '@reduxjs/toolkit'

// redux initial state 
const fetchDataInitialState = {
 repos:[],
 haseMore:true,
 isError:false,
 page:1,
 per_page:30,
 order:'desc',
 sort:'stars'
}

const fetchDataSlice = createSlice({
 name:'repos_data',
 initialState:fetchDataInitialState,
 reducers:{
  fetchData(state,action){
   state.repos=[...state.repos , ...action.payload.data]
  },
  // change has more to false if no more data 
  haseMore(state){
    state.haseMore = false
  },
  // increase page number by 1
  pageNumber(state){
   state.page +=1
   console.log(state.page)
  }

  //end
 }
})
// export data slice action 
export const dataSliceActions = fetchDataSlice.actions

export default fetchDataSlice