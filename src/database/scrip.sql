
use cursos;

create table profesor(
	id int auto_increment,
    dni varchar(64),
    nombre varchar(64),
    apellido varchar(64),
    email varchar(128),
    profesion varchar(128),
    telefono varchar(64),
    primary key(id)
);


create table estudiantes(
	id int auto_increment,
    dni varchar(64),
    nombre varchar(64),
    apellido varchar(64),
    email varchar(128),
    primary key(id)
);

create table curso(
	id int auto_increment,
    nombre varchar(50),
    descripcion text,
    profesorId int,
    primary key(id)
);

alter table curso
add constraint cursos_profesor_fk foreign key (profesorId) references profesor(id);

-- para una relacion de muchos a muchos  se usa un puente o tabla puente

create table estudianteCurso(
estudianteId int ,
cursosId int,
primary key(estudianteId,cursosId)
);

-- claves foraneas pra esta tabla
alter table estudianteCurso
add constraint cursos_estudiantes_cursos_fk foreign key (cursosId) references curso(id),
add constraint cursos_estudiantes_estudiantes_fk foreign key (estudianteId) references estudiantes(id);



