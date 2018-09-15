Program GraphicLesson;

Uses GraphABC;

Var x, y: array [1..2] of integer;
    r, fi: integer;

Begin
  InitWindow(1, 1, 600, 600);
  r:= 10; fi:= 0;
  x[1]:= r + 10; y[1]:= r + 10;
  Window.Title := 'GraphicLesson';
  SetSmoothing(false);
  LockDrawing;
  While true do
  begin
    Window.Clear(clWhite);
    Circle(x[1], y[1], r);
    if (fi < 720) then fi+= 1 else fi:= 0;
    x[2]:= x[1] - trunc(r * cos(fi*pi/360));
    y[2]:= y[1] - trunc(r * sin(fi*pi/360));
    Line(x[1], y[1], x[2], y[2]);
    Redraw;
  end;
End.