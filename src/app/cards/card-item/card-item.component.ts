import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardModelComponent } from '../card-model/card-model.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit{
  
  @Input() cardItem!: Card

  constructor (
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  openUpdateCardModel(): void{
    this.dialog.open(CardModelComponent, {
      width: '400px',
      data: this.cardItem 
    })
  }

}
