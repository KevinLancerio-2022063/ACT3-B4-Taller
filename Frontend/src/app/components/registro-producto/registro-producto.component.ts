import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
// Importación de FormBuilder, FormGroup y ReactiveFormsModule para formularios reactivos
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../models/producto";
import { AlertaExitoComponent } from "../alerta-exito/alerta-exito.component";

// Decorador que configura este componente con su selector, plantilla y estilos
@Component({
  selector: "app-registro-producto",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertaExitoComponent],
  templateUrl: "./registro-producto.component.html",
  styleUrls: ["./registro-producto.component.css"]
})
export class RegistroProductoComponent implements OnInit {
  // Variable que almacena el FormGroup del formulario reactivo
  productoForm!: FormGroup;
  // Bandera que indica si el usuario intentó enviar el formulario
  isSubmitted = false;
  mostrarAlerta = false;

  // Inyección de dependencias: FormBuilder, ProductoService y Router
  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    public router: Router
  ) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.initForm();
  }

  // Método que inicializa el formulario reactivo con sus controles y validaciones
  initForm(): void {
    this.productoForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(0.01), Validators.max(100000)]],
      categoria: ["", [Validators.required, Validators.minLength(3)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.max(10000)]]
    });
  }

  // Getter que facilita el acceso a los controles del formulario
  get f() { return this.productoForm.controls; }

  // Método que retorna un array de mensajes de error para un control específico
  getErrors(controlName: string): string[] {
    const control = this.f[controlName];
    const errors: string[] = [];
    
    if (control.hasError("required")) errors.push("Este campo es obligatorio.");
    if (control.hasError("minlength")) errors.push(`Mínimo ${control.errors?.["minlength"].requiredLength} caracteres.`);
    if (control.hasError("maxlength")) errors.push(`Máximo ${control.errors?.["maxlength"].requiredLength} caracteres.`);
    if (control.hasError("min")) errors.push(`El valor mínimo es ${control.errors?.["min"].min}.`);
    if (control.hasError("max")) errors.push(`El valor máximo es ${control.errors?.["max"].max}.`);
    
    return errors;
  }

  // Método que se ejecuta al enviar el formulario, valida y envía los datos al backend
  onSubmit(): void {
    this.isSubmitted = true;

    // Si el formulario es inválido, marca todos los controles como tocados para mostrar errores
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const nuevoProducto: Producto = this.productoForm.value;
    console.log("Enviando al backend:", nuevoProducto);

    // Llamada al servicio para registrar el producto en el backend
    this.productoService.addProducto(nuevoProducto).subscribe({
      next: (response) => {
        console.log("Producto registrado exitosamente:", response);
        this.mostrarAlerta = true;
        // Limpia el formulario y la bandera de envío
        this.productoForm.reset();
        this.isSubmitted = false;
        // Navega al listado después de un breve retraso para ver la alerta
        setTimeout(() => {
          this.router.navigate(["/productos"]);
        }, 3500);
      },
      error: (error) => {
        console.error("Error al registrar el producto:", error);
        alert("Hubo un error al registrar el producto. Revisa la consola.");
      }
    });
  }

  // Método público para navegar al listado de productos (botón cancelar)
  onCancel(): void {
    this.router.navigate(["/productos"]);
  }
}