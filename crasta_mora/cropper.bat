@echo off
setlocal EnableDelayedExpansion

echo extending image (temp.jpg)
magick Crasta_Mora_P.2798_Panorama.jpg Crasta_Mora_P.2798_Panorama.jpg +append -crop 44146x3570+0+0 temp.jpg

rem This script will render 18689 frames
rem The 18689th frame (named 18688.jpg) is a duplicate of the 1st frame (named 0000.jpg)

for /l %%i in (0 6 37376) do (
    set /a prod=%%i/6
    if !prod! lss 10 ( echo crop 6770x3570+%%i+0 to 0000!prod!.jpg && magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 0000!prod!.jpg
    ) else if !prod! lss 100 ( echo crop 6770x3570+%%i+0 to 000!prod!.jpg && magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 000!prod!.jpg
    ) else if !prod! lss 1000 ( echo crop 6770x3570+%%i+0 to 00!prod!.jpg && magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 00!prod!.jpg
    ) else ( echo crop 6770x3570+%%i+0 to 0!prod!.jpg && magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 0!prod!.jpg)
)
for /l %%i in (4 6 37376) do (
    set /a prod=%%i/6 + 6230
    if !prod! lss 10000 ( echo crop 6770x3570+%%i+0 to 0!prod!.jpg && magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 0!prod!.jpg
    ) else ( echo crop 6770x3570+%%i+0 to !prod!.jpg && magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 !prod!.jpg)
)
for /l %%i in (2 6 37376) do (
    set /a prod=%%i/6 + 12459
    echo crop 6770x3570+%%i+0 to !prod!.jpg
    magick temp.jpg -crop 6770x3570+%%i+0 -resize 4096x2160 !prod!.jpg
)

rem Pause when done
pause

rem Delete temp.jpg afterwards
del temp.jpg