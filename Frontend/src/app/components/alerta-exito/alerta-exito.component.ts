// Importación de Component e Input para recibir datos del padre
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";

// Decorador que configura el componente de alerta de éxito
@Component({
  selector: "app-alerta-exito",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Contenedor de la alerta que se muestra solo si mostrar es true -->
    <div *ngIf="mostrar" class="alerta-exito">
      <!-- Ícono de check circular -->
      <div class="alerta-icono">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <!-- Contenido de texto con título y mensaje -->
      <div class="alerta-contenido">
        <h3 class="alerta-titulo">{{ titulo }}</h3>
        <p class="alerta-mensaje">{{ mensaje }}</p>
        <!-- Barra de progreso que indica el tiempo restante -->
        <div class="barra-progreso">
          <div class="barra-progreso-fill" [style.width.%]="progreso"></div>
        </div>
      </div>
      <!-- Botón para cerrar manualmente la alerta -->
      <button (click)="cerrar()" class="alerta-cerrar" aria-label="Cerrar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    /* Contenedor fijo en la esquina superior derecha con animación */
    .alerta-exito {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 
        0 4px 0 #047857,
        0 8px 24px rgba(16, 185, 129, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      max-width: 380px;
      min-width: 320px;
      animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 9999;
    }

    /* Animación de entrada con efecto rebote */
    @keyframes slideIn {
      from {
        transform: translateX(120%) scale(0.8);
        opacity: 0;
      }
      to {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
    }

    /* Contenedor del ícono con fondo semitransparente */
    .alerta-icono {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .alerta-icono svg {
      width: 20px;
      height: 20px;
      stroke: white;
    }

    /* Contenedor de texto que ocupa el espacio restante */
    .alerta-contenido {
      flex: 1;
      min-width: 0;
    }

    /* Título de la alerta en negrita */
    .alerta-titulo {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.3;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    /* Mensaje descriptivo con opacidad reducida */
    .alerta-mensaje {
      margin: 4px 0 0 0;
      font-size: 0.85rem;
      opacity: 0.95;
      line-height: 1.4;
    }

    /* Barra de progreso que muestra el tiempo restante */
    .barra-progreso {
      margin-top: 8px;
      height: 3px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 2px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .barra-progreso-fill {
      height: 100%;
      background: linear-gradient(90deg, white, rgba(255, 255, 255, 0.9));
      border-radius: 2px;
      transition: width 0.1s linear;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
    }

    /* Botón de cierre con efecto 3D */
    .alerta-cerrar {
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.25);
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 
        0 2px 0 rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .alerta-cerrar:hover {
      background: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px) rotate(90deg);
      box-shadow: 
        0 4px 0 rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    .alerta-cerrar:active {
      transform: translateY(1px) rotate(90deg);
      box-shadow: 
        0 1px 0 rgba(0, 0, 0, 0.1);
    }

    /* Responsive para móviles */
    @media (max-width: 480px) {
      .alerta-exito {
        top: 16px;
        right: 16px;
        left: 16px;
        max-width: none;
        min-width: auto;
      }
    }
  `]
})
export class AlertaExitoComponent implements OnChanges {
  @Input() mostrar = false;
  @Input() titulo = "¡Éxito!";
  @Input() mensaje = "";
  
  // Variable que almacena el porcentaje de progreso de la barra
  progreso = 100;
  
  // Duración total de la alerta en milisegundos (6 segundos)
  private duracionTotal = 6000;
  // Intervalo de actualización de la barra de progreso
  private intervaloProgreso: any;
  // Variable que almacena el ID del temporizador
  private temporizador: any;

  // Método del ciclo de vida que se ejecuta cuando cambian los inputs
  ngOnChanges(changes: SimpleChanges): void {
    // Si "mostrar" cambió a true, inicia el temporizador de auto-cierre
    if (changes["mostrar"] && this.mostrar) {
      this.iniciarTemporizador();
    }
  }

  // Método que inicia el temporizador para cerrar automáticamente
  private iniciarTemporizador(): void {
    // Limpia cualquier temporizador previo
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    if (this.intervaloProgreso) {
      clearInterval(this.intervaloProgreso);
    }

    // Reinicia el progreso
    this.progreso = 100;
    const tiempoInicio = Date.now();

    // Actualiza la barra de progreso cada 100ms
    this.intervaloProgreso = setInterval(() => {
      const tiempoTranscurrido = Date.now() - tiempoInicio;
      this.progreso = Math.max(0, 100 - (tiempoTranscurrido / this.duracionTotal) * 100);
    }, 100);

    // Cierra la alerta después de la duración configurada
    this.temporizador = setTimeout(() => {
      this.cerrar();
    }, this.duracionTotal);
  }

  // Método público que cierra la alerta manualmente
  cerrar(): void {
    this.mostrar = false;
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    if (this.intervaloProgreso) {
      clearInterval(this.intervaloProgreso);
    }
  }
}