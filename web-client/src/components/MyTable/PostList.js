import React, { Component, Fragment } from "react";
import BasicTable from "./BasicTable";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import SearchBar from "../searchBar";
import Searchbar from "../searchBar";
import { SingleBedSharp } from "@material-ui/icons";

// currentlySelected={currentlySelected} clicks={clicks} otherRequest={otherRequest} changeFunction={changeFunction}
class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      currentlySelected: null,
      person_id: null,
      clicks: 0,
      otherRequest: null,
    };
    this.changePersonId = this.changePersonId.bind(this);
    // this.changeSomeState = this.changeSomeState.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.addStock = this.addStock.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.addMultistep = this.addMultistep.bind(this);

  }

  static endpoint = "http://transappgithubbased.azurewebsites.net/";

  // useEffect(() => {
  // 	// POST request using fetch inside useEffect React hook

  // // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

  addToFavorite(id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        person_id: id,
      }),
    };
    fetch(PostList.endpoint + "favourites", requestOptions).then(() => {
      this.props.changefSignal();
    });

    console.log("Added To Favorite", id);
  }

  addStock(id) {
    this.props.changeFunction("Update Stock", "", id);
    console.log("Update Stock", id);
  }

  
	addMultistep(obj){
		this.props.changeFunction("Add MultiStep", "", obj);
		// console.log("make payment", obj)

	}

  getPersonId(obj) {
    if (obj != null) {
      return obj[Object.keys(obj)[0]];
    }
    return null;
  }

  makePayment(obj) {
    this.props.changeFunction("Add Transaction", "", obj);
    console.log("make payment", obj);
  }

  matchStateWithParent(prevProps, prevState) {
    var obj = {};
    if (this.props.currentlySelected != this.state.currentlySelected) {
      obj["currentlySelected"] = this.props.currentlySelected;
      obj["posts"] = [];
      console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    }

    if (this.props.clicks != this.state.clicks) {
      obj["clicks"] = this.props.clicks;
      console.log("aaaaaaaaaaaaaaaaaaaaaab");
    }

    if (this.props.otherRequest != this.state.otherRequest) {
      obj["otherRequest"] = this.props.otherRequest;
      obj["posts"] = [];
      console.log("aaaaaaaaaaaaaaaaaaaaaac");
    }
    if (this.state.person_id != this.getPersonId(this.props.otherRequest)) {
      obj["person_id"] = this.getPersonId(this.props.otherRequest);
      obj["posts"] = [];
      console.log("aaaaaaaaaaaaaaaaaaaaaad");
    }

    console.log(obj, "obj is");

    this.setState(obj, () => this.backend_work(prevProps, prevState));
  }

  changePersonId(value) {
    this.props.changeFunction(this.props.currentlySelected, value);
  }

  array = {
    Person: PostList.endpoint + "person",
    Item: PostList.endpoint + "items",
    Service: PostList.endpoint + "services",
    Transaction: PostList.endpoint + "transactions",
  };

  id_array = {
    Person: "person_id",
    Item: "item_id",
    Service: "service_id",
    Transaction: "transaction_id",
  };

  transaction_query = PostList.endpoint + "transactions?filter=";

  backend_work(prevProps, prevState) {
    console.log(
      "prev_person_id",
      prevState.person_id,
      "prev_clicks",
      prevState.clicks,
      "prev_selected",
      prevState.currentlySelected,
      "prev_post",
      prevState.posts
    );
    console.log(
      "person_id",
      this.state.person_id,
      "clicks",
      this.state.clicks,
      "selected",
      this.state.currentlySelected,
      "post",
      this.state.posts
    );

    if (
      (prevState.currentlySelected != this.state.currentlySelected &&
        this.state.person_id == null) ||
      (prevState.clicks != this.state.clicks &&
        prevState.clicks < this.state.clicks &&
        this.state.currentlySelected == prevState.currentlySelected &&
        this.state.person_id == null)
    ) {
      const value = this.state.currentlySelected;

      // this.setState({ person_id: null });

      console.log(this.array[value], this.array, value, "this.array value");

      console.log(
        "prev_person_id",
        prevState.person_id,
        "prev_clicks",
        prevState.clicks,
        "prev_selected",
        prevState.currentlySelected,
        "prev_post",
        prevState.posts
      );
      console.log(
        "person_id",
        this.state.person_id,
        "clicks",
        this.state.clicks,
        "selected",
        this.state.currentlySelected,
        "post",
        this.state.posts
      );

      axios
        .get(this.array[value])
        .then((response) => {
          console.log(response);
          this.setState({ posts: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      prevState.person_id != this.state.person_id &&
      this.state.person_id != null
    ) {
      var id_name = this.id_array[this.state.currentlySelected];
      console.log(id_name, "id_name");
      var temp = {};
      temp[id_name] = this.state.person_id;
      var object = { where: temp };

      var query = this.transaction_query + JSON.stringify(object);
      console.log(query, "query");
      axios
        .get(query)
        .then((response) => {
          console.log(response);
          this.setState({ posts: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("haa");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currentlySelected != this.state.currentlySelected ||
      this.props.otherRequest != this.state.otherRequest ||
      this.props.clicks != this.state.clicks ||
      this.state.person_id != this.getPersonId(this.state.otherRequest)
    ) {
      this.matchStateWithParent(prevProps, prevState);
    }
  }

  componentDidMount() {
    this.setState({ clicks: 1 });
  }

  render() {
    console.log("rendering postlist");
    console.log(
      "person_id",
      this.state.person_id,
      "clicks",
      this.state.clicks,
      "selected",
      this.state.currentlySelected,
      "post",
      this.state.posts
    );

    var mypost;
    if (
      this.props.currentlySelected != this.state.currentlySelected ||
      this.props.otherRequest != this.state.otherRequest ||
      this.props.clicks != this.state.clicks ||
      this.state.person_id != this.getPersonId(this.state.otherRequest)
    ) {
      mypost = [];
    } else {
      mypost = this.state.posts;
    }

    // if (this.props.otherRequest != null) {
    //   if (this.state.otherRequest != this.props.otherRequest) {
    //     this.changePersonId(this.props.otherRequest);
    //   }
    // }

    const posts = mypost;
    // if (this.state.currentlySelected != this.props.currentlySelected) {
    //   console.log("iff will the state");
    //   this.setState({
    //     currentlySelected: this.props.currentlySelected,
    //     posts: [],
    //   });
    //   console.log("iff changed the state");
    // }

    var toDisplay = this.state.currentlySelected
      ? this.state.currentlySelected
      : "Person";
    return (
      <div className="MyTable">
        {this.state.person_id && (
          <div>
            <h3>
              Transaction Record Of {toDisplay} Having Id {this.state.person_id}{" "}
              {this.state.currentlySelected == "Person" && (
                <Fragment>
                  <Button
                    onClick={() => {
                      this.makePayment(this.state.otherRequest);
                    }}
                  >
                    Make Payment
                  </Button>
                  <Button
                    onClick={() => {
                      this.addToFavorite(this.state.person_id);
                    }}
                    style={{ float: "right" }}
                  >
                    {" "}
                    Add to Favorites <FavoriteIcon />{" "}
                  </Button>
                </Fragment>
              )}{" "}
              {this.state.currentlySelected == "Item" && (
                <Button
                  onClick={() => {
                    this.addStock(this.state.otherRequest);
                  }}
                  style={{ float: "right" }}
                >
                  {" "}
                  Update Stock <UpdateIcon />{" "}
                </Button>
              )}{" "}
            </h3>
          </div>
        )}

        {posts.length ? (
          <Searchbar data={posts} changePersonId={this.changePersonId} addMultistep={this.addMultistep} />
        ) : null}
      </div>
    );
  }
}

export default PostList;
