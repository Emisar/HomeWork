Uses Crt;
Const n = 6;
Var a : array [1..n] of integer;
    i, m, glass, l : integer;
    
Begin
  for i := 1 to n do
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a[i]);
    GoToXY(20, 20); Writeln('                         ');
    GoToXY(5 + 2 * (i - 1), 5); Writeln(a[i]);
  end;
  
  m := trunc(n / 2);
  for i := 1 to m do
  begin
    l := 2 * i;
    glass := a[l - 1];
    a[l - 1] := a[l];
    a[l] := glass;
  end;
  
  for i := 1 to n do
  begin
    GoToXY(5 + 2 * (i - 1), 10); Writeln(a[i]);
  end;
  GoToXY(20, 20);
End.