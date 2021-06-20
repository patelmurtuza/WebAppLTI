import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import './Form.css';
import { Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import CallIcon from '@material-ui/icons/Call';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CancelIcon from '@material-ui/icons/Cancel';
import PostList from "../MyTable/PostList"
import axios from "axios";

const endpoint = PostList.endpoint;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));



export default function InputAdornments({ changeFunction }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    "name": '',
    "date_created": '',
    "email_id": '',
    "balance": 0,
    "phone_numbers": [],
  });





  const [PhoneVar, setPhoneVar] = React.useState();

  const handlePhoneVar = e => {    // Store intermediate value
    setPhoneVar(e.target.value);
  };


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [submitClick, setSubmitClick] = React.useState(false);

  const handleSubmit = () => {
    if (PhoneVar !== values.phone_numbers[values.phone_numbers.length - 1] && PhoneVar !== '') {


      const Newlist = values['phone_numbers'].concat(parseInt(PhoneVar));  // Add intermediate value only if previous value isn't added and new is not null
      console.log(Newlist)
      setValues({ ...values, ['phone_numbers']: Newlist });
    }
    // Submit Only if Required fields are having some value
  };

  React.useEffect(() => {
    if (values.name !== "" && values.email_id !== "" && values.phone_numbers != null) {

      console.log(values);
      console.log("Hero"); // SEND DATA FROM HERE

      var obj = {
      "name": values["name"],
      "email_id": values["email_id"],
      "balance": values["balance"],
      "phone_numbers":values["phone_numbers"]
      }
      // values.date_created = Date().toLocaleString()
      console.log(obj, "valuessdfgsdfg "); // SEND DATA FROM HERE
      // console.log(JSON.stringify(values), "values ");
      

      // axios.post(endpoint + "person", obj)

      console.log(JSON.stringify(obj))
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };
      fetch(endpoint + "person", requestOptions)
      .then(response => response.json());

      // .then(response => response.json())
      // .then(data => setPostId(data.id));

      changeFunction(null)
      console.log("Done change")

    }
  }, [values.phone_numbers, submitClick]);

  const handleFinalSubmit = () => {
    if (PhoneVar !== values.phone_numbers[values.phone_numbers.length - 1] && PhoneVar !== '') {
      const Newlist = values['phone_numbers'].concat(parseInt(PhoneVar));  // Add intermediate value only if previous value isn't added and new is not null
      setValues({ ...values, ['phone_numbers']: Newlist });
      setSubmitClick(true);
    }
  };


  return (
    <div className="PForm" >
      <Button onClick={() => { changeFunction(null) }} style={{ float: 'right', border: "none", backgroundColor: "white" }}><CancelIcon></CancelIcon></Button>
      <div className="ElementBlocks" style={{ paddingTop: '40px' }}>
        <p>Person Name</p>
        <TextField
          label="Required *"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><PersonIcon></PersonIcon></InputAdornment>,
          }}
          variant="outlined"
          onChange={handleChange('name')}
          value={values.name}
        />
      </div>
      <br></br>
      <div className="ElementBlocks">
        <p>Email</p>
        <TextField
          label="Required *"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><EmailIcon></EmailIcon></InputAdornment>,
          }}
          variant="outlined"
          onChange={handleChange('email_id')}
          value={values.email_id}
        />
      </div >
      <br></br>
      {/* <div className="ElementBlocks">
        <p>Date Created</p>
        <TextField
          label="Required *"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><TodayIcon></TodayIcon></InputAdornment>,
          }}
          variant="outlined"
          onChange={handleChange('date_created')}
          value={values.date_created}
        />
        </div > */}
      <div className="ElementBlocks">
        <p>Phone Number</p>
        <TextField
          label="Required *"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><CallIcon></CallIcon></InputAdornment>,
          }}
          variant="outlined"
          onChange={handlePhoneVar}
        />
        {/* { values.phone_numbers.length!==0 && <Button style={{marginTop:'14px'}} onClick={handleRemove(0)} ><RemoveIcon></RemoveIcon></Button>} */}
        {values.phone_numbers.length === 0 && <Button style={{ marginTop: '14px' }} onClick={handleSubmit} ><AddIcon></AddIcon></Button>}
        {values.phone_numbers.map((x, i) => (

          <div key={i}>
            <TextField
              label="Optional"
              id="outlined-start-adornment"
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><CallIcon></CallIcon></InputAdornment>,
              }}
              variant="outlined"
              onChange={handlePhoneVar}
            />
            {/* <Button style={{marginTop:'14px'}} onClick={()=>handleRemove(i)} ><RemoveIcon></RemoveIcon></Button> */}
            {values.phone_numbers.length - 1 === i && <Button style={{ marginTop: '14px' }} onClick={handleSubmit} ><AddIcon></AddIcon></Button>}
          </div>
        )
        )}

      </div >
      <p></p>
      <Button color='primary' variant='contained' style={{ marginLeft: '7%' }} onClick={handleFinalSubmit}>Submit</Button>

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
