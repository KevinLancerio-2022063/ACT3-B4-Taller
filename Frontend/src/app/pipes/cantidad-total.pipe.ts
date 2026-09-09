import { Pipe, PipeTransform } from "@angular/core";
import { CarritoItem } from "../models/carrito";

// Decorador que define el nombre del pipe
@Pipe({
  name: "cantidadTotal",
  standalone: true
})
export class CantidadTotalPipe implements PipeTransform {
  // Método que transforma el array de items en la cantidad total de productos
  transform(items: CarritoItem[]): number {
    if (!items || items.length === 0) {
      return 0;
    }
    // Sumar todas las cantidades de los items
    return items.reduce((total, item) => total + item.cantidad, 0);
  }
}