import React from "react";
import {
  getDaysInMonth,
  addDays,
  isSameDay,
  addMonths,
  subMonths,
  format,
  startOfWeek,
  isSameMonth,
  endOfMonth,
  startOfMonth,
  endOfWeek,
  isBefore,
  getDate,
  isThisMonth,
} from "date-fns";
import "./Calendar.css";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostReq = props.handlePostReq
    this.setDataReq = props.setDateReq
  }

  state = {
    bookedDates: [],
    nextMonthDates: [],
    status: "",
    day: null
  };
  componentDidMount() {
    this.generateBooking();
    if (!localStorage.getItem("logIn")) {
      this.setState((prevState) => ({
        ...prevState,
        status: "Зарегистрируйтесь, что бы оставить заявку",
      }));
    } else if (localStorage.getItem("role") == "LANDLORD") {
      this.setState((prevState) => ({
        ...prevState,
        status: "Только арендаторы могут оставлять заявки",
      }));
    } else this.setState((prevState) => ({ ...prevState }));
  }

  componentDidUpdate(prevProps) {
    // Обычное использование (не забудьте сравнить свойства):
    if (this.props.currentMonth !== prevProps.currentMonth) {
      this.generateBooking();
    }
  }

  handlePost() {
    this.handlePostReq(this.state.day)
    this.setDataReq(this.state.day)
  }

  generateBooking = () => {
    const { currentMonth } = this.props;
    let bookedDates = [];
    let nextMonthDates = [];
    let dates = this.props.data;
    console.log(dates)
    for (let i = 0; i < dates.length; i++) {
      let date = new Date(dates[i]);
      const day = new Date(dates[i]).getDate();

      if (currentMonth.getMonth() === date.getMonth()) {
        bookedDates.push(
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day - 1)
        );
      } else
        nextMonthDates.push(
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day - 1)
        );
    }
    this.setState((prevState) => ({
      ...prevState,
      bookedDates: bookedDates,
      nextMonthDates: nextMonthDates,
    }));
  };

  isBooked = (date) => {
    const { bookedDates } = this.state;

    return bookedDates.some((bookedDate) => isSameDay(date, bookedDate));
  };

  nextMonth = () => {
    this.props.onChangeMonth(addMonths(this.props.currentMonth, 1));
  };

  prevMonth = () => {
    this.props.onChangeMonth(subMonths(this.props.currentMonth, 1));
  };

  renderButton = () => {
    return (
      <div className="buttonWrapper">
        {this.state.status.length >= 1 ? (
          <p className="textPlug">{this.state.status}</p>
        ) : 
        (
          this.state.day ? <ButtonDefault
            lable="Оставить заявку"
            action={(e) => this.handlePost()}
          /> : <p className="textPlug">Выберите дату</p>
        )
       
        }
      </div>
    );
  };

  renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="calendarHeader row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.props.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(this.props.currentMonth);
    for (let i = 1; i < 8; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  renderCells = () => {
    const { currentMonth } = this.props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    const thisDay = new Date();
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDate = day;
        formattedDate = format(day, dateFormat);
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : this.isBooked(currentDate)
                ? "selected"
                : ""
            }
            ${this.state.day && isSameDay(currentDate, this.state.day) ? 'picked' : ''}
            ${isBefore(currentDate, thisDay) ? "disabled" : ""}`}
            key={currentDate}
            id={currentDate}
            onClick={() => {
              this.setState((prevState) => ({
                ...prevState,
                
                day: currentDate,
              }));
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.renderButton()}
      </div>
    );
  }
}
