Uses Crt, Cplx;
Var a: VectorC;
Begin
  ReadCVector(2, 2, a);
  GoToXY(2, 3); Writeln(ModulVector(a));
End.