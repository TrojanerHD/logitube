addon:
	echo "Don't forget to increase version"
	tsc
	rm logitube.zip
	cp manifest.json build/
	cd build && zip ../logitube.zip *.js manifest.json

clean:
	rm -r build
	rm logitube.zip
