// import React, { useState, ChangeEvent } from "react";
// import {Calendar , momentLocalizer } from 'react-big-calendar';
// import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
// import moment, { Moment } from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { TimePicker } from "@mui/lab";

// const localizer = momentLocalizer(moment);

// interface CalendarState {
//   events: CalendarEvent[];
//   title: string;
//   start: Moment | null;
//   end: Moment | null;
//   desc: string;
//   openSlot: boolean;
//   openEvent: boolean;
//   clickedEvent: CalendarEvent | {};
// }

// interface CalendarEvent {
//   title: string;
//   start: Moment | null;
//   end: Moment | null;
//   desc: string;
// }

// export const Schedule: React.FC = () => {
//   const [state, setState] = useState<CalendarState>({
//     events: [],
//     title: "",
//     start: null,
//     end: null,
//     desc: "",
//     openSlot: false,
//     openEvent: false,
//     clickedEvent: {},
//   });

//   const handleClose = () => {
//     setState({ ...state, openEvent: false, openSlot: false });
//   };



//   const handleEventSelected = (event: CalendarEvent) => {
//     setState({
//       ...state,
//       openEvent: true,
//       clickedEvent: event,
//       start: event.start,
//       end: event.end,
//       title: event.title,
//       desc: event.desc,
//     });
//   };

//   const setTitle = (e: ChangeEvent<HTMLInputElement>) => {
//     setState({ ...state, title: e.target.value });
//   };

//   const setDescription = (e: ChangeEvent<HTMLInputElement>) => {
//     setState({ ...state, desc: e.target.value });
//   };

//   const handleStartTime = ( date: Date | null) => {
//     setState({ ...state, start: date ? moment(date) : null });
//   };

//   const handleEndTime = ( date: Date | null) => {
//     setState({ ...state, end: date ? moment(date) : null });
//   };

//   const setNewAppointment = () => {
//     const { start, end, title, desc } = state;
//     if (start && end) {
//       const appointment: CalendarEvent = { title, start, end, desc };
//       const events = [...state.events, appointment];
//       setState({ ...state, events });
//     }
//   };

//   const updateEvent = () => {
//     const { title, desc, start, end, events, clickedEvent } = state;
//     const index = events.findIndex((event) => event === clickedEvent);
//     if (index !== -1) {
//       const updatedEvent = [...events];
//       updatedEvent[index] = { title, desc, start, end };
//       setState({ ...state, events: updatedEvent });
//     }
//   };

//   const deleteEvent = () => {
//     const { events, start } = state;
//     const updatedEvents = events.filter((event) => !event.start?.isSame(start));
//     setState({ ...state, events: updatedEvents });
//   };


//   const appointmentActions : JSX.Element[] = [
//     <button
//       onClick={handleClose}
//     >
//       Cancel
//     </button>,
//     <button
//       onClick={() => {
//         setNewAppointment();
//         handleClose();
//       }}
//       autoFocus
//     >
//       Submit
//     </button>,
//   ];

//   return (
//     <div id="Calendar">
//       <Calendar
//         localizer={localizer}
//         events={state.events}
//         views={["month", "week", "day", "agenda"]}
//         timeslots={2}
//         defaultView="month"
//         defaultDate={new Date()}
//         selectable
//         onSelectEvent={handleEventSelected}
//       />

//       <Dialog
//         open={state.openSlot}
//         onClose={handleClose}
//       >
//         <DialogTitle>
//           {state.start ? moment(state.start).format("MMMM Do YYYY") : ""}
//         </DialogTitle>
//         <DialogContent>
//           <label htmlFor="">Title</label>
//           <input
//             onChange={setTitle}
//           />
//           <br />
//           <label htmlFor="">Description</label>
//           <input
//             onChange={setDescription}
//           />
//           <TimePicker
//             format="ampm"
//             label="Start Time"
//             minutesStep={5}
//             value={state.start ? state.start.toDate() : null}
//             onChange={handleStartTime}
//           />
//           <TimePicker
//             format="ampm"
//             label="End Time"
//             minutesStep={5}
//             value={state.end ? state.end.toDate() : null}
//             onChange={handleEndTime}
//           />
//         </DialogContent>
//         <DialogActions>
//           <button
//             onClick={handleClose}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               setNewAppointment();
//               handleClose();
//             }}
//             autoFocus
//           >
//             Submit
//           </button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={state.openEvent}
//         onClose={handleClose}
//       >
//         <DialogTitle>
//           {state.start ? moment(state.start).format("MMMM Do YYYY") : ""}
//         </DialogTitle>
//         <DialogContent>
//           <label htmlFor="">Title</label>
//           <input
//             defaultValue={state.title}
//             onChange={setTitle}
//           />
//           <br />
//           <label htmlFor="">Description</label>
//           <input
//             defaultValue={state.desc}
//             onChange={setDescription}
//           />
//           <TimePicker
//             format="ampm"
//             label="Start Time"
//             minutesStep={5}
//             value={state.start ? state.start.toDate() : null}
//             onChange={handleStartTime}
//           />
//           <TimePicker
//             format="ampm"
//             label="End Time"
//             minutesStep={5}
//             value={state.end ? state.end.toDate() : null}
//             onChange={handleEndTime}
//           />
//         </DialogContent>
//         <DialogActions>
//           <button
//             onClick={handleClose}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               deleteEvent();
//               handleClose();
//             }}
//           >
//             Delete
//           </button>
//           <button
//             onClick={() => {
//               updateEvent();
//               handleClose();
//             }}
//           >
//             Confirm Edit
//           </button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };





