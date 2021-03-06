import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Home = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div>
      <Navbar />
      {/* <Test/>  */}
      <div className="homeContainer">
        <div class="childHomeContainer">
          <div className="question">
            <div class="text">Where</div>
            <div class="text">are you</div>
            <div class="text">travelling to?</div>
          </div>

          <div className="search">
            <div className="spaceItem">
              <div className="spaceItem">DESTINATION</div>
              <div className="headerSearchInput">
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="spaceItem">
              <div className="spaceItem">CHECKING DATES</div>
              <div className="dateItem">
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="dateItem"
                >{`${format(date[0].startDate, "MMM dd, yyyy")} to ${format(
                  date[0].endDate,
                  "MMM dd, yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
            </div>

            <div className="searchContainer">
              <div className="childSearchContainer">
                <div className="spaceItem"> ADULTS </div>
                <div className="countItem">
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                  >{`${options.adult}`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adults</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.adult <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.adult}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="childSearchContainer">
                <div className="spaceItem"> CHILDREN </div>
                <div className="countItem">
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                    // {`${options.adult} adult ?? ${options.children} children ?? ${options.room} room`}
                  >{`${options.children}`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.children <= 0}
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.children}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="childSearchContainer">
                <div className="spaceItem"> ROOMS </div>
                <div className="countItem">
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                  >
                    {`${options.room}`}
                  </span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Rooms</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.room <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.room}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="searchItem">
              <button className="SearchBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
