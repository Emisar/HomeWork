Var x,y:real;
    n:integer;

Begin
  Read (x, y);
  n:=0;
  {if (sqr(x)+sqr(y)<=1) then
    if (y>=0) then n:=1
    else n:=2;}
  if (sqr(x)+sqr(y)<=1) and (y>=0) then n:=1;
  if (sqr(x)+sqr(y)<=1) and (y<=0) then n:=2;
  Write(n);
End.