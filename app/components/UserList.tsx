import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Fab,
  useTheme,
  useMediaQuery,
  Tooltip,
  Container,
  Stack,
  Fade,
  Zoom,
  alpha,
} from '@mui/material';
import { Plus, Users as PeopleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { fetchUsers, deleteUser, setSelectedUser } from '~/store/userSlice';
import type { User } from '~/types/user.types';
import UserDetailsModal from './UserDetailsModal';
import UserFormModal from './UserFormModal';
import UserCard from './UserCard';
import SearchField from './SearchField';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

const UserList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(state => state.users);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewDetails = (user: User) => {
    dispatch(setSelectedUser(user));
    setDetailsModalOpen(true);
  };

  const handleEditUser = (user: User, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingUser(user);
    setFormModalOpen(true);
  };

  const handleDeleteUser = (userId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const filteredUsers = users.filter(user =>
    [user.name, user.username, user.email, user.company.name].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress
          size={40}
          thickness={5}
          sx={{ color: 'primary.main', borderRadius: '50%' }}
        />
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 2 }}
        >
          Syncing Database...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        overflowX: 'hidden', // Prevent horizontal scroll
        // Efek Mesh Gradient Background 2026
        '&::before': {
          content: '""',
          position: 'fixed',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.05),
          filter: 'blur(100px)',
          zIndex: -1,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, sm: 4, md: 6 }, overflow: 'hidden' }}
      >
        {/* Modern Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 6 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', md: 'flex-end' }}
              spacing={3}
            >
              <Box>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '16px',
                      bgcolor: 'primary.main',
                      color: 'white',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    <PeopleIcon size={28} />
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.05em' }}>
                    User List Management
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', maxWidth: 500, fontWeight: 500 }}
                >
                  Manage your global workforce and user permissions in one centralized command
                  center.
                </Typography>
              </Box>
            </Stack>

            {/* Futuristic Search Bar */}
            <Box sx={{ mt: 5, position: 'relative' }}>
              <SearchField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, company, or email..."
              />
            </Box>
          </Box>
        </Fade>

        {/* Content Area */}
        {error ? (
          <ErrorState error={error} onRetry={() => dispatch(fetchUsers())} />
        ) : filteredUsers.length === 0 ? (
          <EmptyState message="No results match your search" />
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              },
              gap: 4,
            }}
          >
            {filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                index={index}
                onViewDetails={handleViewDetails}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </Box>
        )}

        {/* Floating Action FAB - 2026 Style */}
        <Zoom in timeout={600}>
          <Tooltip title="Add Member" placement="left" arrow>
            <Fab
              onClick={() => {
                setEditingUser(null);
                setFormModalOpen(true);
              }}
              sx={{
                position: 'fixed',
                bottom: 40,
                right: 40,
                width: 72,
                height: 72,
                bgcolor: 'primary.main',
                color: 'white',
                boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'scale(1.15) rotate(90deg)',
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <Plus size={32} strokeWidth={2.5} />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Modals */}
        <UserDetailsModal open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} />
        <UserFormModal
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          editingUser={editingUser}
        />
      </Container>
    </Box>
  );
};

export default UserList;
