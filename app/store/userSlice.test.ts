import userReducer, {
  addUser,
  updateUser,
  deleteUser,
  setSelectedUser,
  fetchUsers,
} from './userSlice';
import type { UserState } from './userSlice';
import type { User } from '~/types/user.types';

// Mock fetch
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
    loading: false,
    error: null,
    selectedUser: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addUser', () => {
      const actual = userReducer(initialState, addUser(mockUser));
      expect(actual.users).toHaveLength(1);
      expect(actual.users[0]).toEqual(mockUser);
    });

    it('should handle updateUser', () => {
      const stateWithUser: UserState = {
        ...initialState,
        users: [mockUser],
      };
      const updatedUser = { ...mockUser, name: 'Jane Doe' };
      const actual = userReducer(stateWithUser, updateUser(updatedUser));
      expect(actual.users[0].name).toBe('Jane Doe');
    });

    it('should handle deleteUser', () => {
      const stateWithUser: UserState = {
        ...initialState,
        users: [mockUser],
      };
      const actual = userReducer(stateWithUser, deleteUser(1));
      expect(actual.users).toHaveLength(0);
    });

    it('should handle setSelectedUser', () => {
      const actual = userReducer(initialState, setSelectedUser(mockUser));
      expect(actual.selectedUser).toEqual(mockUser);
    });

    it('should handle setSelectedUser with null', () => {
      const stateWithSelectedUser: UserState = {
        ...initialState,
        selectedUser: mockUser,
      };
      const actual = userReducer(stateWithSelectedUser, setSelectedUser(null));
      expect(actual.selectedUser).toBeNull();
    });
  });

  describe('fetchUsers async thunk', () => {
    it('should handle fetchUsers.pending', () => {
      const action = { type: fetchUsers.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchUsers.fulfilled', () => {
      const users = [mockUser];
      const action = { type: fetchUsers.fulfilled.type, payload: users };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.users).toEqual(users);
    });

    it('should handle fetchUsers.rejected', () => {
      const errorMessage = 'Failed to fetch users';
      const action = {
        type: fetchUsers.rejected.type,
        error: { message: errorMessage },
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
