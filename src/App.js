import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
  super(props);

  this.onAddPost = this.onAddPost.bind(this);
  this.updateVotes = this.updateVotes.bind(this);
  this.onFilter = this.onFilter.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.onAddComment = this.onAddComment.bind(this);

  this.state = {
    filter: '',
    sortOption: 'votes',
    posts: [{
      title: 'Where to buy burritos?',
      author: 'Morrison',
      image: 'https://images.pexels.com/photos/69212/pexels-photo-69212.jpeg',
      description: 'Just wondering and pondering.',
      date: Date.now() - 987654321,
      votes: 5,
      comments: ['King Soopers', 'Natural Grocers', 'Burrito Guy']
    }, {
      title: 'What to do?',
      author: 'Bob',
      image: 'https://images.pexels.com/photos/211050/pexels-photo-211050.jpeg?h=350&auto=compress&cs=tinysrgb',
      description: 'I have accumulated exactly 99 problematic complications but a female canine is not one of which I speak.',
      date: Date.now() - 123456789*2,
      votes: 10,
      comments: ['I feel bad you, son.']
    }, {
      title: 'Cool Picture',
      author: 'Jenny',
      image: 'https://images.pexels.com/photos/492134/pexels-photo-492134.jpeg?h=350&auto=compress&cs=tinysrgb',
      description: 'A picture of me taking a picture of someone taking a picture of me.',
      date: Date.now(),
      votes: 0,
      comments: ['I agree.', 'Hella meta']
    }]
  }
}

onAddPost(post) {
  this.setState({
    posts: this.state.posts.concat(post)
  });
}

updateVotes(post, option){
  const index = this.state.posts.findIndex(x => x.title===post.title && x.author===post.author && x.description===post.description && x.votes===post.votes && x.image===post.image);
  this.setState((prevState, props) => {
    if(option === 'add'){
      prevState.posts[index].votes++;
    } else if(option === 'subtract'){
      prevState.posts[index].votes--;
    }
  })
}

onAddComment(post, comment){
  const index = this.state.posts.findIndex(x => x.title===post.title && x.author===post.author && x.description===post.description && x.votes===post.votes && x.image===post.image);
  this.setState((prevState, props) => {
    prevState.posts[index].comments.push(comment);
  })
}

handleChange(target) {
  this.setState(prevState => ({
    sortOption: target.value
  }));
}

onFilter(target){
  this.setState(prevState => ({
    filter: target.value
  }));
}

  render() {
    return (
      <div>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">Reddit Clone</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          </div>
        </div>
      </nav>
    <main className="container">
      <FormButton onAddPost={this.onAddPost} sortOption={this.state.sortOption} handleChange={this.handleChange} onFilter={this.onFilter}>
    </FormButton>
      <Post filter={this.state.filter} sortOption={this.state.sortOption} posts={this.state.posts} updateVotes={this.updateVotes} onAddComment={this.onAddComment} />
    </main>
  </div>
    );
  }
}

class FormButton extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isToggleOn: false,
    sortOption: this.props.sortOption
  };

  // This binding is necessary to make `this` work in the callback
  this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleFilter = this.handleFilter.bind(this);
}

handleClick() {
  this.setState(prevState => ({
    isToggleOn: !prevState.isToggleOn,
  }));
}

handleChange(event) {
  const target = event.target;
  this.props.handleChange(target);
  this.setState(prevSate => ({
    sortOption: target.value
  }));
}

handleFilter(event){
  const target = event.target;
  this.props.onFilter(target);
}

  render() {
    return(
      <div>

        <div className="pull-right">
          <p><a className="btn btn-info" onClick={this.handleClick}>New Post</a></p>
        </div>

        <ul className="nav nav-pills">
          <li role="presentation" className="active">
            <input onChange={this.handleFilter} type="search" className="form-control input-sm search-form" placeholder="Filter" />
          </li>
          <div className="form-inline">
            <label htmlFor="sort">  Sort by </label>
            <select className="form-control" id="sort" value={this.state.sortOption} onChange={this.handleChange}>
              <option value='votes'>Votes</option>
              <option value='date'>Date</option>
              <option value='title'>Title</option>
            </select>
          </div>
        </ul>

        {toggleForm(this.state, this.props.onAddPost)}

      </div>
    );
    }
  }

  class Form extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.addPost = this.addPost.bind(this);
      this.handleKeyPressOnTitle = this.handleKeyPressOnTitle.bind(this);
      this.handleKeyPressOnBody = this.handleKeyPressOnBody.bind(this);
      this.handleKeyPressOnAuthor = this.handleKeyPressOnAuthor.bind(this);
      this.handleKeyPressOnImage = this.handleKeyPressOnImage.bind(this);

      this.state = {
        post: {
          title: '',
          author: '',
          image: '',
          description: '',
          date: Date.now(),
          votes: 0,
          comments: []
        },
        showTitleError: false,
        showBodyError: false,
        showAuthorError: false,
        showImageError: false
      }
    }

    handleChange(e) {
      const target = e.target;
      this.setState((prevState,props) => {
        prevState.post[target.id] = target.value
      });
    }

    addPost(e) {
      e.preventDefault();
      this.props.onAddPost(this.state.post);
      this.setState({
        post: {
          title: '',
          author: '',
          image: '',
          description: '',
          date: Date.now(),
          votes: 0,
          comments: []
        },
        showTitleError: false,
        showBodyError: false,
        showAuthorError: false,
        showImageError: false
      });
    }

    handleKeyPressOnTitle(e){
      if(e.key === 'Tab' && e.target.value === ''){
        this.setState({
          showTitleError: true
        })
      } else if (e.key === 'Tab'){
        this.setState({
          showTitleError: false
        })
      }
    }

    handleKeyPressOnBody(e){
      if(e.key === 'Tab' && e.target.value === ''){
        this.setState({
          showBodyError: true
        })
      } else if (e.key === 'Tab'){
        this.setState({
          showBodyError: false
        })
      }
    }

    handleKeyPressOnAuthor(e){
      if(e.key === 'Tab' && e.target.value === ''){
        this.setState({
          showAuthorError: true
        })
      } else if (e.key === 'Tab'){
        this.setState({
          showAuthorError: false
        })
      }
    }

    handleKeyPressOnImage(e){
      if(e.key === 'Tab' && e.target.value === ''){
        this.setState({
          showImageError: true
        })
      } else if (e.key === 'Tab'){
        this.setState({
          showImageError: false
        })
      }
    }

    render() {
      const {title, author, image, description} = this.state.post;
      return (
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={this.addPost}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                {
                  this.state.showTitleError
                  ? <input id="title" className="form-control invalid" onChange={this.handleChange} value={title} placeholder="" onKeyDown={this.handleKeyPressOnTitle} required/>
                  : <input id="title" className="form-control" onChange={this.handleChange} value={title} placeholder="" onKeyDown={this.handleKeyPressOnTitle} required/>
                }
              </div>
              <div className="form-group">
                <label htmlFor="description">Body</label>
                {
                  this.state.showBodyError
                  ? <textarea id="description" className="form-control invalid" onChange={this.handleChange} value={description} placeholder="" onKeyDown={this.handleKeyPressOnBody} required ></textarea>
                  : <textarea id="description" className="form-control" onChange={this.handleChange} value={description} placeholder="" onKeyDown={this.handleKeyPressOnBody} required ></textarea>
                }
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                {
                  this.state.showAuthorError
                  ? <input id="author" className="form-control invalid" onChange={this.handleChange} value={author} placeholder="" onKeyDown={this.handleKeyPressOnAuthor} required />
                  : <input id="author" className="form-control" onChange={this.handleChange} value={author} placeholder="" onKeyDown={this.handleKeyPressOnAuthor} required />
                }

              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                {
                  this.state.showImageError
                  ? <input id="image" className="form-control invalid" onChange={this.handleChange} value={image} placeholder="" onKeyDown={this.handleKeyPressOnImage} required />
                  : <input id="image" className="form-control" onChange={this.handleChange} value={image} placeholder="" onKeyDown={this.handleKeyPressOnImage} required />
                }
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Create Post
                </button>
              </div>
            </form>

          </div>
        </div>
      );
    }
  }

function sortPosts(posts, option){
  if(option==='votes'){
    return posts.sort((a,b) => {
      return b.votes - a.votes
    });
  } else if(option==='date'){
    return posts.sort((a,b) => {
      return b.date - a.date
    });
  } else if(option==='title'){
    return posts.sort((a,b) => {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if ( x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
}

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      comment: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.addComment = this.addComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clickHandler(e){
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  handleChange(e){
    const target = e.target;
    this.setState((prevState,props) => {
      prevState.comment = target.value
    });
  }

  addComment(e){
    e.preventDefault();
    this.props.onAddComment(this.props.post, this.state.comment);
    this.setState({
      isToggleOn: true,
      comment: ''
    })
  }

  render(){
    let commentsWord = this.props.post.comments.length===1 ? 'comment':'comments';

    return (
    <div>
      <div>
        {timeSince(this.props.post.date)}
        {" | "}
        <i className="glyphicon glyphicon-comment"></i>
        <a onMouseDown={this.clickHandler}>
          {` ${this.props.post.comments.length} ${commentsWord}`}
        </a>
      </div>
      <div className="row">
        <div className="col-md-offset-1">
          <hr />
          {toggleComments(this.props.post.comments, this.state.isToggleOn)}
          {
            this.state.isToggleOn
            ?        <form onSubmit={this.addComment} className="form-inline">
                      <div className="form-group">
                        <input className="form-control" value={this.state.comment} onChange={this.handleChange} placeholder="" required />
                      </div>
                      <div className="form-group">
                        <input type="submit" className="btn btn-primary" />
                      </div>
                    </form>
                    : null
          }
        </div>
      </div>
    </div>
    )
  }
}

class Post extends Component {

  render(){
    let filteredPosts = this.props.posts.filter(
      (post) => {
        return post.title.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1;
      }
    );
      return(
        <div>
        {sortPosts(filteredPosts, this.props.sortOption).map((post,i) => {
        return (<div key={i} className="row">
          <div className="col-md-12">


              <div className="well">
              <div className="media-left">
                <img className="media-object" alt="" src={post.image} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">
                  {post.title+" "}
                  <Votes post={post} updateVotes={this.props.updateVotes} />
                </h4>
                <div className="text-right">
                  {post.author}
                </div>
                <p>
                  {post.description}
                </p>
                <Comment post={post} onAddComment={this.props.onAddComment} />
              </div>
            </div>


          </div>
        </div>
        )})}
      </div>
      );
    }
  }

  function timeSince(date){
    const time = Date.now()-date;
    if(time < 60000){
      return 'a few seconds ago'
    } else if(time < 60000*60){
      const minutes = Math.floor(time/60000);
      const word = minutes===1 ? 'minute':'minutes';
      return `${minutes} ${word} ago`
    } else if(time < 60000*60*24){
      const hours = Math.floor(time/(60000*60));
      const word = hours===1 ? 'hour':'hours';
      return `${hours} ${word} ago`
    } else if(time < 60000*60*24*7){
      const days = Math.floor(time/(60000*60*24));
      const word = days===1 ? 'day':'days';
      return `${days} ${word} ago`
    } else if(time < 60000*60*24*7*30){
      const weeks = Math.floor(time/(60000*60*24*7));
      const word = weeks===1 ? 'week':'weeks';
      return `${weeks} ${word} ago`
    } else if(time < 60000*60*24*7*30*12){
      const months = Math.floor(time/(60000*60*24*7*30));
      const word = months===1 ? 'month':'months';
      return `${months} ${word} ago`
    } else {
      const years = Math.floor(time/(60000*60*24*7*30*12));
      const word = years===1 ? 'year':'years';
      return `${years} ${word} ago`
    }
  }

    class Votes extends Component{
      constructor(props) {
        super(props);
        this.state = {props};

        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
      }

      upVote(e){
        e.preventDefault();
        this.props.updateVotes(this.props.post, 'add');
      }

      downVote(e){
        e.preventDefault();
        if(this.props.post.votes > 0){
          this.props.updateVotes(this.props.post, 'subtract');
        }
      }
      render(){
      return (
        <span>
          |
          <a onMouseDown={this.upVote}><i className="glyphicon glyphicon-arrow-up"></i></a>
          <a onMouseDown={this.downVote}><i className="glyphicon glyphicon-arrow-down"></i></a>
          {this.props.post.votes}
        </span>
      )
    }
  }

function toggleForm(state, onAddPost) {
  if (state.isToggleOn) {
    return <Form onAddPost={onAddPost}/>;
  }
  return;
}

function toggleComments(comments, isToggleOn) {
  if (isToggleOn) {
    return (
      comments.map((comment,i) => {
        return  (
          <p key={i}>
            {comment}
          </p>
        )
      })
    )
  }
  return;
}

export default App;
