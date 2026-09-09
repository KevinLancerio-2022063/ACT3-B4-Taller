-- creación de la tabla productos si no existe
create table if not exists productos (
    id serial primary key,
    nombre varchar(100) not null,
    descripcion text,
    precio decimal(10, 2) not null check (precio > 0),
    categoria varchar(50) not null,
    stock integer not null default 0 check (stock >= 0),
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp
);

-- tabla para registrar las órdenes de compra
create table if not exists ordenes (
    id serial primary key,
    total decimal(10, 2) not null,
    estado varchar(20) not null default 'completada',
    fecha_creacion timestamp default current_timestamp
);

-- tabla para los items de cada orden
create table if not exists items_orden (
    id serial primary key,
    orden_id integer not null references ordenes(id) on delete cascade,
    producto_id integer not null,
    nombre_producto varchar(100) not null,
    cantidad integer not null check (cantidad > 0),
    precio_unitario decimal(10, 2) not null,
    subtotal decimal(10, 2) not null
);

-- índice para mejorar consultas sobre orden_id
create index if not exists idx_items_orden_orden_id on items_orden(orden_id);

-- inserción de datos en la tabla productos
insert into productos (nombre, descripcion, precio, categoria, stock) values
('teclado mecánico', 'teclado con switches azules y retroiluminación', 450.00, 'periféricos', 15),
('mouse gamer', 'mouse ergonómico 16000 dpi programable', 250.50, 'periféricos', 8),
('monitor 24 pulgadas', 'monitor ips 144hz 1ms respuesta', 1200.00, 'pantallas', 5);

-- borrar todos los productos excepto los 3 primeros (teclado, mouse, monitor)
delete from items_orden where producto_id > 3;
delete from productos where id > 3;