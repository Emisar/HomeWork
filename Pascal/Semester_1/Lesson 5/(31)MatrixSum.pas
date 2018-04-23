Uses Crt;
Const n = 3; m = 4;
Var a, b, c: array [1..n, 1..m] of real;
    i, j: integer;
Begin
  for i:=1 to n do
  for j:=1 to m do 
  begin
    GoToXY(20, 20); Write('Enter the number a[' + i + ',' + j + '] : '); Readln(a[i,j]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(2 + 5*(j-1), 1+i); Writeln(a[i,j]:4:1);
  end;
  
  for i:=1 to n do
  for j:=1 to m do 
  begin
    GoToXY(20, 20); Write('Enter the number b[' + i + ',' + j + '] : '); Readln(b[i,j]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(27 + 5*(j-1), 1+i); Writeln(b[i,j]:4:1);
  end;
  
  for i:=1 to n do
  for j:=1 to m do c[i,j] := a[i,j] + b[i,j];
  
  for i:=1 to n do
  for j:=1 to m do 
  begin
    GoToXY(52 + 5*(i-1), 1+j); Writeln(c[i,j]:4:1);
  end;
  
  GoToXY(10, 20);
End.