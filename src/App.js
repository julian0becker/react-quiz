import React, { Component } from "react";
import Modal from "react-modal";
import "./App.css";

class AddQuestion {
  constructor(question, choices, correct) {
    this.id = 3;
    this.question = question;
    this.choices = choices;
    this.correct = correct;
  }
}
class App extends Component {
  state = {
    quiz: [
      {
        id: 0,
        question: "Who came up with the theory of relativity?",
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
        question: "Who is on the two dollar bill?",
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
        question: "What event began on April 12, 1861?",
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
    clicked: false,
    isModalOn: false
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

  handleDeleteQuestion = questionId => {
    const quiz = [...this.state.quiz];
    const filtered = quiz.filter(question => question.id !== questionId);
    this.setState({ quiz: filtered });
  };

  handleAddQuestionOpenModal = () => {
    this.setState({ isModalOn: true });
  };

  handleAddQuestion = event => {
    event.preventDefault();
    const quiz = [...this.state.quiz];

    let correct = event.target.correct.value;

    switch (true) {
      case correct === "a":
        correct = event.target.answerA.value;
        break;
      case correct === "b":
        correct = event.target.answerB.value;
        break;
      case correct === "c":
        correct = event.target.answerC.value;
        break;
      case correct === "d":
        correct = event.target.answerD.value;
        break;
      default:
        break;
    }

    const addedQuestion = new AddQuestion(
      event.target.question.value,
      [
        event.target.answerA.value,
        event.target.answerB.value,
        event.target.answerC.value,
        event.target.answerD.value
      ],
      correct
    );
    quiz.push(addedQuestion);

    this.setState({ quiz: quiz });
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ isModalOn: false });
  };

  handleNextQuestion = () => {
    console.log("next");
    this.setState({ pageCounter: this.state.pageCounter + 1 });
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
            handleDeleteQuestion={this.handleDeleteQuestion}
            handleAddQuestionOpenModal={this.handleAddQuestionOpenModal}
            handleNextQuestion={this.handleNextQuestion}
          />
        ) : (
          <Result
            correctAnswers={this.state.correctAnswers}
            quiz={this.state.quiz}
          />
        )}

        <EditModal
          isModalOn={this.state.isModalOn}
          handleCloseModal={this.handleCloseModal}
          handleAddQuestion={this.handleAddQuestion}
        />
      </div>
    );
  }
}

export default App;

const Display = props => (
  <div className=" media-q">
    <Question
      quiz={props.quiz}
      handleEvaluate={props.handleEvaluate}
      pageCounter={props.pageCounter}
      clicked={props.clicked}
    />
    <Next
      quiz={props.quiz}
      pageCounter={props.pageCounter}
      handleDeleteQuestion={props.handleDeleteQuestion}
      handleAddQuestionOpenModal={props.handleAddQuestionOpenModal}
      handleNextQuestion={props.handleNextQuestion}
    />
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
  <div className="d-flex card-footer text-muted">
    <div className=" d-flex justify-content-start flex-item">
      <button
        id="delete-button"
        onClick={() =>
          props.handleDeleteQuestion(props.quiz[props.pageCounter].id)
        }
        className="btn btn-primary"
      >
        Delete Question
      </button>
    </div>
    <div className="flex-item">
      <i className="fas fa-caret-left fa-2x" />
      {props.pageCounter + 1}
      {" / "}
      {props.quiz.length}
      <i
        onClick={props.handleNextQuestion}
        className="fas fa-caret-right fa-2x"
      />
    </div>
    <div className="d-flex flex-item justify-content-end">
      <button
        onClick={props.handleAddQuestionOpenModal}
        className="btn btn-primary"
      >
        Add Question
      </button>
    </div>
  </div>
);

const Result = props => (
  <div className="card text-white bg-primary mb-3  media-q">
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

const EditModal = props => (
  <Modal
    isOpen={!!props.isModalOn}
    contentLabel={"test this modal"}
    onRequestClose={props.handleCloseModal}
    className="modalStyle"
    ariaHideApp={false}
  >
    <div id="modalForm">
      <form
        className="d-flex flex-column form-group"
        onSubmit={event => props.handleAddQuestion(event)}
      >
        <input
          className="form-group form-control"
          type="text"
          name="question"
          placeholder="Enter a new question"
          required
        />
        <div className="d-flex flex-column align-items-center">
          <span className="d-flex align-items-center form-group">
            <input
              className="form-check-input"
              type="radio"
              name="correct"
              value="a"
            />
            <input
              className="form-control-sm"
              type="text"
              name="answerA"
              placeholder="Option A"
              required
            />
          </span>
          <span className="d-flex align-items-center form-group  ">
            <input
              className="form-check-input"
              type="radio"
              name="correct"
              value="b"
            />
            <input
              className="form-control-sm "
              type="text"
              name="answerB"
              placeholder="Option B"
              required
            />
          </span>
          <span className="d-flex align-items-center form-group">
            <input
              className="form-check-input"
              type="radio"
              name="correct"
              value="c"
            />
            <input
              className="form-control-sm "
              type="text"
              name="answerC"
              placeholder="Option C"
              required
            />
          </span>
          <span className="d-flex align-items-center form-group">
            <input
              className="form-check-input"
              type="radio"
              name="correct"
              value="d"
            />
            <input
              className="form-control-sm "
              type="text"
              name="answerD"
              placeholder="Option D"
              required
            />
          </span>
        </div>
        <button className="btn bt-sm btn-primary" type="submit">
          Add Question
        </button>
      </form>
    </div>
  </Modal>
);
