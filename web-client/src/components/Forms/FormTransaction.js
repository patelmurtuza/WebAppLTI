import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import "./Form.css";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CancelIcon from "@material-ui/icons/Cancel";
import MoneyIcon from "@material-ui/icons/Money";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import QueueIcon from "@material-ui/icons/Queue";
import useFetch from "../useFetch/useFetch";
import PostList from "../MyTable/PostList";
import axios from "axios";

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

export default function InputAdornments({
  changeFunction,
  Obj,
  changefSignal,
}) {
  console.log("hey there.................................. ", Obj);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    person_id: 0,
    payment: 0,
    goods: [],
  });

  const endpoint = PostList.endpoint;

  const { data, isPending, error } = useFetch(endpoint + "items?filter=%7B%7D");

  const [amountToPay, setAmountToPay] = React.useState(0);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  values.person_id = Obj.person_id;

  const [tradeName, setTradeName] = React.useState("Item");

  const handleBarChange = (event) => {
    setTradeName(event.target.value);
  };

  const [inputList, setInputList] = React.useState([{ id: "", quantity: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];
    list[index][name] = parseInt(value);
    if (name === "quantity") {
      //console.log(data[inputList[0].id - 1].price);
      let a = 0;
      for (let i = 0; i < inputList.length; i++) {
        a =
          a + data[inputList[i].id - 1].price * parseInt(inputList[i].quantity);
      }
      setAmountToPay(a);
    }
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log(inputList);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { id: "", quantity: "" }]);
  };

  const handleSubmit = () => {
    //console.log("inSubmit",inputList);
    if (values.payment !== "" && inputList.length > 0) {
      console.log("Submitted");
      const NewObj = {
        person_id: values.person_id,
        payment: 0,
        goods: [],
      };

      NewObj["goods"] = inputList;
      NewObj["payment"] = parseInt(values.payment);

      console.log(tradeName, NewObj);

      if (tradeName == "Item") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(NewObj),
        };
        fetch(endpoint + "purchase_items", requestOptions).then(() => {
          changefSignal();
        });
      } else if (tradeName == "Service") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(NewObj),
        };
        fetch(endpoint + "purchase_services", requestOptions).then(() => {
          changefSignal();
        });
      }

      changeFunction(null);

      // if tradeName=="Item" then send this on this
      // if tradeName=="Service" then send this on that
    }
  };

  return (
    <div className="PForm">
      <FormControl component="fieldset">
        <FormLabel component="legend">Trade Type</FormLabel>
        <RadioGroup
          aria-label="Trade Type"
          name="Trade Type"
          value={tradeName}
          onChange={handleBarChange}
        >
          <FormControlLabel
            value="Service"
            control={<Radio />}
            label="Service"
          />
          <FormControlLabel value="Item" control={<Radio />} label="Item" />
        </RadioGroup>
      </FormControl>
      <Button
        onClick={() => {
          changeFunction(null);
        }}
        style={{ float: "right", border: "none", backgroundColor: "white" }}
      >
        <CancelIcon></CancelIcon>
      </Button>
      <div className="ElementBlocks" style={{ paddingTop: "40px" }}>
        <span>
          {" "}
          <span>Person Name</span>{" "}
          <span style={{ paddingLeft: "28%" }}>Payment </span>{" "}
        </span>
        <br></br>
        <TextField
          disabled
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon></PersonIcon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          onChange={handleChange("name")}
          value={Obj.name}
        />

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
          onChange={handleChange("payment")}
        />
      </div>
      <br></br>

      <div className="ElementBlocks">
        <p>{tradeName} ID</p>

        {inputList.map((x, i) => {
          return (
            <div className="box">
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
                onChange={(e) => handleInputChange(e, i)}
                name="id"
              />
              <TextField
                label="Ouantity"
                id="outlined-start-adornment"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                onChange={(e) => handleInputChange(e, i)}
                name="quantity"
              />
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <Button className="mr10" onClick={() => handleRemoveClick(i)}>
                    <RemoveIcon />
                  </Button>
                )}
                {inputList.length - 1 === i && (
                  <Button onClick={handleAddClick}>
                    <AddIcon />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p> Total amount : {amountToPay.toString()}</p>
      <p></p>
      <Button
        color="primary"
        variant="contained"
        style={{ marginLeft: "43%" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      {/* <pre>
        {JSON.stringify(values)}
      </pre> */}
    </div>
  );
}

// const[phoneList,setPhoneList]=React.useState([]);

// const[PhoneVar,setPhoneVar]=React.useState();

// const handleChange = (prop) => (event) => {
//   setValues({ ...values, [prop]: event.target.value });
// };

// const handleSubmit = () => {
//       handlePhone();
//       setValues({...values,['phone']:phoneList});

// };

// const handlePhoneVar = e => {
//   setPhoneVar(e.target.value);
// };

// const handlePhone = () =>{
//   setPhoneList( arr => [...arr,PhoneVar] )
// }
