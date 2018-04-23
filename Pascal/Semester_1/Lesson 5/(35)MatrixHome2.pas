Uses Crt;
Const n = 3;
Var a: array [1..n, 1..n] of real;
    x, y: array [1..n] of real;
    S: real;
    i, j, k: integer;
Begin
  for i:=1 to n do
  for j:=1 to n do 
  begin
    GoToXY(20, 20); Write('Enter the number a[' + i + ',' + j + '] : '); Readln(a[i,j]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(2 + 5*(j-1), 1+i); Writeln(a[i,j]:4:1);
  end;
    
  for i:=1 to n do 
  begin
    GoToXY(20, 20); Write('Enter the number x[' + i + '] : '); Readln(x[i]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(22, 1+i); Writeln(x[i]:4:1);
  end;
  
  for i:=1 to n do
  begin
    S:=0;
    for j:=1 to n do S:= S + a[i, j] * x[j];
    y[i]:=S
  end;
  
  for i:=1 to n do 
  begin
    GoToXY(32, 1+i); Writeln(y[i]:4:1);
  end;
  
  GoToXY(10, 20);
End.