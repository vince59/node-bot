#include "MeAuriga.h"

String inputString = "";         // a String to hold incoming data
bool startCom = false;  // whether the string is complete
bool stringComplete = false;

void setup() {
  // initialize serial:
  Serial.begin(9600);
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);
}

void loop() {
  if (!startCom) {
    Serial.println("Bot");
    delay(500);
  }
  if (stringComplete) {
    Serial.println(stringComplete);
    delay(500);
  }
}

void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
