import React, {Component} from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/post';



class PostContainer extends Component {

  constructor(props) {
      super();
      // initializes component state
      this.state = {
          postId: 1,
          fetching: false, // tells whether the request is waiting for response or not
          post: {
              title: null,
              body: null
          },
          comments: [],
          warningVisibility: false
      };
  }

  componentDidMount() {
      this.fetchPostInfo(1);
  }

  showWarning = () => {
      this.setState({
          warningVisibility: true
      });

      // after 1.5 sec

      setTimeout(
          () => {
              this.setState({
                  warningVisibility: false
              });
          }, 1500
      );
  }

    componentDidMount() {
      this.fetchPostInfo(1);
    }

    fetchPostInfo = async (postId) => {

      this.setState ({
        fetching: true
      });
      try {
        const info = await Promise.all([
          service.getPost(postId),
          service.getComments(postId)
        ]);

          const {title, body} = info[0].data;
          const comments = info[1].data;

          this.setState({
            postId,
            post: {
              title,
              body
            },
            comments,
            fetching: false
          });

    } catch(e) {
      this.setState({
        fetching:false
      });
      this.showWarning();
    }
  }

    handleNavigateClick = (type) => {
      const postId = this.state.postId;

      if(type === 'NEXT') {
        this.fetchPostInfo(postId+1);
      }
      else{
        this.fetchPostInfo(postId-1);
      }
    }

    render() {
        const {postId,fetching, post,comments, visible, warningVisibility} = this.state;
        return (
            <PostWrapper>
                <Navigate
                  postId={postId}
                  disabled={fetching}
                  onClick={this.handleNavigateClick}
                />
                <Post
                  postId={postId}
                  title={post.title}
                  body={post.body}
                  comments={comments}
                />
              <Warning visible={warningVisibility} message="That post does not exist"/>
            </PostWrapper>
        );
    }
}

export default PostContainer;
