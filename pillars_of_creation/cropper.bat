@echo off
setlocal EnableDelayedExpansion

rem Turn wrap.png into a double image
rem From brief testing of PNG, PPM, BMP, and XPM, I found PPM is fastest for this script
magick wrap.png wrap.png -append x4extended.ppm

rem This script will render 5322 frames
rem The 5322nd frame (named 5321.png) is a duplicate of the 1st frame (named 0000.png)

for /l %%i in (0 4 21284) do (
    set /a prod=%%i/4
    if !prod! lss 10 ( echo crop 4096x2160+0+%%i to 000!prod!.png && magick x4extended.ppm -crop 4096x2160+0+%%i -quality 0 000!prod!.png
    ) else if !prod! lss 100 ( echo crop 4096x2160+0+%%i to 00!prod!.png && magick x4extended.ppm -crop 4096x2160+0+%%i -quality 0 00!prod!.png
    ) else if !prod! lss 1000 ( echo crop 4096x2160+0+%%i to 0!prod!.png && magick x4extended.ppm -crop 4096x2160+0+%%i -quality 0 0!prod!.png
    ) else ( echo crop 4096x2160+0+%%i to !prod!.png && magick x4extended.ppm -crop 4096x2160+0+%%i -quality 0 !prod!.png)
)

rem Pause when done
pause

rem Delete x4extended.ppm afterwards
del x4extended.ppm