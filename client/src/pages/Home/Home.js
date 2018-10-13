import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import {PATH_BASE, 
        API_KEY, 
        PARAM_SEARCH, 
        PARAM_PAGE, 
        PARAM_BeginDate,
        PARAM_EndDate} from '../../constants/index';

class Home extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  loadArticles = (res) => {
    const searchedArticles = [];
    const nytSources = res.data.response.docs;

    console.log(nytSources);

    for(let i=0; i<nytSources.length; i++) {
      let article = {
        title: '',
        url: '',
        date:'',
        id:''
      };
      article.title = nytSources[i].headline.main;
      article.url = nytSources[i].web_url;
      article.date = nytSources[i].pub_date;
      article.id = nytSources[i]._id;
      console.log(article);
      searchedArticles.push(article);
    }
    this.setState({
      articles: searchedArticles
    });
  };

  saveArticle = article => {
    API.saveArticle(article)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }
  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      const {topic, startYear, endYear} = this.state;
      const url =  `${PATH_BASE}?${API_KEY}&${PARAM_SEARCH}${topic}&${PARAM_PAGE}&${PARAM_BeginDate}${startYear}&${PARAM_EndDate}${endYear}`;
      
      API.searchArticles(url)
        .then(res => this.loadArticles(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What articles Should I Search?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (required)"
              />
               <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (required)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article.id}>
                    <a href={article.url} target='_blank'>
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <SaveBtn onClick={() => this.saveArticle(article)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
