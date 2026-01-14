import { useTheme, alpha } from '@mui/material';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Stack,
  Zoom,
} from '@mui/material';
import {
  Edit2 as EditIcon,
  Trash2 as DeleteIcon,
  Mail as EmailIcon,
  Briefcase as BusinessIcon,
  Phone as PhoneIcon,
  Globe as LanguageIcon,
} from 'lucide-react';
import type { User } from '~/types/user.types';

interface UserCardProps {
  user: User;
  index: number;
  onViewDetails: (user: User) => void;
  onEdit: (user: User, e?: React.MouseEvent) => void;
  onDelete: (userId: number, e?: React.MouseEvent) => void;
}

function UserCard({ user, index, onViewDetails, onEdit, onDelete }: UserCardProps) {
  const theme = useTheme();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(user, e);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(user.id, e);
  };

  const handleCardClick = () => {
    onViewDetails(user);
  };

  return (
    <Zoom in timeout={400} style={{ transitionDelay: `${index * 40}ms` }}>
      <Card
        sx={{
          height: '100%',
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.08),
          background: `linear-gradient(135deg, #ffffff 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
          boxShadow: `0 10px 40px -10px ${alpha(theme.palette.common.black, 0.05)}`,
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: `0 20px 60px -15px ${alpha(theme.palette.primary.main, 0.15)}`,
            borderColor: alpha(theme.palette.primary.main, 0.2),
            '& .action-panel': {
              opacity: 1,
              transform: 'translateY(0)',
            },
            '& .avatar-ring': {
              transform: 'rotate(180deg)',
              borderColor: theme.palette.primary.main,
            },
          },
        }}
        onClick={handleCardClick}
      >
        {/* Floating Action Panel */}
        <Stack
          className="action-panel"
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            zIndex: 10,
            opacity: 0,
            transform: 'translateY(-10px)',
            transition: 'all 0.3s ease',
          }}
        >
          <Tooltip title="Edit" placement="right" arrow>
            <IconButton
              onClick={handleEdit}
              sx={{
                bgcolor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: 'primary.main', color: 'white' },
              }}
            >
              <EditIcon size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton
              onClick={handleDelete}
              sx={{
                bgcolor: 'white',
                color: 'error.main',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: 'error.main', color: 'white' },
              }}
            >
              <DeleteIcon size={18} />
            </IconButton>
          </Tooltip>
        </Stack>

        <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header Section */}
          <Box position="relative" display="flex" justifyContent="center" mb={2}>
            {/* Animated Ring Around Avatar */}
            <Box
              className="avatar-ring"
              sx={{
                position: 'absolute',
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: '2px dashed',
                borderColor: 'grey.300',
                transition: 'all 0.8s ease',
                top: -6,
              }}
            />
            <Avatar
              src={user.avatar}
              sx={{
                width: 60,
                height: 60,
                boxShadow: `0 6px 16px ${alpha(theme.palette.common.black, 0.1)}`,
              }}
            />
          </Box>

          <Box textAlign="center" mb={2.5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
                background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.3,
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                fontSize: 9,
              }}
            >
              @{user.username}
            </Typography>
          </Box>

          {/* Info Grid (Bento Style) */}
          <Stack spacing={1} sx={{ mt: 'auto' }}>
            <InfoBox icon={<EmailIcon size={14} />} label={user.email} />
            <InfoBox
              icon={<BusinessIcon size={14} />}
              label={user.company.name}
              highlight
              color={theme.palette.primary.main}
            />
            <Stack direction="row" spacing={1}>
              <InfoBox icon={<PhoneIcon size={14} />} label={user.phone} flex={1} />
              <InfoBox icon={<LanguageIcon size={14} />} label={user.website} flex={1} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Zoom>
  );
}

// Reusable Sub-component for Bento Info Boxes
interface InfoBoxProps {
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
  color?: string;
  flex?: number | string;
}

function InfoBox({ icon, label, highlight = false, color, flex }: InfoBoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        borderRadius: '10px',
        bgcolor: highlight ? alpha(color || '#000', 0.05) : 'rgba(0,0,0,0.02)',
        border: '1px solid',
        borderColor: highlight ? alpha(color || '#000', 0.1) : 'transparent',
        flex: flex || 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: highlight ? alpha(color || '#000', 0.08) : 'rgba(0,0,0,0.04)',
        },
      }}
    >
      <Box sx={{ color: highlight ? color : 'text.secondary', display: 'flex' }}>{icon}</Box>
      <Typography
        variant="body2"
        noWrap
        sx={{
          fontSize: '0.75rem',
          fontWeight: highlight ? 600 : 400,
          color: highlight ? color : 'text.secondary',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default UserCard;
