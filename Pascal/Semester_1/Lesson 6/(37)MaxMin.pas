Uses Crt;
Const n = 3; m = 4;
Var a : array [1..n, 1..m] of integer;
    i, j, z, x :integer;

Begin
  for i := 1 to n do
  for j := 1 to m do
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a[i, j]);
    GoToXY(20, 20); Writeln('                         ');
    GoToXY(5 + 2 * (j - 1), 5 + (i - 1)); Writeln(a[i, j]);
  end;
  
  Z := a [1, 1];
  for j := 2 to m do
  if (a[1, j] < z) then z := a[1, j];
  x := z;
  
  for i := 2 to n do
  begin
    z := a[i, 1];
    for j := 1 to m do
    if (a[i, j] < z) then z := a[i, j];
    if (z > x) then x := z;
  end;
  
  GoToXY(5, 10);
  Writeln('MaxMin: ' + x);
  GoToXY(20, 20);
End.