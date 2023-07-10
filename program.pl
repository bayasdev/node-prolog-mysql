% conexion BDD

:- use_module(library(odbc)).

connect_db :-
    odbc_connect('my_dsn', _, [
      user('root'),
      password(''),
      alias(mysql),
      open(once)
    ]).

% obtener lista de personas

get_personas(Row) :-
    odbc_query('mysql', 'SELECT * FROM personas', Row).

insert_persona(Nombre, Edad) :-
    odbc_query('mysql', "INSERT INTO personas(nombre, edad) VALUES ('~w', '~w')"-[Nombre, Edad]).

delete_persona(Nombre) :-
    odbc_query('mysql', "DELETE FROM personas WHERE nombre = '~w'"-[Nombre]).

% cargar personas en memoria

load_personas :-
    retractall(edad(_, _)), % Remove existing persona facts
    get_personas(Row), % Query personas from the database
    assert_personas(Row).

assert_personas(end_of_file) :- !.
assert_personas(row(Nombre, Edad)) :-
    asserta(edad(Nombre, Edad)),
    fail.

% reglas auxiliares

dif(X, Y) :- X \= Y.

% reglas de clasificacion etaria

bebe(X) :- edad(X, A), A =< 2.
nino(X) :- edad(X, A), A >= 3, A =< 9.
adolescente(X) :- edad(X, A), A >= 10, A =< 20.
adulto(X) :- edad(X, A), A >= 21, A =< 69.
anciano(X) :- edad(X, A), A >= 70.

mayor_que(X, Y) :- edad(X, A), edad(Y, B), A >= B, dif(X,Y).
menor_que(X, Y) :- edad(X, A), edad(Y, B), A =< B, dif(X,Y).
igual_que(X, Y) :- edad(X, A), edad(Y, B), A == B, dif(X,Y).
