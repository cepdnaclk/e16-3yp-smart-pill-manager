
// Include Libraries
#include "Arduino.h"
#include "ESP8266.h"
#include "GraphicLCD.h"
#include "RFID.h"
#include "SpeakerStereo3W.h"

// Pin Definitions
#define FINGERPRINTSCANNER_5V_PIN_RX 10
#define FINGERPRINTSCANNER_5V_PIN_TX 11
#define GRAPHICLCD_PIN_TX 3
#define GRAPHICLCD_PIN_RX 2
#define RFID_PIN_RST 4
#define RFID_PIN_SDA 53
#define STEREOSPEAKER_PIN_POS 5

// Global variables and defines
// ====================================================================
// vvvvvvvvvvvvvvvvvvvv ENTER YOUR WI-FI SETTINGS  vvvvvvvvvvvvvvvvvvvv
//
const char *SSID = "WIFI-SSID";    // Enter your Wi-Fi name
const char *PASSWORD = "PASSWORD"; // Enter your Wi-Fi password
//
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ====================================================================
char *const host = "www.google.com";
int hostPort = 80;
unsigned int StereoSpeakerHoorayLength = 6;                                                        // amount of notes in melody
unsigned int StereoSpeakerHoorayMelody[] = {NOTE_C4, NOTE_E4, NOTE_G4, NOTE_C5, NOTE_G4, NOTE_C5}; // list of notes. List length must match HoorayLength!
unsigned int StereoSpeakerHoorayNoteDurations[] = {8, 8, 8, 4, 8, 4};                              // note durations; 4 = quarter note, 8 = eighth note, etc. List length must match HoorayLength!
// object initialization
ESP8266 wifi;
GraphicLCD graphicLCD(GRAPHICLCD_PIN_RX, GRAPHICLCD_PIN_TX);
RFID rfid(RFID_PIN_SDA, RFID_PIN_RST);
SpeakerStereo3W StereoSpeaker(STEREOSPEAKER_PIN_POS);

// define vars for testing menu
const int timeout = 10000; //define timeout of 10 sec
char menuOption = 0;
long time0;

// Setup the essentials for your circuit to work. It runs first every time your circuit is powered with electricity.
void setup()
{
    // Setup Serial which is useful for debugging
    // Use the Serial Monitor to view printed messages
    Serial.begin(9600);
    while (!Serial)
        ; // wait for serial port to connect. Needed for native USB
    Serial.println("start");

    wifi.init(SSID, PASSWORD);
    //initialize RFID module
    rfid.init();
    menuOption = menu();
}

// Main logic of your circuit. It defines the interaction between the components you selected. After setup, it runs over and over again, in an eternal loop.
void loop()
{

    if (menuOption == '1')
    {
        // Logic Level Converter - Bi-Directional - Test Code
        //Send request for www.google.com at port 80
        wifi.httpGet(host, hostPort);
        // get response buffer. Note that it is set to 250 bytes due to the Arduino low memory
        char *wifiBuf = wifi.getBuffer();
        //Comment out to print the buffer to Serial Monitor
        //for(int i=0; i< MAX_BUFFER_SIZE ; i++)
        //  Serial.print(wifiBuf[i]);
        //search buffer for the date and time and print it to the serial monitor. This is GMT time!
        char *wifiDateIdx = strstr(wifiBuf, "Date");
        for (int i = 0; wifiDateIdx[i] != '\n'; i++)
            Serial.print(wifiDateIdx[i]);
    }
    else if (menuOption == '2')
    {
        // Disclaimer: The Fingerprint Scanner - TTL (GT-511C3) is in testing and/or doesn't have code, therefore it may be buggy. Please be kind and report any bugs you may find.
    }
    else if (menuOption == '3')
    {
        // Graphic LCD 160x128 Huge - Test Code
        // The LCD Screen will display the text of your choice at the location (30,50) on screen. Counting from the top left corner: 30 pixels to the right and 50 pixels down
        graphicLCD.setX(30);                    // 1. sets left-right indent for text to print. Change the value in the brackets (1 - left, 164 - right) for a different indent.
        graphicLCD.setY(50);                    // 2. sets top-bottom height for text to print. Change the value in the brackets (1 - top, 128 - bottom) for a different height.
        graphicLCD.print("Circuito.io Rocks!"); // 3. prints the text in the brackets. Modify the text to get your own unique print.
        delay(1000);                            // 4. waits 1000 milliseconds (1 sec). Change the value in the brackets (1000) for a longer or shorter delay in milliseconds.
        graphicLCD.clear();                     // 5. wipes the screen
        delay(1000);                            // 6. waits 1000 milliseconds (1 sec). Change the value in the brackets (1000) for a longer or shorter delay in milliseconds.
    }
    else if (menuOption == '4')
    {
        // RFID Card Reader - RC522 - Test Code
        //Read RFID tag if present
        String rfidtag = rfid.readTag();
        //print the tag to serial monitor if one was discovered
        rfid.printTag(rfidtag);
    }
    else if (menuOption == '5')
    {
        // 3W Stereo Speaker - Test Code
        // The Speaker will play the Hooray tune
        StereoSpeaker.playMelody(StereoSpeakerHoorayLength, StereoSpeakerHoorayMelody, StereoSpeakerHoorayNoteDurations);
        delay(500);
    }

    if (millis() - time0 > timeout)
    {
        menuOption = menu();
    }
}

// Menu function for selecting the components to be tested
// Follow serial monitor for instrcutions
char menu()
{

    Serial.println(F("\nWhich component would you like to test?"));
    Serial.println(F("(1) Logic Level Converter - Bi-Directional"));
    Serial.println(F("(2) Fingerprint Scanner - TTL (GT-511C3)"));
    Serial.println(F("(3) Graphic LCD 160x128 Huge"));
    Serial.println(F("(4) RFID Card Reader - RC522"));
    Serial.println(F("(5) 3W Stereo Speaker"));
    Serial.println(F("(menu) send anything else or press on board reset button\n"));
    while (!Serial.available())
        ;

    // Read data from serial monitor if received
    while (Serial.available())
    {
        char c = Serial.read();
        if (isAlphaNumeric(c))
        {

            if (c == '1')
                Serial.println(F("Now Testing Logic Level Converter - Bi-Directional"));
            else if (c == '2')
                Serial.println(F("Now Testing Fingerprint Scanner - TTL (GT-511C3) - note that this component doesn't have a test code"));
            else if (c == '3')
                Serial.println(F("Now Testing Graphic LCD 160x128 Huge"));
            else if (c == '4')
                Serial.println(F("Now Testing RFID Card Reader - RC522"));
            else if (c == '5')
                Serial.println(F("Now Testing 3W Stereo Speaker"));
            else
            {
                Serial.println(F("illegal input!"));
                return 0;
            }
            time0 = millis();
            return c;
        }
    }
}
