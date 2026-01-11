import { createSlice } from "@reduxjs/toolkit";
import { fetchVacancies } from "./vacanciesThunk";
import type { Vacancy } from "../../app/types/types";

type VacanciesState = {
  vacancies: Vacancy[];
  searchQuery: string;
  filterTags: string[];
  currentAreaFilter: string;
  isLoading: boolean;
  error: string | null | unknown;
};

const initialState: VacanciesState = {
  vacancies: [],
  searchQuery: "",
  filterTags: ["TypeScript", "React", "Redux"],
  currentAreaFilter: "0",
  isLoading: false,
  error: null,
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    addToSearchTags(state, action) {
      const newTag = action.payload[0].toUpperCase() + action.payload.slice(1);
      if (!state.filterTags.includes(newTag)) {
        state.filterTags = [...state.filterTags, newTag];
      }
    },
    removeSearchTag(state, action) {
      const targetTag = action.payload;
      const filteredArr = state.filterTags.filter(
        (item) => item !== targetTag && item
      );
      state.filterTags = filteredArr;
    },
    syncSearchTags(state, action) {
      state.filterTags = action.payload;
    },
    changeAreaFilter(state, action) {
      const area = action.payload.value;
      if (area !== undefined) state.currentAreaFilter = area;
    },
    changeSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVacancies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(fetchVacancies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vacancies = action.payload.items;
      }),
      builder.addCase(fetchVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToSearchTags,
  removeSearchTag,
  syncSearchTags,
  changeAreaFilter,
  changeSearchQuery,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
