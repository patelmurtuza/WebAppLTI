import Cards from "./card";
import PostList from "./MyTable/PostList";
import Searchbar from "./searchBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import FormsContainer from "./Forms/FormsContainer";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Right = ({
  currentlySelected,
  clicks,
  changeFunction,
  otherRequest,
  formObject,
  fSignal,
  changefSignal,
}) => {
  console.log("form object ................", formObject);
  const [expand, setExpand] = useState("less");

  const expandMore = () => {
    setExpand("less");
  };

  const expandLess = () => {
    setExpand("more");
  };

  return (
    <div className="Right">
      <div className="Top">
        <div className="Top-top">
          {/* <Cards /> */}{" "}
          <div
            className="slab"
            style={{
              // backgroundColor: "pink",
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Favourites
            <span>
            <FavoriteIcon />
            </span>
            {"more" === expand && (
              <ExpandMoreIcon onClick={expandMore}></ExpandMoreIcon>
            )}
            {"less" === expand && (
              <ExpandLessIcon onClick={expandLess}></ExpandLessIcon>
            )}
            {/* {"more"==expand ? } */}
          </div>
        </div>
        <div className="Top-bottom">
          {"less" === expand && (
            <Cards changeFunction={changeFunction} fSignal={fSignal} />
          )}
        </div>
      </div>

      {currentlySelected && (
        <div className="Bottom">
          {/* <PostList url="http://transactionsrecords.azurewebsites.net/person?filter=%7B%0A%0A%7D" /> */}
          {/* {(currentlySelected === "Person" ||
          currentlySelected === "Service" ||
          currentlySelected === "Item") && (
          <Searchbar currentlySelected={currentlySelected} />
        )} */}
          {currentlySelected &&
          (currentlySelected.includes("Add") ||
            currentlySelected.includes("Update")) ? (
            <FormsContainer
              currentlySelected={currentlySelected}
              clicks={clicks}
              changeFunction={changeFunction}
              formObject={formObject}
              changefSignal={changefSignal}
            />
          ) : (
            <PostList
              currentlySelected={currentlySelected}
              clicks={clicks}
              otherRequest={otherRequest}
              changeFunction={changeFunction}
              changefSignal={changefSignal}
            />
          )}
        </div>
      )}

      {/*       
      <div className="Bottom">
     
        {currentlySelected&&(currentlySelected.includes("Add") ||currentlySelected.includes("Update"))
            ? <FormsContainer currentlySelected={currentlySelected} clicks={clicks} changeFunction={changeFunction} formObject={formObject}/>
            : <PostList currentlySelected={currentlySelected} clicks={clicks} otherRequest={otherRequest} changeFunction={changeFunction}/> }

      </div> */}
    </div>
  );
};

export default Right;
