Uses Crt;
Const n = 10;
Var x: array [1..n] of real;
    z: real;
    i: integer;
Begin
  for i:=1 to n do 
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(x[i]);
    GoToXY(20,20); Writeln('                          ');
    GoToXY(2, 1+i); Writeln(x[i]);
  end;
  
  z:=x[1];
  
  for i:=1 to n do
  if (x[i] < z) then z:=x[i];
  
  GoToXY(2, 15);
  Writeln('Min = ' + z);
  GoToXY(10, 20);
End.