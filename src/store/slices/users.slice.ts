import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { users as seedUsers, type AdminUser, type UserRole, type UserStatus } from "@/data/admin/users";

export interface UsersFilters {
  search: string;
  role: string;
  status: string;
  registrationDate: string;
}

export interface UsersState {
  list: AdminUser[];
  filters: UsersFilters;
  page: number;
  pageSize: number;
}

export const emptyUsersFilters: UsersFilters = {
  search: "",
  role: "all",
  status: "all",
  registrationDate: "",
};

const initialState: UsersState = {
  list: seedUsers,
  filters: emptyUsersFilters,
  page: 1,
  pageSize: 8,
};

interface AddUserPayload {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    applyUsersFilters: (state, action: PayloadAction<UsersFilters>) => {
      state.filters = action.payload;
      state.page = 1;
    },

    resetUsersFilters: (state) => {
      state.filters = emptyUsersFilters;
      state.page = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    addUser: (state, action: PayloadAction<AddUserPayload>) => {
      const nextId = state.list.reduce((max, user) => Math.max(max, user.id), 0) + 1;
      state.list.unshift({ id: nextId, lastActivity: "Just now", ...action.payload });
      state.page = 1;
    },

    updateUser: (state, action: PayloadAction<AddUserPayload & { id: number }>) => {
      const user = state.list.find((item) => item.id === action.payload.id);
      if (!user) return;

      user.name = action.payload.name;
      user.email = action.payload.email;
      user.role = action.payload.role;
      user.status = action.payload.status;
      user.registrationDate = action.payload.registrationDate;
    },

    deleteUsers: (state, action: PayloadAction<number[]>) => {
      state.list = state.list.filter((user) => !action.payload.includes(user.id));
    },

    suspendUsers: (state, action: PayloadAction<number[]>) => {
      state.list.forEach((user) => {
        if (action.payload.includes(user.id)) user.status = "Suspended";
      });
    },

    activateUsers: (state, action: PayloadAction<number[]>) => {
      state.list.forEach((user) => {
        if (action.payload.includes(user.id)) user.status = "Active";
      });
    },

    changeRole: (state, action: PayloadAction<{ ids: number[]; role: UserRole }>) => {
      state.list.forEach((user) => {
        if (action.payload.ids.includes(user.id)) user.role = action.payload.role;
      });
    },
  },
});

export const {
  applyUsersFilters,
  resetUsersFilters,
  setPage,
  addUser,
  updateUser,
  deleteUsers,
  suspendUsers,
  activateUsers,
  changeRole,
} = usersSlice.actions;

export default usersSlice.reducer;
