import React, { useState } from 'react';
import EventSummaryEditor from './EventSummaryEditor';
import { Box, Paper, Typography, Chip, Button, Divider, Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, RadioGroup, FormControlLabel, Radio, IconButton, TextField } from '@mui/material';
import { Edit, Save, Close as CloseIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { Event, LocationOn, Person, CheckCircle, RadioButtonUnchecked, Message, Email, Report, TaskAlt, BarChart } from '@mui/icons-material';
import TabPanel from './TabPanel';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SecurityIcon from '@mui/icons-material/Security';
import GroupOffIcon from '@mui/icons-material/GroupOff';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BugReportIcon from '@mui/icons-material/BugReport';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BlockIcon from '@mui/icons-material/Block';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SpeedIcon from '@mui/icons-material/Speed';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

interface Task {
    id: number;
    title: string;
    status: 'completed' | 'pending';
    time: string;
    type: string;
}

interface MessageType {
    id: number;
    type: string;
    recipient: string;
    content: string;
    time: string;
    status: string;
}

interface EventDetailsProps {
    event: any;
    activeTab: number;
    setActiveTab: (tab: number) => void;
    mockTasks: Task[];
    mockMessages: MessageType[];
    getStatusIcon: (status: string) => React.ReactNode;
    getStatusColor: (status: string) => any;
}


const EventDetails: React.FC<EventDetailsProps> = ({ event, activeTab, setActiveTab, mockTasks, mockMessages, getStatusIcon, getStatusColor }) => {
    const [status, setStatus] = useState(event.status);
    const [statusEditMode, setStatusEditMode] = useState(false);
    const [eventSummary, setEventSummary] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const [editEvent, setEditEvent] = useState({ ...event });

    const statusOptions = [
        { value: 'active', label: 'פתוח', color: 'success' },
        { value: 'completed', label: 'הסתיים', color: 'warning' },
        { value: 'closed', label: 'סגור', color: 'error' },
    ];

    const handleStatusChipClick = () => setStatusEditMode(true);
    const handleStatusSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setStatus(e.target.value as string);
        setStatusEditMode(false);
        // Here you would update the event status in parent state or backend
    };
    const getStatusLabel = (value: string) => {
        const found = statusOptions.find(opt => opt.value === value);
        return found ? found.label : value;
    };

    // --- Automatic tab switching on scroll ---
    const tabPanelRefs = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)];
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // React.useEffect(() => {
    //     const handleScroll = () => {
    //         if (!scrollContainerRef.current) return;
    //         const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
    //         let minDiff = Infinity;
    //         let currentTab = 0;
    //         tabPanelRefs.forEach((ref, idx) => {
    //             if (ref.current) {
    //                 const rect = ref.current.getBoundingClientRect();
    //                 const diff = Math.abs(rect.top - containerTop);
    //                 if (diff < minDiff) {
    //                     minDiff = diff;
    //                     currentTab = idx;
    //                 }
    //             }
    //         });
    //         if (currentTab !== activeTab) {
    //             setActiveTab(currentTab);
    //         }
    //     };
    //     const container = scrollContainerRef.current;
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll);
    //     }
    //     return () => {
    //         if (container) {
    //             container.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, [activeTab, setActiveTab, tabPanelRefs]);

    // // Multi-select extra statuses state
    const [selectedExtraStatuses, setSelectedExtraStatuses] = useState<string[]>([]);
    const handleExtraStatusChange = (label: string) => {
        setSelectedExtraStatuses((prev) =>
            prev.includes(label)
                ? prev.filter((l) => l !== label)
                : [...prev, label]
        );
    };

    return (
        <>
            <Paper sx={{ m: 2, p: 3 }
            }>
                <Grid container spacing={3} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        {getStatusIcon(status)}
                        <Typography variant="h4" fontWeight={700}>
                            {event.id}
                        </Typography>
                        <Chip
                            label={event.type}
                            color={getStatusColor(status)}
                            variant="filled"
                        />
                    </Box>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Event color="action" />
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    זמן אירוע
                                </Typography>
                                <Typography variant="body2">
                                    {event.date} {event.time}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn color="action" />
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    מיקום
                                </Typography>
                                <Typography variant="body2">
                                    {event.location}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person color="action" />
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    אחראי
                                </Typography>
                                <Typography variant="body2">
                                    {event.assignee}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minWidth: 120 }}>
                        {!statusEditMode ? (
                            <Chip
                                label={getStatusLabel(status)}
                                // color={statusOptions.find(opt => opt.value === status)?.color || 'default'}
                                onClick={handleStatusChipClick}
                                clickable
                                sx={{ fontWeight: 700, fontSize: 16, px: 2, py: 1, cursor: 'pointer' }}
                            />
                        ) : (
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <TextField
                                    select
                                    value={status}
                                    onChange={handleStatusSelectChange}
                                    onBlur={() => setStatusEditMode(false)}
                                    autoFocus
                                    variant="outlined"
                                    size="small"
                                >
                                    {statusOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </TextField>
                            </FormControl>
                        )}
                    </Box>
                </Grid>
            </Paper >

            {/* Tabs */}
            < Paper sx={{ mx: 2, mb: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant="fullWidth"
                >
                    <Tab icon={<TaskAlt />} label="פרטי האירוע" />
                    <Tab icon={<TaskAlt />} label="משימות" />
                    <Tab icon={<Message />} label="הודעות" />
                    <Tab icon={<BarChart />} label="דוחות" />
                </Tabs>
            </Paper >

            {/* Tab Content with scrollable container */}
            < Box sx={{ flexGrow: 1, mx: 2, mb: 2, maxHeight: 600, overflowY: 'auto', scrollBehavior: 'smooth' }}>
                <div ref={tabPanelRefs[0]}>
                    <TabPanel value={activeTab} index={0}>
                        <Grid container spacing={3}>
                            <Box flex={1} minWidth={0}>
                                <Card>
                                    <CardHeader
                                        title="פרטי האירוע"
                                        sx={{ bgcolor: 'primary.50', borderRadius: 2, mb: 1 }}
                                        action={
                                            !editMode ? (
                                                <IconButton onClick={() => setEditMode(true)} size="small" aria-label="ערוך">
                                                    <Edit />
                                                </IconButton>
                                            ) : (
                                                <>
                                                    <IconButton onClick={() => { setEditMode(false); setEditEvent({ ...event }); }} size="small" aria-label="בטל">
                                                        <CloseIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => { setEditMode(false); /* כאן אפשר לעדכן את האירוע בהורה */ }} size="small" aria-label="שמור">
                                                        <Save />
                                                    </IconButton>
                                                </>
                                            )
                                        }
                                    />
                                    <CardContent sx={{ bgcolor: 'grey.50', borderRadius: 2, boxShadow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        מזהה אירוע
                                                    </Typography>
                                                    {editMode ? (
                                                        <TextField
                                                            value={editEvent.id}
                                                            onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, id: e.target.value }))}
                                                            size="small"
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        <Typography variant="body1" fontWeight={600}>{event.id}</Typography>
                                                    )}
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        סטטוס
                                                    </Typography>
                                                    {editMode ? (
                                                        <TextField
                                                            value={editEvent.status}
                                                            onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, status: e.target.value }))}
                                                            size="small"
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        <Chip label={event.status === 'active' ? 'פתוח' : event.status === 'completed' ? 'הסתיים' : 'סגור'} color={event.status === 'active' ? 'success' : event.status === 'completed' ? 'warning' : 'error'} size="small" sx={{ fontWeight: 700 }} />
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Event color="primary" />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">
                                                            זמן אירוע
                                                        </Typography>
                                                        {editMode ? (
                                                            <TextField
                                                                value={editEvent.date}
                                                                onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, date: e.target.value }))}
                                                                size="small"
                                                                fullWidth
                                                                sx={{ mb: 1 }}
                                                            />
                                                        ) : (
                                                            <Typography variant="body1">{event.date} {event.time}</Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LocationOn color="action" />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">
                                                            מיקום
                                                        </Typography>
                                                        {editMode ? (
                                                            <TextField
                                                                value={editEvent.location}
                                                                onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, location: e.target.value }))}
                                                                size="small"
                                                                fullWidth
                                                            />
                                                        ) : (
                                                            <Typography variant="body1">{event.location}</Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Person color="action" />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">
                                                            אחראי
                                                        </Typography>
                                                        {editMode ? (
                                                            <TextField
                                                                value={editEvent.assignee}
                                                                onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, assignee: e.target.value }))}
                                                                size="small"
                                                                fullWidth
                                                            />
                                                        ) : (
                                                            <Typography variant="body1">{event.assignee}</Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        סוג
                                                    </Typography>
                                                    {editMode ? (
                                                        <TextField
                                                            value={editEvent.type}
                                                            onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, type: e.target.value }))}
                                                            size="small"
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        <Chip label={event.type} color="info" size="small" />
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        עדיפות
                                                    </Typography>
                                                    {editMode ? (
                                                        <TextField
                                                            value={editEvent.priority}
                                                            onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, priority: e.target.value }))}
                                                            size="small"
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        <Chip label={event.priority === 'high' ? 'גבוהה' : event.priority === 'medium' ? 'בינונית' : 'נמוכה'} color={event.priority === 'high' ? 'error' : event.priority === 'medium' ? 'warning' : 'default'} size="small" />
                                                    )}
                                                </Box>
                                            </Box>
                                            <Divider sx={{ my: 1 }} />
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                <BarChart color="action" sx={{ mt: 0.5 }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">
                                                        סיכום האירוע
                                                    </Typography>
                                                    {editMode ? (
                                                        <TextField
                                                            value={editEvent.description}
                                                            onChange={e => setEditEvent((ev: typeof editEvent) => ({ ...ev, description: e.target.value }))}
                                                            size="small"
                                                            fullWidth
                                                            multiline
                                                            minRows={2}
                                                        />
                                                    ) : (
                                                        <Typography variant="body1">{event.description}</Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>

                        {/* Statuses Section */}
                        <Card sx={{ mt: 3 }}>
                            <CardHeader title="סטטוסים" sx={{ bgcolor: 'info.50', borderRadius: 2, mb: 1 }} />
                            <CardContent>

                                {/* Multi-select statuses as ToggleButtonGroup */}
                                <Box>

                                    <ToggleButtonGroup
                                        value={selectedExtraStatuses}
                                        onChange={(e, newSelected) => setSelectedExtraStatuses(newSelected)}
                                        aria-label="סטטוסים"
                                        sx={{
                                            flexWrap: 'wrap',
                                            gap: 1.2,
                                            justifyContent: 'right',
                                            direction: 'rtl',
                                        }}
                                        size="small"
                                    >
                                        {[
                                            {
                                                label: 'הערכות קיץ / חורף',
                                                icon: <WbSunnyIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'הקפצת משגיח בטיחות',
                                                icon: <SecurityIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'אי הוצאת צוות באישור מנהל',
                                                icon: <GroupOffIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'קבלן',
                                                icon: <EngineeringIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'הוחלף רכיב חדש',
                                                icon: <AutorenewIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'קוד תקלה ער"ת',
                                                icon: <BugReportIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'השפעה על התפעול',
                                                icon: <WarningIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'צפי הגעה משוער בדקות',
                                                icon: <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'ביטול מלא/חלקי של עבודה',
                                                icon: <BlockIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'הגעה בפועל בדקות',
                                                icon: <DirectionsRunIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'הגבלת מהירות',
                                                icon: <SpeedIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                            {
                                                label: 'דווח על ידי נהגים',
                                                icon: <DriveEtaIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                                            },
                                        ].map(({ label, icon }) => (
                                            <ToggleButton
                                                key={label}
                                                value={label}
                                                aria-label={label}
                                                sx={{
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'primary.100',
                                                        color: 'primary.main',
                                                        borderColor: 'primary.main',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'primary.50',
                                                        color: 'primary.main',
                                                        borderColor: 'primary.main',
                                                    },
                                                }}
                                            >
                                                {icon} {label}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={{ mt: 3 }}>
                            <CardHeader title="סטטיסטיקות" />
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.50' }}>
                                        <Typography variant="h3" color="primary" fontWeight={700}>
                                            {event.tasks}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            משימות
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.50' }}>
                                        <Typography variant="h3" color="success.main" fontWeight={700}>
                                            {event.messages}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            הודעות
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </CardContent>
                        </Card>
                    </TabPanel>
                </div>
                <div ref={tabPanelRefs[1]}>
                    <TabPanel value={activeTab} index={1}>
                        <Card>
                            <CardHeader title="משימות לביצוע" />
                            <CardContent>
                                <List>
                                    {mockTasks.map((task, index) => (
                                        <React.Fragment key={task.id}>
                                            <ListItem>
                                                <ListItemIcon>
                                                    {task.status === 'completed' ?
                                                        <CheckCircle color="success" /> :
                                                        <RadioButtonUnchecked color="action" />
                                                    }
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={task.title}
                                                    secondary={task.time}
                                                />
                                                <Button
                                                    variant={task.status === 'completed' ? 'outlined' : 'contained'}
                                                    size="small"
                                                    disabled={task.status === 'completed'}
                                                >
                                                    {task.status === 'completed' ? 'הושלם' : 'בצע'}
                                                </Button>
                                            </ListItem>
                                            {index < mockTasks.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </TabPanel>
                </div>
                <div ref={tabPanelRefs[2]}>
                    <TabPanel value={activeTab} index={2}>
                        <Card>
                            <CardHeader title="היסטוריית הודעות" />
                            <CardContent>
                                <List>
                                    {mockMessages.map((message, index) => (
                                        <React.Fragment key={message.id}>
                                            <ListItem>
                                                <ListItemIcon>
                                                    {message.type === 'sms' ? <Message /> : <Email />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="subtitle1">
                                                                {message.recipient}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {message.time}
                                                                </Typography>
                                                                <Chip
                                                                    label={message.status === 'sent' ? 'נשלח' : 'נתקבל'}
                                                                    color={message.status === 'sent' ? 'primary' : 'success'}
                                                                    size="small"
                                                                />
                                                            </Box>
                                                        </Box>
                                                    }
                                                    secondary={message.content}
                                                />
                                            </ListItem>
                                            {index < mockMessages.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </TabPanel>
                </div>
                <div ref={tabPanelRefs[3]}>
                    <TabPanel value={activeTab} index={3}>
                        <Grid container spacing={3}>
                            {['דוח זמני תגובה', 'דוח משימות', 'דוח תקשורת', 'דוח כללי'].map((report) => (
                                <Card key={report}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Report sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            {report}
                                        </Typography>
                                        <Button variant="outlined" fullWidth>
                                            הצג דוח
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </Grid>
                    </TabPanel>
                </div>

            </Box >
        </>

    );
}

export default EventDetails;
