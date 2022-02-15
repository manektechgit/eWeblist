import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-upload-progress',
  templateUrl: './image-upload-progress.component.html',
  styleUrls: ['./image-upload-progress.component.css']
})
export class ImageUploadProgressComponent implements OnInit {
  @Input() progress = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
