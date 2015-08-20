
/***   Included libraries  ***/
#include <SoftwareSerial.h>
#include <bqSoftwareSerial.h>
#include <Servo.h>
#include <Wire.h>


/***   Global variables and function definition  ***/
int Led_1 = 13;bqSoftwareSerial SerialPort_1(0,1,9600);/*
If need check convert block
*/

/***   Setup  ***/
void setup(){pinMode(Led_1, OUTPUT);}

/***   Loop  ***/
void loop(){String readSerie = SerialPort_1.readString();switch (int(readSerie)) {case 63:{digitalWrite(Led_1,HIGH);break;}default:{digitalWrite(Led_1,LOW);break;}}}