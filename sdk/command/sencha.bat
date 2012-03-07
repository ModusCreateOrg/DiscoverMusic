@echo off

IF EXIST .\sdk\command\sencha (
	set NODE_PATH=.\sdk\command\vendor\nodejs\node_modules
	.\sdk\command\vendor\nodejs\win\node sdk\command\sencha.js %*
) ELSE (
	IF EXIST .\command\sencha (
		set NODE_PATH=.\command\vendor\nodejs\node_modules
		.\command\vendor\nodejs\win\node command\sencha.js %*
	) ELSE (
    	set dir=%~dp0
    	jsdb -path "%dir%..\command" "%dir%..\command\sencha.js" %*
	)
)