@echo off

IF EXIST .senchasdk (
    SET /P sdkpath= < .senchasdk
    
    "%sdkpath%\command\sencha" %*
) ELSE (
	set dir=%~dp0
    jsdb -path "%dir%..\command" "%dir%..\command\sencha.js" %*
)