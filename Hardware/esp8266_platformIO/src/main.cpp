// #define DEBUG 1

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <WiFiManager.h>
#include <WiFiManager.h>

#define ssid "Lacase De Papel"
#define password "naruto@team7"
#define mqttServer "broker.mqtt-dashboard.com"
#define mqttPort 1883
#define clientName "SPM_Device01"

const char *subTopic = "test/topic/12345";

// const char trustRoot[] PROGMEM = R"EOF(
//   -----BEGIN CERTIFICATE-----
// MIIEITCCAwmgAwIBAgIJAKpqe6a7SnM8MA0GCSqGSIb3DQEBCwUAMIGmMQswCQYD
// VQQGEwJzbDEQMA4GA1UECAwHd2VzdGVybjEQMA4GA1UEBwwHY29sb21ibzEcMBoG
// A1UECgwTc21hcnRwaWxsbWFuYWdlcl9jYTETMBEGA1UECwwKSGVhbHRoY2FyZTEV
// MBMGA1UEAwwMMTMuODkuMzkuMTUyMSkwJwYJKoZIhvcNAQkBFhplbmcuaXN1cnVs
// YWtzaGFuQGdtYWlsLmNvbTAeFw0yMTA1MjMxMDAxMzlaFw0yMjA1MjMxMDAxMzla
// MIGmMQswCQYDVQQGEwJzbDEQMA4GA1UECAwHd2VzdGVybjEQMA4GA1UEBwwHY29s
// b21ibzEcMBoGA1UECgwTc21hcnRwaWxsbWFuYWdlcl9jYTETMBEGA1UECwwKSGVh
// bHRoY2FyZTEVMBMGA1UEAwwMMTMuODkuMzkuMTUyMSkwJwYJKoZIhvcNAQkBFhpl
// bmcuaXN1cnVsYWtzaGFuQGdtYWlsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEP
// ADCCAQoCggEBALzSyb7fkpadmmo2GxjkJgFm1xgVOFxyadg1rkTQ4ZyI1G3R9yg/
// zoMfCZAVaocmJyKps+hIsaA7AEK8ojaEC3F57a71zBheLx/WBWjyY1JvjHqtepfz
// /pEjA44PCeSqwacnWxxqmFQEfzyVjaLBUIRN8Xc2te+TyL/UVf1AHHh6XaNyXtcR
// pHBaIXb7+qooFkghyJ/g+o/P3Lx7wdbmcRCAXJ1yF9iUFlCO0bMEdeO8Z3CjZ7bU
// JBzi6VTk8p+gpTqP0HnqG374xCOXdhpUutj+CLg/H33zGM6hmQ8tek4YN9eq7Hmd
// AFxnMQvfcgsWMRtoyQ2gXOQaCg0d6hhdEZcCAwEAAaNQME4wHQYDVR0OBBYEFGb1
// sd0AIXk6hy3TgWXAKJPTWkuxMB8GA1UdIwQYMBaAFGb1sd0AIXk6hy3TgWXAKJPT
// WkuxMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADswDVNivCn2k9QK
// qQ1l6iVq45BKpjutdWhgbEgK6hqNimP7ItRTv6RFzego047qWthyX2cPB7x2NhOD
// 9AUZJerKdsi77xDmdQ5fnsyWU3CGneZW0wPyZhUEf6ENwuy//lMwhbJL6w5JbPDQ
// 5PbQwI3/Yd63OEXwoBMilM+kM+FIFCR0QnZsrrkRn66S1rNxmiOtTCItd8qbFFvz
// 6rxVr4lR+G/Ykztm3P7morOa9uodb+28MJ7L6tlGrI3EB13OYXt65oZSg0JjH/RH
// JFtUyTQ6qEMwO5URJ/xkcJaZs5x+PpjjiPvz7zhBx2nGY86Oye2Snii+Cc5lPCm0
// WX4TR8A=
// -----END CERTIFICATE-----
// )EOF";
// X509List cert(trustRoot);
// set up a client
WiFiClient espClient;
PubSubClient client(espClient);

// We start by connecting to a WiFi network
void setup_wifi()
{
  // #ifdef DEBUG
  //   Serial.print("Connecting to ");
  //   Serial.print(ssid);
  // #endif
  //   WiFi.begin(ssid, password);
  //   while (WiFi.status() != WL_CONNECTED)
  //   {
  //     delay(500);
  // #ifdef DEBUG
  //     Serial.print(".");
  // #endif
  //   }
  WiFiManager wifiManager;
  wifiManager.resetSettings();
  wifiManager.autoConnect("SmartPillManager", "12345");
  // espClient.setTrustAnchors(&cert);
  delay(5000);
  Serial.println("WiFi connected");
}

void callback(char *topic, byte *payload, unsigned int length)
{
#ifdef DEBUG
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
#endif
  DynamicJsonDocument doc(8192);
  DeserializationError error = deserializeJson(doc, payload, length);

  if (error)
  {
#ifdef DEBUG
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
#endif
    return;
  }

  JsonArray arr = doc["containers"].as<JsonArray>();
  Serial.print("{\"patients\":");
  serializeJson(doc["patients"], Serial);
  Serial.print(",\"container\":[");
  delay(1000);
  for (int i = 0; i < arr.size(); i++)
  {
    serializeJson(arr[i], Serial);
    if (i < arr.size() - 1)
    {
      Serial.print(",");
    }
    delay(1000);
  }
  Serial.print("]}");
}

void mqttConnect()
{
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  client.setBufferSize(30000);

  while (!client.connected())
  {
#ifdef DEBUG
    Serial.println("Connecting to MQTT...");
#endif
    if (client.connect(clientName))
    {
#ifdef DEBUG
      Serial.println("connected");
#endif
    }
    else
    {
#ifdef DEBUG
      Serial.print("failed with state ");
      Serial.print(client.state());
#endif
      delay(2000);
    }
  }
  client.subscribe(subTopic);
}
void setup()
{
  Serial.begin(9600);

  setup_wifi();
  mqttConnect();
}

void loop()
{
  if (!client.connected())
  {
#ifdef DEBUG
    Serial.println("Reconnecting to MQTT...");
#endif
    if (client.connect(clientName))
    {
#ifdef DEBUG
      Serial.println("connected");
#endif
    }
    else
    {
#ifdef DEBUG
      Serial.print("failed with state ");
      Serial.print(client.state());
#endif
    }
    client.subscribe(subTopic);
  }
  client.loop();
}