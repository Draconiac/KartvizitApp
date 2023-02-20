import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardModelComponent } from './card-model/card-model.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

  cards!: Card[];

  constructor(
    public dialog: MatDialog,
    public cardService: CardService
  ){}

  ngOnInit(): void {
    this.cardService.getCards();
  }

  openAddCardModel(){
    const dialog = this.dialog.open(CardModelComponent, {
      width: '400px'
    });


  }
}
