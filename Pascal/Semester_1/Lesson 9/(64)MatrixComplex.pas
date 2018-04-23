Program MatrixComplex;
Uses Crt, Cplx;

Var a, b: matrixC;
    x, y: integer;
Begin
  x:= 2; y:= 2;
  
  GoToXY(x, y); Writeln('Matrix A: ');
  ReadMatrixC(x, y + 1, a);
  GoToXY(x + 34, y); Writeln('Matrix B: ');
  ReadMatrixC(x + 34, y + 1, b);
  
  GoToXY(x, y + 4); Writeln('AddMatrix: ');
  WriteMatrixC(x, (y + 1) + 4, AddMatrix(a, b));
  
  GoToXY(x, y + 8); Writeln('MultMatrix: ');
  WriteMatrixC(x, (y + 1) + 8, MultMatrix(a, b));
  
  GoToXY(x, y + 12); Writeln('ExpM(A): ');
  WriteMatrixC(x, (y + 1) + 12, ExpM(a));
  
  GoToXY(x + 34, y + 12); Writeln('ExpM(B): ');
  WriteMatrixC(x + 34, (y + 1) + 12, ExpM(b));
  
  GoToXY(x, y + 16); Writeln('CosM(A): ');
  WriteMatrixC(x, (y + 1) + 16, CosM(a));
  
  GoToXY(x + 34, y + 16); Writeln('CosM(B): ');
  WriteMatrixC(x + 34, (y + 1) + 16, CosM(b));
  
  GoToXY(x, y + 20); Writeln('SinM(A): ');
  WriteMatrixC(x, (y + 1) + 20, SinM(a));
  
  GoToXY(x + 34, y + 20); Writeln('SinM(B): ');
  WriteMatrixC(x + 34, (y + 1) + 20, SinM(b));
  
  GoToXY(x, y + 24); Writeln('OneMatrix: ');
  WriteMatrixC(x, (y + 1) + 24, OneMatrix());
  
  GoToXY(x, y + 24);
End.