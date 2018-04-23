Program ExpCosSin;

Uses Crt, Cplx;

Var z: complex;

Begin
  GoToXY(2, 2); Writeln('Z = '); ReadC(6, 2, z);
  GoToXY(2, 4); Writeln('Exp = '); WriteC(8, 4, ExpC(z));
  GoToXY(2, 6); Writeln('Cos = '); WriteC(8, 6, CosC(z));
  GoToXY(2, 8); Writeln('Sin = '); WriteC(8, 8, SinC(z));
End.