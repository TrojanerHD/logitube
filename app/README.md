# logitube app
This is the client app of the logitube service.

## Contribute

### Pre-requisites
+ Python 3.4+
+ Git

### Compile
+ Clone this repository if you haven't already

#### Dependencies
Since I did not want to use a dependency manager, the following steps are required to install dependencies:

+ Clone the GitHub repository [jsoncpp](https://github.com/open-source-parsers/jsoncpp) into a different folder
+ Open a terminal inside the jsoncpp folder
+ Execute `python amalgamate.py -s dist/lib/jsoncpp.cpp`
+ Copy the contents of the dist folder into the `logitube/app` folder. The file structure should be `logitube/app/lib/…`

#### Makefile
+ make all: Compiles the app to make it ready for use
+ make clean: Deletes executable file

## Final words
Apologies for the bad code. This was my first “bigger” C++ project that actually worked
