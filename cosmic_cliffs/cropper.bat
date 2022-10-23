@echo off
setlocal EnableDelayedExpansion

rem This script will render 1866 frames
rem The 1866th frame (names 1865.png) is a duplicate of the 1st frame (named 0000.png)

for /l %%i in (0 4 7460) do (
    set /a prod=%%i/4
    if !prod! lss 10 ( echo crop 4096x2160+%%i+0 to 000!prod!.png && magick x4extended.png -crop 4096x2160+%%i+0 -quality 0 000!prod!.png
    ) else if !prod! lss 100 ( echo crop 4096x2160+%%i+0 to 00!prod!.png && magick x4extended.png -crop 4096x2160+%%i+0 -quality 0 00!prod!.png
    ) else if !prod! lss 1000 ( echo crop 4096x2160+%%i+0 to 0!prod!.png && magick x4extended.png -crop 4096x2160+%%i+0 -quality 0 0!prod!.png
    ) else echo crop 4096x2160+%%i+0 to !prod!.png && magick x4extended.png -crop 4096x2160+%%i+0 -quality 0 !prod!.png
)

rem Pause when done
pause