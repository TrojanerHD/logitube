# logitube scripts
The logitube app automatically disables and enables the user's systemd service `logitube.service` so it is always active when you are not playing any video.

In this folder, I have put
+ My systemd user service [logitech.service](./logitech.service) that should be put in `~/.config/sytstemd/user` (note that the paths to the sh should be changed accordingly)
+ My lighting script ([Lighting.sh](./Lighting.sh)

## Makefile
+ make all: Creates required folders and copies all scripts to their correct locations
+ make clean: Removes all script files
