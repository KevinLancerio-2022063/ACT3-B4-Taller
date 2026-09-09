import { Pipe, PipeTransform } from "@angular/core";
import { CarritoItem } from "../models/carrito";

// Decorador que define el nombre del pipe
@Pipe({
  name: "totalCarrito",
  standalone: true
})
export class TotalCarritoPipe implements PipeTransform {
  // Método que transforma el array de items del carrito en el total general
  transform(items: CarritoItem[]): number {
    if (!items || items.length === 0) {
      return 0;
    }
    // Calcular la suma de todos los subtotales (precio * cantidad)
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
}
