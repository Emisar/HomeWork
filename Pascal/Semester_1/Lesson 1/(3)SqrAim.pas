Var x, y: real;
    n: integer;

Begin
  Read (x, y);
  n:=0;
  if (abs(x)<=1) and (abs(y)<=1) then n:=1;
  write(n);
End.