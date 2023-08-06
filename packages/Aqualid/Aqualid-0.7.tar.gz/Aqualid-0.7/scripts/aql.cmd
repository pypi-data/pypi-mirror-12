@echo off
@echo off

set AQL_ERRORLEVEL=
IF [%AQL_RUN_SCRIPT%] == [YES] goto run

REM Workaround for an interactive prompt "Terminate batch script? (Y/N)"
REM When CTRL+C is pressed
SET AQL_RUN_SCRIPT=YES
CALL %0 %* <NUL
set AQL_ERRORLEVEL=%ERRORLEVEL%
goto exit

:run
SET AQL_RUN_SCRIPT=
SETLOCAL
SET "PATH=%~dp0;%PATH%"
python -O -c "import aqualid; import sys; sys.exit(aqualid.main())" %*
ENDLOCAL & set AQL_ERRORLEVEL=%ERRORLEVEL%

:exit
exit /B %AQL_ERRORLEVEL%
