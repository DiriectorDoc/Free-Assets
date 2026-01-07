ffmpeg -r 120 -i C:\Users\User\Downloads\green.png -c:v libvpx-vp9 -r 120 -i m.webm -filter_complex overlay -r 120 -c:v libx264 -b:v 6M -pass 1 -an -f null NUL
ffmpeg -r 120 -i C:\Users\User\Downloads\green.png -c:v libvpx-vp9 -r 120 -i m.webm -filter_complex overlay -r 120 -c:v libx264 -b:v 6M -pass 2 -an m.mp4
pause