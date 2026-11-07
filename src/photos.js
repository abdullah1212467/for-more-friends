// ➜ Put Tuba's pictures in /public/photos and set src to e.g. '/photos/1.jpg'.
// Leave src empty to show a soft placeholder. Edit captions freely.
export const photos=[
 {src:'',caption:'Add a caption ✿'},{src:'',caption:'Add a caption ♡'},{src:'',caption:'Add a caption ✨'},
 {src:'',caption:'Add a caption 🎀'},{src:'',caption:'Add a caption 🌸'},{src:'',caption:'Add a caption 💗'}];
export const placeholder=(i)=>{const c=[['#ffc2d9','#e3d4ff'],['#ffd9bf','#ffc2d9'],['#e3d4ff','#cfe9ff']][i%3];
 const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="300" height="300" fill="url(#g)"/><text x="150" y="150" font-size="64" text-anchor="middle">📷</text><text x="150" y="205" font-size="16" fill="#8a5a75" text-anchor="middle" font-family="sans-serif">Your photo here</text></svg>`;
 return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)};
