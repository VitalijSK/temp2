import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.scss']
})
export class FormCommentComponent implements OnInit {

  @Output() submitComment = new EventEmitter<string>();
  commentForm !: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }
  checkInvalid(input: string) {
    return this.commentForm.controls[input].invalid &&
      (this.commentForm.controls[input].dirty ||
        this.commentForm.controls[input].touched)
  }

  checkValid(input: string) {
    return !this.checkInvalid(input) &&
      this.commentForm.controls[input].value !== '' &&
      this.commentForm.controls[input].value !== null;
  }
  onSubmit($event) {
    this.submitComment.emit(this.commentForm.get('text').value);
    this.commentForm.reset();
  }
}
