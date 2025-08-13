import { useState, useEffect } from "react";
import "./Calendar.css";

function Calendar({ selectedDate = "", onDateSelect, showPeriod = false }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Получаем текущую дату
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Названия месяцев
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Получаем первый день месяца и количество дней в месяце
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Корректируем стартовый день (понедельник = 0)
  const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Получаем дни предыдущего месяца
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const formattedDate = `${day.toString().padStart(2, "0")}.${(
      currentMonth + 1
    )
      .toString()
      .padStart(2, "0")}.${currentYear}`;
    if (onDateSelect) {
      onDateSelect(formattedDate);
    }
  };

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelectedDay = (day) => {
    return selectedDay === day;
  };

  // Генерируем дни календаря
  const generateCalendarDays = () => {
    const days = [];

    // Дни предыдущего месяца
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${daysInPrevMonth - i}`}
          className="calendar__cell _other-month"
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (startingDay + day - 1) % 7;
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Суббота и воскресенье

      let className = "calendar__cell _cell-day";
      if (isWeekend) className += " _weekend";
      if (isToday(day)) className += " _current";
      if (isSelectedDay(day)) className += " _active-day";

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => handleDayClick(day)}
          style={{ cursor: "pointer" }}
        >
          {day}
        </div>
      );
    }

    // Дни следующего месяца для заполнения сетки
    const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startingDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="calendar__cell _other-month">
          {day}
        </div>
      );
    }

    return days;
  };

  useEffect(() => {
    // Если selectedDate изменился извне, обновляем selectedDay
    if (selectedDate) {
      const [day] = selectedDate.split(".");
      setSelectedDay(parseInt(day, 10));
    } else {
      setSelectedDay(null);
    }
  }, [selectedDate]);

  return (
    <div className="pop-new-card__calendar calendar">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <div className="calendar__nav">
          <div className="calendar__month">
            {monthNames[currentMonth]} {currentYear}
          </div>
          <div className="nav__actions">
            <div
              className="nav__action"
              data-action="prev"
              onClick={handlePrevMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
                style={{ cursor: "pointer" }}
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </div>
            <div
              className="nav__action"
              data-action="next"
              onClick={handleNextMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
                style={{ cursor: "pointer" }}
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="calendar__content">
          <div className="calendar__days-names">
            <div className="calendar__day-name">пн</div>
            <div className="calendar__day-name">вт</div>
            <div className="calendar__day-name">ср</div>
            <div className="calendar__day-name">чт</div>
            <div className="calendar__day-name">пт</div>
            <div className="calendar__day-name -weekend-">сб</div>
            <div className="calendar__day-name -weekend-">вс</div>
          </div>
          <div className="calendar__cells">{generateCalendarDays()}</div>
        </div>

        <input type="hidden" id="datepick_value" value={selectedDate} />
        <div className="calendar__period">
          <p className="calendar__p date-end">
            {showPeriod && selectedDate
              ? `Срок исполнения: `
              : "Выберите срок исполнения"}
            <span className="date-control">
              {showPeriod && selectedDate ? selectedDate : ""}
            </span>
            {!showPeriod && "."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
