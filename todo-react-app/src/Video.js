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

import { call } from "./service/ApiService";

class Video extends React.Component {


  render() {
    //const item = this.state.item;

    return (
    <div> item id : {this.state} </div>,
    <ReactPlayer
       className="react-player"
       url="www.google.com"
       width="70%"
       height="70%"
       muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
       playing={true}
       controls={true}
       loop={true} />

    );
  }
}

export default Video;
