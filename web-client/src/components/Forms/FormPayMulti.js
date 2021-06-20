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
import useFetch from '../useFetch/useFetch';

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

export default function InputAdornments({changeFunction,Obj,changefSignal}) {
  const classes = useStyles();


  console.log("roooooooooooooooooooooott iiiiiiiiiiiiidddddd",Obj)
  
  // const Obj={                    // Item Object get from PostList
  //   root_id:1,
  // }

  const [values, setValues] = React.useState({
    root_id: Obj.root_id,
    new_payment: '',
  });


  const temp={root_id: Obj.root_id}
  const dataQuery={where:temp};

  const urlPayment=endpoint+'multi-transaction-statuses/'+Obj.root_id;
  const url=endpoint+'transactions?filter0='+JSON.stringify(dataQuery);

  const {data:remaining_amount,isPending,error}=useFetch(urlPayment);

  const {data:nothing,isPending:DPending,error:DError}=useFetch(url);

  const data = [Obj]

  let TradName="";
  let TradObj="";
  let GoodName="";
  if(!DPending)
  {
    const keysList=Object.keys(data[0]);
    console.log(data[0],"hello0000000000000000000000000"); 
    
    for(let i=0;i<keysList.length;i++)
    {
      if(keysList[i]==="item_name")
      {
        TradName="Item";
      }
    }
    if(TradName==="")
    {
      TradName="Service";
    }  

    TradObj=TradName==="Item"?"item_name":"service_name";

    GoodName=data[0][TradObj];

  }


  const [newPay,setNewPay]=React.useState();

  const handleNewPay = (e) =>{
    setNewPay(e.target.value);
    console.log(newPay);
  }

  

  const handleSubmit = () =>{
    if(newPay!=""){
      
      values.new_payment=parseInt(newPay);
      console.log("SEND DATA FROM HERE!");

      var obj ={}
      obj["root_id"]= Obj.root_id
      obj["new_payment"]=values.new_payment
      

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };
      fetch(endpoint + "pay_multistep", requestOptions).then(() => {
        changefSignal();
      });;
      changeFunction(null)

      console.log(values);

      // var obj ={"stock":parseInt(values["stock"])}
      // const requestOptions = {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(obj)
      // };

      // console.log(obj,"request obj")
      // fetch(endpoint + "items/"+Obj.item_id, requestOptions);

      // changeFunction(null)
      // console.log("Done seeting")

    }
  }

  return (
      <div className="PForm" >
        <Button onClick = {()=>{changeFunction(null)}} style={{float:'right',border:"none",backgroundColor:"white"}}><CancelIcon></CancelIcon></Button>
        { !DError &&!DPending &&
        <div className="ElementBlocks" style={{paddingTop:'40px'}}>
          <p>Person Name</p>
          <TextField
            disabled
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><QueueIcon></QueueIcon></InputAdornment>,
            }}
            variant="outlined"
            value={data[0].person_name}
          />
        </div>        
        }
        { !DError && !DPending &&
          <div className="ElementBlocks">
            <p>{TradName} Name</p>
            <TextField
            disabled
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><MoneyIcon></MoneyIcon></InputAdornment>,
            }}
            variant="outlined"
            value={GoodName}
            />
          </div>}
        {!error && !isPending &&
        <div className="ElementBlocks">
        <p>Remaining Payment</p>
        <TextField
          disabled
          placeholder={Obj.stock}
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><MoneyIcon></MoneyIcon></InputAdornment>,
          }}
          variant="outlined"
          value={remaining_amount.remaining_amount}
        />
        </div >
        } 

        <div className="ElementBlocks">
        <p>New Payment</p>
        <TextField
          label="Required *"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><MoneyIcon></MoneyIcon></InputAdornment>,
          }}
          variant="outlined"
          onChange={handleNewPay}
        />
        </div>
        <p></p>
        <Button color='primary' variant='contained' style={{marginLeft:'7%'}} onClick={handleSubmit}>Submit</Button>
      </div>

  );
}
