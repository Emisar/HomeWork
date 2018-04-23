Uses Crt;
Const n = 10;
Var a: array [1..n, 1..n] of integer;
    i, j: integer;
Begin
  //Ввод матрицы
  for i:=1 to n do
  for j:=1 to n do
  a[i,j]:= 0;
  
  for j:=1 to n do
  begin
    a[1, j]:=1;
    a[n, j]:=1;
  end;
  
  for i:=1 to n do
  a[i, n + 1 - i]:=1;
  
  //Вывод матрицы
  for i:=1 to n do
  for j:=1 to n do
  begin
    GoToXY(2 + 4 * j, 2 + i);
    Writeln(a[i,j]:3);
  end;
  GoToXY(20,20);
End.