Unit DL;

interface

Type
  PtrD = ^DiLi;
  DiLi = record
    Inf: integer;
    Next: PtrD;
    Prev: PtrD;
    
Const
  ///-END_KEY = 0
  ///Число для завершения ввода стека
  END_KEY = 0;
  ///-ERROR_MESSAGE = 'Error! Please enter the correct number!'
  ///Сообщение об ошибке ввода
  ERROR_MESSAGE = 'Error! Please enter the correct number!';

implementation

End.