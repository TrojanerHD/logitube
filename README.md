# logitube
Displays the progress of the currently watched video onto your Logitech LightSync compatible keyboard's F-keys

## Currently supported
+ OS
  + Linux
+ Browser
  + Firefox
+ Websites
  + YouTube
  + Disney+
  + Watch2Gether
  + Netflix

## Installation

### Pre-requisites
+ [g810-led](https://github.com/MatMoul/g810-led) in PATH
+ A [compatible keyboard](https://github.com/MatMoul/g810-led#compatible-keyboards-)

### Installing extension and download binary file
+ Head over to [releases](https://github.com/TrojanerHD/logitube/releases)
  + Click on the .xpi file and allow Firefox to install the extension
  + Download the logitube file and place it into a folder of your choice
 
### App installation
+ Download the logitube binary in the [releases](https://github.com/TrojanerHD/logitube/releases) and place it in a folder you like (For example `$HOME/Documents/Code/Projects/logitube/`).
+ Change the binary's permission to allow executing (`chmod u+x logitube`)

### Creating a native manifest
The native manifest allows the extension to send data to the client app (See [Project structure](#project-structure) for more information)

Here is an example of creating a native manifest in Linux. For more information, refer to https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging

+ Create a new file: `touch ~/.mozilla/native-messaging-hosts/logitube.json`
+ Open the file in an editor of your choice and paste the following:
```json
{
    "name": "logitube",
    "description": "Logitech lightsync keyboards as progress bar for videos",
    "path": "<PATH>",
    "type": "stdio",
    "allowed_extensions": [
        "logitube@trojaner.com"
    ]
}
```
+ Change the property `<PATH>` to the logitube binary file. For example: `/home/user/Documents/Code/Projects/logitube/logitube`

And that's it, the extension should work for you

## Project structure
This project consists of three parts:

+ The firefox extension located in [extension](https://github.com/TrojanerHD/logitube/blob/main/extension), written in TypeScript
+ The client side app located in [app](https://github.com/TrojanerHD/logitube/blob/main/app), written in C++
+ The systemd-service and script located in [scripts](https://github.com/TrojanerHD/logitube/blob/main/scripts), written in bash and systemd syntax

Each of these parts have their own README.md that describe what they are doing and how to contribute

