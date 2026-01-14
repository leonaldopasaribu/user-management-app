import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  alpha,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Mail, MapPin, Building2, CheckCircle2, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addUser, updateUser } from '~/store/userSlice';
import type { User, UserFormData } from '~/types/user.types';
import type { ReactNode } from 'react';

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  editingUser: User | null;
}

function UserFormModal({ open, onClose, editingUser }: UserFormModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: { street: '', suite: '', city: '', zipcode: '' },
      company: { name: '', catchPhrase: '', bs: '' },
    },
  });

  useEffect(() => {
    if (editingUser) {
      reset({ ...editingUser });
    } else {
      reset({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: { street: '', suite: '', city: '', zipcode: '' },
        company: { name: '', catchPhrase: '', bs: '' },
      });
    }
  }, [editingUser, open, reset]);

  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      transition: 'all 0.3s ease',
      '& fieldset': { borderColor: alpha(theme.palette.divider, 0.1) },
      '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.3) },
      '&.Mui-focused fieldset': { borderWidth: '2px' },
    },
    '& .MuiInputLabel-root': { fontSize: '0.9rem', fontWeight: 500 },
  };

  const onSubmit = (formData: UserFormData) => {
    if (editingUser) {
      const updatedUser: User = {
        ...editingUser,
        ...formData,
        address: {
          ...formData.address,
          geo: editingUser.address.geo,
        },
      };
      dispatch(updateUser(updatedUser));
    } else {
      const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
      const newUser: User = {
        id: maxId + 1,
        ...formData,
        address: {
          ...formData.address,
          geo: { lat: '0', lng: '0' },
        },
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
      };
      dispatch(addUser(newUser));
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : '28px',
          bgcolor: alpha(theme.palette.background.default, 0.9),
          backdropFilter: 'blur(20px)',
          backgroundImage: 'none',
          boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
        },
      }}
    >
      <DialogTitle sx={{ p: 4, pb: 0, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(0,0,0,0.04)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
          }}
        >
          <X size={20} />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
          {editingUser ? 'Update Profile' : 'Create New User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the details below to {editingUser ? 'update existing' : 'register a new'} account.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2.5}>
            {/* Basic Info Group */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Full name is required',
                  validate: value => value.trim().length > 0 || 'Full name cannot be empty',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Full Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={fieldStyle}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required',
                  validate: value => value.trim().length > 0 || 'Username cannot be empty',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    sx={fieldStyle}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                              @
                            </Typography>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={fieldStyle}
                    slotProps={{
                      input: {
                        startAdornment: <Mail size={16} style={{ marginRight: 8, opacity: 0.5 }} />,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* Address Bento Box */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '24px',
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <MapPin size={18} color={theme.palette.primary.main} />
                  <Typography variant="subtitle2" fontWeight={700}>
                    Address Details
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Controller
                      name="address.street"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Street" sx={fieldStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name="address.suite"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Suite" sx={fieldStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 7 }}>
                    <Controller
                      name="address.city"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="City" sx={fieldStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <Controller
                      name="address.zipcode"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Zipcode" sx={fieldStyle} />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Company Info */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '24px',
                  bgcolor: alpha(theme.palette.secondary.main, 0.03),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.secondary.main, 0.05),
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Building2 size={18} color={theme.palette.secondary.main} />
                  <Typography variant="subtitle2" fontWeight={700}>
                    Professional Info
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  <Controller
                    name="company.name"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Company Name" sx={fieldStyle} />
                    )}
                  />
                  <Controller
                    name="company.catchPhrase"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Professional Catch Phrase"
                        sx={fieldStyle}
                      />
                    )}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 0, gap: 1.5 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: '12px',
            px: 3,
            color: 'text.secondary',
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          startIcon={editingUser ? <CheckCircle2 size={18} /> : null}
          sx={{
            borderRadius: '14px',
            px: 4,
            py: 1.2,
            fontWeight: 700,
            textTransform: 'none',
            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          {editingUser ? 'Save Changes' : 'Create Account'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Stack Helper Component
interface StackProps {
  children: ReactNode;
  spacing: number;
}

function Stack({ children, spacing }: StackProps) {
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>{children}</Box>;
}

export default UserFormModal;
