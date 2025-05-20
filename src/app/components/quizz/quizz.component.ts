import { Component, OnInit } from '@angular/core';

import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = "";

  questions: any;
  selectedQuestion: any;

  answers: string[] = [];
  selectedAnswer: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  result: string = "";

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length - 1;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  playersChoice(value: string) {
    this.answers.push(value);
    this.nextStep();
    console.log(this.answers);
    console.log("teste");
  }

  async nextStep() {
    this.questionIndex++;
    if(this.questionIndex < this.questionMaxIndex) {
      this.selectedQuestion = this.questions[this.questionIndex];
      console.log(this.selectedQuestion);

    } else {
      const finalAnswer: string = await this.checkResults(this.answers);
      this.finished = true;
      this.selectedAnswer = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];

    }
  }

  async checkResults(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if(
          arr.filter((item) => item === prev).length >
          arr.filter((item) => item === curr).length
      ) {
        return prev;

      }else {
        return curr;
      }
    })
    return result;
  }

}
