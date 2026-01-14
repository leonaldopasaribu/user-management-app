import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  alpha,
  Avatar,
} from '@mui/material';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import type { User } from '~/types/user.types';

interface UserDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

function UserDeleteModal({ open, onClose, onConfirm, user }: UserDeleteModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!user) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : '28px',
          bgcolor: alpha(theme.palette.background.default, 0.95),
          backdropFilter: 'blur(20px)',
          backgroundImage: 'none',
          boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bgcolor: 'rgba(0,0,0,0.04)',
          zIndex: 1,
          '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
        }}
      >
        <X size={20} />
      </IconButton>

      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        {/* Warning Icon */}
        <Box
          sx={{
            display: 'inline-flex',
            p: 2.5,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.error.main, 0.1),
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              p: 2,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.error.main, 0.15),
            }}
          >
            <AlertTriangle size={40} color={theme.palette.error.main} strokeWidth={2} />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.03em',
            mb: 1.5,
          }}
        >
          Delete User?
        </Typography>

        {/* User Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: '20px',
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
            mb: 2.5,
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              width: 48,
              height: 48,
              border: '2px solid',
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          />
          <Box sx={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>

        {/* Warning Message */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          This action cannot be undone. This will permanently delete the user account and remove
          all associated data from the system.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 0, gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          onClick={onClose}
          fullWidth={isMobile}
          sx={{
            borderRadius: '14px',
            px: 3,
            py: 1.2,
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'none',
            flex: { xs: '1', sm: 'auto' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          fullWidth={isMobile}
          startIcon={<Trash2 size={18} />}
          sx={{
            borderRadius: '14px',
            px: 4,
            py: 1.2,
            fontWeight: 700,
            textTransform: 'none',
            bgcolor: 'error.main',
            color: 'white',
            boxShadow: `0 8px 20px ${alpha(theme.palette.error.main, 0.35)}`,
            flex: { xs: '1', sm: 'auto' },
            '&:hover': {
              bgcolor: 'error.dark',
              boxShadow: `0 12px 28px ${alpha(theme.palette.error.main, 0.45)}`,
            },
          }}
        >
          Delete User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDeleteModal;
