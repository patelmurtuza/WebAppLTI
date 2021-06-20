import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import QueueIcon from '@material-ui/icons/Queue';
import CancelIcon from '@material-ui/icons/Cancel';
import MoneyIcon from '@material-ui/icons/Money';
import './Form.css';
import { Button } from '@material-ui/core';
import PostList from "../MyTable/PostList"

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

export default function InputAdornments({changeFunction,Obj}) {
  const classes = useStyles();
  
  // const Obj={                    // Item Object get from PostList
  //   price:'1050',
  //   stock:'100',
  //   name:'Fountain Pen',
  // }

  const [values, setValues] = React.useState({
    price: Obj.price,
    stock: '',
    name:Obj.name,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    //console.log(values);
  };

  const handleSubmit = () =>{
    if(values.name!=="" && values.price!=="" && values.stock!==""){
      console.log("SEND DATA FROM HERE!");


      var obj ={"stock":parseInt(values["stock"])}
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };

      console.log(obj,"request obj")
      fetch(endpoint + "items/"+Obj.item_id, requestOptions);

      changeFunction(null)
      console.log("Done seeting")

    }
  }

  return (
      <div className="PForm" >
        <Button onClick = {()=>{changeFunction(null)}} style={{float:'right',border:"none",backgroundColor:"white"}}><CancelIcon></CancelIcon></Button>
        <div className="ElementBlocks" style={{paddingTop:'40px'}}>
          <p>Item Name</p>
          <TextField
            disabled
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><QueueIcon></QueueIcon></InputAdornment>,
            }}
            variant="outlined"
            value={values.name}
          />
        </div>
        <br></br>
        <div className="ElementBlocks">
        <p>Stock</p>
        <TextField
          label="Required *"
          placeholder={Obj.stock}
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><LocalShippingIcon></LocalShippingIcon></InputAdornment>,
          }}
          variant="outlined"
          onChange={handleChange('stock')}
          value={values.stock}
        />
        </div > 
        <br></br>
        <div className="ElementBlocks">
        <p>Price</p>
        <TextField
          disabled
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><MoneyIcon></MoneyIcon></InputAdornment>,
          }}
          variant="outlined"
          value={values.price}
        />
        </div>
        <p></p>
        <Button color='primary' variant='contained' style={{marginLeft:'7%'}} onClick={handleSubmit}>Submit</Button>
      </div>

  );
}
