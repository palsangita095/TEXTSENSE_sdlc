import API from "@/api/axios/axiosInstance";
import { endpoints } from "@/api/endpoints/endPoints";
import { getErrorMessage } from "@/services/helpers/global.helper";
import {
  AdminAnalytics,
  AdminAnalyticsQuery,
  AdminAnalyticsResponse,
  AdminState,
  CategoryCreatePayload,
  CategoryCreateResponse,
  CategoryListResponse,
  CategoryRecord,
  FeedbackCreatePayload,
  FeedbackRecord,
  FeedbackStatus,
} from "@/type/type/admin.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AdminState = {
  analytics: null,
  isLoading: false,
  error: null,
  lastFetchedAt: null,
  feedbacks: [],
  categories: [],
  isFeedbackLoading: false,
  isFeedbackSubmitting: false,
  isCategoriesLoading: false,
  isCategorySubmitting: false,
  feedbackError: null,
  categoriesError: null,
  lastFeedbacksFetchedAt: null,
};

export const fetchAdminAnalytics = createAsyncThunk<
  AdminAnalytics,
  AdminAnalyticsQuery | undefined,
  { rejectValue: string }
>("admin/fetchAnalytics", async (params, { rejectWithValue }) => {
  try {
    const response = await API.get<AdminAnalyticsResponse>(endpoints.admin.analytics, {
      params: {
        ...(params?.date_from ? { date_from: params.date_from } : {}),
        ...(params?.date_to ? { date_to: params.date_to } : {}),
      },
    });

    if (!response.data?.analytics) {
      return rejectWithValue(
        response.data?.message || "The analytics response did not include any data.",
      );
    }

    return response.data.analytics;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchFeedbacks = createAsyncThunk<
  FeedbackRecord[],
  void,
  { rejectValue: string }
>("admin/fetchFeedbacks", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get<
      FeedbackRecord[] | { feedbacks?: FeedbackRecord[] }
    >(endpoints.admin.feedback);

    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray(data.feedbacks)) {
      return data.feedbacks;
    }

    return rejectWithValue("The feedback response did not include a valid list.");
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createFeedback = createAsyncThunk<
  FeedbackRecord,
  FeedbackCreatePayload,
  { rejectValue: string }
>("admin/createFeedback", async (payload, { rejectWithValue }) => {
  try {
    const response = await API.post<FeedbackRecord>(endpoints.admin.feedback, payload, {
      timeout: 60000,
    });

    if (!response.data || typeof response.data.id !== "number") {
      return rejectWithValue("The feedback was not returned by the server.");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateFeedbackStatus = createAsyncThunk<
  FeedbackRecord,
  { id: number; status: FeedbackStatus },
  { rejectValue: string }
>("admin/updateFeedbackStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await API.patch<FeedbackRecord>(
      `${endpoints.admin.feedbackDetails}/${id}`,
      { status },
    );

    if (!response.data || typeof response.data.id !== "number") {
      return rejectWithValue("The updated feedback was not returned by the server.");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchCategories = createAsyncThunk<
  CategoryRecord[],
  void,
  { rejectValue: string }
>("admin/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get<CategoryListResponse>(endpoints.admin.categories);

    if (!Array.isArray(response.data?.categories)) {
      return rejectWithValue("The category response did not include a valid list.");
    }

    return response.data.categories;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createCategory = createAsyncThunk<
  CategoryRecord,
  CategoryCreatePayload,
  { rejectValue: string }
>("admin/createCategory", async (payload, { rejectWithValue }) => {
  try {
    const response = await API.post<CategoryCreateResponse>(
      endpoints.admin.categories,
      payload,
    );

    if (!response.data?.category || typeof response.data.category.id !== "number") {
      return rejectWithValue("The category was not returned by the server.");
    }

    return response.data.category;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },

    clearFeedbackError: (state) => {
      state.feedbackError = null;
    },

    clearCategoriesError: (state) => {
      state.categoriesError = null;
    },

    resetAdminAnalytics: (state) => {
      state.analytics = null;
      state.isLoading = false;
      state.error = null;
      state.lastFetchedAt = null;
    },

    resetAdminFeedbacks: (state) => {
      state.feedbacks = [];
      state.isFeedbackLoading = false;
      state.isFeedbackSubmitting = false;
      state.feedbackError = null;
      state.lastFeedbacksFetchedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminAnalytics.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.analytics = action.payload;
      state.lastFetchedAt = new Date().toISOString();
    });

    builder.addCase(fetchAdminAnalytics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Unable to load admin analytics. Please try again.";
    });

    builder.addCase(fetchFeedbacks.pending, (state) => {
      state.isFeedbackLoading = true;
      state.feedbackError = null;
    });

    builder.addCase(fetchFeedbacks.fulfilled, (state, action) => {
      state.isFeedbackLoading = false;
      state.feedbackError = null;
      state.feedbacks = action.payload;
      state.lastFeedbacksFetchedAt = new Date().toISOString();
    });

    builder.addCase(fetchFeedbacks.rejected, (state, action) => {
      state.isFeedbackLoading = false;
      state.feedbackError =
        action.payload ?? "Unable to load feedback. Please try again.";
    });

    builder.addCase(createFeedback.pending, (state) => {
      state.isFeedbackSubmitting = true;
      state.feedbackError = null;
    });

    builder.addCase(createFeedback.fulfilled, (state, action) => {
      state.isFeedbackSubmitting = false;
      state.feedbackError = null;

      if (!state.feedbacks.some((feedback) => feedback.id === action.payload.id)) {
        state.feedbacks.unshift(action.payload);
      }

      state.lastFeedbacksFetchedAt = new Date().toISOString();
    });

    builder.addCase(createFeedback.rejected, (state) => {
      state.isFeedbackSubmitting = false;
    });

    builder.addCase(updateFeedbackStatus.fulfilled, (state, action) => {
      const index = state.feedbacks.findIndex(
        (feedback) => feedback.id === action.payload.id,
      );

      if (index !== -1) {
        state.feedbacks[index] = action.payload;
      }
    });

    builder.addCase(fetchCategories.pending, (state) => {
      state.isCategoriesLoading = true;
      state.categoriesError = null;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isCategoriesLoading = false;
      state.categoriesError = null;
      state.categories = action.payload;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isCategoriesLoading = false;
      state.categoriesError =
        action.payload ?? "Unable to load categories. Please try again.";
    });

    builder.addCase(createCategory.pending, (state) => {
      state.isCategorySubmitting = true;
      state.categoriesError = null;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isCategorySubmitting = false;
      state.categoriesError = null;

      if (!state.categories.some((category) => category.id === action.payload.id)) {
        state.categories.push(action.payload);
        state.categories.sort((first, second) => first.name.localeCompare(second.name));
      }
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.isCategorySubmitting = false;
      state.categoriesError =
        action.payload ?? "Unable to create the category. Please try again.";
    });
  },
});

export const {
  clearAdminError,
  clearFeedbackError,
  clearCategoriesError,
  resetAdminAnalytics,
  resetAdminFeedbacks,
} = adminSlice.actions;
export default adminSlice.reducer;
