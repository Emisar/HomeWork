program FileWorkLibTest;

Uses fwl, crt;

var
  FileName: String:= 'Hello_World.txt';

begin
  MakeFile(FileName);
  ViewFile(FileName);
  AddFile(FileName);
  ViewFile(FileName);
end.