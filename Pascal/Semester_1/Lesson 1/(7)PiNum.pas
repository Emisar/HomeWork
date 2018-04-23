Var x,y,p:real;
    a,m:integer;

Const N=100000;

Begin
  Randomize;
  m:=0;
  for a:=0 to N do begin
    x:=2*random-1;
    y:=2*random-1;
    if sqr(x)+sqr(y)<=1 then m:=m+1;
  end;
  p:=(4*m)/N;
  writeln(p:14:10, pi:14:10);
End.