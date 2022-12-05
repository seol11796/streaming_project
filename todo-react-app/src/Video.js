import React from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import {Link} from "react-router-dom"

import ReactPlayer from 'react-player'
import { useState, useEffect, useRef } from "react";


import DeleteOutlined from "@material-ui/icons/DeleteOutlined";



class Video extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };
    this.delete = props.delete;
   // this.update = props.update;
  }

gotoVideo = () => {
console.log("console", this.state.item.url);
window.open(this.state.item.title);
}
  deleteEventHandler = () => {
    this.delete(this.state.item);
  };

  offReadOnlyMode = () => {
    console.log("Event!", this.state.readOnly);
    this.setState({ readOnly: false }, () => {
      console.log("ReadOnly? ", this.state.readOnly);
    });

  };

*/
  render() {
    //const item = this.state.item;

    return (
    <ReactPlayer
       className="react-player"
       url="www.google.com"
       width="100%"
       height="100%"
       muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
       playing={true}
       controls={true}
       loop={true} />
  /*
    <ListItem>

  <ReactPlayer
    className="react-player"
    url={item.url}
    width="100%"
    height="100%"
    muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
    playing={true}
    controls={true}
    loop={true} />



<ListItemText>

        <div>
       <div> item id : {item.id} </div>

        <Link to={`/detail/${item.id}`}>

        <Button> 여기는 상세 페이지 입니다. </Button>
        </Link>

         <Button variant="warning">
         <a href={item.url}> click▶︎</a>
         </Button>

        </div>
        </ListItemText>


 </ListItem>
   */
    );
  }
}

export default Video;
