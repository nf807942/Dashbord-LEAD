import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormQuestion, TextboxQuestion, HiddenQuestion, DropdownQuestion } from 'src/app/shared/components/dynamic-form-question/dynamic-form-question.component';
import { CustomColumn } from 'src/app/shared/components/table/custom-column';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateEditDeleteDialogService } from 'src/app/shared/services/create-edit-delete-dialog.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Student } from '../../models/student';
import { NotationService } from '../../services/notation.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  questions: DynamicFormQuestion[] = [
    new TextboxQuestion({
      key: 'firstName',
      label: 'TABLE.STUDENT-FIRST-NAME',
      required: true
    }),
    new TextboxQuestion({
      key: 'lastName',
      label: 'TABLE.STUDENT-LAST-NAME',
      required: true
    }),
    new DropdownQuestion({
      key: 'studyYear',
      label: 'TABLE.STUDENT-YEAR',
      required: true,
      options: [
        {key: 'L1', value: 'L1'},
        {key: 'L2', value: 'L2'},
        {key: 'L3', value: 'L3'},
        {key: 'M1', value: 'M1'},
        {key: 'M2', value: 'M2'},
      ]
    }),
    new TextboxQuestion({
      key: 'studentNumber',
      label: 'TABLE.STUDENT-NUMBER',
      required: true
    }),
    new HiddenQuestion({
      key: 'id',
    }),
  ];

  createAction = this.createEditDeleteDialogService.buildCreateAction(this.questions);
  patchAction = this.createEditDeleteDialogService.buildEditAction(this.questions);
  deleteAction = this.createEditDeleteDialogService.buildDeleteAction(this.questions);

  nameCalculed = (student: Student) => (student.firstName + ' ' + student.lastName);

  columns: CustomColumn[] = [
    {name: 'TABLE.STUDENT-NAME', property: 'name', calculatedProperty: this.nameCalculed},
    {name: 'TABLE.STUDENT-YEAR', property: 'studyYear'},
    {name: 'TABLE.STUDENT-NUMBER', property: 'studentNumber'},
    {name: 'TABLE.STUDENT-POINTS', property: 'points'},
    {name: 'TABLE.EDIT', property: 'edit', button: true, buttonColor: 'accent', buttonIcon: 'edit', buttonText: 'TABLE.EDIT', buttonAction: this.patchAction.action},
    {name: 'TABLE.DELETE', property: 'delete', button: true, buttonColor: 'warn', buttonIcon: 'delete', buttonText: 'TABLE.DELETE', buttonAction: this.deleteAction.action},
  ];

  students: Observable<Student[]> = null;

  constructor(
    private notationService: NotationService,
    private crossComponentService: CrossComponentService,
    public createEditDeleteDialogService: CreateEditDeleteDialogService,
  ) {
    this.students = this.notationService.getStudents();
  }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.NOTATION.STUDENTS';

    this.createAction.subject.subscribe((data) => {
      if(data != null) {
        this.notationService.putStudent(data).subscribe(this.notationService.api.putTableUpdate(this.table));
      }
    });

    this.patchAction.subject.subscribe((data) => {
      if(data != null) {
        this.notationService.patchStudent(data).subscribe(this.notationService.api.patchTableUpdate(this.table));
      }
    });

    this.deleteAction.subject.subscribe((data) => {
      if(data != null) {
        this.notationService.deleteStudent(data).subscribe(this.notationService.api.deleteTableUpdate(this.table));
      }
    });
  }

}
