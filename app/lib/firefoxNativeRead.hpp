/**
 * @file firefoxNativeRead.hpp
 * @author LeMoonStar (webmaster@unitcore.de)
 * @brief A header-only library to read input from the firefox Native API
 * @version 1.0
 * @date 2021-01-04
 * 
 * @copyright Copyright (c) 2021 LeMoonStar. licensed under the terms and conditions of the MIT licence.
 * 
 */

#ifndef FIREFOXNATIVEREAD_HPP
#define FIREFOXNATIVEREAD_HPP

#include <iostream>
#include <string>

static inline uint8_t getUtf8CharSize(char firstChar) {
    if ((firstChar & 0b11110000) == 0b11110000) {
        return 4;
    } else if ((firstChar & 0b11100000) == 0b11100000) {
        return 3;
    } else if ((firstChar & 0b11000000) == 0b11000000) {
        return 2;
    } else
        return 1;
}

static std::string readInput() {
    union {
        uint32_t i;
        char a[4];
    } str_size;
    std::string tmp;

    std::cin.get(str_size.a, 5);
    for (uint32_t i = 0; i < str_size.i; ++i) {
        char c = 0;
        std::cin >> c;
        uint8_t c_size = getUtf8CharSize(c);
        tmp += c;
        for (uint8_t j = 1; j < c_size; ++j) {
            std::cin >> c;
            tmp += c;
        }
    }

    return tmp;
}

#endif // FIREFOXNATIVEREAD_HPP
