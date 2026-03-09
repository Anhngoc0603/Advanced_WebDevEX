import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  student_id: string = "K234111404"
  student_name: string = "Nguyen Thi Anh Ngoc"
  student_class: string = "K234111E"
  my_photo = 'assets/photo.jpg';
}
