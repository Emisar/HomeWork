Uses Vect, Crt;
Const ind = 12;
Var a, b, c: Vector;
    x, y: integer;
Begin
  x:= 2; y:= 3;
  
  GoToXY(x, y - 1); Writeln('Vector A: ');
  ReadVector(x + ind, y - 1, a);
  GoToXY(x, y); Writeln('Vector B: ');
  ReadVector(x + ind, y, b);
  GoToXY(x, y + 1); Writeln('Vector C: ');
  ReadVector(x + ind, y + 1, c);
  
  y+= 1;
  
  GoToXY(x, y + 2); Writeln('AddVector: ');
  WriteVector(x + ind, y + 2, AddVector(a, b));
  GoToXY(x, y + 3); Writeln('SubVector: ');
  WriteVector(x + ind, y + 3, SubVector(a, b));
  GoToXY(x, y + 4); Writeln('ScalProd: ');
  GoToXY(x + ind, y + 4); Writeln(ScalProd(a, b));
  GoToXY(x, y + 5); Writeln('VectProd: ');
  WriteVector(x + ind, y + 5, VectProd(a, b));
  GoToXY(x, y + 6); Writeln('MixProd: ');
  GoToXY(x + ind, y + 6); Writeln(MixProd(a, b, c));
End.