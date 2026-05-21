'use client';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function KalenderPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch('/api/kalender').then(res => res.json()).then(setEvents);
  }, []);

  return (
    <div className="bg-himmah-800 p-4 rounded-xl">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="text-white"
      />
    </div>
  );
}