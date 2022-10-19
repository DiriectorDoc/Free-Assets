@echo off
setlocal EnableDelayedExpansion

rem This script will render 4097 frames
rem The 4097th frame (names 4096.png) is a duplicate of the 1st frame (named 0000.png)

for /l %%i in (0 2 8192) do (
    set /a prod=%%i/2
    if !prod! lss 10 ( echo crop 4096x2160+%%i+0 to 000!prod!.png && magick clouds.png -crop 4096x2160+%%i+0 -quality 0 000!prod!.png
    ) else if !prod! lss 100 ( echo crop 4096x2160+%%i+0 to 00!prod!.png && magick clouds.png -crop 4096x2160+%%i+0 -quality 0 00!prod!.png
    ) else if !prod! lss 1000 ( echo crop 4096x2160+%%i+0 to 0!prod!.png && magick clouds.png -crop 4096x2160+%%i+0 -quality 0 0!prod!.png
    ) else echo crop 4096x2160+%%i+0 to !prod!.png && magick clouds.png -crop 4096x2160+%%i+0 -quality 0 !prod!.png
)

rem Pause when done
pause