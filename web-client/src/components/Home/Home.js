import "./Home.css";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Sidebar from "../Sidebar/Sidebar";
// import PostList from "../MyTable/PostList";
// import ParentArea from "../DisplayArea/ParentArea";
//import { TransitionGroup, CSSTransition } from "react-transition-group";
import Right from "../right";

const Home = () => {
  const classes = useStyles();

  const [fSignal, setfSignal] = useState(1);

  const [sideBar, setSideBar] = useState(true);
  const [mode, setMode] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [otherRequest, setOtherRequest] = useState(null);
  const [formObject, setFormObject] = useState(null);

  function changefSignal() {
    setfSignal(fSignal + 1);
  }

  function changeSelected(
    value,
    other_request = null,
    form_object = null,
    increaseclicks = null
  ) {
    // if(formObject!=null){

    setFormObject(form_object);

    // }
    // else{
    setOtherRequest(other_request);

    if (increaseclicks != null) {
      setClicks(clicks + 1);
    } else {
      setClicks(1);
    }

    setCurrentlySelected(value);
    // }

    // console.log(".......................", other_request);
  }

  const handleChange = (event) => {
    setMode(!mode);
    if (mode === false) {
      document.documentElement.classList.toggle("dark-mode");
    } else {
      document.documentElement.classList.toggle("dark-mode");
    }
  };

  // console.log("rendering home");
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setSideBar(!sideBar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Ledger
          </Typography>
          <FormGroup>
            <FormControlLabel
              label={mode ? "Dark" : "Light"}
              control={
                <Switch
                  checked={mode}
                  onChange={handleChange}
                  aria-label="login switch"
                  style={{ color: "white" }}
                />
              }
            />
          </FormGroup>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
        </Toolbar>
      </AppBar>
      {/* <div className="SidePlusDisplay">
                {sideBar && <Sidebar changeFunction={changeSelected} /> } 
                <ParentArea currentlySelected={currentlySelected}/>
                
            </div>  */}
      <div className="Page">
        <div className="Left">
          {sideBar && <Sidebar changeFunction={changeSelected} />}
        </div>
        {/* {console.log("in home ",formObject)} */}
        <Right
          currentlySelected={currentlySelected}
          clicks={clicks}
          changeFunction={changeSelected}
          otherRequest={otherRequest}
          formObject={formObject}
          fSignal={fSignal}
          changefSignal={changefSignal}
        />
      </div>
    </div>
  );
};

export default Home;
