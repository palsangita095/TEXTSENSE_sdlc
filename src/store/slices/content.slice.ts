import API from "@/api/axios/axiosInstance";
import { endpoints } from "@/api/endpoints/endPoints";
import { getErrorMessage } from "@/services/helpers/global.helper";
import {
  type ArticleCreatePayload,
  type ArticleListResponse,
  type ArticleRecord,
  type ArticleUpdatePayload,
} from "@/type/type/content.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ContentState {
  articles: ArticleRecord[];
  isLoading: boolean;
  isSubmitting: boolean;
  deletingSlug: string | null;
  error: string | null;
  lastFetchedAt: string | null;
}

const initialState: ContentState = {
  articles: [],
  isLoading: false,
  isSubmitting: false,
  deletingSlug: null,
  error: null,
  lastFetchedAt: null,
};

const articleDetailUrl = (slug: string): string =>
  `${endpoints.content.articles}${encodeURIComponent(slug)}/`;

const isArticleRecord = (value: unknown): value is ArticleRecord => {
  if (!value || typeof value !== "object") return false;

  const record = value as Partial<ArticleRecord>;

  return (
    typeof record.id === "number" &&
    typeof record.title === "string" &&
    typeof record.slug === "string"
  );
};

export const fetchArticles = createAsyncThunk<
  ArticleRecord[],
  void,
  { rejectValue: string }
>("content/fetchArticles", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get<ArticleRecord[] | ArticleListResponse>(
      endpoints.content.articles,
    );

    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray(data.results)) {
      return data.results;
    }

    if (data && Array.isArray(data.articles)) {
      return data.articles;
    }

    return rejectWithValue("The article response did not include a valid list.");
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createArticle = createAsyncThunk<
  ArticleRecord,
  ArticleCreatePayload,
  { rejectValue: string }
>("content/createArticle", async (payload, { rejectWithValue }) => {
  try {
    const response = await API.post<ArticleRecord>(
      endpoints.content.articles,
      payload,
    );

    if (!response.data || typeof response.data.id !== "number") {
      return rejectWithValue("The article was not returned by the server.");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateArticle = createAsyncThunk<
  ArticleRecord,
  { slug: string; payload: ArticleUpdatePayload },
  { rejectValue: string }
>("content/updateArticle", async ({ slug, payload }, { rejectWithValue }) => {
  try {
    const response = await API.patch<ArticleRecord>(
      articleDetailUrl(slug),
      payload,
    );

    if (!response.data || typeof response.data.id !== "number") {
      return rejectWithValue("The updated article was not returned by the server.");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteArticle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("content/deleteArticle", async (slug, { rejectWithValue }) => {
  try {
    await API.delete(articleDetailUrl(slug));
    return slug;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearContentError: (state) => {
      state.error = null;
    },

    resetContent: (state) => {
      state.articles = [];
      state.isLoading = false;
      state.isSubmitting = false;
      state.deletingSlug = null;
      state.error = null;
      state.lastFetchedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.articles = action.payload;
      state.lastFetchedAt = new Date().toISOString();
    });

    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Unable to load articles. Please try again.";
    });

    builder.addCase(createArticle.pending, (state) => {
      state.isSubmitting = true;
      state.error = null;
    });

    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.error = null;

      if (!state.articles.some((article) => article.id === action.payload.id)) {
        state.articles.unshift(action.payload);
      }
    });

    builder.addCase(createArticle.rejected, (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload ?? "Unable to create the article. Please try again.";
    });

    builder.addCase(updateArticle.pending, (state) => {
      state.isSubmitting = true;
      state.error = null;
    });

    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.error = null;

      const index = state.articles.findIndex(
        (article) =>
          article.id === action.payload.id || article.slug === action.payload.slug,
      );

      if (index !== -1) {
        state.articles[index] = action.payload;
      } else if (isArticleRecord(action.payload)) {
        state.articles.unshift(action.payload);
      }
    });

    builder.addCase(updateArticle.rejected, (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload ?? "Unable to update the article. Please try again.";
    });

    builder.addCase(deleteArticle.pending, (state, action) => {
      state.deletingSlug = action.meta.arg;
      state.error = null;
    });

    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.deletingSlug = null;
      state.error = null;
      state.articles = state.articles.filter(
        (article) => article.slug !== action.payload,
      );
    });

    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.deletingSlug = null;
      state.error = action.payload ?? "Unable to delete the article. Please try again.";
    });
  },
});

export const { clearContentError, resetContent } = contentSlice.actions;
export default contentSlice.reducer;
