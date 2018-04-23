var x, y: real;

Begin
  Read(x);
  if abs(x)>=0.5 then y:=1/x
  {if (x<=-0.5) and (x>=0.5) then y:=1/x}
  else
    if abs(x)<0.5 then y:=4*x;
    {if (x>-0.5) and (x<0.5) then y:=4*x;}
  write(y);
End.