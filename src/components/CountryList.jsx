import React, { Component } from "react";
import { newQuiz } from "country-quiz";
import background from "./images/background.png";
import TitleImg from "./images/undraw_adventure_4hum 1.svg";
import ResultImg from "./images/result.svg";

class CountryList extends Component {
  state = {
    showScore: false,
    quiz: [],
    a: [1, 2, 3, 4, 5],
    currentQuestion: 0,
    score: 0,
    answer: null,
    getById: null,
    initialTime: 60,
    startTime: true,
    minutes: "00",
    seconds: 30,
    answered: false,
  };

  componentDidMount() {
    const { questions } = newQuiz("capital-to-country");
    this.setState({ quiz: questions });

    this.interval = setInterval(
      () =>
        this.state.seconds !== 0
          ? this.setState({ seconds: this.state.seconds - 1 })
          : this.handleAnswerButtonClick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleAnswerButtonClick() {
    const { currentQuestion } = this.state;
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < this.state.quiz.length) {
      this.setState({
        currentQuestion: nextQuestion,
        answered: false,
        seconds: 30,
        getById: null,
      });
    } else {
      this.setState({ showScore: true });
    }
  }

  handleCheckAnswer(answerOption, index) {
    const { score, quiz, currentQuestion } = this.state;
    const add = 1 + score;
    this.setState({ answered: true });
    return answerOption === quiz[currentQuestion].answer
      ? this.setState({ score: add, answer: true, getById: index })
      : this.setState({ score, answer: false, getById: index });
  }

  handleReset() {
    const { questions } = newQuiz("capital-to-country");
    this.setState({ quiz: questions });
    this.setState({ score: 0 });
    this.setState({ initialTime: 0 });
    window.location = "/";
  }

  render() {
    const {
      quiz,
      currentQuestion,
      showScore,
      score,
      seconds,
      minutes,
      answered,
    } = this.state;
    // console.log(quiz);
    // console.log(score);

    return quiz.length === 0 ? null : showScore ? (
      <div className="cont">
        <div>
          <img className="css-img" src={background} alt="img" />
        </div>

        <div className="centered">
          <h4 className="text-start mx-3">COUNTRY QUIZ</h4>
          <div className="card m-2">
            <div>
              <img className="p-4 text-center " src={ResultImg} alt="" />
              <h1 className="p-2">
                <b>Results</b>
              </h1>
              <p className="m-1">
                You got <span className="h1 b result">{score}</span> correct
                answers
              </p>
              <p className="m-5">
                <span
                  onClick={() => this.handleReset()}
                  className="answers px-4 py-2 center"
                >
                  Try again
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="cont">
        <div>
          <img className="css-img" src={background} alt="img" />
        </div>
        <div className="centered">
          <h4 className="text-start mx-3">COUNTRY QUIZ</h4>
          <div className="card m-2">
            <div className="p-3">
              <div className="col">
                <h6 className="p-2 my-1 text-start">
                  <b>{quiz[currentQuestion].question}</b> capital of ...
                </h6>
              </div>
              <div className="col imgTitle">
                <img className="titleImg" src={TitleImg} alt="TitleImg" />
              </div>
              {quiz[currentQuestion].options.map((ans, index) => (
                <div>
                  <button
                    onClick={() => this.handleCheckAnswer(ans, index)}
                    key={ans[index]}
                    className={`${
                      this.state.getById === index && this.state.answer
                        ? "true p-1"
                        : this.state.getById === index &&
                          this.state.answer === false
                        ? "false p-1"
                        : null
                    } answers p-1  but`}
                    disabled={answered}
                  >
                    {ans}
                  </button>
                </div>
              ))}
              {!answered ? null : (
                <div className="text-end">
                  <button
                    className="mx-3 answers px-2 py-1 "
                    onClick={() => this.handleAnswerButtonClick()}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="top-right">
          <p className="m-1">
            <span className="score p-2 m-3 h4 b result">Score: {score}</span>
          </p>
        </div>
        <div className="top-left">
          <p>
            {minutes}:{seconds}
          </p>
        </div>
      </div>
    );
  }
}

export default CountryList;
