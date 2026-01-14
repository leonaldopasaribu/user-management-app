import userReducer, {
  addUser,
  updateUser,
  deleteUser,
  setSelectedUser,
  fetchUsers,
} from './userSlice';
import type { UserState } from './userSlice';
import type { User } from '~/types/user.types';

global.fetch = jest.fn();

describe('userSlice', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    phone: '123-456-7890',
    website: 'johndoe.com',
    address: {
      street: 'Main St',
      suite: 'Apt. 1',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: '40.7128',
        lng: '-74.0060',
      },
    },
    company: {
      name: 'Doe Inc',
      catchPhrase: 'Innovate',
      bs: 'tech',
    },
  };

  const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null,
    selectedUser: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return the initial state when reducer is called with undefined state', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should add user when addUser action is dispatched', () => {
      const actual = userReducer(initialState, addUser(mockUser));
      expect(actual.users).toHaveLength(1);
      expect(actual.users[0]).toEqual(mockUser);
    });

    it('should update user when updateUser action is dispatched', () => {
      const stateWithUser: UserState = {
        ...initialState,
        users: [mockUser],
      };
      const updatedUser = { ...mockUser, name: 'Jane Doe' };
      const actual = userReducer(stateWithUser, updateUser(updatedUser));
      expect(actual.users[0].name).toBe('Jane Doe');
    });

    it('should delete user when deleteUser action is dispatched', () => {
      const stateWithUser: UserState = {
        ...initialState,
        users: [mockUser],
      };
      const actual = userReducer(stateWithUser, deleteUser(1));
      expect(actual.users).toHaveLength(0);
    });

    it('should set selected user when setSelectedUser action is dispatched', () => {
      const actual = userReducer(initialState, setSelectedUser(mockUser));
      expect(actual.selectedUser).toEqual(mockUser);
    });

    it('should clear selected user when setSelectedUser is called with null', () => {
      const stateWithSelectedUser: UserState = {
        ...initialState,
        selectedUser: mockUser,
      };
      const actual = userReducer(stateWithSelectedUser, setSelectedUser(null));
      expect(actual.selectedUser).toBeNull();
    });
  });

  describe('fetchUsers async thunk', () => {
    it('should set isLoading state when fetchUsers is pending', () => {
      const action = { type: fetchUsers.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set users when fetchUsers is fulfilled', () => {
      const users = [mockUser];
      const action = { type: fetchUsers.fulfilled.type, payload: users };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.users).toEqual(users);
    });

    it('should set error when fetchUsers is rejected', () => {
      const errorMessage = 'Failed to fetch users';
      const action = {
        type: fetchUsers.rejected.type,
        error: { message: errorMessage },
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
