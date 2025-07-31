import React from 'react';
import { Chip } from '@mui/material';
import styles from './StatusChip.module.css';

export interface StatusChipProps {
  status: 'high' | 'medium' | 'low' | 'default';
  label: string;
  size?: 'small' | 'medium';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, label, size = 'small' }) => {
  return (
    <Chip
      label={label}
      size={size}
      className={styles[status]}
    />
  );
};

export default StatusChip;
