Uses Crt;
Const n = 3; m = 4;
Var a : array [1..n, 1..m] of integer;
    i, j, x, y :integer;

Begin
  for i := 1 to n do
  for j := 1 to m do
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a[i, j]);
    GoToXY(20, 20); Writeln('                         ');
    GoToXY(5 + 2 * (j - 1), 5 + (i - 1)); Writeln(a[i, j]);
  end;
  
  x := a[1, 1];
  for i := 1 to n do
  for j := 1 to m do
  if (a[i, j] > x) then x := a[i, j];
  
  y := a[1, 1];
  for i := 1 to n do
  for j := 1 to m do
  if (a[i, j] > y) and (a[i, j] < x) then y := a[i, j];
  
  GoToXY(5, 10);
  Writeln('Max num: ' + x);
  GoToXY(5, 11);
  Writeln('Second max num: ' + y);
  GoToXY(20, 20);
End.