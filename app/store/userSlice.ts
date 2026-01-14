import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '~/types/user.types';
import { env } from '~/config/env';

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(`${env.API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data: User[] = await response.json();

  return data.map(user => ({
    ...user,
    avatar: `${env.AVATAR_BASE_URL}/${user.id}/200/200`,
  }));
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { addUser, updateUser, deleteUser, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
