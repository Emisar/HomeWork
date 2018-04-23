Uses Crt;
Const n = 10;
Var a: array [1..n, 1..n] of integer;
    i, j, k, x: integer;
Begin
  //Ввод матрицы
  for i:=1 to n do
  for j:=1 to n do
  a[i,j]:= 0;
  
  x:=1;
  //По часовой стрелке
  for k:=1 to trunc((n + 1)/2) do
  begin
    for j:=k to n + 1 - k do
    begin
      a[k,j]:=x;
      x:=x+1;
    end;
    for i:=k + 1 to n + 1 - k do
    begin
      a[i,n + 1 - k]:=x;
      x:=x+1;
    end;
    for j:=n - k downto k do
    begin
      a[n + 1 - k,j]:=x;
      x:=x+1;
    end;
    for i:=n - k downto k + 1 do
    begin
      a[i,k]:=x;
      x:=x+1;
    end;
  end;
  //Против часовой стрелки
  {for k:=1 to trunc((n + 1)/2) do
  begin
    for i:=k to n + 1 - k do
    begin
      a[i,k]:=x;
      x:=x+1;
    end;
    for j:=k + 1 to n + 1 - k do
    begin
      a[n + 1 - k,j]:=x;
      x:=x+1;
    end;
    for i:=n - k downto k do
    begin
      a[i,n + 1 - k]:=x;
      x:=x+1;
    end;
    for j:=n - k downto k + 1 do
    begin
      a[k,j]:=x;
      x:=x+1;
    end;
  end;}
  //Вывод матрицы
  for i:=1 to n do
  for j:=1 to n do
  begin
    GoToXY(2 + 4 * j, 2 + i);
    Writeln(a[i,j]:3);
  end;
  GoToXY(20,20);
End.