#include <json/json.h>
#include <math.h>

#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

namespace fnr {
#include "lib/firefoxNativeRead.hpp"
}

std::string decimal_to_hexadecimal(int num) {
  if (num == 0) return "00";
  char arr[2];
  int i = 0;
  while (num != 0) {
    int temp = 0;
    temp = num % 16;
    if (temp < 10) {
      arr[i] = temp + 48;
      i++;
    } else {
      arr[i] = temp + 55;
      i++;
    }
    num = num / 16;
  }
  std::ostringstream oss;
  for (int j = i - 1; j >= 0; j--) oss << arr[j];
  return oss.str();
}

void set_key(int key, double strength, std::string service) {
  std::ostringstream oss;
  std::string colorCode = decimal_to_hexadecimal(strength);
  oss << "g910-led -kn f" << key << " ";

  if (service == "youtube")
    oss << colorCode << "0000";
  else if (service == "youtube-ad")
    oss << colorCode << decimal_to_hexadecimal(strength / 255 * 171) << "00";
  else if (service == "disney")
    oss << colorCode << colorCode << colorCode;
  else if (service == "w2g")
    oss << "00" << decimal_to_hexadecimal(strength / 255 * 96) << decimal_to_hexadecimal(strength / 255 * 223);

  std::string command = oss.str();
  system(command.c_str());
}

void set_keys(double percent, std::string service) {
  system("g910-led -an 000000");
  for (unsigned int i = 1; i <= 12; i++) {
    if (percent < 8 + 1 / 3) {
      percent = percent / (8 + 1 / 3) * 100;
      set_key(i, percent * 2.55, service);
      break;
    }
    set_key(i, 255, service);
    percent -= 8 + 1 / 3;
  }
  system("g910-led -c");
}

int main() {
  Json::Reader reader;
  Json::Value obj;
  bool service_running = true;
  while (true) {
    std::string data = fnr::readInput();
    reader.parse(data, obj);
    if (obj["duration"].asDouble() == 0) {
      if (!service_running) {
        system("systemctl --user start logitech.service");
        service_running = true;
      }
      continue;
    }
    if (service_running) {
      system("systemctl --user stop logitech.service");
      service_running = false;
    }
    set_keys(
        obj["currentTime"].asDouble() / obj["duration"].asDouble() * 100,
        obj["service"].asString());
  }
}

