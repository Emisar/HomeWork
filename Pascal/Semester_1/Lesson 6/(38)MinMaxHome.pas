Uses Crt;
Const n = 3; m = 4;
Var a : array [1..n, 1..m] of integer;
    i, j, z, y :integer;

Begin
  for i := 1 to n do
  for j := 1 to m do
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a[i, j]);
    GoToXY(20, 20); Writeln('                         ');
    GoToXY(5 + 2 * (j - 1), 5 + (i - 1)); Writeln(a[i, j]);
  end;
  
  z := a[1, 1];
  for i := 2 to n do
  if (a[i, 1] > z) then z := a[i, 1];
  y := z;
  
  for j := 2 to m do
  begin
    z := a[1, j];
    for i := 1 to n do
    if (a[i, j] > z) then z := a[i, j];
    if (z < y) then y := z;
  end;
    
  GoToXY(5, 10);
  Writeln('MinMax: ' + y);
  GoToXY(20, 20);
End.