unit fwl;

interface

type
  Student = record
    Name: String[8];
    Mark: String[3];
  end;

const
  END_KEY: array of char = ('n', 'N');
  CONT_KEY: array of char = ('y', 'Y');
  ERROR_MESSAGE: string = 'Incorrect input!';

procedure MakeFile(FileName: string);
procedure ViewFile(FileName: string);
procedure AddFile(FileName: string);

implementation

procedure MakeFile(FileName: string);
var
  ch: char;
  StudentFile: file of Student;
  FlowStudent: Student;
begin
  Assign(StudentFile, FileName);
  Rewrite(StudentFile);
  with FlowStudent do
    while (true) do
    begin
      ch := ReadlnChar('Create new student? [Y/N]');
      if ch in END_KEY then
      begin
        close(StudentFile);
        break;
      end
      else if ch in CONT_KEY then
      begin
        Name := ReadlnString('Enter the student name:');
        Mark := ReadlnChar('Enter the student mark:');
        Write(StudentFile, FlowStudent);
      end
      else Writeln(ERROR_MESSAGE);
    end;
end;

procedure ViewFile(FileName: string);
var
  k: integer := 3;
  ch: char;
  StudentFile: file of Student;
  FlowStudent: Student;
begin
  Assign(StudentFile, FileName);
  Reset(StudentFile);
  with FlowStudent do
    while not EOF(StudentFile) do
    begin
      k += 1;
      Read(StudentFile, FlowStudent);
      Writeln(Name, ' ', Mark);
    end;
  close(StudentFile);
end;

procedure AddFile(FileName: string);
var
  ch: char;
  TempName: String := '~$' + FileName;
  StudentFile, TempFile: file of Student;
  FlowStudent: Student;
begin
  Assign(StudentFile, FileName);
  Reset(StudentFile);
  Assign(TempFile, TempName);
  Rewrite(TempFile);
  while not EOF(StudentFile) do
  begin
    Read(StudentFile, FlowStudent);
    Write(TempFile, FlowStudent);
  end;
  with FlowStudent do
    while (true) do
    begin
      ch := ReadlnChar('Create new student? [Y/N]');
      if ch in END_KEY then
      begin
        close(TempFile);
        break;
      end
      else if ch in CONT_KEY then
      begin
        Name := ReadlnString('Enter the student name:');
        Mark := ReadlnChar('Enter the student mark:');
        Write(TempFile, FlowStudent);
      end
      else Writeln(ERROR_MESSAGE);
    end;
  close(StudentFile);
  erase(StudentFile);
  rename(TempFile, FileName);
end;

end.