-- Creación de la tabla productos si no existe
create table if not exists productos (
    id serial primary key,
    nombre varchar (100) not null,
    descripcion text,
    precio decimal (10, 2) not null check (precio > 0),
    categoria varchar (50) not null,
    stock integer not null default 0 check (stock >= 0),
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp
);
 
insert into productos (nombre, descripcion, precio, categoria, stock) values
('Teclado Mecánico', 'Teclado con switches azules y retroiluminación', 450.00, 'Periféricos', 15),
('Mouse Gamer', 'Mouse ergonómico 16000 DPI programable', 250.50, 'Periféricos', 8),
('Monitor 24 pulgadas', 'Monitor IPS 144Hz 1ms respuesta', 1200.00, 'Pantallas', 5);