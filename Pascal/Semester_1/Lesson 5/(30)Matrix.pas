Uses Crt;
Const n = 3; m = 4;
Var x: array [1..n, 1..m] of real;
    i, j: integer;
Begin
  for i:=1 to n do
  for j:=1 to m do 
  begin
    GoToXY(20, 20); Write('Enter the number x[' + i + ',' + j + '] : '); Readln(x[i,j]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(2 + 5*(j-1), 1+i); Writeln(x[i,j]:4:1);
  end;
  
  GoToXY(10, 20);
End.