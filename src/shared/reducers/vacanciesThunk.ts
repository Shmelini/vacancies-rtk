import { createAsyncThunk } from "@reduxjs/toolkit";
type FetchParams = {
  filterTags?: string[];
  searchQuery?: string | null;
  areaFilter?: string;
};

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async function (fetchParams: FetchParams, { rejectWithValue }) {
    try {
      const { searchQuery = "", areaFilter = "0" } = fetchParams;
      const response = await fetch(
        `https://api.hh.ru/vacancies?industry=7&professional_role=96${
          areaFilter !== "0" ? "&area=" + areaFilter : ""
        }&text=${searchQuery}`,
        {
          headers: {
            "HH-User-Agent": "vacancies-rtk/1.0 (arhipilagys@gmail.com)",

            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Server Error");
      const data = await response.json();
      console.log(fetchParams);
      return data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);
