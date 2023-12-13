import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./modal";
import CreateLessonModal from "./CreateLessonModal";
import { localWithTZtoIsoString } from "~/helpers/timeConvertor";
import { convertToCalendarFormatSingle } from "~/helpers/calendarHelpers";
import ukLocale from "@fullcalendar/core/locales/uk"



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
  }, [actionData]);

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
    }
  }, [fetcher]);


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
      confirm(`Ви дійсно хочете видалити '${e.event.title}'`)
    ) {
      e.event.remove();
    }
  };

  const handleDateSelect = (selectArgs: any) => {
    console.log("DataSelect", selectArgs);

    const startInISO = selectArgs.start.toISOString();
    const endInISO = selectArgs.end.toISOString();
    setStartTime(startInISO);
    setEndTime(endInISO);

    setIsOpenModal(!isOpenModal);

    let calendarApi = selectArgs.view.calendar;
  };

  const handleLoading = () => {
    console.log("loading calendar");
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  
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
          onCloseModal={handleCloseModal} 
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
        events={selectedClass ? `/service/lessons/${selectedClass}` : ""}
        selectable={userRole === "teacher" ? true : false}
        editable={false}
        eventOverlap={false}
        select={handleDateSelect}
        eventClick={handleEventClick}
        lazyFetching={true}
        loading={handleLoading}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        nowIndicator={true}
        firstDay={1}
        navLinks={true}
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
        eventChange={eventChangeHandler}
        eventRemove={eventRemoveHandler}
      />
    </div>
  );
};

// todo - add drag-n-drop
// todo - add notification if one event overlap another
