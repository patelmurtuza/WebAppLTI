import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./BasicTable.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});





const BasicTable = (props) => {



  const keys = Object.keys(props.data[0])

  // console.log(keys)
  // console.log(props.data)
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {keys.map(x => <TableCell key={x}>{x}</TableCell>)}

          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (


            keys[0] == "transaction_id" ? <TableRow onClick={() => {props.addMultistep(row)}} key={row[keys[0]]}>


              {keys.map(x => <TableCell key={x}>{row[x]}</TableCell>)}

            </TableRow> :

              <TableRow onClick={() => { props.changePersonId(row) }} key={row[keys[0]]}>


                {keys.map(x => <TableCell key={x}>{row[x]}</TableCell>)}

              </TableRow>



          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default BasicTable
