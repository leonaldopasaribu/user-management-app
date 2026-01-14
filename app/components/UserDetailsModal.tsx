import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  alpha,
} from '@mui/material';
import { Mail, Phone, Globe, Building2, MapPin, X, Target, Zap } from 'lucide-react';
import { useAppSelector } from '~/store/hooks';
import type { ReactNode } from 'react';

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

function UserDetailsModal({ open, onClose }: UserDetailsModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectedUser = useAppSelector(state => state.users.selectedUser);

  if (!selectedUser) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : '32px',
          bgcolor: alpha('#ffffff', 0.9),
          backdropFilter: 'blur(16px)',
          backgroundImage: 'none',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.4)',
        },
      }}
    >
      {/* Header with Mesh Gradient */}
      <Box
        sx={{
          height: 160,
          background: `linear-gradient(120deg, ${alpha(theme.palette.primary.light, 0.3)} 0%, ${alpha(theme.palette.secondary.light, 0.2)} 100%)`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(255,255,255,0.5)',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <X size={20} />
        </IconButton>

        <Box sx={{ position: 'absolute', bottom: -50, textAlign: 'center' }}>
          <Avatar
            src={selectedUser.avatar}
            sx={{
              width: 100,
              height: 100,
              border: '6px solid white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          />
        </Box>
      </Box>

      <DialogContent sx={{ mt: 6, px: 3, pb: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
            {selectedUser.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
            @{selectedUser.username}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Contact Section */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="overline" sx={{ px: 1, fontWeight: 700, color: 'text.disabled' }}>
              Contact Details
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoCard icon={Mail} label="Email" value={selectedUser.email} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoCard icon={Phone} label="Phone" value={selectedUser.phone} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InfoCard
              icon={Globe}
              label="Website"
              value={selectedUser.website}
              color="secondary"
              theme={theme}
            />
          </Grid>

          {/* Company Section - Bento Style */}
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Typography variant="overline" sx={{ px: 1, fontWeight: 700, color: 'text.disabled' }}>
              Work & Vision
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: '24px',
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.1),
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <Building2 size={20} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" fontWeight={700}>
                  {selectedUser.company.name}
                </Typography>
              </Box>
              <Stack spacing={2}>
                <Box display="flex" gap={1.5}>
                  <Target size={16} style={{ marginTop: 4, color: theme.palette.text.secondary }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    "{selectedUser.company.catchPhrase}"
                  </Typography>
                </Box>
                <Box display="flex" gap={1.5}>
                  <Zap size={16} style={{ marginTop: 2, color: theme.palette.text.secondary }} />
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      fontWeight: 600,
                    }}
                  >
                    {selectedUser.company.bs}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Address Section */}
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Typography variant="overline" sx={{ px: 1, fontWeight: 700, color: 'text.disabled' }}>
              Location
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InfoCard
              icon={MapPin}
              label="Address"
              value={`${selectedUser.address.street}, ${selectedUser.address.city}`}
              theme={theme}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

// InfoCard Component
interface InfoCardProps {
  icon: typeof Mail;
  label: string;
  value: string;
  color?: 'primary' | 'secondary';
  theme: any;
}

function InfoCard({ icon: Icon, label, value, color = 'primary', theme }: InfoCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '20px',
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.05),
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          bgcolor: alpha(theme.palette.background.paper, 0.6),
        },
      }}
    >
      <Box
        sx={{
          p: 1.2,
          borderRadius: '14px',
          bgcolor: alpha(theme.palette[color].main, 0.1),
          color: theme.palette[color].main,
          display: 'flex',
        }}
      >
        <Icon size={20} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.65rem',
            letterSpacing: 1,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
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

export default UserDetailsModal;
