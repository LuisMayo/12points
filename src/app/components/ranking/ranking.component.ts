import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input()
  contestants: any[];

  @Input()
  users: any[];

  expandedRows: number[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.users);
  }

  switchRowExpandedState(index: number): void {
    const existingRecord = this.expandedRows.findIndex(rowIndex => rowIndex === index);
    if (existingRecord !== -1) {
      this.expandedRows.splice(existingRecord, 1);
    } else {
      this.expandedRows.push(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedRows.includes(index);
  }
}
