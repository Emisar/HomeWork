Uses Crt;
Const n = 10;
Var a: array [1..n, 1..n] of integer;
    i, j, m: integer;
Begin
  for i:=1 to n do
  for j:=1 to n do
  a[i,j]:= 0;
  
  m:= trunc(1 + (n / 2));
  
  for i:= m to n do
  for j:= n + 1 - i to i do
  a[i, j]:= 1;
  
  for i:=1 to n do
  for j:=1 to n do
  begin
    GoToXY(2 + 4 * j, 2 + i);
    Writeln(a[i,j]:3);
  end;
  GoToXY(20,20);
End.