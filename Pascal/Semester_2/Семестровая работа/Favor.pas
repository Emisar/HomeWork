unit Favor;

interface

uses
  Stk, Que, fwl;

function StackToQueue(Stack: PtrS; Queue: PtrQ): PtrQ;
function QueueToStack(Queue: PtrQ; Stack: PtrS): PtrS;
procedure StackToFile(Stack: PtrS; FileName: String);
procedure QueueToFile(Queue: PtrQ; FileName: String);
procedure BadStudents(FileName: string; num: byte);

implementation

function StackToQueue(Stack: PtrS; Queue: PtrQ): PtrQ;
var
  Top: PtrQ := nil;
  Next: PtrQ := nil;
begin
  while (Stack <> nil) do
  begin
    new(Queue);
    Queue^.Inf := Stack^.Inf;
    Queue^.Next := nil;
    if (Next <> nil) then Next^.Next := Queue 
    else Top := Queue;
    Next := Queue;
    Stack := Stack^.Prev;
  end;
  result := Top;
end;

function QueueToStack(Queue: PtrQ; Stack: PtrS): PtrS;
var
  Top: PtrS;
begin
  while (Queue <> nil) do
  begin
    new(Stack);
    Stack^.Inf := Queue^.Inf;
    Stack^.Prev := Top;
    Top := Stack;
    Queue := Queue^.Next;
  end;
  result := Top;
end;

procedure StackToFile(Stack: PtrS; FileName: String);
var
  StudentFile: Text;
begin
  Assign(StudentFile, FileName);
  Rewrite(StudentFile);
  while (Stack <> nil) do 
  begin
    Write(StudentFile, Stack^.Inf);
    Stack := Stack^.Prev;
  end;
  Close(StudentFile);
end;

procedure QueueToFile(Queue: PtrQ; FileName: String);
var
  StudentFile: Text;
begin
  Assign(StudentFile, FileName);
  Rewrite(StudentFile);
  while (Queue <> nil) do 
  begin
    Write(StudentFile, Queue^.Inf);
    Queue := Queue^.Next;
  end;
  Close(StudentFile);
end;

procedure BadStudents(FileName: string; num: byte);
var
  StudentFile: Text;
  Ok: boolean := true;
  Name: String[10];
  Mark: String[3];
begin
  Assign(StudentFile, FileName);
  if FileExists(FileName) then
  begin
    Reset(StudentFile);
    while not EOF(StudentFile) do
    begin
      Ok := true;
      Read(StudentFile, Name, Mark);
      case (num) of
        1:
          for i: integer := 1 to 3 do
            if (Mark[i] in ['1'..'3']) and (Ok) then
            begin
              Writeln(EditText(Name), ' ', EditText(Mark));
              Ok := false;
            end;
        2:
          for i: integer := 1 to 3 do 
            if (Mark[i] in ['1'..'3']) and (Ok) then
              for j: integer := i to 3 do
                if (Mark[j] in ['1'..'3']) and (Ok) then
                begin
                  Writeln(EditText(Name), ' ', EditText(Mark));
                  Ok := false;
                end;
        3:
          if (Mark[1] in ['1'..'3']) and (Mark[2] in ['1'..'3']) and (Mark[3] in ['1'..'3']) then 
            Writeln(EditText(Name), ' ', EditText(Mark));
      end;
    end;
    close(StudentFile);
  end
  else Writeln(fwl.ERROR_MESSAGE[1]);
end;

end.