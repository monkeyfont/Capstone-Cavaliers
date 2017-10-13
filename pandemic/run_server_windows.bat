@echo off
echo Server is starting... 
echo Closing this window will stop the server. 
echo for Ip address try use http://localhost
python run.py
if errorlevel 1 goto uhoh
exit
:uhoh
echo.
echo.
echo.
echo ERROR: There was a problem running the server. 
echo If it didn't start at all, you might not be using python2, try using py -2.7 run.py
echo alternatively, you might have an existing instance open.
echo If it crashed while running, it's likely the python process crashed.
echo.
echo.
pause