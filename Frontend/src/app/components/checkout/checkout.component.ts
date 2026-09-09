import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarritoService } from "../../services/carrito.service";
import { CarritoItem } from "../../models/carrito";
import { SubtotalPipe } from "../../pipes/subtotal.pipe";
import { TotalCarritoPipe } from "../../pipes/total-carrito.pipe";
import { CantidadTotalPipe } from "../../pipes/cantidad-total.pipe";
import { AlertaExitoComponent } from "../alerta-exito/alerta-exito.component";

// Decorador que configura el componente de checkout
@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, SubtotalPipe, TotalCarritoPipe, CantidadTotalPipe, AlertaExitoComponent],
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // Array que almacena los items del carrito
  items: CarritoItem[] = [];
  // Bandera que indica si se esta procesando la orden
  procesando = false;
  // Bandera que indica si la orden fue exitosa
  ordenExitosa = false;
  // Bandera que controla la visibilidad de la alerta de exito
  mostrarAlerta = false;
  // ID de la orden creada
  ordenId: number | null = null;
  // Suscripcion al observable del carrito
  private subscription: Subscription | null = null;

  // Inyeccion de dependencias del servicio del carrito y router
  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) { }

  // Metodo del ciclo de vida que se ejecuta al inicializar
  ngOnInit(): void {
    // Suscribirse al carrito para obtener los items actuales
    this.subscription = this.carritoService.carrito$.subscribe(items => {
      this.items = items;
      // Si el carrito esta vacio y no hay orden exitosa, redirigir a productos
      if (items.length === 0 && !this.ordenExitosa) {
        this.router.navigate(["/productos"]);
      }
    });
  }

  // Metodo del ciclo de vida que limpia la suscripcion
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Metodo que confirma y envia la orden al backend
  confirmarOrden(): void {
    if (this.items.length === 0) {
      return;
    }
    
    this.procesando = true;
    const total = this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // Enviar la orden al backend para guardarla en la base de datos
    this.carritoService.crearOrden(this.items, total).subscribe({
      next: (response) => {
        console.log("Orden creada exitosamente:", response);
        this.ordenId = response.ordenId;
        this.ordenExitosa = true;
        this.procesando = false;
        // Mostrar la alerta de exito
        this.mostrarAlerta = true;
        // Limpiar el carrito despues de crear la orden
        this.carritoService.limpiarCarrito();
        // Redirigir a productos despues de 2 segundos
        setTimeout(() => {
          this.router.navigate(["/productos"]);
        }, 2000);
      },
      error: (error) => {
        console.error("Error al crear orden:", error);
        this.procesando = false;
        alert("Error al procesar la orden. Intenta de nuevo.");
      }
    });
  }

  // Metodo que cancela y regresa al carrito
  cancelar(): void {
    this.router.navigate(["/carrito"]);
  }

  // Metodo que regresa al listado de productos
  volverAProductos(): void {
    this.router.navigate(["/productos"]);
  }
}