@echo off
for /l %%i in (7355 1 9999) do (echo m00%%i.webp && "C:\Program Files\Inkscape\bin\inkscape.com" --export-type="png" --export-width=3840 -o "webps\m00%%i.png" m\m00%%i.svg && img2webp -m 6 "webps\m00%%i.png" -o "webps\m00%%i.webp" && del "webps\m00%%i.png")
for /l %%i in (10000 1 99999) do (echo m0%%i.webp && "C:\Program Files\Inkscape\bin\inkscape.com" --export-type="png" --export-width=3840 -o "webps\m0%%i.png" m\m0%%i.svg && img2webp -m 6 "webps\m0%%i.png" -o "webps\m0%%i.webp" && del "webps\m0%%i.png")
for /l %%i in (100000 1 72001) do (echo m%%i.webp && "C:\Program Files\Inkscape\bin\inkscape.com" --export-type="png" --export-width=3840 -o "webps\m%%i.png" m\m%%i.svg && img2webp -m 6 "webps\m%%i.png" -o "webps\m%%i.webp" && del "webps\m%%i.png")
pause