import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CarritoItem } from "../models/carrito";

// Decorador que marca esta clase como un servicio inyectable
@Injectable({
  providedIn: "root"
})
export class CarritoService {
  // URL base de la API backend para operaciones con ordenes
  private apiUrl = "http://localhost:3000/api/ordenes";
  
  // BehaviorSubject que mantiene el estado actual del carrito
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);
  // Observable publico para que los componentes se suscriban a los cambios
  carrito$ = this.carritoSubject.asObservable();

  // Inyeccion de HttpClient para realizar peticiones al backend
  constructor(private http: HttpClient) { }

  // Metodo que retorna el array actual del carrito
  getCarrito(): CarritoItem[] {
    return this.carritoSubject.value;
  }

  // Metodo que agrega un producto al carrito o incrementa su cantidad
  agregarProducto(producto: CarritoItem): void {
    const carritoActual = this.getCarrito();
    const productoExistente = carritoActual.find(item => item.id === producto.id);
    
    if (productoExistente) {
      // Si el producto ya existe, incrementar la cantidad
      productoExistente.cantidad += producto.cantidad;
    } else {
      // Si no existe, agregarlo al carrito
      carritoActual.push({ ...producto });
    }
    
    // Emitir el nuevo estado del carrito
    this.carritoSubject.next([...carritoActual]);
    console.log("Producto agregado al carrito:", producto);
  }

  // Metodo que actualiza la cantidad de un producto en el carrito
  actualizarCantidad(productId: number, cantidad: number): void {
    const carritoActual = this.getCarrito();
    const item = carritoActual.find(i => i.id === productId);
    
    if (item) {
      if (cantidad <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto
        this.eliminarProducto(productId);
      } else {
        item.cantidad = cantidad;
        this.carritoSubject.next([...carritoActual]);
      }
    }
  }

  // Metodo que elimina un producto del carrito
  eliminarProducto(productId: number): void {
    const carritoActual = this.getCarrito();
    const nuevoCarrito = carritoActual.filter(item => item.id !== productId);
    this.carritoSubject.next(nuevoCarrito);
    console.log("Producto eliminado del carrito:", productId);
  }

  // Metodo que limpia completamente el carrito
  limpiarCarrito(): void {
    this.carritoSubject.next([]);
    console.log("Carrito limpiado");
  }

  // Metodo que calcula el total del carrito
  getTotal(): number {
    return this.getCarrito().reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  // Metodo que calcula la cantidad total de items en el carrito
  getCantidadTotal(): number {
    return this.getCarrito().reduce((total, item) => total + item.cantidad, 0);
  }

  // Metodo que envia la orden al backend para guardarla en la base de datos
  crearOrden(items: CarritoItem[], total: number): Observable<any> {
    return this.http.post(this.apiUrl, { items, total });
  }
}