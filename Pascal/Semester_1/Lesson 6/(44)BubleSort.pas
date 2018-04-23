Uses Crt;
Const n = 8;
Var a : array [1..n] of integer;
    i, k, x : integer;
    
Begin
  for i := 1 to n do
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a[i]);
    GoToXY(20, 20); Writeln('                         ');
    GoToXY(5 + 2 * (i - 1), 5); Writeln(a[i]);
  end;
  
  x := a[1];
  k := 1;
  
  for i := 2 to n do
  if (a[i] < x) then
  begin
    x := a[i];
    k := i;
  end;
  
  for i := k downto 2 do a[i] := a[i - 1];
  a[1] := x;
  
  for i := 1 to n do
  begin
    GoToXY(5 + 2 * (i - 1), 10); Writeln(a[i]);
  end;
  GoToXY(20, 20);
End.