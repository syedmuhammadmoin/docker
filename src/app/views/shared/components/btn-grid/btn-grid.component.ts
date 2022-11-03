import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-btn-grid',
  templateUrl: './btn-grid.component.html',
  styleUrls: ['./btn-grid.component.scss']
})
export class BtnGridComponent implements OnInit {
  constructor() {   }
  params;
  label: string;
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || 'No Button Name';
  }
  ngOnInit(): void {
  }
  onClick($event) {
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params.node.data);
    }
  }
}
