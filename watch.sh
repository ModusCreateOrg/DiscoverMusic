#!/bin/sh

MD5=`md5 /tmp/watcher.md5 | awk '{print $4}'`;
X=0;

while [ $X -eq 0 ]; do 
	newMD5=`ls -lR html5/ > /tmp/watcher.md5 && md5 /tmp/watcher.md5 | awk '{print $4}'`;

	if [ $MD5 != $newMD5 ]; then
		echo 
		echo "Change found, deploying! `date`"
		#say "deploying..."
		./deploy.sh
		if [ $? -eq 0 ] ; then
			MD5=$newMD5;
			#say "done building" >/dev/null 2>&1
		fi
	else 
		printf .	
	fi
	
	sleep .5
done
