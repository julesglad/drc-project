import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quizForm: FormGroup = new FormGroup({});

  constructor(private quizService: QuizService, private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getQuiz();
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  createAnswer(answer: any): FormGroup {
    return this.fb.group({
      answerText: [answer.answerText || ''],
      selected: [answer.selected || false],
    });
  }

  getAnswers(question: AbstractControl): FormArray {
    return question.get('answers') as FormArray;
  }

  // Handle radio button selection logic
  onAnswerSelect(questionIndex: number, answerIndex: number) {
    const questionFormGroup = this.questions.at(questionIndex);
    const answersArray = questionFormGroup.get('answers') as FormArray;

    // Reset all answers to false first
    answersArray.controls.forEach((answerControl) => {
      answerControl.get('selected')?.setValue(false);
    });

    // Set selected to true for the clicked answer
    const selectedAnswer = answersArray.at(answerIndex);
    selectedAnswer.get('selected')?.setValue(true);
  }

  createQuestion(question: any): FormGroup {
    const answers = this.fb.array(
      question.answers.map((answer: any) => this.createAnswer(answer))
    );
    return this.fb.group({
      questionText: [question.questionText || ''],
      answers: answers,
    });
  }

  loadQuiz(quiz: any) {
    const questionsArray = quiz.map((question: any) =>
      this.createQuestion(question)
    );
    this.questions.clear();
    questionsArray.forEach((questionGroup: any) =>
      this.questions.push(questionGroup)
    );
  }

  getQuiz() {
    this.quizService.getQuiz().subscribe((res: any) => {
      console.log(res);
      this.loadQuiz(res[0].questions);
    });
  }

  onSubmit() {
    console.log(this.quizForm.value);
    this.quizService.submitQuiz(this.quizForm.value).subscribe((res: any) => {
      this.quizService.openSnackBar('Quiz Submitted');
      this.getQuiz();
    });
  }
}
