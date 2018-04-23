Uses Crt;
Const n=3;
      num=6;
Var a,b,c:array [1..n] of real;
    i, x:integer;
Begin
  x:=2;
  for i:=1 to n do
  begin
    GoToXY(35, 18);  readln(a[i]);
    GoToXY(35, 18);  writeln('      ');    
    GoToXY(x, i+1); writeln(a[i]:num:2);
  end;
  x:=x+num+2;
  GoToXY(x, 2 + trunc(n/2));
  writeln('+');
  x:=x+2;
  for i:=1 to n do
  begin
    GoToXY(35, 18);  readln(b[i]);
    GoToXY(35, 18);  writeln('      ');    
    GoToXY(x, i+1); writeln(b[i]:num:2);  
  end;
  x:=x+num+2;
  for i:=1 to n do c[i]:=a[i] + b[i];
  GoToXY(x, 2 + trunc(n/2));
  writeln('=');
  x:=x+2;
  for i:=1 to n do
  begin
    GoToXY(x, i+1); writeln(c[i]:num:2);
  end;
  GoToXY(15, 20);  
End.