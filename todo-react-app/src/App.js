import React from "react";
import Video from "./Video";

import "./App.css";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { call, signout } from "./service/ApiService"; // signout 추가



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     items: [
     {id:"0", title:"video1", url:"http://d30em6q031z2u.cloudfront.net/temp/Sunset.mp4"},
     {id:"1", title:"video2",url:"http://d30em6q031z2u.cloudfront.net/temp/studyvideo.mp4"},
     {id:"2", title:"video3",url:"http://d30em6q031z2u.cloudfront.net/vod/hls/studyvideo.m3u8"},
     {id:"3", title:"video4", url:"http://d30em6q031z2u.cloudfront.net/vod/hls/Surfing.m3u8"},

     ],
      /* 1. 로딩중이라는 상태이다. 생성자에 상태 변수를 추가한다. */
      loading: false,
    };
  }



  componentDidMount() {

     call("/video", "GET", null).then((response) =>
          this.setState({ items: response.data, loading: false })
        );
  }


  add = (item) => {
    call("/video", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };



    delete = (item) => {
    call("/video", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  /*
  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };
*/
  render() {
    var videoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Video
              item={item}
              key={item.id}
              delete={this.delete}
              //update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6"> Videos </Typography>


            </Grid>


            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    /* 로딩중이 아닐 때 렌더링 할 부분 */
    var videoListPage = (
      <div>
        {navigationBar} {/* 네비게이션 바 렌더링 */}
        <Container maxWidth="md">

          <div className="VideoList">{videoItems}</div>
        </Container>
      </div>
    );

    /* 로딩중일 때 렌더링 할 부분 */
    var loadingPage = <h1> 로딩중.. </h1>;

    var content = loadingPage;

    if (!this.state.loading) {
      /* 로딩중이 아니면 todoListPage를 선택*/
      content = videoListPage;
    }

    /* 선택한 content 렌더링 */
    return <div className="App">{content}</div>;
  }
}

export default App;
