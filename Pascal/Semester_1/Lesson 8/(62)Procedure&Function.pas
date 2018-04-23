// С использованием библиотеки
Program ProcedureAndFunction;
Uses Cplx;

Var z: complex;
    w: complex;

Begin
  ReadC(2, 2, z);
  w := Sub(Add(Pow(z, 5), Prod(3, Pow(z, 2))), z);
  WriteC(2, 4, w);
End.

{ Без использования библиотеки
Program ProcedureAndFunction;
Type 
  complex = record
      Re, Im: real;
  end;

Procedure Inv(z: complex; var w: complex);
Var znam: real;
begin
  znam := sqr(z.Re) + sqr(z.Im);
  w.Re := z.Re / znam;
  w.Im := -z.Im / znam;
end;
Procedure Code(z: complex; var w: complex);
begin
  w.Re := z.Re;
  w.Im := -z.Im;
end;

Function Add(u, v: complex): complex;
Var w: complex;
begin
  w.Re := u.Re + v.Re;
  w.Im := u.Im + v.Im;
  Add := w;
end;
Function Sub(u, v: complex): complex;
Var w: complex;
begin
  w.Re := u.Re - v.Re;
  w.Im := u.Im - v.Im;
  Sub := w;
end;
Function Mult(u, v: complex): complex;
Var w: complex;
begin
  w.Re := u.Re * v.Re - u.Im * v.Im;
  w.Im := u.Re * v.Im + u.Im * v.Re;
  Mult := w;
end;
Function Prod(a: real; z: complex): complex;
Var w: complex;
begin
  w.Re := a * z.Re;
  w.Im := a * z.Im;
  Prod := w;
end;
Function Division(u, v: complex): complex;
Var z: complex;
begin
  Inv(u, z);
  Division := Mult(u, z);
end;
Function Modul(z: complex): real;
begin
  Modul := sqrt(sqr(z.Re) + sqr(z.Im));
end;
Function Pow(z: complex; degree: integer): complex;
Var i: integer;
    a: complex;
begin
  a := z;
  for i := 2 to degree do a := Mult(a, z);
  Pow := a;
end;

Var z: complex;
    w: complex;

Begin
  Readln(z.Re, z.Im);
  w := Sub(Add(Pow(z, 5), Prod(3, Pow(z, 2))), z);
  Writeln('w = (' + w.Re + '; ' + w.Im + ')');
End.