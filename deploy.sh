#!/bin/sh

target=testing;

buildDir="../build/$target"
iosDir="../ios/www"

echo $'\e[32m''building Sencha  ../ios/www' $'\e[00m'

#sencha app build testing ../ios/www/ > /tmp/st2.out
cd html5/
say "Deploying" >/dev/null 2>&1 3>&1
sencha app build $target >/tmp/st2.out 2>&1
isError=`grep ERROR /tmp/st2.out > /dev/null 2>&1`
if [ $? -eq 0 ]; then
	echo $'\e[31m''Sencha build error' $'\e[00m'
	osascript -e 'tell application "Finder"' -e "activate" -e "display dialog \"Erorr with Sencha Touch 2 build\"" -e 'end tell'
	cat /tmp/st2.out
	cd ..
else 	
	echo $'\e[32m''Sencha build DONE' $'\e[00m'

	echo "Copying to ios..."
	rm -rf $iosDir/*
	cp -Rf $buildDir/* $iosDir/
	cp lib/cordova-1.9.0.ios.js $iosDir/cordova-1.9.0.js
	cp lib/ChildBrowser.ios.js $iosDir/ChildBrowser.js
	echo "DONE.."
	say "Done Building" >/dev/null 2>&1 3>&1
fi
