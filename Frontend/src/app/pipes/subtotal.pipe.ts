import { Pipe, PipeTransform } from "@angular/core";

// Decorador que define el nombre del pipe
@Pipe({
  name: "subtotal",
  standalone: true
})
export class SubtotalPipe implements PipeTransform {
  // Metodo que transforma los datos recibidos
  // Recibe el precio y la cantidad, y retorna el subtotal
  transform(precio: number, cantidad: number): number {
    if (!precio || !cantidad) {
      return 0;
    }
    return precio * cantidad;
  }
}