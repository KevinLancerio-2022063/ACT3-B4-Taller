import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarritoService } from "../../services/carrito.service";
import { CarritoItem } from "../../models/carrito";
import { SubtotalPipe } from "../../pipes/subtotal.pipe";
import { TotalCarritoPipe } from "../../pipes/total-carrito.pipe";
import { CantidadTotalPipe } from "../../pipes/cantidad-total.pipe";

// Decorador que configura el componente del carrito
@Component({
  selector: "app-carrito",
  standalone: true,
  imports: [CommonModule, SubtotalPipe, TotalCarritoPipe, CantidadTotalPipe],
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"]
})
export class CarritoComponent implements OnInit, OnDestroy {
  // Array que almacena los items del carrito
  items: CarritoItem[] = [];
  // Suscripcion al observable del carrito
  private subscription: Subscription | null = null;

  // Inyeccion de dependencias del servicio del carrito y router
  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) { }

  // Metodo del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Suscribirse al observable del carrito para recibir actualizaciones en tiempo real
    this.subscription = this.carritoService.carrito$.subscribe(items => {
      this.items = items;
      console.log("Carrito actualizado:", items);
    });
  }

  // Metodo del ciclo de vida que limpia la suscripcion al destruir el componente
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Metodo que incrementa la cantidad de un producto en el carrito
  incrementarCantidad(item: CarritoItem): void {
    this.carritoService.actualizarCantidad(item.id, item.cantidad + 1);
  }

  // Metodo que decrementa la cantidad de un producto en el carrito
  decrementarCantidad(item: CarritoItem): void {
    this.carritoService.actualizarCantidad(item.id, item.cantidad - 1);
  }

  // Metodo que elimina un producto del carrito
  eliminarProducto(item: CarritoItem): void {
    this.carritoService.eliminarProducto(item.id);
  }

  // Metodo que navega al componente de checkout
  irACheckout(): void {
    this.router.navigate(["/checkout"]);
  }

  // Metodo que navega al listado de productos
  seguirComprando(): void {
    this.router.navigate(["/productos"]);
  }
}
