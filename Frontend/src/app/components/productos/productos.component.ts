import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Producto } from "../../models/producto";
import { ProductoService } from "../../services/producto.service";
import { CarritoService } from "../../services/carrito.service";

// Decorador que configura este componente como standalone
@Component({
  selector: "app-productos",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"]
})
export class ProductosComponent implements OnInit, OnDestroy {
  // Array que almacena los productos obtenidos del backend
  productos: Producto[] = [];
  // Término de búsqueda actual para filtrar la tabla
  searchTerm: string = "";
  // Variable para almacenar el ID del intervalo de actualización automática
  private intervalId: any;
  // ID del producto que esta siendo agregado al carrito
  productoAgregando: number | null = null;

  // Inyección de dependencias del servicio, router y detector de cambios
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private carritoService: CarritoService
  ) { }

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.cargarProductos();
    // Configuración de actualización automática cada 5 segundos
    this.intervalId = setInterval(() => {
      this.cargarProductos();
    }, 5000);
  }

  // Método del ciclo de vida que limpia el intervalo al destruir el componente
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Getter que filtra los productos según el término de búsqueda
  get filteredProductos(): Producto[] {
    if (!this.searchTerm) {
      return this.productos;
    }
    const term = this.searchTerm.toLowerCase();
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.categoria.toLowerCase().includes(term) ||
      p.descripcion.toLowerCase().includes(term)
    );
  }

  // Método que navega al componente de registro de productos
  irARegistro(): void {
    this.router.navigate(["/registro"]);
  }

  // Método que navega al componente del carrito
  irACarrito(): void {
    this.router.navigate(["/carrito"]);
  }

  // Método que agrega un producto al carrito con cantidad 1
  agregarAlCarrito(producto: Producto): void {
    // Validar que el producto tenga un ID valido
    if (!producto.id) {
      console.error("El producto no tiene un ID valido");
      return;
    }

    this.productoAgregando = producto.id;
    
    // Agregar el producto al carrito con cantidad 1
    this.carritoService.agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
    
    // Feedback visual temporal
    setTimeout(() => {
      this.productoAgregando = null;
    }, 800);
  }

  // Método que llama al servicio para obtener los productos del backend
  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        // Forzar detección de cambios para que la vista se actualice
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error al cargar productos:", error);
      }
    });
  }

  // Método que calcula el porcentaje de stock para la barra visual (max 100%)
  getStockPercentage(stock: number): number {
    return Math.min((stock / 100) * 100, 100);
  }
}