#include "MeAuriga.h"
#include <Wire.h>

#define NOP "NOP"
#define BUZ "BUZ"
#define GYR "GYR"

MeBuzzer buzzer;
MeGyro gyro(0, 0x69);

String inputString = "";
bool startCom = false;
bool stringComplete = false;
int X;
int Y;
int Z;

void setup() {
  // initialize serial:
  Serial.begin(9600);
  inputString.reserve(200);
  buzzer.setpin(45);
  gyro.begin();                                                                                
}

void loop() {
  if (!startCom) {
    Serial.println(NOP);
    delay(500);
  }
  else {
    if (stringComplete) {
      if (inputString == BUZ) {
        buzzer.tone(400, 500);
      }
      stringComplete = false;
      inputString = "";
    }
    gyro.update();
    X = gyro.getAngle(1);
    Y = gyro.getAngle(2);
    Z = gyro.getAngle(3);
    delay(500);
    Serial.println(String(GYR) + " " + String(X) + " "+ String(Y) + " "+ String(Z) + " ");
  }
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      stringComplete = true;
    }
    else {
      inputString += inChar;
    }
    startCom = true;
  }
}
