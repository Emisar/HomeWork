Uses Crt;
Const n=3;
Var a,b,c:array [1..n] of real;
    i:integer;
Begin
  for i:=1 to n do
  begin
    GoToXY(5, i+1);
    readln(a[i]);
  end;
  for i:=1 to n do
  begin
    GoToXY(10,i+1);
    readln(b[i]);
  end;
  for i:=1 to n do c[i]:=a[i] + b[i];
  for i:=1 to n do
  begin
    GoToXY(15, i+1);
    Writeln(c[i]);
  end;
  GoToXY(15, 20);  
End.