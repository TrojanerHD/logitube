all:
	echo "Don't forget to increase version"
	tsc
ifneq ("$(wildcard ./logitube.zip)", "")
	rm logitube.zip
endif
	cp manifest.json build/
	cd build && zip ../logitube.zip *.js manifest.json

clean:
	rm -r build
	rm logitube.zip
