import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Badge, IconButton, Divider, LinearProgress, CardContent, Popover } from '@mui/material';
import { FilterList, Notifications, LocationOn } from '@mui/icons-material';
import EventCard from './EventCard';
import StatusChip from './StatusChip';

interface Event {
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
}

interface EventSidebarProps {
    events: Event[];
    selectedEventId?: string;
    onSelect: (event: Event) => void;
    getStatusIcon: (status: string) => React.ReactNode;
}


const EventSidebar: React.FC<EventSidebarProps> = ({ events, selectedEventId, onSelect, getStatusIcon }) => {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredEvents = events.filter(event => {
        const typeMatch = selectedType === 'all' || event.type.toLowerCase() === selectedType;
        const statusMatch = selectedStatus === 'all' || event.status === selectedStatus;
        return typeMatch && statusMatch;
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Box sx={{ width: 400, borderLeft: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            {/* Filters */}
            <Paper sx={{ m: 2, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <FilterList color="action" />
                    <Typography variant="subtitle1" fontWeight={600}>
                        פילטרים
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>סוג</InputLabel>
                        <Select label="סוג" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                            <MenuItem value="all">כל הסוגים</MenuItem>
                            <MenuItem value="occ">OCC</MenuItem>
                            <MenuItem value="emergency">חירום</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel>סטטוס</InputLabel>
                        <Select label="סטטוס" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                            <MenuItem value="all">כל הסטטוסים</MenuItem>
                            <MenuItem value="active">פעיל</MenuItem>
                            <MenuItem value="pending">ממתין</MenuItem>
                            <MenuItem value="completed">הושלם</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Paper>

            {/* Events List */}
            <Box sx={{ px: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        אירועים פעילים ({filteredEvents.length})
                    </Typography>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Badge badgeContent={filteredEvents.filter(e => e.status === 'active').length} color="error">
                            <Notifications color="action" />
                        </Badge>
                    </IconButton>
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ p: 2, maxWidth: 300 }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                התראות
                            </Typography>
                            {filteredEvents.slice(0, 5).map((event, index) => (
                                <Box key={index} sx={{ mb: 1 }}>
                                    <Typography variant="body2" color="text.primary">
                                        {event.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {event.time} | {event.date}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                            ))}
                            {filteredEvents.length > 5 && (
                                <Typography variant="caption" color="text.secondary">
                                    ועוד {filteredEvents.length - 5} התראות...
                                </Typography>
                            )}
                        </Box>
                    </Popover>
                </Box>

                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        selected={selectedEventId === event.id}
                        onClick={() => onSelect(event)}
                    >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {getStatusIcon(event.status)}
                                    <Typography variant="h6" fontWeight={600}>
                                        {event.id}
                                    </Typography>
                                    <StatusChip
                                        status={event.priority}
                                        label={event.type}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    {event.time} | {event.date}
                                </Typography>
                            </Box>

                            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                                {event.description}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                    {event.location}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {event.tasks} משימות
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {event.messages} הודעות
                                    </Typography>
                                </Box>
                                {event.tasks > 0 && (
                                    <LinearProgress
                                        variant="determinate"
                                        value={(event.completedTasks / event.tasks) * 100}
                                        sx={{ width: 60, height: 4, borderRadius: 2 }}
                                    />
                                )}
                            </Box>
                        </CardContent>
                    </EventCard>
                ))}
            </Box>
        </Box>
    );
};

export default EventSidebar;
