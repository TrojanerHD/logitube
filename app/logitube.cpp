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
  std::ostringstream oss;
  oss << std::hex << num;
  std::string str = oss.str();
  if (str.size() == 1) str = "0" + str;
  return str; 
}

/**
  * @brief Apply a strength to a color
  * @param r The red component of the color (0 to 255)
  * @param g The green component of the color (0 to 255)
  * @param b The blue component of the color (0 to 255)
  * @param strength The strength to apply (0 to 255)
  * @return The resulting color as a hex string
  * @example color(255, 12, 2, 127.5) => "7F0601"
  */
std::string color_with_strength_to_hex(int r, int g, int b, double strength) {
  std::string red = decimal_to_hexadecimal(strength / 255 * r);
  std::string green = decimal_to_hexadecimal(strength / 255 * g);
  std::string blue = decimal_to_hexadecimal(strength / 255 * b);
  return red + green + blue;
}

void set_key(int key, double strength, std::string service) {
  std::ostringstream oss;
  oss << "g910-led -kn f" << key << " ";

  if (service == "youtube")
    oss << color_with_strength_to_hex(255, 0, 0, strength);
  else if (service == "youtube-ad")
    oss << color_with_strength_to_hex(255, 171, 0, strength);
  else if (service == "disney")
    oss << color_with_strength_to_hex(255, 255, 255, strength);
  else if (service == "w2g")
    oss << color_with_strength_to_hex(0, 96, 223, strength);

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

