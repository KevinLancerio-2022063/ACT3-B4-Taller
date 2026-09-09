import { Routes } from "@angular/router";
import { ProductosComponent } from "./components/productos/productos.component";
import { RegistroProductoComponent } from "./components/registro-producto/registro-producto.component";
import { CarritoComponent } from "./components/carrito/carrito.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";

// Configuracion del array de rutas para la navegacion de la aplicacion
export const routes: Routes = [
  { path: "", redirectTo: "/productos", pathMatch: "full" },
  { path: "productos", component: ProductosComponent },
  { path: "registro", component: RegistroProductoComponent },
  { path: "carrito", component: CarritoComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "**", redirectTo: "/productos" }
];
