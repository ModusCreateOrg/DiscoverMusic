while true; do
	cd html5; 
	#cd resources/scss/; 
	#compass compile;
	#cd ../..
	sencha app build testing ../dm_android/assets/www/ 
	cd ..
	say done
	clear; 
	echo "ready?";
	read
done
