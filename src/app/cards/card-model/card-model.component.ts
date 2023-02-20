import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-model',
  templateUrl: './card-model.component.html',
  styleUrls: ['./card-model.component.scss'],
})
export class CardModelComponent implements OnInit {
  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModelComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [
        this.data?.title || '',
        [Validators.required, Validators.maxLength(255)],
      ],
      phone: [this.data?.phone || '', [Validators.required]],
      email: [
        this.data?.email || '',
        [Validators.email, Validators.maxLength(50)],
      ],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
  }

  snackBarAndReload(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  addCard() {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe((res: any) => {
      this.snackBarAndReload(res || 'Kartvizit Başarıyla eklendi');
    });
  }

  updateCard() {
    this.showSpinner = true;
    this.cardService
      .updateCard(this.cardForm.value, this.data.id)
      .subscribe({
        next : (res: any) => this.snackBarAndReload(res || 'Kartvizit Başarıyla güncellendi'),
        error: (err: any) => this.snackBarAndReload(err.message),
        complete: () => console.log('complete')
  })
  }

  deleteCard() {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id).subscribe((res: any) => {
      this.snackBarAndReload(res || 'Kartvizit Başarıyla silindi');
    });
  }
}
