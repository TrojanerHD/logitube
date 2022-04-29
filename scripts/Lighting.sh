#!/bin/bash

overwatch () {
  g910-led -an fa9c1d
  g910-led -kn w 8000ff
  g910-led -kn a 8000ff
  g910-led -kn s 8000ff
  g910-led -kn d 8000ff
  g910-led -kn space 8000ff
  g910-led -kn shift_left 1dc100
  g910-led -kn e 1dc100
  g910-led -kn close_bracket 1dc100
  g910-led -c
}

portal2 () {
  g910-led -an 8000ff
  g910-led -kn w FF6A00
  g910-led -kn a FF6A00
  g910-led -kn s FF6A00
  g910-led -kn d FF6A00
  g910-led -kn shift_left 1dc100
  g910-led -kn z ff0000
  g910-led -kn x ff0000
  g910-led -kn m ff0000
  g910-led -kn y ffffff
  g910-led -kn u 00ADEF
  g910-led -kn j 00ADEF
  g910-led -kn e 1dc100
  g910-led -kn r FF00DC
  g910-led -kn f FF00DC
  g910-led -kn g FF00DC
  g910-led -c
}

splitgate () {
  g910-led -an 19ffba
  g910-led -kn w 1dc100
  g910-led -kn a 1dc100
  g910-led -kn s 1dc100
  g910-led -kn d 1dc100
  g910-led -kn shift_left 00ADEF
  g910-led -kn q 8000ff
  g910-led -kn e FF6A00
  g910-led -kn z 8000ff
  g910-led -kn x FF6A00
  g910-led -kn control_left 00ADEF 
  g910-led -kn r FF00DC
  g910-led -c
}


default () {
  g910-led -fx hwave keys 5s
  g910-led -fx cycle logo 5s
}

default=false
while :
do
  sleep 5
  if [ "$EUID" -eq 0 ]; then
    runuser -l trojaner -c 'DISPLAY=:0 xhost +local:'>/dev/null
  else
    DISPLAY=:0 xhost +local:
  fi
  name=$(DISPLAY=:0 xdotool getactivewindow getwindowname)
  if [ "$oldGame" == "$name" ]; then
    continue
  fi
  oldGame=$name
  case $name in
    "Overwatch")
      overwatch
      default=false;;
    "PORTAL 2 - OpenGL"|"PORTAL 2 - Vulkan"|"Portal 2 Speedrun Mod - OpenGL")
      portal2
      default=false;;
    "PortalWars")
      splitgate
      default=false;;
    *)
      if [ $default == true ]; then
        continue
      fi
      default=true
      default
  esac
done

