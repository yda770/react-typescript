import React from 'react';
import { Card, CardContent } from '@mui/material';

import styles from './EventCard.module.css';

interface EventCardProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const EventCard: React.FC<EventCardProps> = ({ selected, onClick, children }) => (
  <Card
    className={selected ? `${styles.eventCard} ${styles.selected}` : styles.eventCard}
    onClick={onClick}
    elevation={0}
  >
    {children}
  </Card>
);

export default EventCard;
