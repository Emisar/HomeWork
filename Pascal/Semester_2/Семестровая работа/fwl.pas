///-FileWork Library
/// Библиотека для работы с файлами
unit fwl;

interface

var
  ch: char;
  Name: String[10];
  Mark: String[3];

const
  END_KEY: array of char = ('n', 'N');    //Символы терминации
  CONT_KEY: array of char = ('y', 'Y');   //Символы иницализации
  //Текст ошибкок
  ERROR_MESSAGE: array of string = ('Incorrect input!', 'The file not exist!');

///-MakeAndEditFile(FileName: string);
/// Процедура создания нового файла или добавления данных в уже существующий
procedure MakeAndEditFile(FileName: string);
///-ViewFile(FileName: string);
/// Процедура выводящая все данные из указанного файла
procedure ViewFile(FileName: string);
///-EraseFile(FileName: string);
/// Процедура удаляющая указанный файл
procedure EraseFile(FileName: string);
///-GetFileText(FileName: string): array of array of String;
/// Функция возвращающая данные из указанного файла в формате массива массивов
function GetFileText(FileName: string): array of array of String;
///-EditText(s: String): String;
/// Функция возвращающая строку без пробелов в начале
function EditText(s: String): String;

implementation
//Возвращает строку без символов пробела в начале
function EditText(s: String): String;
begin
  while (s.Length <> 0) and (s[1] = ' ') do s := s.Remove(0, 1);
  result := s;
end;

procedure ViewFile(FileName: string);
var
  StudentFile: Text;
begin
  Assign(StudentFile, FileName);
  if FileExists(FileName) then
  begin
    Reset(StudentFile);
    while not EOF(StudentFile) do
    begin
      Read(StudentFile, Name, Mark);
      Writeln(EditText(Name), ' ', EditText(Mark));
    end;
    close(StudentFile);
  end
  else Writeln(ERROR_MESSAGE[1]);
end;

function GetFileText(FileName: string): array of array of String;
var
  StudentFile: Text;
begin
  SetLength(result, 2);
  SetLength(result[0], 0);
  SetLength(result[1], 0);
  Assign(StudentFile, FileName);
  if FileExists(FileName) then
  begin
    Reset(StudentFile);
    while not EOF(StudentFile) do
    begin
      Read(StudentFile, Name, Mark);
      SetLength(result[0], result[0].Length + 1);
      result[0][result[0].Length - 1] := EditText(Name);
      SetLength(result[1], result[1].Length + 1);
      result[1][result[1].Length - 1] := EditText(Mark);
    end;
    close(StudentFile);
  end
  else Writeln(ERROR_MESSAGE[1]);
end;

procedure MakeAndEditFile(FileName: string);
var
  StudentFile: Text;
begin
  Assign(StudentFile, FileName);
  if FileExists(FileName) then Append(StudentFile)
  else Rewrite(StudentFile);
  while (true) do
  begin
    ch := ReadlnChar('Need more elem? [Y/N]');
    if ch in END_KEY then
    begin
      close(StudentFile);
      break;
    end
    else if ch in CONT_KEY then
    begin
      Name := ReadlnString('Enter the Name:');
      Mark := ReadlnString('Enter the Mark:');
      write(StudentFile, Name:10, Mark:3);
    end
    else writeln(ERROR_MESSAGE[0]);
  end;
end;

procedure EraseFile(FileName: string);
var
  StudentFile: Text;
begin
  Assign(StudentFile, FileName);
  if FileExists(FileName) then 
  begin
    Erase(StudentFile);
    if not FileExists(FileName) then
      Writeln('The file erased!');
  end;
end;

end.