import {configureStore} from '@reduxjs/toolkit'

import fetchDataSlice from './store/fetchDataSlice'

// create store with react toolkit
const store = configureStore({
 reducer:fetchDataSlice.reducer
})

export default store