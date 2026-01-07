@echo off
setlocal enabledelayedexpansion
set /a start=7200*86
for /l %%i in (%start% 7200 705600) do (
    set /a m=%%i/7200
	echo minute: !m!
	echo frame: %%i
	ffmpeg -start_number %%i -r 120 -i .\webps\m^%%06d.webp -r 120 -c:v libvpx-vp9 -b:v 0 -crf 17 -y -pix_fmt ya8 -frames 7200 -pass 1 -an -f null NUL
	ffmpeg -start_number %%i -r 120 -i .\webps\m^%%06d.webp -r 120 -c:v libvpx-vp9 -b:v 0 -crf 17 -y -pix_fmt ya8 -frames 7200 -pass 2 -an .\webms\m_minute_!m!.webm
)
ffmpeg -start_number 712800 -r 120 -i .\webps\m^%%06d.webp -r 120 -c:v libvpx-vp9 -b:v 0 -crf 17 -y -pix_fmt ya8 -pass 1 -an -f null NUL
ffmpeg -start_number 712800 -r 120 -i .\webps\m^%%06d.webp -r 120 -c:v libvpx-vp9 -b:v 0 -crf 17 -y -pix_fmt ya8 -pass 2 -an .\webms\m_minute_99.webm
pause
goto :eof