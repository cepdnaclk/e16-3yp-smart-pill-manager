// #define DEBUG 1

#include <Arduino.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <LCDWIKI_GUI.h> //Core graphics library
#include <LCDWIKI_KBV.h> //Hardware-specific library
#include <TouchScreen.h>

SoftwareSerial linkSerial(50, 51);
LCDWIKI_KBV my_lcd(ILI9486, A3, A2, A1, A0, A4);

#define Height my_lcd.Get_Display_Height()
#define Width my_lcd.Get_Display_Width()

#define YP A3 // must be an analog pin, use "An" notation!
#define XM A2 // must be an analog pin, use "An" notation!
#define YM 9  // can be a digital pin
#define XP 8  // can be a digital pin
TouchScreen ts = TouchScreen(XP, YP, XM, YM, 300);

//define touch pressure
#define MINPRESSURE 10
#define MAXPRESSURE 1000

//param calibration from kbv
#define TS_MINX 906
#define TS_MAXX 116

#define TS_MINY 92
#define TS_MAXY 952
//define some colour values
#define BLACK 0x0000
#define BLUE 0x001F
#define RED 0xF800
#define GREEN 0x07E0
#define CYAN 0x07FF
#define MAGENTA 0xF81F
#define YELLOW 0xFFE0
#define WHITE 0xFFFF
#define COLORBOXSIZE Width / 6

JsonArray patient, container;

String wifi = "";
String json = "";
String medicine[12];

boolean returnB = 0, patient1B = 0, patient2B = 0, patient3B = 0;
boolean container1 = 0, container2 = 0, container3 = 0, container4 = 0, container5 = 0, container6 = 0, container7 = 0, container8 = 0, container9 = 0, container10 = 0, container11 = 0, container12 = 0, back = 0;
boolean patientS = 1, containerD = 1;
boolean ok = 0;

//downlading data from esp8266
void downloadData()
{
  boolean stringReady = false;

  if (linkSerial.available())
  {

    json = linkSerial.readString();
    stringReady = true;
  }

  if (stringReady)
  {
    DynamicJsonDocument doc(4096);
    DeserializationError error = deserializeJson(doc, json); //deserializing the string
    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }
    patient = doc["patients"].as<JsonArray>();
    container = doc["container"].as<JsonArray>();
  }
}
void fill_medicine()
{
  int j;
  String s;
  char *x;
  for (int i = 0; i < container.size(); i++)
  {
    x = container[i]["containerID"]["$numberInt"];
    s = String(x);
    j = s.toInt();
    x = container[i]["medicine"];
    medicine[j] = String(x);
  }
}

//setup up string to print in the lcd display
void show_string(String str, int16_t x, int16_t y, uint8_t csize, uint16_t fc, uint16_t bc, boolean mode)
{
  my_lcd.Set_Text_Mode(mode);
  my_lcd.Set_Text_Size(csize);
  my_lcd.Set_Text_colour(fc);
  my_lcd.Set_Text_Back_colour(bc);
  my_lcd.Print_String(str, x, y);
}

//main menu
void show_main_menu(void)
{
  //Patients Button
  my_lcd.Set_Draw_color(RED);
  my_lcd.Fill_Round_Rectangle((Width - 150) / 3 + 10, ((Height + 10) / 3 + 10), (Width + 80) / 3 * 2 + 10, COLORBOXSIZE / 2 + 20, 5);
  show_string("Patients Setup", (Width - 150) / 3 + 10 + ((Width - 20) / 3 - 60) / 2 - 1, ((COLORBOXSIZE / 2 + 20) + 100) / 2, 2, WHITE, BLACK, 1);
  //Container Button
  my_lcd.Set_Draw_color(RED);
  my_lcd.Fill_Round_Rectangle((Width - 150) / 3 + 10, ((Height + 10) / 3 + 10) + 100, (Width + 80) / 3 * 2 + 10, (COLORBOXSIZE / 2 + 20) + 100, 5);
  show_string("Container Details", (Width - 200) / 3 + 10 + ((Width - 20) / 3 - 60) / 2 - 1, ((COLORBOXSIZE / 2 + 20) + 300) / 2, 2, WHITE, BLACK, 1);
}

//patients detail menu
void show_patient_menu(void)
{
  const char *name1 = patient[0]["name"];
  const char *name2 = patient[1]["name"];
  const char *name3 = patient[2]["name"];
  //Patient 01 Button
  my_lcd.Set_Draw_color(RED);
  my_lcd.Fill_Round_Rectangle((Width - 150) / 3 + 10, ((Height + 10) / 3 + 10) - 40, (Width + 80) / 3 * 2 + 10, (COLORBOXSIZE / 2 + 20) - 40, 5);
  show_string(name1, (Width - 150) / 3 + 10 + ((Width - 20) / 3 - 60) / 2 - 1, ((COLORBOXSIZE / 2 + 20) + 20) / 2, 2, WHITE, BLACK, 1);
  //Patient 02 Button
  my_lcd.Set_Draw_color(RED);
  my_lcd.Fill_Round_Rectangle((Width - 150) / 3 + 10, ((Height + 10) / 3 + 10) + 60, (Width + 80) / 3 * 2 + 10, (COLORBOXSIZE / 2 + 20) + 60, 5);
  show_string(name2, (Width - 150) / 3 + 10 + ((Width - 20) / 3 - 60) / 2 - 1, ((COLORBOXSIZE / 2 + 20) + 220) / 2, 2, WHITE, BLACK, 1);
  //Patient 03 button
  my_lcd.Set_Draw_color(RED);
  my_lcd.Fill_Round_Rectangle((Width - 150) / 3 + 10, ((Height + 10) / 3 + 10) + 160, (Width + 80) / 3 * 2 + 10, (COLORBOXSIZE / 2 + 20) + 160, 5);
  show_string(name3, (Width - 150) / 3 + 10 + ((Width - 20) / 3 - 60) / 2 - 1, ((COLORBOXSIZE / 2 + 20) + 420) / 2, 2, WHITE, BLACK, 1);
  //Back button
  my_lcd.Set_Draw_color(BLUE);
  my_lcd.Fill_Round_Rectangle(0, Height, 80, Height - 30, 5);
  show_string("return", 8, Height - 25, 2, WHITE, BLACK, 1);
}

//container detail menu
void show_container_menu()
{
  int count = 1;
  for (int i = 1; i < 4; i++)
  {
    for (int j = 0; j < 4; j++)
    {
      my_lcd.Set_Draw_color(RED);
      my_lcd.Fill_Round_Rectangle((i - 1) * Width / 3, j * Height / 5, (i * Width / 3) - 5, ((j + 1) * Height / 5) - 5, 20);
    }
  }
  my_lcd.Set_Draw_color(BLUE);
  my_lcd.Fill_Round_Rectangle(Width / 3, 4 * Height / 5, (2 * Width / 3) - 5, Height - 5, 20);
  for (int i = 0; i < 3; i++)
  {
    for (int j = 0; j < 4; j++)
    {
      show_string(String(count), 70 + (i * Width / 3), 20 + (j * Height / 5), 3, WHITE, BLACK, 1);
      count++;
    }
  }
  show_string("Back", 50 + (Width / 3), 20 + (4 * Height / 5), 2, WHITE, BLACK, 1);
}
//medicine detail screen
void show_medicine_detail(int id)
{
  my_lcd.Fill_Screen(BLACK);
  my_lcd.Set_Draw_color(BLUE);
  my_lcd.Fill_Round_Rectangle(Width / 5, Height / 5, (4 * Width / 5), 4 * Height / 5, 20);

  my_lcd.Set_Draw_color(RED);
  my_lcd.Fill_Round_Rectangle(2 * Width / 5, (3 * Height / 5) + 20, (3 * Width / 5), (4 * Height / 5) - 5, 5);

  show_string("Medicine Name : ", (Width / 5) + 20, (Height / 5) + 50, 2, WHITE, BLACK, 1);
  show_string(medicine[id], (Width / 5) + 80, (Height / 5) + 90, 2, BLACK, WHITE, 1); //medicine name button
  show_string("OK", (2 * Width / 5) + 35, (3 * Height / 5) + 35, 2, WHITE, BLACK, 1);
}

void set_main_menu_button(boolean val)
{
  patientS = containerD = val;
}
void set_patientS_button(boolean val)
{
  returnB = patient1B = patient2B = patient3B = val;
}
void set_containerD_button(boolean val)
{
  container1 = container2 = container3 = container4 = container5 = container6 = container7 = container8 = container9 = container10 = container11 = container12 = back = val;
}
//touch screen setup
void touch_setup(TSPoint p)
{
  if (p.z > MINPRESSURE && p.z < MAXPRESSURE)
  {
    p.x = map(p.x, TS_MAXX, TS_MINX, my_lcd.Get_Display_Width(), 0);
    p.y = map(p.y, TS_MAXY, TS_MINY, my_lcd.Get_Display_Height(), 0);

    //     Serial.print("X = "); Serial.print(p.x);
    //     Serial.print("\tY = "); Serial.print(p.y);
    //     Serial.print("\n");
    //patiets setup button press
    if (p.x > 100 && p.x < 170 && p.y > 65 && p.y < 240 && patientS)
    {
      my_lcd.Fill_Screen(BLACK);
      show_patient_menu();
      set_main_menu_button(0);
      set_patientS_button(1);
    }
    //container details butto press
    else if (p.x > 250 && p.x < 320 && p.y > 60 && p.y < 240 && containerD)
    {
      my_lcd.Fill_Screen(BLACK);
      show_container_menu();
      set_main_menu_button(0);
      set_containerD_button(1);
    }
    //patient menu return button pressed
    else if (p.x > 440 && p.x < 470 && p.y > 270 && p.y < 320 && returnB)
    {
      my_lcd.Fill_Screen(BLACK);
      show_main_menu();
      set_main_menu_button(1);
      set_patientS_button(0);
    }
    //patient menu patient1 button pressed
    else if (p.x > 35 && p.x < 110 && p.y > 65 && p.y < 245 && patient1B)
    {
      patient1B = 0;
    }
    //patient menu patient2 button pressed
    else if (p.x > 185 && p.x < 270 && p.y > 65 && p.y < 245 && patient2B)
    {
      patient2B = 0;
    }
    //patient menu patient3 button pressed
    else if (p.x > 340 && p.x < 420 && p.y > 65 && p.y < 245 && patient3B)
    {
      patient3B = 0;
    }
    //container menu button touch setup
    else if (p.x > 15 && p.x < 80 && p.y > 220 && p.y < 320 && container1)
    { //1
      show_medicine_detail(1);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 15 && p.x < 80 && p.y > 115 && p.y < 215 && container5)
    { //5
      show_medicine_detail(5);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 15 && p.x < 80 && p.y > 5 && p.y < 105 && container9)
    { //9
      show_medicine_detail(9);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 100 && p.x < 185 && p.y > 220 && p.y < 320 && container2)
    { //2
      show_medicine_detail(2);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 100 && p.x < 185 && p.y > 115 && p.y < 215 && container6)
    { //6
      show_medicine_detail(6);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 100 && p.x < 185 && p.y > 5 && p.y < 105 && container9)
    { //9
      show_medicine_detail(10);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 210 && p.x < 280 && p.y > 220 && p.y < 320 && container3)
    { //3
      show_medicine_detail(3);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 210 && p.x < 280 && p.y > 115 && p.y < 215 && container7)
    { //7
      show_medicine_detail(7);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 210 && p.x < 280 && p.y > 5 && p.y < 105 && container11)
    { //11
      show_medicine_detail(11);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 300 && p.x < 375 && p.y > 220 && p.y < 320 && container4)
    { //4
      show_medicine_detail(4);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 300 && p.x < 375 && p.y > 115 && p.y < 215 && container8)
    { //8
      show_medicine_detail(8);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 300 && p.x < 375 && p.y > 5 && p.y < 105 && container12)
    { //12
      show_medicine_detail(12);
      set_containerD_button(0);
      ok = 1;
    }
    else if (p.x > 395 && p.x < 460 && p.y > 115 && p.y < 215 && back)
    { //back
      my_lcd.Fill_Screen(BLACK);
      show_main_menu();
      set_containerD_button(0);
      set_main_menu_button(1);
    }
    else if (p.x > 335 && p.x < 375 && p.y > 130 && p.y < 195 && ok)
    {
      my_lcd.Fill_Screen(BLACK);
      show_container_menu();
      set_containerD_button(1);
      ok = 0;
    }
  }
}

//startup of the device
void startUp()
{
  show_string("Smart Pill Manager", CENTER, Height / 2 - 40, 3, WHITE, BLACK, 1);
  show_string("DeviceID : 12345", CENTER, Height / 2 + 10, 2, WHITE, BLACK, 1);
  show_string("Loading....", CENTER, Height - 11, 1, WHITE, BLACK, 1);
}

void setup()
{
  Serial.begin(115200);
  linkSerial.begin(9600);
  // initializing the tft dispaly
  my_lcd.Init_LCD();
  my_lcd.Fill_Screen(0x0);
  my_lcd.Set_Rotation(1);
  //straup procedure
  startUp();
  delay(2000);
  my_lcd.Fill_Screen(0x0);
  show_string("Wating for connect to WiFi", CENTER, Height / 2 - 40, 2, WHITE, BLACK, 1);
#ifdef DEBUG
  //wait until device connecte to the wifi
  while (1)
  {
    if (linkSerial.available())
    {
      wifi = linkSerial.readString();
      Serial.println(wifi);
      if (wifi.equals("WiFi connected"))
      {
        break;
      }
    }
  }
#endif
  delay(5000);
  my_lcd.Fill_Screen(0x0);
  show_string("Succesfully Connected to the WiFi", CENTER, Height / 2 - 40, 2, WHITE, BLACK, 1);
  show_string("Downloading data....", CENTER, Height / 2 - 10, 2, WHITE, BLACK, 1);
  delay(5000);
  my_lcd.Fill_Screen(0x0);
  show_main_menu();

  pinMode(13, OUTPUT);
}

void loop()
{
  downloadData();
  fill_medicine();

  digitalWrite(13, HIGH);
  TSPoint p = ts.getPoint(); //Get touch point
  digitalWrite(13, LOW);
  pinMode(XM, OUTPUT);
  pinMode(YP, OUTPUT);

  touch_setup(p);
}