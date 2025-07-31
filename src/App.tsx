import EventSidebar from './components/EventSidebar';
import EventDetails from './components/EventDetails';
import TabPanel from './components/TabPanel';
import React, { useState } from 'react';
// ...existing code...
import { Box, AppBar, Toolbar, Typography, Chip, IconButton, CssBaseline, ThemeProvider } from '@mui/material';
import { Refresh, Settings, Circle, Warning, Schedule, CheckCircle, Menu, Close } from '@mui/icons-material';
import theme from './theme';
import styles from './App.module.css';
// ...existing code...



const EventManagementSystem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    type: string;
    priority: 'high' | 'medium' | 'low' | 'default';
    status: 'active' | 'pending' | 'completed';
    time: string;
    date: string;
    location: string;
    description: string;
    assignee: string;
    tasks: number;
    messages: number;
    completedTasks: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState<{
    id: string;
    type: string;
    priority: 'high' | 'medium' | 'low' | 'default';
    status: 'active' | 'pending' | 'completed';
    time: string;
    date: string;
    location: string;
    description: string;
    assignee: string;
    tasks: number;
    messages: number;
    completedTasks: number;
  }[]>([
    {
      id: '3316482',
      type: 'OCC',
      priority: 'high',
      status: 'active',
      time: '14:40',
      date: '08.07.2025',
      location: 'בני ברק - קק"ל',
      description: 'א. הפצת חירום',
      assignee: 'מוקד רכבת',
      tasks: 3,
      messages: 2,
      completedTasks: 1
    },
    {
      id: '3316479',
      type: 'OCC',
      priority: 'medium',
      status: 'pending',
      time: '14:27',
      date: '08.07.2025',
      location: 'תחנת הרב גרינברג',
      description: 'לח בבמצ א',
      assignee: 'צוות אבטחה',
      tasks: 1,
      messages: 0,
      completedTasks: 0
    },
    {
      id: '3316478',
      type: 'OCC',
      priority: 'low',
      status: 'completed',
      time: '14:24',
      date: '08.07.2025',
      location: 'רקון - דירות',
      description: 'סגירת צומת',
      assignee: 'מבצע טכני',
      tasks: 0,
      messages: 1,
      completedTasks: 0
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Warning color="error" />;
      case 'pending': return <Schedule color="warning" />;
      case 'completed': return <CheckCircle color="success" />;
      default: return <Circle color="disabled" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'error';
      case 'pending': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const mockTasks = [
    { id: 1, title: 'שליחת SMS להרכב', status: 'completed' as const, time: '14:45', type: 'sms' },
    { id: 2, title: 'עדכון למוקד מרכזי', status: 'pending' as const, time: '14:50', type: 'email' },
    { id: 3, title: 'התקשרות לאחראי אזור', status: 'pending' as const, time: '15:00', type: 'call' }
  ];

  const mockMessages = [
    { id: 1, type: 'sms', recipient: 'הרכב 205', content: 'עצור במיקום הנוכחי', time: '14:41', status: 'sent' },
    { id: 2, type: 'email', recipient: 'מוקד מרכזי', content: 'דיווח אירוע חירום', time: '14:42', status: 'delivered' }
  ];

  const TabPanel: React.FC<{ children: React.ReactNode; value: number; index: number;[key: string]: any }> = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.root}>
        {/* Header */}
        <AppBar position="fixed" className={styles.headerBar}>
          <Toolbar className={styles.headerToolbar}>
            <IconButton color="inherit" style={{ marginRight: 16 }} onClick={() => setSidebarOpen(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              מערכת ניהול אירועים בזמן אמת
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Chip
                icon={<Circle sx={{ fontSize: '8px !important' }} />}
                label="מחובר"
                color="success"
                variant="outlined"
                size="small"
              />
              <IconButton color="inherit">
                <Refresh />
              </IconButton>
              <IconButton color="inherit">
                <Settings />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <div style={{ display: 'flex', width: '100%', marginTop: 64 }}>
          {/* Events Sidebar */}
          {sidebarOpen && (
            <div className={styles.sidebar}>
              <IconButton
                onClick={() => setSidebarOpen(false)}
                className={styles.closeBtn}
                size="small"
                aria-label="סגור סיידבר"
              >
                <Close />
              </IconButton>
              <EventSidebar
                events={events}
                selectedEventId={selectedEvent?.id}
                onSelect={setSelectedEvent}
                getStatusIcon={getStatusIcon}
              />
            </div>
          )}

          {/* Main Content */}
          <div className={styles.mainContent}>
            {selectedEvent ? (
              <EventDetails
                event={selectedEvent}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                mockTasks={mockTasks}
                mockMessages={mockMessages}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
              />
            ) : null}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EventManagementSystem;