
/***   Included libraries  ***/
#include <Wire.h>
#include <BitbloqLiquidCrystal.h>


/***   Global variables and function definition  ***/
LiquidCrystal LCD_2(0);

/***   Setup  ***/
void setup(){LCD_2.begin(16, 2);LCD_2.clear();LCD_2.setCursor(3,0);LCD_2.print(VOLTIMETRO);}

/***   Loop  ***/
void loop(){float lectura = analogRead(A0);LCD_2.setCursor(6,1);LCD_2.print(map(lectura,0,1023,0,500));}