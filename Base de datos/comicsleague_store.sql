-- Eliminar tablas si existen
DROP TABLE IF EXISTS Categoria CASCADE;
DROP TABLE IF EXISTS Producto CASCADE;
DROP TABLE IF EXISTS Resena CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS HistoricoDeCompra CASCADE;
DROP TABLE IF EXISTS VentaCompra CASCADE;

-- Tabla Categoria
CREATE TABLE Categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla Producto
CREATE TABLE Producto (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT REFERENCES Categoria(id_categoria),
    volumen DECIMAL(10, 2),
    stock INT,
    descripcion TEXT,
    precio DECIMAL(10, 2),
    titulo VARCHAR(255) NOT NULL
);

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255),
    telefono VARCHAR(15),
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Tabla Resena
CREATE TABLE Resena (
    id_resena SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    id_producto INT REFERENCES Producto(id_producto),
    comentario TEXT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5)
);

-- Tabla HistoricoDeCompra
CREATE TABLE HistoricoDeCompra (
    id_historico SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    total DECIMAL(10, 2)
);

-- Tabla VentaCompra
CREATE TABLE VentaCompra (
    id_producto INT REFERENCES Producto(id_producto),
    id_historico INT REFERENCES HistoricoDeCompra(id_historico),
    cantidad INT,
    PRIMARY KEY (id_producto, id_historico)
);
-- Prueba conexión github