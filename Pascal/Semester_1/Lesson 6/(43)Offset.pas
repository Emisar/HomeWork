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
  
  GoToXY(20, 20); Write('Enter the number k: '); Readln(k);
  GoToXY(20, 20); Writeln('                         ');
  GoToXY(5, 7); Write('The possition: '); Writeln(k);
  
  GoToXY(20, 20); Write('Enter the number x: '); Readln(x);
  GoToXY(20, 20); Writeln('                         ');
  GoToXY(5, 8); Write('The necessary number: '); Writeln(x);
  
  for i := 2 to k do a[i - 1] := a[i];
  a[k] := x;
  
  for i := 1 to n do
  begin
    GoToXY(5 + 2 * (i - 1), 10); Writeln(a[i]);
  end;
  GoToXY(20, 20);
End.