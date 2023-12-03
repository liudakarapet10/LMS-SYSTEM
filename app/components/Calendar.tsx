import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./modal";
import CreateLessonModal from "./CreateLessonModal";
import { localWithTZtoIsoString } from "~/helpers/timeConvertor";
import { convertToCalendarFormatSingle } from "~/helpers/calendarHelpers";
import { LocaleInput } from "@fullcalendar/core";
import ukLocale from "@fullcalendar/core/locales/uk"



// todo - load records not by month but by calendar view
// todo - skeleton for loading calendar to prevent overlaping when loading
// todo - touch and longPressDelay
export const Calendar = ({
  selectedClass,
  teacherId,
  actionData,
  profile,
  userRole,
}) => {
  const fetcher = useFetcher();
  const calendarRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (!actionData) return;
    const calendarNewEvent = convertToCalendarFormatSingle(
      actionData,
      teacherId,
      profile
    );
    calendarRef.current.calendar.addEvent(calendarNewEvent);

    // todo use RENDER event instead of refetchEvents()
    // calendarRef.current.calendar.refetchEvents();
  }, [actionData]);

  const test = () => {
    // console.log(
    //   calendarRef.current.calendar.addEvent({
    //     // this object will be "parsed" into an Event Object
    //     id: "123123123213",
    //     title: "The Title", // a property!
    //     start: "2023-11-13", // a property!
    //     end: "2023-11-13", // a property! ** see important note below about 'end' **
    //   })
    // );
  };
  // todo - prevent click by month view , only weelk and day!!!!
  useEffect(() => {
    const isLoading =
      fetcher.state === "loading" || fetcher.state === "submitting";
    const isDone = fetcher.state === "idle" && fetcher.data != null;

    if (isLoading) {
      console.log("loading...");
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (isDone) {
      console.log("change successfull", fetcher.data);
      // alert("updated successfull");
      // remix toast - successfull operation
    }
  }, [fetcher]);

  // const handleDateClick = (arg) => {
  //   console.log("DataClick");
  //   console.log(arg);
  //   let calendarApi = arg.view.calendar;
  //   calendarApi.refetchEvents();
  // };

  const eventChangeHandler = async (e) => {
    const { oldEvent, event, revert } = e;

    const newStart = localWithTZtoIsoString(event.startStr);
    const newEnd = localWithTZtoIsoString(event.endStr);

    const formData = new FormData();
    formData.append("intent", "update");
    formData.append("id", oldEvent.id);
    formData.append("start", newStart);
    formData.append("end", newEnd);
    console.log(formData);
    fetcher.submit(formData, {
      method: "PATCH",
      action: "/service/lessons-actions",
    });
  };
  const eventRemoveHandler = async (e) => {
    const { event, revert } = e;
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", event.id);
    fetcher.submit(formData, {
      method: "DELETE",
      action: "/service/lessons-actions",
    });
  };
  const handleEventClick = (e) => {
    const eventOwnerId = e.event.extendedProps?.serviceData?.ownerTeacherId;
    if (!eventOwnerId || teacherId !== eventOwnerId) return;

    if (
      confirm(`Are you sure you want to delete the event '${e.event.title}'`)
    ) {
      e.event.remove();
    }
  };

  const handleDateSelect = (selectArgs: any) => {
    console.log("DataSelect", selectArgs);
    // for modal
    const startInISO = selectArgs.start.toISOString();
    const endInISO = selectArgs.end.toISOString();
    setStartTime(startInISO);
    setEndTime(endInISO);

    setIsOpenModal(!isOpenModal);

    //   let title = prompt("Please enter a new title for your event");
    let calendarApi = selectArgs.view.calendar;
    //   calendarApi.unselect(); // clear date selection

    //   if (title) {
    //     calendarApi.addEvent({
    //       id: new Date().toISOString(),
    //       title,
    //       start: selectArgs.start,
    //       end: selectArgs.endStr,
    //       allDay: selectArgs.allDay,
    //     });https://fullcalendar.io/docs/eventStartEditable
    //   }
  };

  const handleLoading = () => {
    console.log("loading calendar");
  };
  // const eventAddHandler = (addInfo) => {
  //   console.log("Event added to calendar API", addInfo);
  //   publish("created-calendar-lesson", {});
  // };
  const handleEventsSet = (events) => {
    console.log(events);
    // this.setState({
    //   currentEvents: events,
    // });
  };
  //   todo - check if wy record or not, change color, and change position
  // todo  - prevent click on month view !!!!
  
  return (
    <div className="index-route">
      <Modal
        isOpenModal={isOpenModal}
        handleClick={() => {
          setIsOpenModal(!isOpenModal);
        }}
        className="w-2/3 p-10"
      >
        <CreateLessonModal
          teacherId={teacherId}
          classId={selectedClass}
          startTime={startTime}
          endTime={endTime}
        />
      </Modal>
      {loading && <div className="absolute">loading...</div>}
      <FullCalendar
        ref={calendarRef}
        slotDuration="00:15:00"
        slotLabelInterval="00:15"
        slotEventOverlap={false}
        weekends={false}
        locales={[ukLocale]}
        locale="uk"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // events
        events={selectedClass ? `/service/lessons/${selectedClass}` : ""}
        selectable={userRole === "teacher" ? true : false}
        // editable={loading ? false : true}
        editable={false}
        eventOverlap={false}
        // handlers
        select={handleDateSelect}
        // dateClick={handleDateClick}
        eventClick={handleEventClick}
        // eventsSet={handleEventsSet}
        // todo - lazyFetching doesnt work on month View??????
        // to draw events
        // eventContent={console.log}
        lazyFetching={true}
        // todo - logic to loading - idle - etc
        loading={handleLoading}
        // view
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        nowIndicator={true}
        firstDay={1}
        navLinks={true}
        // event and slot time format
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotMinTime="07:00:00"
        slotMaxTime="18:00:00"
        // db handlers
        // eventAdd={eventAddHandler}
        eventChange={eventChangeHandler}
        eventRemove={eventRemoveHandler}
      />
    </div>
  );
};
// todo - change to ukrainian by changing loocale
// todo - add drag-n-drop
// todo - add notification if one event overlap another
