create database AppPasantia;

CREATE TABLE Rol (
    id SERIAL PRIMARY key,
    nombre VARCHAR(30),
    descripcion VARCHAR(50)
);

-- Datos para la tabla Rol
INSERT INTO Rol (nombre, descripcion) VALUES
('Administrador', 'Gestiona usuarios y configuraciones'),
('Estudiante', 'Accede a ofertas de pasantías'),
('Empresa', 'Publica ofertas de pasantías'),

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(50),
    contraseña VARCHAR(255),
    idRol INT,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (idRol) REFERENCES Rol (id)
     ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos para la tabla Usuario
INSERT INTO Usuario (correo, contraseña, idRol) VALUES
('admin@example.com', 'contraseña1', 1),
('estudiante1@example.com', 'estudiante1pass', 2),
('empresa1@example.com', 'empresa1pass', 3),
('supervisor1@example.com', 'supervisor1pass', 4),
('empresa2@example.com', 'empresa2pass', 3),
('empresa3@example.com', 'empresa3pass', 3),
('empresa4@example.com', 'empresa4pass', 3),
('estudiante2@example.com', 'estudiante2pass', 2),
('estudiante3@example.com', 'estudiante3pass', 2),
('estudiante4@example.com', 'estudiante4pass', 2);


CREATE TABLE Empresa (
    id SERIAL PRIMARY key,
    nombre VARCHAR(30) NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario)
        REFERENCES Usuario (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos para la tabla Empresa
INSERT INTO Empresa (nombre, idUsuario) VALUES
('Empresa A', 3),
('Empresa B', 5),
('Empresa C', 6),
('Empresa D', 7);


CREATE TABLE Curriculum (
    id SERIAL PRIMARY key,
    direccion VARCHAR(80) NOT NULL
);

-- Datos para la tabla Curriculum
INSERT INTO Curriculum (direccion) VALUES
('Dirección 1'),
('Dirección 2'),
('Dirección 3'),
('Dirección 4');

CREATE TABLE Estudiante (
    id SERIAL PRIMARY key,
    nombres VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(15),
    apellidoMaterno VARCHAR(15),
    telefono VARCHAR(20) NOT NULL,
    idUsuario INT NOT NULL,
    idCv INT NOT NULL,
    FOREIGN KEY (idUsuario)
        REFERENCES Usuario (id),
    FOREIGN KEY (idCv)
        REFERENCES Curriculum (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);
-- Datos para la tabla Estudiante
INSERT INTO Estudiante (nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv) VALUES
('Eudenia', 'Flores', 'Veizaga', '1234567890', 2, 1),
('Mario', 'Medina', 'Gambarte', '9876543210', 8, 2),
('Carlos', 'Rodríguez', 'Sánchez', '5555555555', 9, 3),
('Laura', 'Hernández', 'Martínez', '7777777777', 10, 4);


CREATE TABLE Publicacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    idEmpresa INT NOT NULL,
    FOREIGN KEY (idEmpresa)
        REFERENCES Empresa (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos para la tabla Publicacion
INSERT INTO Publicacion (nombre, fechaInicio, fechaFin, idEmpresa) VALUES
('Pasantía 1', '2023-09-01', '2023-09-30', 1),
('Pasantía 2', '2023-10-15', '2023-11-15', 2),
('Pasantía 3', '2023-11-01', '2023-12-01', 3),
('Pasantía 4', '2023-12-10', '2024-01-10', 4);


CREATE TABLE Postula (
    idEstudiante INT NOT NULL,
    idPublicacion INT NOT NULL,
    PRIMARY KEY (idEstudiante, idPublicacion),
    FOREIGN KEY (idEstudiante)
        REFERENCES Estudiante (id),
    FOREIGN KEY (idPublicacion)
        REFERENCES Publicacion (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos para la tabla Postula
INSERT INTO Postula (idEstudiante, idPublicacion) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(3, 4),
(4, 4),
(4, 1);

CREATE TABLE Carrera (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);

-- Datos para la tabla Carrera
INSERT INTO Carrera (nombre) VALUES
('Ingeniería de Software'),
('Ingeniería Civil'),
('Ingeniería Mecánica'),
('Ingeniería Eléctrica');


CREATE TABLE Area (
    id serial PRIMARY KEY,
    idCarrera INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    FOREIGN KEY (idCarrera)
        REFERENCES Carrera (id)
        ON UPDATE CASCADE ON DELETE CASCADE    
);

-- Datos para la tabla Area
INSERT INTO Area (idCarrera, nombre) VALUES
(1, 'Desarrollo Web'),
(1, 'Desarrollo Móvil'),
(2, 'Construcción'),
(3, 'Diseño Mecánico'),
(4, 'Electrónica');

CREATE TABLE Requisito (
    id SERIAL PRIMARY KEY,
    idArea INT NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    FOREIGN KEY (idArea)
        REFERENCES Area (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos para la tabla Requisito
INSERT INTO Requisito (idArea, nombre) VALUES
(1, 'JavaScript'),
(1, 'HTML'),
(2, 'Java'),
(2, 'Kotlin'),
(3, 'AutoCAD'),
(4, 'SolidWorks'),
(5, 'Circuitos');

CREATE TABLE Estudiante_Carrera (
    idEstudiante INT NOT NULL,
    idCarrera INT NOT NULL,
    FOREIGN KEY (idEstudiante)
        REFERENCES Estudiante (id),
    FOREIGN KEY (idCarrera)
        REFERENCES Carrera (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Datos para la tabla Estudiante_Carrera
INSERT INTO Estudiante_Carrera (idEstudiante, idCarrera) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

CREATE TABLE Pub_Requisitos (
    idPublicacion INT NOT NULL,
    idRequisito INT NOT NULL,
    FOREIGN KEY (idPublicacion)
        REFERENCES Publicacion (id),
    FOREIGN KEY (idRequisito)
        REFERENCES Requisito (id)
        ON UPDATE CASCADE ON DELETE CASCADE    
);

-- Datos para la tabla Pub_Requisitos
INSERT INTO Pub_Requisitos (idPublicacion, idRequisito) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 6),
(4, 7);
