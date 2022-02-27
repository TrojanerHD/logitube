all:
	echo "Don't forget to increase version"
	tsc
ifneq ("$(wildcard ./logitube.zip)", "")
	rm logitube.zip
endif
	zip logitube.zip build/*.js manifest.json

clean:
	rm -r build
	rm logitube.zip
