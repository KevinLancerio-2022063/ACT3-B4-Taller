// Importación del decorador Injectable para crear un servicio
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto } from "../models/producto";

// Decorador que marca esta clase como un servicio inyectable
@Injectable({
  providedIn: "root"
})
export class ProductoService {
  // URL base de la API backend para operaciones con productos
  private apiUrl = "http://localhost:3000/api/productos";

  constructor(private http: HttpClient) { }

  // Método que realiza una petición GET para obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método que realiza una petición POST para registrar un nuevo producto
  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
}