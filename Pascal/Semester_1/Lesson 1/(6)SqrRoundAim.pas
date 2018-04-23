Var x, y; real;
    n: integer;
    
Begin
  Read(x, y);
  n:=0;
  if (x>=-1) and (x<=0) and (y<=0) and (y>=-1) then n:=1;
  if (sqr(x)+sqr(y)<=1) and (x>=0) and (y>=0) then n:=2;
  Write(n);
End.