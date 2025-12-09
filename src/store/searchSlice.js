import { createSlice } from "@reduxjs/toolkit";
const searchHomePageSlice = createSlice({
  name: "homePage",
  initialState: {
    searchValue: null,
  },
  reducers: {
    setSearchValue1(state, action) {
      state.searchValue = action.payload;
    },
  },
});
//setter
export const { setSearchValue1 } = searchHomePageSlice.actions;
//getter
export const getValue = (state) => state.search.searchValue;
export default searchHomePageSlice.reducer;
