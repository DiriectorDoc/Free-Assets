ffmpeg -r 120 -i webps\m%06d.webp -pix_fmt yuva420p -c:v libvpx-vp9 -b:v 0 -crf 27 -r 120 -pass 1 -an -f null NUL
ffmpeg -r 120 -i webps\m%06d.webp -pix_fmt yuva420p -c:v libvpx-vp9 -b:v 0 -crf 27 -r 120 -pass 2 -an m_full.webm
pause