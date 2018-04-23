Uses Crt;
Const n = 10;
Var x: array [1..n] of real;
    z: real;
    i, k: integer;
Begin
  for i:=1 to n do 
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(x[i]);
    GoToXY(20,20); Writeln('                          ');
    GoToXY(2, 1+i); Writeln(x[i]:6:2);
  end;
  
  z := x[1];
  k := 1;
  
  for i:=1 to n do
  if (x[i] < z) then 
  begin
    k:=i;
    z:=x[i];
  end;
  
  GoToXY(2, 15);
  Writeln('Min: x[' + k + '] = ' + z);
  GoToXY(10, 20);
End.