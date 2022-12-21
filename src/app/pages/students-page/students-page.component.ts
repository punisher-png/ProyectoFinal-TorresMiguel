import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  students: Student[] = [
    new Student(1, 'Miguel', 'Torres', true),
    new Student(2, 'Lionel', 'Messi', true),
    new Student(3, 'Cristiano Ronaldo', 'Dos Santos', true),
    new Student(4, 'Zlatan', 'Ibrahimović', true),
    new Student(5, 'Ronaldo', 'de Assis Moreira', true),
    new Student(6, 'Ronaldo', 'Nazário de Lima', true),
  ]

  displayedColumns = ['id', 'firstName', 'lastName', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog) {}

  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent)

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        const lastId = this.students[this.students.length - 1]?.id;
        this.students = [...this.students, new Student(lastId + 1, value.firstName, value.lastName, true)];
      }
    })
  }

  // 
  removeStudent(student: Student) {
    this.students = this.students.filter(
      (stu) => stu.id !== student.id // Deja todos los elementos donde se cumpla esta condicion
    );
  }

  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: student,
    })

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.students = this.students.map((stu) => stu.id === student.id ? { ...stu, ...data } : stu)
      }
    })
  }
}
