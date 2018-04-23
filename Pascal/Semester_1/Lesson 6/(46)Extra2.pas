Uses Crt;
Const n = 2;
Var a, b, P, c: array [1..n, 1..n] of integer;
    i, j, x, k, power, S :integer;

Begin

//Ввод матрицы
  for i := 1 to n do
  for j := 1 to n do
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a[i, j]);
    GoToXY(20, 20); Writeln('                         ');
    GoToXY(5 + 2 * (j - 1), 5 + (i - 1)); Writeln(a[i, j]);
  end;

//Ввод степени  
  GoToXY(20, 20); Write('Enter the power: '); Readln(power);
  GoToXY(20, 20); Writeln('                         ');
  GoToXY(5, 10); Write('The power: '); Writeln(power);

//Начальные значения  
  for i := 1 to n do
  for j := 1 to n do
  begin
    b[i, j] := a[i, j];
    P[i, j] := a[i, j];
  end;

//Тело  
  for x := 2 to power do
  begin
  //Произведение
    for i := 1 to n do
    for j := 1 to n do
    begin
      S := 0;
      for k := 1 to n do S := S + P[i, k] * a[k, j];
      c[i, j] := S;
    end;
  //Суммирование
    for i := 1 to n do
    for j := 1 to n do 
    begin
      P[i, j] := c[i, j];
      b[i, j] := b[i, j] + c[i, j];
    end;
  end;

//Вывод матрицы  
  for i := 1 to n do
  for j := 1 to n do
  begin
    GoToXY(5 + 5 * (j - 1), 20 + (i - 1)); Writeln(b[i, j]:5);
  end;  
  GoToXY(20, 20);
End.