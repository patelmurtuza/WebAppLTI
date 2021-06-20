import React, { Fragment } from "react";
import FormItem from "./FormItem";
import FormPerson from "./FormPerson";
import FormService from "./FormService";
import FormUpdateStock from "./FormUpdateStock";
import FormTransaction from "./FormTransaction";
import FormPayMulti from "./FormPayMulti"

function FormsContainer({
  currentlySelected,
  clicks,
  changeFunction,
  formObject,
  changefSignal,
}) {
  console.log("form container is called with obj =", formObject);

  const array = {
    "Add Person": <FormPerson changeFunction={changeFunction} />,
    "Add Item": <FormItem changeFunction={changeFunction} />,
    "Add Service": <FormService changeFunction={changeFunction} />,
    "Update Stock": (
      <FormUpdateStock changeFunction={changeFunction} Obj={formObject} />
    ),
    "Add Transaction": (
      <FormTransaction
        changeFunction={changeFunction}
        Obj={formObject}
        changefSignal={changefSignal}
      />
    ),
    "Add MultiStep": <FormPayMulti changeFunction={changeFunction} Obj={formObject} changefSignal={changefSignal}/>
  };
  console.log("*************************************", formObject);

  return <Fragment>{array[currentlySelected]}</Fragment>;
}

export default FormsContainer;
