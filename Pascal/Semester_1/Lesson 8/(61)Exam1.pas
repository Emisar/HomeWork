Uses Crt;
Const n = 5; m = 6;
Var a: array [1..n, 1..m] of integer;
    b, i, j, x, S, T: integer;
Begin
  x:= 0;
  for i:= 1 to n do
  for j:= 1 to m do
  begin
    x:= x + 1;
    a[i, j]:= x;
    GoToXY(0 + 4 * j, 1 + i); Writeln(a[i, j]:4);
  end;
  
  GoToXY(20, 20); Write('Enter the first column: '); Readln(S);
  GoToXY(20, 20); Write('                                     ');
  
  GoToXY(20, 20); Write('Enter the second column: '); Readln(T);
  GoToXY(20, 20); Write('                                     ');
  
  for i:= 1 to n do
  begin
    b:= a[i, S];
    a[i, S]:= a[i, T];
    a[i, T]:= b;
  end;
  
  for i:= 1 to n do
  for j:= 1 to m do
  begin
    GoToXY(0 + 4 * j, n + 5 + i); Writeln(a[i, j]:4);
  end;
  GoToXY(20, 24);
End.    
