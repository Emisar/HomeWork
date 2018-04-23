Program Planets;

Uses GraphABC;

Const 
  WINDOW_WIDTH = 500;
  WINDOW_HEIGHT = 300;
  NUMBER_OF_PLANET = 3;
  SUN = clYellow;
  EARTH = clSkyBlue;
  MOON = clLightGray;
  
Procedure SetDefaultPen();
begin
    SetBrushColor(clWhite);
    SetPenColor(clBlack);
    SetPenWidth(1);
end;
  
Procedure DrawPlanet(x, y, r: integer; planetColor: Color);
begin
    SetPenColor(clBlack);
    SetPenWidth(3);
    DrawCircle(x, y, r);
    SetBrushColor(planetColor);
    FillCircle(x, y, r);
    SetDefaultPen;
end;

Var x, y, r, fi: array of integer;
    degree: real;
    
Begin
  SetLength(x, NUMBER_OF_PLANET); 
  SetLength(y, NUMBER_OF_PLANET); 
  SetLength(r, NUMBER_OF_PLANET);
  SetLength(fi, NUMBER_OF_PLANET - 1);
  // Радиусы планет
  r[0]:= trunc(WINDOW_HEIGHT / 5);
  r[1]:= trunc(r[0] / 2);
  r[2]:= trunc(r[1] / 2);
  // Координаты солнца
  x[0]:= trunc(WINDOW_WIDTH / 2);
  y[0]:= trunc(WINDOW_HEIGHT / 2);
  foreach elem: integer in fi do fi[elem]:= 0;
  // Настройка окна
  InitWindow(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  CenterWindow;
  LockDrawing;
  
  while (true) do
  begin
    Window.Clear;
    if (fi[0] < 360) then fi[0]+= 1 else fi[0]:= 0;
    // Координаты земли
    degree:= fi[0] * 2 * pi / 360;
    x[1]:= x[0] - trunc(1.5 * (r[0] + r[1]) * cos(degree));
    y[1]:= y[0] - trunc(0.5 * (r[0] + r[1]) * sin(degree));
    if (fi[1] < 360) then fi[1]+= 3 else fi[1]:= 0;
    // Координаты луны
    degree:= fi[1] * 2 * pi / 360;
    x[2]:= x[1] - trunc(1.5 * (r[1] + r[2]) * cos(degree));
    y[2]:= y[1] - trunc(0.5 * (r[1] + r[2]) * sin(degree));
    // Отрисовка
    if (fi[1] < 180) then
    begin
      if (fi[0] < 180) then 
      begin
        DrawPlanet(x[2], y[2], r[2], MOON);
        DrawPlanet(x[1], y[1], r[1], EARTH);
        DrawPlanet(x[0], y[0], r[0], SUN);
      end
      else
      begin
        DrawPlanet(x[0], y[0], r[0], SUN);
        DrawPlanet(x[2], y[2], r[2], MOON);
        DrawPlanet(x[1], y[1], r[1], EARTH);
      end;
    end
    else
    begin
      if (fi[0] < 180) then 
      begin
        DrawPlanet(x[1], y[1], r[1], EARTH);
        DrawPlanet(x[2], y[2], r[2], MOON);
        DrawPlanet(x[0], y[0], r[0], SUN);
      end
      else
      begin
        DrawPlanet(x[0], y[0], r[0], SUN);
        DrawPlanet(x[1], y[1], r[1], EARTH);
        DrawPlanet(x[2], y[2], r[2], MOON);
      end;
    end;
    Redraw;
  end;
End.