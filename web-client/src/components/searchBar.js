import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState, Fragment } from "react";
import useFetch from "./useFetch/useFetch";
import axios from "axios";
// import BasicTable from "../MyTable/BasicTable";

import "./searchBar.css";
import BasicTable from "./MyTable/BasicTable";

const Searchbar = ({ data, changePersonId, addMultistep }) => {
  // request API before every render and store response in data
  // let dataValues;
  // const { data: dataValues, isPending, error } = useFetch(
  //   array[currentlySelected]
  // );
  // const [personId, setpersonId] = useState(PersonId)

  var [records, setrecords] = useState(data);
  // let records = data;

  useEffect(() => {
    // console.log("datachanged");
    setrecords(data);
    let dataValues = data;

    // if (!isPending && !error) {
    //By magic i know these
    let searchBy = ["person_id", "name", "date_created", "email_id", "balance"];

    //suppose by dropdown name was selected
    let selected = "name";
    // console.log("coming data");
    console.log(dataValues);
    let suggestions = dataValues.map((ele) => ele);
    console.log(suggestions);

    // getting all required elements
    const searchWrapper = document.querySelector(".search-input");

    const inputBox = document.querySelector(".inputBox");

    inputBox.value = "";
    console.log(inputBox.textContent);
    const suggBox = document.querySelector(".autocom-box");

    suggBox.setAttribute("style", "opacity:0");

    const recordBox = document.querySelector(".records-table");
    const icon = document.querySelector(".icon");
    icon.onclick = () => {
      // console.log("clicked--search");
    };
    // if user press any key and release
    inputBox.onkeyup = (e) => {
      console.log(e);
      if (e.key === "Enter" || e.keyCode === 13) {
        // console.log("pressed-search");
        searchWrapper.classList.remove("active"); //hide autocomplete box
      } else {
        let userData = e.target.value; //user enetered data
        let emptyArray = [];
        if (userData) {
          emptyArray = suggestions.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data[selected]
              .toLocaleLowerCase()
              .startsWith(userData.toLocaleLowerCase());
          });
          records = emptyArray;

          emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return (data = "<li>" + data[selected] + "</li>");
          });
          searchWrapper.classList.add("active"); //show autocomplete box
          showSuggestions(emptyArray, records);
          let allList = suggBox.querySelectorAll("li");
          for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            // allList[i].setAttribute("onClick", "select(" + "this" + ")");
            allList[i].addEventListener("click", (e) => {
              select(e.target);
            });
          }
        } else {
          records = data;
          // console.log("When user input is none");
          // console.log(records);

          setrecords(records);

          searchWrapper.classList.remove("active"); //hide autocomplete box
        }
      }
    };

    function select(element) {
      let selectData = element.textContent;
      inputBox.value = selectData;
      // icon.onclick = () => {
      //   webLink = "https://www.google.com/search?q=" + selectData;
      //   linkTag.setAttribute("href", webLink);
      //   linkTag.click();
      // };
      searchWrapper.classList.remove("active");
    }

    function showSuggestions(list, records1) {
      let listData;
      if (!list.length) {
        var userValue = inputBox.value;
        listData = "<li>" + userValue + "</li>";

        setrecords(data);
        // console.log("re rendering");
        // suggBox.backgroundColor = "red !important";

        suggBox.setAttribute("style", "background-color:#f45057");
        // console.log("this is recordsSuggestion");
        // console.log(records);
        // <BasicTable data={records} changePersonId={changePersonId} />;
      } else {
        setrecords(records1);
        suggBox.setAttribute("style", "background-color:rgb(12, 252, 160)");
        listData = list.join("");
        // console.log("this is recordsSuggestion1");
        // console.log(records1);
        // <BasicTable data={records1} changePersonId={changePersonId} />;
      }
      // suggBox.innerHTML = listData;
    }
    // }
    return () => {
      // cleanup
    };
  }, [data]);

  return (
    <Fragment>
      <div className="wrapper">
        <div className="search-input">
          {/* <a href="" target="_blank" hidden></a> */}
          <input
            className="inputBox"
            type="text"
            placeholder="Type to search.."
          />
          <div className="autocom-box">
            {/* <!-- here list are inserted from javascript --> */}
          </div>
          <div className="icon">
            <i className="fa fa-search"></i>
          </div>
        </div>
      </div>
      <div className="records-table">
        {/* {console.log(addMultistep,"adddddd")} */}
        <BasicTable data={records} changePersonId={changePersonId} addMultistep={addMultistep} />
      </div>
    </Fragment>
  );
};

export default Searchbar;
