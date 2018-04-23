///- Complex
/// Модуль для работы с комплексными числами
Unit Cplx;

Interface
  uses Crt, SFaP;
  Const 
    /// Константа точности
    eps = 0.000001;
    /// Константа размера матрицы
    matrixSize = 2;
    /// Константа размера вектора
    vectorSize = 3;
  Type 
    ///- complex(Re, Im)
    /// Комплексное число типа (Re + i * Im)
    complex = record
      Re, Im: real;
    end;
    ///- matrixC(x, y)
    /// Двумерный массив (матрица) комплексных чисел
    matrixC = array [1..matrixSize, 1..matrixSize] of complex;
    ///- Vector <x, y, z>
    /// Математическая величина, характеризующаяся численным значением и направлением
    VectorC = array [1..vectorSize] of complex;
  
  //===== ===== ===== ===== ===== Комплексные числа ===== ===== ===== ===== =====
  
  /// Происводит ввод комплексного числа z в строку с координатами (x, y)
  Procedure ReadC( x, y: integer; Var z: complex);
  /// Выводит комплексное число z на экран в строку с координатами (x, y)
  Procedure WriteC(x, y: integer; z: complex);
  /// Инвертирует комплексное число z
  Function Inv(z: complex): complex;
  /// Возвращает сопряженное число
  Function Code(z: complex): complex;
  /// Возвращает комплексный ноль (0, 0)
  Function Zero(): complex;
  /// Возвращает комплексную единицу (1, 0)
  Function One(): complex;
  /// Возвращает результат сложения двух комплексных чисел u и v
  Function Add(u, v: complex): complex;
  /// Возвращает результат вычитания двух комплексных чисел u и v
  Function Sub(u, v: complex): complex;
  /// Возвращает результат произведения двух комплексных чисел u и v
  Function Mult(u, v: complex): complex;
  /// Возвращает результат произведение вещественного числа a и комплексного числа z
  Function Prod(a: real; z: complex): complex;
  /// Возвращает результат деления двух комплексных чисел u и v
  Function Division(u, v: complex): complex;
  /// Возвращает модуль комплексного числа z
  Function Modul(z: complex): real;
  /// Возвращает результат возведения комплексного числа z в степень degree
  Function Pow(z: complex; degree: real): complex;
  /// Возвращает экспоненту комплексного числа z
  Function ExpC(z: complex): complex;
  /// Возвращает косинус комплексного числа z
  Function CosC(z: complex): complex;
  /// Возвращает синус комплексного числа z
  Function SinC(z: complex): complex;
  /// Выводит меню для комплексных чисел
  Procedure MenuComplex();
  
  //===== ===== ===== ===== ===== Матрицы ===== ===== ===== ===== =====
  
  /// Производит ввод матрицы комплексных чисел
  Procedure ReadMatrixC(x, y: integer; Var a: matrixC);
  /// Выводит матрицу комплексных чисел
  Procedure WriteMatrixC(x, y: integer; a: matrixC);
  /// Возвращает резутьтат сложения матриц
  Function AddMatrix(a, b: matrixC): matrixC;
  /// Возвращает произведение матриц
  Function MultMatrix(a, b: matrixC): matrixC;
  /// Возвращает результат возведения матрицы z в степень degree
  Function PowMatrix(z: matrixC; degree: real): matrixC;
  /// Возвращает результат произведение вещественного числа a и матрицы z
  Function ProdRealMatrix(a: real; z: matrixC): matrixC;
  /// Возвращает результат произведение комплексного числа a и матрицы z
  Function ProdComplexMatrix(a: complex; z: matrixC): matrixC;
  /// Возвращает нулевую матрицу [(0, 0),(0, 0),(0, 0),(0, 0)]
  Function ZeroMatrix(): matrixC;
  /// Возвращает единичную матрицу [(1, 0),(0, 0),(0, 0),(1, 0)]
  Function OneMatrix(): matrixC;
  /// Возвращает модуль матрицы a
  Function NormMatrix(a: matrixC): real;
  /// Возвращает экспоненту матрицы a
  Function ExpM(a: matrixC): matrixC;
  /// Возвращает косинус матрицы a
  Function CosM(a: matrixC): matrixC;
  /// Возвращает синус матрицы a
  Function SinM(a: matrixC): matrixC;
  /// Выводит меню для комплексных матриц
  Procedure MenuComplexMatrix();
  
  //===== ===== ===== ===== ===== Вектора ===== ===== ===== ===== =====
  
  /// Производит ввод вектора a в строку с координатами x, y
  Procedure ReadCVector(x, y: integer; Var a: VectorC);
  /// Производит вывод вектора a в строку с координатами x, y
  Procedure WriteCVector(x, y: integer; a: VectorC);
  /// Возвращает сумму векторов x и y
  Function AddCVector(x, y: VectorC): VectorC;
  /// Возвращает разность векторов x и y
  Function SubCVector(x, y: VectorC): VectorC;
  /// Возвращает векторное произведение векторов x и y
  Function VectProdC(x, y: VectorC): VectorC;
  /// Возвращает результат возведения вектора x в степень degree
  Function VectPowC(x: VectorC; degree: real): VectorC;
  /// Возвращает скалярное произведение векторов x и y
  Function ScalProdC(x, y: VectorC): complex;
  /// Возвращает смешанное произведение векторов a, b и c
  Function MixProdC(a, b, c: VectorC): complex;
  /// Возвращает модуль вектора
  Function ModulVector(x: VectorC): real;
  /// Выводит меню для векторов
  Procedure MenuComplexVector();
  
  Implementation

  //===== ===== ===== ===== ===== Комплексные числа ===== ===== ===== ===== =====
  
  Procedure ReadC( x, y: integer; Var z: complex);
  begin
    GoToXY(20, 20); Write('Enter the z.Re: '); Readln(z.Re);
    GoToXY(x, y); Writeln('(', z.Re:6:2, ', ');
    GoToXY(20, 20); ClearLine;
    
    GoToXY(20, 20); Write('Enter the z.Im: '); Readln(z.Im);
    GoToXY(x + 9, y); Writeln(z.Im:6:2, ')');
    GoToXY(20, 20); ClearLine;
  end;

  Procedure WriteC(x, y: integer; z: complex);
  begin
    GoToXY(x, y);
    Writeln('(', z.Re:6:2, ', ', z.Im:6:2, ')');
  end;

  Function Inv(z: complex): complex;
  Var znam: real;
      w: complex;
  begin
    znam := sqr(z.Re) + sqr(z.Im);
    w.Re := z.Re / znam;
    w.Im := -z.Im / znam;
    Inv:= w;
  end;

  Function Code(z: complex): complex;
  Var w: complex;
  begin
    w.Re := z.Re;
    w.Im := -z.Im;
    Code:= w;
  end;

  Function Zero(): complex;
  Var w: complex;
  begin
    w.Re:= 0;
    w.Im:= 0;
    Zero:= w;
  end;

  Function One(): complex;
  Var w: complex;
  begin
    w.Re:= 1;
    w.Im:= 0;
    One:= w;
  end;

  Function Add(u, v: complex): complex;
  Var w: complex;
  begin
    w.Re := u.Re + v.Re;
    w.Im := u.Im + v.Im;
    Add := w;
  end;

  Function Sub(u, v: complex): complex;
  Var w: complex;
  begin
    w.Re := u.Re - v.Re;
    w.Im := u.Im - v.Im;
    Sub := w;
  end;

  Function Mult(u, v: complex): complex;
  Var w: complex;
  begin
    w.Re := u.Re * v.Re - u.Im * v.Im;
    w.Im := u.Re * v.Im + u.Im * v.Re;
    Mult := w;
  end;

  Function Prod(a: real; z: complex): complex;
  Var w: complex;
  begin
    w.Re := a * z.Re;
    w.Im := a * z.Im;
    Prod := w;
  end;

  Function Division(u, v: complex): complex;
  begin
    Result:= Mult(u, Inv(v));
  end;
  
  Function Modul(z: complex): real;
  begin
    Modul := sqrt(sqr(z.Re) + sqr(z.Im));
  end;
  
  Function Pow(z: complex; degree: real): complex;
  Var i, n: integer;
      a: complex;
  begin
    n := Round(degree);
    a := z;
    for i := 2 to n do a := Mult(a, z);
    if (n = 0) then Pow:= One() else Pow := a;
  end;
    
  Function ExpC(z: complex): complex;
  Var k: integer;
      P, S: complex;
  begin
    k:= 0; P:= One(); S:= One();
    while Modul(P) >= eps do
    begin
      k+= 1;
      P:= Mult(P, z);
      P:= Prod(1/k, P);
      S:= Add(S, P);
    end;
    ExpC:= S;
  end;
    
  Function CosC(z: complex): complex;
  Var k: integer;
      z2, P, S: complex;
  begin
    z2:= Pow(z, 2);
    k:= 0; P:= One(); S:= One();
    while Modul(P) >= eps do
    begin
      k+= 2;
      P:= Mult(P, z2);
      P:= Prod(1/k/(k-1), P);
      S:= Add(S, P);
    end;
    CosC:= S;
  end;
    
  Function SinC(z: complex): complex;
  Var k: integer;
      z2, P, S: complex;
  begin
    z2:= Pow(z, 2);
    k:= 1; P:= z; S:= z;
    while Modul(P) >= eps do
    begin
      k+= 2;
      P:= Mult(P, z2);
      P:= Prod(1/k/(k-1), P);
      S:= Add(S, P);
    end;
    SinC:= S;
  end;
  
  Procedure MenuComplex();
  Var menuElem: array of String;
      mode: integer;
      a, b: Complex;
      x: real;
      menuOpen: boolean;
  begin
    SetLength(menuElem, 12);
    menuElem[0] := 'Сложение'; 
    menuElem[1] := 'Вычитание'; 
    menuElem[2] := 'Умножение'; 
    menuElem[3] := 'Умножение на скаляр';
    menuElem[4] := 'Возведение в степень';
    menuElem[5] := 'Деление';
    menuElem[6] := 'Модуль';
    menuElem[7] := 'Sin';
    menuElem[8] := 'Cos';
    menuElem[9] := 'Exp';
    menuElem[10] := 'Zero';
    menuElem[11] := 'One';
    menuOpen := true;
    while menuOpen do
    begin
      PrintMenuElem('Комплексные числа' ,menuElem);
      Readln(mode);
      ClrScr;
      case mode of 
        1: begin 
             GoToXY(2, 2); Writeln('Первое слагаемое: '); ReadC(20, 2, a);
             GoToXY(2, 3); Writeln('Второе слагаемое: '); ReadC(20, 3, b);
             GoToXY(2, 5); Writeln('Сумма: '); WriteC(20, 5, Add(a, b));
             Wait;
           end;
        2: begin
             GoToXY(2, 2); Writeln('Уменьшаемое: '); ReadC(20, 2, a);
             GoToXY(2, 3); Writeln('Вычитаемое: ');ReadC(20, 3, b);
             GoToXY(2, 5); Writeln('Разность: '); WriteC(20, 5, Sub(a, b));
             Wait;
           end;
        3: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadC(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadC(20, 3, b);
             GoToXY(2, 5); Writeln('Произведение: '); WriteC(20, 5, Mult(a, b));
             Wait;
           end;
        4: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadC(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); InputNumber(20, 3, x);
             GoToXY(2, 5); Writeln('Произведение: '); WriteC(20, 5, Prod(x, a));
             Wait;
           end;
        5: begin
             GoToXY(2, 2); Writeln('Основание: '); ReadC(20, 2, a);
             GoToXY(2, 3); Writeln('Показатель: '); InputNumber(20, 3, x);
             GoToXY(2, 5); Writeln('Результат: '); WriteC(20, 5, Pow(a, x));
             Wait;
           end;
        6: begin
             GoToXY(2, 2); Writeln('Делимое: '); ReadC(20, 2, a);
             GoToXY(2, 3); Writeln('Делитель: '); ReadC(20, 3, b);
             GoToXY(2, 5); Writeln('Частное: '); WriteC(20, 5, Division(a, b));
             Wait;
           end;
        7: begin
             GoToXY(2, 2); Writeln('Число: '); ReadC(20, 2, a);
             GoToXY(2, 4); Writeln('Модуль числа: '); OutputNumber(20, 4, Modul(a));
             Wait;
           end;
        8: begin
             GoToXY(2, 2); Writeln('Число: '); ReadC(20, 2, a);
             GoToXY(2, 4); Writeln('Синус числа: '); WriteC(20, 4, SinC(a));
             Wait;
           end;
        9: begin
             GoToXY(2, 2); Writeln('Число: '); ReadC(20, 2, a);
             GoToXY(2, 4); Writeln('Косинус числа: '); WriteC(20, 4, CosC(a));
             Wait;
           end;
        10: begin
             GoToXY(2, 2); Writeln('Число: '); ReadC(20, 2, a);
             GoToXY(2, 4); Writeln('Экспонента числа: '); WriteC(20, 4, ExpC(a));
             Wait;
           end;
        11: begin
             GoToXY(2, 2); Writeln('Нулевое число: '); WriteC(20, 2, Zero);
             Wait;
           end;
        12: begin
             GoToXY(2, 2); Writeln('Единичное число: '); WriteC(20, 2, One);
             Wait;
           end;
        0: menuOpen:= false;
        else
        begin
          Writeln('Некорректный ввод! Выберите один из элементов меню!');
          Wait;
        end;
      end;
    end;
  end;
  
  //===== ===== ===== ===== ===== Матрицы ===== ===== ===== ===== =====

  Procedure ReadMatrixC(x, y: integer; Var a: matrixC);
  Var i, j: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    ReadC(x + (i - 1) * 16, y + (j - 1), a[i, j]);
  end;
  
  Procedure WriteMatrixC(x, y: integer; a: matrixC);
  Var i, j: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    WriteC(x + (i - 1) * 16, y + (j - 1), a[i, j]);
  end;
  
  Function AddMatrix(a, b: matrixC): matrixC;
  Var c: matrixC;
      i, j: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    c[i, j]:= Add(a[i, j], b[i, j]);
    AddMatrix:= c;
  end;
  
  Function MultMatrix(a, b: matrixC): matrixC;
  Var c: matrixC;
      S, P: complex;
      i, j, k: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    begin
      S:= Zero();
      for k:= 1 to matrixSize do
      begin
        P:= Mult(a[i, k], b[k, j]);
        S:= Add(S, P);
      end;
      c[i, j]:= S;
    end;
    MultMatrix:= c;
  end;
  
  Function PowMatrix(z: matrixC; degree: real): matrixC;
  Var i, n: integer;
      a: matrixC;
  begin
    a := z;
    n:= Round(degree);
    for i := 2 to n do a := MultMatrix(a, z);
    if (n = 0) then PowMatrix:= OneMatrix() else PowMatrix := a;
  end;
  
  Function ProdRealMatrix(a: real; z: matrixC): matrixC;
  Var c: matrixC;
      i, j: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    c[i, j]:= Prod(a, z[i, j]);
    ProdRealMatrix:= c;
  end;
  
  Function ProdComplexMatrix(a: complex; z: matrixC): matrixC;
  Var c: matrixC;
      i, j: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    c[i, j]:= Mult(a, z[i, j]);
    ProdComplexMatrix:= c;
  end;
  
  Function ZeroMatrix(): matrixC;
  Var a: matrixC;
      i, j: integer;
  begin
    for i:= 1 to matrixSize do
    for j:= 1 to matrixSize do
    a[i, j]:= Zero();
    ZeroMatrix:= a;
  end;
  
  Function OneMatrix(): matrixC;
  Var a: matrixC;
      k: integer;
  begin
    a:= ZeroMatrix();
    for k:= 1 to matrixSize do a[k, k]:= One();
    OneMatrix:= a;
  end;
  
  Function NormMatrix(a: matrixC): real;
  Var S, z: real;
      i, j: integer;
  begin
    z:= 0;
    for i:= 1 to matrixSize do
    begin
      S:= 0;
      for j:= 1 to matrixSize do S:= S + Modul(a[i, j]);
      if (S > z) then z:= S;
    end;
    NormMatrix:= z;
  end;
  
  Function ExpM(a: matrixC): matrixC;
  Var S, P: matrixC;
      k: integer;
  begin
    P:= OneMatrix();
    S:= OneMatrix();
    k:= 0;
    while NormMatrix(P) >= eps do
    begin
      k+= 1;
      P:= MultMatrix(P, a);
      P:= ProdRealMatrix(1/k, P);
      S:= AddMatrix(S, P);
    end;
    ExpM:= S;
  end;
  
  Function CosM(a: matrixC): matrixC;
  Var k: integer;
      a2, P, S: matrixC;
  begin
    a2:= PowMatrix(a, 2);
    k:= 0; P:= OneMatrix(); S:= OneMatrix();
    while NormMatrix(P) >= eps do
    begin
      k+= 2;
      P:= MultMatrix(P, a2);
      P:= ProdRealMatrix(1/k/(k-1), P);
      S:= AddMatrix(S, P);
    end;
    CosM:= S;
  end;
  
  Function SinM(a: matrixC): matrixC;
  Var k: integer;
      a2, P, S: matrixC;
  begin
    a2:= PowMatrix(a, 2);
    k:= 1; P:= a; S:= a;
    while NormMatrix(P) >= eps do
    begin
      k+= 2;
      P:= MultMatrix(P, a2);
      P:= ProdRealMatrix(1/k/(k-1), P);
      S:= AddMatrix(S, P);
    end;
    SinM:= S;
  end;
  
  Procedure MenuComplexMatrix();
  Var menuElem: array of String;
      mode: integer;
      a, b: MatrixC;
      x: real;
      y: complex;
      menuOpen: boolean;
  begin
    SetLength(menuElem, 11);
    menuElem[0] := 'Сложение';
    menuElem[1] := 'Умножение'; 
    menuElem[2] := 'Возведение в степень';
    menuElem[3] := 'Умножение на скаляр';
    menuElem[4] := 'Умножение на комплексное число';
    menuElem[5] := 'Модуль';
    menuElem[6] := 'Sin';
    menuElem[7] := 'Cos';
    menuElem[8] := 'Exp';
    menuElem[9] := 'Zero';
    menuElem[10] := 'One';
    menuOpen := true;
    while menuOpen do
    begin
      PrintMenuElem('Комплексные матрицы' ,menuElem);
      Readln(mode);
      ClrScr;
      case mode of 
        1: begin 
             GoToXY(2, 2); Writeln('Первое слагаемое: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Второе слагаемое: '); ReadMatrixC(20, 5, b);
             GoToXY(2, 8); Writeln('Сумма: '); WriteMatrixC(20, 8, AddMatrix(a, b));
             Wait;
           end;
        2: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Второй множитель: '); ReadMatrixC(20, 5, b);
             GoToXY(2, 8); Writeln('Произведение: '); WriteMatrixC(20, 8, MultMatrix(a, b));
             Wait;
           end;
        3: begin
             GoToXY(2, 2); Writeln('Основание: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Показатель: '); InputNumber(20, 5, x);
             GoToXY(2, 7); Writeln('Результат: '); WriteMatrixC(20, 7, PowMatrix(a, x));
             Wait;
           end;
        4: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Второй множитель: '); InputNumber(20, 5, x);
             GoToXY(2, 7); Writeln('Произведение: '); WriteMatrixC(20, 7, ProdRealMatrix(x, a));
             Wait;
           end;
        5: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Второй множитель: '); ReadC(20, 5, y);
             GoToXY(2, 7); Writeln('Частное: '); WriteMatrixC(20, 7, ProdComplexMatrix(y, a));
             Wait;
           end;
        6: begin
             GoToXY(2, 2); Writeln('Число: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Модуль числа: '); OutputNumber(20, 5, NormMatrix(a));
             Wait;
           end;
        7: begin
             GoToXY(2, 2); Writeln('Число: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Синус числа: '); WriteMatrixC(20, 5, SinM(a));
             Wait;
           end;
        8: begin
             GoToXY(2, 2); Writeln('Число: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Косинус числа: '); WriteMatrixC(20, 5, CosM(a));
             Wait;
           end;
        9: begin
             GoToXY(2, 2); Writeln('Число: '); ReadMatrixC(20, 2, a);
             GoToXY(2, 5); Writeln('Экспонента числа: '); WriteMatrixC(20, 5, ExpM(a));
             Wait;
           end;
        10: begin
             GoToXY(2, 2); Writeln('Нулевое число: '); WriteMatrixC(20, 2, ZeroMatrix);
             Wait;
           end;
        11: begin
             GoToXY(2, 2); Writeln('Единичное число: '); WriteMatrixC(20, 2, OneMatrix);
             Wait;
           end;
        0: menuOpen:= false;
        else
        begin
          Writeln('Некорректный ввод! Выберите один из элементов меню!');
          Wait;
        end;
      end;
    end;
  end;
  
  //===== ===== ===== ===== ===== Вектора ===== ===== ===== ===== =====
  
  Procedure ReadCVector(x, y: integer; Var a: VectorC);
  Var i: integer;
  begin
    GoToXY(x, y); Writeln('<');
    for i:= 1 to vectorSize do
    begin
      ReadC(x + 1 + (i - 1) * 18, y, a[i]);
      GoToXY(x + i * 17 + (i - 1), y);
      if (i <> vectorSize) then Writeln(', ');
    end;
    GoToXY(x + 53, y); Writeln('>');
  end;
  
  Procedure WriteCVector(x, y: integer; a: VectorC);
  Var i: integer;
  begin
    GoToXY(x, y); Writeln('<');
    for i:= 1 to vectorSize do
    begin
      WriteC(x + 1 + (i - 1) * 18, y, a[i]);
      GoToXY(x + i * 17 + (i - 1), y);
      if (i <> vectorSize) then Writeln(', ');
    end;
    GoToXY(x + 53, y); Writeln('>');
  end;
  
  Function AddCVector(x, y: VectorC): VectorC;
  Var i: integer;
      z: VectorC;
  begin
    for i:= 1 to vectorSize do z[i]:= Add(x[i], y[i]);
    AddCVector:= z;
  end;
  
  Function SubCVector(x, y: VectorC): VectorC;
  Var i: integer;
      z: VectorC;
  begin
    for i:= 1 to vectorSize do z[i]:= Sub(x[i], y[i]);
    SubCVector:= z;
  end;
  
  Function VectProdC(x, y: VectorC): VectorC;
  Var z: VectorC;
  begin
    z[1]:= Sub(Mult(x[2], y[3]), Mult(x[3], y[2]));
    z[2]:= Sub(Mult(x[3], y[1]), Mult(x[1], y[3]));
    z[3]:= Sub(Mult(x[1], y[2]), Mult(x[2], y[1]));
    VectProdC:= z;
  end;
  
  Function VectPowC(x: VectorC; degree: real): VectorC;
  Var i, n: integer;
      factor: VectorC;
  begin
    factor:= x;
    n:= Round(degree);
    for i:= 2 to n do VectPowC:= VectProdC(x, factor);
    if (n = 0) then 
    begin
      for i:= 1 to vectorSize do factor[i]:= One();
      VectPowC:= factor;
    end;
  end;
  
  Function ScalProdC(x, y: VectorC): complex;
  Var i: integer;
      S: complex;
  begin
    S:= Zero();
    for i:= 1 to vectorSize do S:= Add(S, Mult(x[i], Code(y[i])));
    Result:= S;
  end;
  
  Function MixProdC(a, b, c: VectorC): complex;
  begin
    Result:= ScalProdC(VectProdC(a, b), c);
  end;
  
  Function ModulVector(x: VectorC): real;
  begin
    Result:= sqrt(ScalProdC(x, x).Re);
  end;

  Procedure MenuComplexVector();
  Var menuElem: array of String;
      mode: integer;
      a, b, c: VectorC;
      x: real;
      menuOpen: boolean;
  begin
    SetLength(menuElem, 7);
    menuElem[0] := 'Сложение';
    menuElem[1] := 'Вычитание'; 
    menuElem[2] := 'Векторное произведение';
    menuElem[3] := 'Возведение в степень';
    menuElem[4] := 'Скалярное произведение';
    menuElem[5] := 'Смешанное произведение';
    menuElem[6] := 'Модуль';
    menuOpen := true;
    while menuOpen do
    begin
      PrintMenuElem('Комплексные вектора' ,menuElem);
      Readln(mode);
      ClrScr;
      case mode of 
        1: begin 
             GoToXY(2, 2); Writeln('Первое слагаемое: '); ReadCVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второе слагаемое: '); ReadCVector(20, 3, b);
             GoToXY(2, 5); Writeln('Сумма: '); WriteCVector(20, 5, AddCVector(a, b));
             Wait;
           end;
        2: begin
             GoToXY(2, 2); Writeln('Уменьшаемое: '); ReadCVector(20, 2, a);
             GoToXY(2, 3); Writeln('Вычитаемое: ');ReadCVector(20, 3, b);
             GoToXY(2, 5); Writeln('Разность: '); WriteCVector(20, 5, SubCVector(a, b));
             Wait;
           end;
        3: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadCVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadCVector(20, 3, b);
             GoToXY(2, 5); Writeln('Произведение: '); WriteCVector(20, 5, VectProdC(a, b));
             Wait;
           end;
        4: begin
             GoToXY(2, 2); Writeln('Основание: '); ReadCVector(20, 2, a);
             GoToXY(2, 3); Writeln('Показатель: '); InputNumber(20, 3, x);
             GoToXY(2, 5); Writeln('Результат: '); WriteCVector(20, 5, VectPowC(a, x));
             Wait;
           end;
        5: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadCVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadCVector(20, 3, b);
             GoToXY(2, 5); Writeln('Произведение: '); WriteC(20, 5, ScalProdC(a, b));
             Wait;
           end;
        6: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadCVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadCVector(20, 3, b);
             GoToXY(2, 4); Writeln('Третий множитель: '); ReadCVector(20, 4, c);
             GoToXY(2, 6); Writeln('Произведение: '); WriteC(20, 6, MixProdC(a, b, c));
             Wait;
           end;
        7: begin
             GoToXY(2, 2); Writeln('Число: '); ReadCVector(20, 2, a);
             GoToXY(2, 5); Writeln('Модуль числа: '); OutputNumber(20, 5, ModulVector(a));
             Wait;
           end;
        0: menuOpen:= false;
        else
        begin
          Writeln('Некорректный ввод! Выберите один из элементов меню!');
          Wait;
        end;
      end;
    end;
  end;
  
End.