// Interfaz que representa un item dentro del carrito
export interface CarritoItem {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

// Interfaz que representa una orden completa
export interface Orden {
    id?: number;
    total: number;
    estado: string;
    fecha_creacion?: string;
    items?: ItemOrden[];
}

// Interfaz que representa un item dentro de una orden guardada
export interface ItemOrden {
    id?: number;
    orden_id?: number;
    producto_id: number;
    nombre_producto: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}
