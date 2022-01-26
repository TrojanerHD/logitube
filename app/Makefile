CC = g++

all:
	make compile

compile:
	$(CC) -c lib/jsoncpp.cpp -o jsoncpp.o
	$(CC) -c logitube.cpp -o logitube.o
	$(CC) logitube.o jsoncpp.o -lm -o logitube
	for i in dir; do find . -type f -name "*.o" -delete; done

clean:
	rm logitube
