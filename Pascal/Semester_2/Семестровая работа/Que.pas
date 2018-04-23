///-Queue
///Модуль для работы с очередями
unit Que;

interface

type
  ///-Pointer Queue (PtrQ)
  ///Ссылка на объект типа Queue
  PtrQ = ^Qu;
  ///-Queue [Inf, Next]
  ///Объект содержащий целочисленное значение(Inf) и ссылку на следующий элемент стека(Next)
  Qu = record
    Inf: integer;
    Next: PtrQ;
  end;

const
  ///-END_KEY = 0
  ///Число для завершения ввода стека
  END_KEY = 0;
  ///-ERROR_MESSAGE = 'Error! Please enter the correct number!'
  ///Сообщение об ошибке ввода
  ERROR_MESSAGE = 'Error! Please enter the correct number!';

///-MakeQueue(Queue)
///Процедура позволяющая создавать очередь 
///*Для остановки ввода введите 0*
procedure MakeQueue(var Queue: PtrQ);
///-MakeQueue(param, Queue)
///Процедура выводящая приглашение к вводу и позволяющая создавать очередь 
///*Для остановки ввода введите 0*
procedure MakeQueue(param: String; var Queue: PtrQ);
///-AddQueueTop(Queue)
///Процедура добавляющая в начало имеющейся очереди новый элемент
procedure AddQueueTop(var Queue: PtrQ);
///-AddQueueTop(param, Queue)
///Процедура выводящая приглашение к вводу и добавляющая в начало имеющейся очереди новый элемент
procedure AddQueueTop(param: String; var Queue: PtrQ);
///-AddQueueRear(Queue)
///Процедура добавляющая в конец имеющейся очереди новый элемент
procedure AddQueueRear(var Queue: PtrQ);
///-AddQueueRear(param, Queue)
///Процедура выводящая приглашение к вводу и добавляющая в конец имеющейся очереди новый элемент
procedure AddQueueRear(param: String; var Queue: PtrQ);
///-AddQueueElem(Queue, pos)
///Процедура добавляющая в выбранную позицию очереди новый элемент
procedure AddQueueElem(var Queue: PtrQ; pos: integer);
///-AddQueueElem(param, Queue, pos)
///Процедура выводящая приглашение к вводу и добавляющая в выбранную позицию очереди новый элемент
procedure AddQueueElem(param: String; var Queue: PtrQ; pos: integer);
///-ViewQueue(Queue)
///Процедура для вывода всей очереди
procedure ViewQueue(Queue: PtrQ);
///-DeleteQueue(Queue)
///Процедура удаляющая очередь
procedure DeleteQueue(var Queue: PtrQ);
///-DeleteQueueTop(Queue)
///Процедура удаляющая первый элемент очереди
procedure DeleteQueueTop(var Queue: PtrQ);
///-DeleteQueueRear(Queue)
///Процедура удаляющая последний элемент очереди
procedure DeleteQueueRear(var Queue: PtrQ);
///-DeleteQueueElem(Queue, pos)
///Процедура удаляющая элемент очереди из выбранной позиции
procedure DeleteQueueElem(var Queue: PtrQ; pos: integer);
///-SetQueueElemValue(Queue, pos, Value): integer
///Процедура меняющая значение выбранного элемента очереди
procedure SetQueueElemValue(Queue: PtrQ; pos, Value: integer);
///-GetQueueSize(Queue): integer
///Функция возвращающая размер очереди
function GetQueueSize(Queue: PtrQ): integer;
///-GetQueueElem(Queue, pos): PtrS
///Функция возвращающая выбранный элемент очереди
function GetQueueElem(Queue: PtrQ; pos: integer): PtrQ;
///-GetQueueElemValue(Queue, pos): integer
///Функция возвращающая значение выбранного элемента очереди
function GetQueueElemValue(Queue: PtrQ; pos: integer): integer;
///-SplitQueue(Queue, pos): PtrS
///Функция разделяющая одну очередь на две и возвращающая вторую
///Все элементы первой очереди стоящие после указанной позиции переходят во вторую очередь
function SplitQueue(Queue: PtrQ; pos: integer): PtrQ;
///-ConcatQueue(Queue1, Queue2: PtrS): PtrS
///Функция возвращающая результат соединения двух очередей
///Все элементы второй очереди переходят в конец первой очереди
function ConcatQueue(Queue1, Queue2: PtrQ): PtrQ;

implementation

procedure MakeQueue(var Queue: PtrQ);
var
  Top: PtrQ;
  Next: PtrQ := nil;
  Value: integer;
begin
  while (true) do
  begin
    Value := ReadlnInteger('Enter the number:');
    if (Value = END_KEY) then break
    else
    begin
      New(Queue);
      Queue^.Inf := Value;
      Queue^.Next := nil;
      if (Next <> nil) then Next^.Next := Queue 
      else Top := Queue;
      Next := Queue;
    end;
  end;
  Queue := Top;
end;

procedure MakeQueue(param: String; var Queue: PtrQ);
var
  Top: PtrQ;
  Next: PtrQ := nil;
  Value: integer;
begin
  while (true) do
  begin
    Value := ReadlnInteger(param);
    if (Value = END_KEY) then break
    else
    begin
      New(Queue);
      Queue^.Inf := Value;
      Queue^.Next := nil;
      if (Next <> nil) then Next^.Next := Queue 
      else Top := Queue;
      Next := Queue;
    end;
  end;
  Queue := Top;
end;

procedure AddQueueTop(var Queue: PtrQ);
var
  Top: PtrQ := Queue;
  Value: integer;
begin
  Value := ReadlnInteger('Enter the number:');
  if (Value <> END_KEY) then
  begin
    New(Queue);
    Queue^.Inf := Value;
    Queue^.Next := Top;
  end;
end;

procedure AddQueueTop(param: String; var Queue: PtrQ);
var
  Top: PtrQ := Queue;
  Value: integer;
begin
  Value := ReadlnInteger(param);
  if (Value <> END_KEY) then
  begin
    New(Queue);
    Queue^.Inf := Value;
    Queue^.Next := Top;
  end;
end;

procedure AddQueueRear(var Queue: PtrQ);
var
  Rear: PtrQ;
  Top: PtrQ := Queue;
  Value: integer;
begin
  if (Queue <> nil) then Rear := GetQueueElem(Queue, GetQueueSize(Queue));
  Value := ReadlnInteger('Enter the number:');
  if (Value <> END_KEY) then 
  begin
    New(Queue);
    Queue^.Inf := Value;
    Queue^.Next := nil;
    if (Rear <> nil) then Rear^.Next := Queue;
  end;
  if (Top <> nil) then Queue := Top;
end;

procedure AddQueueRear(param: String; var Queue: PtrQ);
var
  Rear: PtrQ;
  Top: PtrQ := Queue;
  Value: integer;
begin
  if (Queue <> nil) then Rear := GetQueueElem(Queue, GetQueueSize(Queue));
  Value := ReadlnInteger(param);
  if (Value <> END_KEY) then 
  begin
    New(Queue);
    Queue^.Inf := Value;
    Queue^.Next := nil;
    if (Rear <> nil) then Rear^.Next := Queue;
  end;
  if (Top <> nil) then Queue := Top;
end;

procedure AddQueueElem(var Queue: PtrQ; pos: integer);
var
  Top: PtrQ := Queue;
  Value: integer;
begin
  if (pos > GetQueueSize(Queue)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else if (pos = 1) then AddQueueTop(Queue)
  else if (pos = GetQueueSize(Queue)) then AddQueueRear(Queue)
  else
  begin
    Value := ReadlnInteger('Enter the number:');
    if (Value <> END_KEY) then
    begin
      New(Queue);
      Queue^.Inf := Value;
      Queue^.Next := GetQueueElem(Top, pos);
      GetQueueElem(Top, pos - 1)^.Next := Queue;
    end;
    Queue := Top;
  end;
end;

procedure AddQueueElem(param: String; var Queue: PtrQ; pos: integer);
var
  Top: PtrQ := Queue;
  Value: integer;
begin
  if (pos > GetQueueSize(Queue)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else if (pos = 1) then AddQueueTop(param, Queue)
  else if (pos = GetQueueSize(Queue)) then AddQueueRear(param, Queue)
  else
  begin
    Value := ReadlnInteger(param);
    if (Value <> END_KEY) then
    begin
      New(Queue);
      Queue^.Inf := Value;
      Queue^.Next := GetQueueElem(Queue, pos);
      GetQueueElem(Queue, pos - 1)^.Next := Queue;
    end;
    Queue := Top;
  end;
end;

procedure ViewQueue(Queue: PtrQ);
begin
  Write('[ ');
  while (Queue <> nil) do 
  begin
    Write(Queue^.Inf, ' ');
    Queue := Queue^.Next;
  end;
  Writeln(']');
end;

procedure DeleteQueue(var Queue: PtrQ);
begin
  Queue := nil;
end;

procedure DeleteQueueTop(var Queue: PtrQ);
begin
  Queue := Queue^.Next;
end;

procedure DeleteQueueRear(var Queue: PtrQ);
begin
  if (GetQueueSize(Queue) = 1) then Queue := nil
  else GetQueueElem(Queue, GetQueueSize(Queue) - 1)^.Next := nil;
end;

procedure DeleteQueueElem(var Queue: PtrQ; pos: integer);
begin
  if (pos > GetQueueSize(Queue)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else if (pos = 1) then DeleteQueueTop(Queue)
  else if (pos = GetQueueSize(Queue)) then DeleteQueueRear(Queue)
  else GetQueueElem(Queue, pos - 1)^.Next := GetQueueElem(Queue, pos + 1);
end;

procedure SetQueueElemValue(Queue: PtrQ; pos, Value: integer);
var
  size: integer := GetQueueSize(Queue);
begin
  if (pos > size) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else GetQueueElem(Queue, pos)^.Inf := Value;
end;

function GetQueueSize(Queue: PtrQ): integer;
var
  Cnt: integer := 0;
begin
  while (Queue <> nil) do 
  begin
    Queue := Queue^.Next;
    Cnt += 1;
  end;
  result := Cnt;
end;

function GetQueueElem(Queue: PtrQ; pos: integer): PtrQ;
begin
  while (pos > 1) do
  begin
    Queue := Queue^.Next;
    pos -= 1;
  end;
  result := Queue;
end;

function GetQueueElemValue(Queue: PtrQ; pos: integer): integer;
var
  size: integer := GetQueueSize(Queue);
begin
  if (pos > size) or (pos < 1) then 
  begin
    Writeln(ERROR_MESSAGE);
    result := -1;
  end
  else
  begin
    Queue := GetQueueElem(Queue, pos);
    result := Queue^.Inf;
  end;
end;

function SplitQueue(Queue: PtrQ; pos: integer): PtrQ;
begin
  if (pos > GetQueueSize(Queue)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else 
  begin
    result := GetQueueElem(Queue, pos)^.Next;
    GetQueueElem(Queue, pos)^.Next := nil;
  end;
end;

function ConcatQueue(Queue1, Queue2: PtrQ): PtrQ;
begin
  GetQueueElem(Queue1, GetQueueSize(Queue1))^.Next := Queue2;
  result := Queue1;
end;

End.