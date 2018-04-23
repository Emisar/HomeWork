Uses Crt;
Const n = 10;
Var a: array [1..n, 1..n] of integer;
    i, j, m: integer;
Begin
  for i:=1 to n do
  for j:=1 to n do
  a[i,j]:= 0;
  
  m:= trunc((n + 1) / 2);
  
  for j:= 1 to m do
  for i:= j to n + 1 - j do
  a[i, j]:= 1;
  
  for i:=1 to n do
  for j:=1 to n do
  begin
    GoToXY(2 + 4 * j, 2 + i);
    Writeln(a[i,j]:3);
  end;
  GoToXY(20,20);
End.