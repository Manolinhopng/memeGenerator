import { useEffect, useRef } from 'react';

const MemeCanvas = ({
  imageSrc,
  topText,
  bottomText,
  fontFamily,
  textColor,
  strokeColor,
  fontSize,
  onImageChange
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Important to allow downloading external images
    image.src = imageSrc;

    image.onload = () => {
       // Maintain aspect ratio but fit within max bounds (e.g. 800 width)
       const MAX_WIDTH = 800;
       let scale = 1;
       if(image.width > MAX_WIDTH) {
          scale = MAX_WIDTH / image.width;
       }
       const canvasWidth = image.width * scale;
       const canvasHeight = image.height * scale;
       
       canvas.width = canvasWidth;
       canvas.height = canvasHeight;

       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

       // Setup text style
       ctx.font = `${fontSize}px ${fontFamily}, Impact, sans-serif`;
       ctx.fillStyle = textColor;
       ctx.strokeStyle = strokeColor;
       ctx.lineWidth = Math.max(2, fontSize / 10);
       ctx.textAlign = 'center';
       ctx.lineJoin = 'round'; // makes stroke rounded

       // Draw Top Text
       if (topText) {
          const lines = topText.split('\n');
          const lineHeight = fontSize * 1.2;
          lines.forEach((line, index) => {
             const y = 50 + (index * lineHeight);
             ctx.strokeText(line, canvas.width / 2, y);
             ctx.fillText(line, canvas.width / 2, y);
          });
       }

       // Draw Bottom Text
       if (bottomText) {
          const lines = bottomText.split('\n');
          const lineHeight = fontSize * 1.2;
          const startY = canvas.height - 20 - ((lines.length - 1) * lineHeight);
          lines.forEach((line, index) => {
             const y = startY + (index * lineHeight);
             ctx.strokeText(line, canvas.width / 2, y);
             ctx.fillText(line, canvas.width / 2, y);
          });
       }
    };
  }, [imageSrc, topText, bottomText, fontFamily, textColor, strokeColor, fontSize]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    
    try {
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (e) {
        alert("⚠️ Cannot download due to Cross-Origin restrictions on the external URL. Please upload a local image instead.");
    }
  };

  const handleUploadClick = () => {
      document.getElementById('hiddenImageUpload').click();
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 max-w-full overflow-hidden w-full relative group">
       {!imageSrc ? (
            <div 
               className="w-full h-80 border-dashed border-4 border-slate-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-slate-700/50 transition-all cursor-pointer"
               onClick={handleUploadClick}
            >
                <svg className="w-16 h-16 text-slate-400 mb-4 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-slate-300 font-medium">Click to upload base image</span>
            </div>
       ) : (
           <div className="relative w-full flex justify-center w-full max-w-full overflow-x-auto rounded-xl shadow-lg border-2 border-slate-700/50">
               <canvas 
                    ref={canvasRef} 
                    className="max-w-full h-auto object-contain bg-slate-900 rounded-lg cursor-crosshair shadow-inner"
                />
           </div>
       )}
       
       <input 
          id="hiddenImageUpload" 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={onImageChange} 
       />

       {imageSrc && (
          <div className="mt-6 flex flex-wrap gap-4 justify-center w-full relative z-10">
              <label htmlFor="hiddenImageUpload" className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 Change Image
              </label>
              <button 
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-indigo-500/30 shadow-xl flex items-center gap-2 transform hover:scale-105"
              >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download Meme
              </button>
          </div>
       )}
    </div>
  );
};

export default MemeCanvas;
