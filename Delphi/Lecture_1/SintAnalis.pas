/// Библиотека для синтаксического анализа
unit SintAnalis;

interface

const
  Alphabet: array of char = ('а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',
                             'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
                             'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                             'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                             '_', '-', ' ', '!', '?', ')', '(');

var
  ch, s: string;
  i: integer;
  flag: boolean;

procedure checkString(s: string);
procedure WriteText(var output: String; text: String);

implementation

procedure error;
begin
  flag := true;
end;

procedure Read_ch(s: String);
begin
  if (i < s.Length) then 
  begin
    i += 1;
    ch := s[i];
  end
  else
    ch:= '';
end;

procedure A(s: string);
begin
  if ch = '(' then Read_ch(s) else error;
  while ch = '(' do A(s);
  if ch = ')' then Read_ch(s) else error;
  while ch = '(' do A(s);
  writeln(i, ' ', s.Length);
  if (i < s.Length) and (s[i + 1] = ')') then error;
end;

procedure checkString(s: string);
begin
  i := 0;
  read_ch(s);
  flag := false;
  A(s);
  if flag then Writeln('Error')
  else Writeln('Correct');
end;

procedure WriteText(var output: String; text: String);
begin
  if text.Length <> 0 then 
  begin
    WriteText(output, Copy(text, 1, text.Length - 1));
    if text[text.Length] in Alphabet then output += Copy(text, text.Length, text.Length);
  end;
end;

End.