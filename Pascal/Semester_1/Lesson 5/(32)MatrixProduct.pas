Uses Crt;
Const n = 3;
Var a, b, c: array [1..n, 1..n] of real;
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
  for j:=1 to n do 
  begin
    GoToXY(20, 20); Write('Enter the number b[' + i + ',' + j + '] : '); Readln(b[i,j]);
    GoToXY(20,20); Writeln('                                            ');
    GoToXY(22 + 5*(j-1), 1+i); Writeln(b[i,j]:4:1);
  end;
  
  for i:=1 to n do
  for j:=1 to n do 
  begin
    S:=0;
    for k:=1 to n do S:= S + a[i,k] * b[k,j];
    c[i,j]:= S;       
  end;
  
  for i:=1 to n do
  for j:=1 to n do 
  begin
    GoToXY(42 + 5*(i-1), 1+j); Writeln(c[i,j]:4:1);
  end;
  
  GoToXY(10, 20);
End.