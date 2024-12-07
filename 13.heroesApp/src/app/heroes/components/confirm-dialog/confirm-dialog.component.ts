import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {
  constructor(
    // inyección
    public dialogRef: MatDialogRef<ConfirmDialogComponent>, // referencia a nuestro propio componente
    @Inject(MAT_DIALOG_DATA) public data: Hero, // MAT_DIALOG_DATA es el token para reconocer el servicio inyectado, recibimos un Hero
  ) {}

  // cerramos nuestra ventana, pero retornamos un false, no se elimino
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  // cerramos nuestra ventana, pero retornamos un true, se elimino
  onConfirm():void {
    this.dialogRef.close(true)
  }
}
