import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!: Card[]
  filteredCards!: Card[]

  //apiUrl: string = 'http://demo.limantech.com/cards/public/api'

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) { }

  /*
  getCards(){
    return this.http.get('http://demo.limantech.com/cards/public/api/cards')
  }*/

  getCards(){
    return this.http.get<Card[]>(this.apiUrl + '/cards')
    .subscribe((res:Card[]) => {
      this.cards = this.filteredCards = res
    })
  }

  addCard(card: Card){
    return this.http.post(this.apiUrl + '/cards', card)
  }

  updateCard(card: Card, cardId:number){
    return this.http.put(this.apiUrl + '/cards/' + cardId, card)
  }
  
  deleteCard(cardId: number){
    return this.http.delete(this.apiUrl + '/cards/'+ cardId)
  }

}
