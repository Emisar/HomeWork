Uses Crt;
Const n = 3; m = 5;
Var a: array [1..n, 1..m] of real;
    b: array [1..m, 1..n] of real;
    i, j: integer;
Begin
  for i:= 1 to n do
  for j:= 1 to m do 
  begin
    GoToXY(20,20); Write('Enter the number a[' + i + ',' + j + '] : '); Readln(a[i,j]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(2 + 5*(j-1), 1+i); Writeln(a[i,j]:4:2);
  end;
  
  for i:= 1 to m do
  for j:= 1 to n do
  begin
    b[i,j]:= a[j,i];
  end;
  
  for i:= 1 to m do
  for j:= 1 to n do 
  begin
    GoToXY(32 + 5*(j-1), 1+i); Writeln(b[i,j]:4:2);
  end;
  
  GoToXY(10,20);
End.