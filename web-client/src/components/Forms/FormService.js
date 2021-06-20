import React from "react";
import { Fragment } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import QueueIcon from "@material-ui/icons/Queue";
import MoneyIcon from "@material-ui/icons/Money";
import "./Form.css";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CancelIcon from "@material-ui/icons/Cancel";
import PostList from "../MyTable/PostList";
import { useEffect, useRef } from "react";
import useFetch from "../useFetch/useFetch";

import "./FormService.css";

const endpoint = PostList.endpoint;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function InputAdornments({ changeFunction }) {
  let inputField;
  // let id;

  const wrapper = useRef(null);
  const listBox = useRef(null);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    person: "",
    price: "",
  });

  const suggestions = (selected, data, userData, field) => {
    let emptyArray = [];
    if (userData) {
      emptyArray = data.filter((data) => {
        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        return data[selected]
          .toLocaleLowerCase()
          .startsWith(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data) => {
        // passing return data inside li tag
        return (data = "<li>" + data[selected] + "</li>");
      });
    } else {
      emptyArray = data.map((ele) => ele[selected]);
      emptyArray = emptyArray.map((data) => {
        // passing return data inside li tag
        return (data = "<li>" + data + "</li>");
      });
    }
    wrapper.current.classList.add("active");
    showSuggestions(emptyArray);
    let allList = listBox.current.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      // allList[i].setAttribute("onClick", "select(" + "this" + ")");
      allList[i].addEventListener("click", (e) => {
        select(e.target, field);
      });
    }
  };

  function select(element, field) {
    let selectData = element.textContent;
    inputField.value = selectData;
    setValues({ ...values, [field]: inputField.value });
    // listBox.current.setAttribute("style", "opacity:0");

    wrapper.current.classList.remove("active");
  }

  const showSuggestions = (list) => {
    if (!list.length) {
      //kisi bhi name sei match nhi kiya
      console.log("set input field value in not in PersonData.");
    } else {
      console.log(list);
    }

    let listData;
    if (!list.length) {
      listData = "<li>" + "No-such-Person" + "</li>";
    } else {
      listData = list.join("");
    }
    listBox.current.innerHTML = listData;
  };

  const handleChange = (prop) => (event) => {
    const userData = event.target.value;

    if (!isPending && !error) {
      inputField = event.target;
      if (userData === "") {
        listBox.current.setAttribute("style", "opacity:0");
      } else {
        listBox.current.setAttribute("style", "opacity:1");
      }

      console.log(userData);
      const selected = "name";
      const field = prop;
      suggestions(selected, data, userData, field);
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleSubmit = () => {
    if (values.name !== "" && values.price !== "" && values.person !== "") {
      console.log("SEND DATA FROM HERE!!");

      const person = data.filter((ele) => {
        return ele.name == values.person;
      });

      if (person.length != 0) {
        var person_id = person[0].person_id;
        var obj = {};
        obj["name"] = values.name;
        obj["price"] = parseInt(values.price);

        obj["person_id"] = parseInt(person_id);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        };
        fetch(endpoint + "services", requestOptions);
      }

      console.log(values);
      changeFunction(null);
      console.log("Done change");
    }
  };

  const url = endpoint + "person";
  let { data, isPending, error } = useFetch(url);
  console.log(data);

  return (
    <div className="PForm">
      <Fragment>
        <Button
          onClick={() => {
            changeFunction(null);
          }}
          style={{ float: "right", border: "none", backgroundColor: "white" }}
        >
          <CancelIcon></CancelIcon>
        </Button>
        <div className="ElementBlocks" style={{ paddingTop: "40px" }}>
          <p>Service Name</p>
          <TextField
            label="Required *"
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <QueueIcon></QueueIcon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={handleChange("name")}
            value={values.name}
          />
        </div>
        <br></br>
        <div className="ElementBlocks suggestPerson-wrapper" ref={wrapper}>
          <p>Person</p>
          <TextField
            label="Required *"
            id="outlined-start-adornment suggestPerson-input"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon></PersonIcon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={handleChange("person")}
            // value={values.person}
          />
          <div className="suggestPerson-suggestion" ref={listBox}>
            {/* <!-- here list are inserted from javascript --> */}
          </div>
        </div>
        <br></br>
        <div className="ElementBlocks">
          <p>Price</p>
          <TextField
            label="Required *"
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MoneyIcon></MoneyIcon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={handleChange("price")}
            value={values.price}
          />
        </div>
        <p></p>
        <Button
          color="primary"
          variant="contained"
          style={{ marginLeft: "7%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Fragment>
    </div>
  );
}
