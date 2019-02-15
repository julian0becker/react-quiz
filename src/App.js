import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    quiz: [
      {
        id: 0,
        question: "Q1: Who came up with the theory of relativity?",
        image:
          "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
        choices: [
          "Sir Isaac Newton",
          "Nicolaus Copernicus",
          "Albert Einstein",
          "Ralph Waldo Emmerson"
        ],
        correct: "Albert Einstein",
        explanation:
          "Albert Einstein drafted the special theory of relativity in 1905."
      },
      {
        id: 1,
        question: "Q2: Who is on the two dollar bill?",
        image:
          "http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/US_%242_obverse-high.jpg/320px-US_%242_obverse-high.jpg",
        choices: [
          "Thomas Jefferson",
          "Dwight D. Eisenhower",
          "Benjamin Franklin",
          "Abraham Lincoln"
        ],
        correct: "Thomas Jefferson",
        explanation:
          "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note."
      },
      {
        id: 2,
        question: "Q3: What event began on April 12, 1861?",
        image: "",
        choices: [
          "First manned flight",
          "California became a state",
          "American Civil War began",
          "Declaration of Independence"
        ],
        correct: "American Civil War began",
        explanation:
          "South Carolina came under attack when Confederate soldiers attacked Fort Sumter. The war lasted until April 9th 1865."
      }
    ],
    pageCounter: 0,
    correctAnswers: 0,
    clicked: false
  };

  handleEvaluate = (clickedChoice, rightAnswer) => {
    this.setState({ clicked: true });

    if (clickedChoice === rightAnswer) {
      setTimeout(() => {
        this.setState({
          pageCounter: this.state.pageCounter + 1,
          clicked: false,
          correctAnswers: this.state.correctAnswers + 1
        });
      }, 1000);
    } else {
      setTimeout(() => {
        this.setState({
          pageCounter: this.state.pageCounter + 1,
          clicked: false
        });
      }, 1000);
    }
  };

  render() {
    return (
      <div className="App d-flex justify-content-center">
        {this.state.pageCounter < this.state.quiz.length ? (
          <Display
            quiz={this.state.quiz}
            handleEvaluate={this.handleEvaluate}
            pageCounter={this.state.pageCounter}
            clicked={this.state.clicked}
          />
        ) : (
          <Result
            correctAnswers={this.state.correctAnswers}
            quiz={this.state.quiz}
          />
        )}
      </div>
    );
  }
}

export default App;

const Display = props => (
  <div className="w-50">
    <Question
      quiz={props.quiz}
      handleEvaluate={props.handleEvaluate}
      pageCounter={props.pageCounter}
      clicked={props.clicked}
    />
    <Next quiz={props.quiz} pageCounter={props.pageCounter} />
  </div>
);

const Question = props => {
  return (
    <div className="card mb-3">
      <h3 className="card-header">Quiz</h3>
      <img
        style={{ height: "200px", width: "100%", display: "block" }}
        src="/"
      />
      <div className="card-body">
        <h3 className="card-text">{props.quiz[props.pageCounter].question}</h3>
      </div>
      <ul className="list-group list-group-flush">
        {props.quiz[props.pageCounter].choices
          .sort(function() {
            if (!props.clicked) {
              return 0.5 - Math.random();
            } else {
              return null;
            }
          })
          .map(choice => (
            <Choice
              choice={choice}
              correct={props.quiz[props.pageCounter].correct}
              handleEvaluate={props.handleEvaluate}
              clicked={props.clicked}
            />
          ))}
      </ul>
    </div>
  );
};

const Next = props => (
  <div className="card-footer text-muted">
    {props.pageCounter + 1}
    {" / "}
    {props.quiz.length}
  </div>
);

const Result = props => (
  <div className="card text-white bg-primary mb-3 w-50">
    <div className="card-header">Quiz</div>
    <div className="card-body">
      <h4 className="card-title">Congratulations!</h4>
      <p className="card-text">
        {`You got ${props.correctAnswers} out of ${
          props.quiz.length
        } questions right!`}
      </p>
    </div>
  </div>
);

class Choice extends Component {
  state = {
    style: null
  };

  handleEvaluate = (choice, correct) => {
    this.props.handleEvaluate(choice, correct);
    if (choice === correct) {
      this.setState({ style: { backgroundColor: "green" } });
      setTimeout(() => {
        this.setState({
          style: { backgroundColor: null }
        });
      }, 1000);
    } else {
      this.setState({ style: { backgroundColor: "red" } });
      setTimeout(() => {
        this.setState({
          style: { backgroundColor: null }
        });
      }, 1000);
    }
  };

  render() {
    return (
      <li
        className="list-group-item"
        style={this.state.style}
        onClick={
          this.props.clicked
            ? null
            : () => this.handleEvaluate(this.props.choice, this.props.correct)
        }
      >
        {this.props.choice}
      </li>
    );
  }
}
