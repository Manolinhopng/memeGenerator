import React from 'react';

const MemeControls = ({
  topText,
  setTopText,
  bottomText,
  setBottomText,
  fontFamily,
  setFontFamily,
  textColor,
  setTextColor,
  strokeColor,
  setStrokeColor,
  fontSize,
  setFontSize,
  setPredefinedTemplate
}) => {
  const templates = [
      { id: 'custom', name: 'Custom Use Upload' },
      { id: '1', name: 'Drake Hotline Bling', url: 'https://i.imgflip.com/30b1gx.jpg' },
      { id: '2', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
      { id: '3', name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
      { id: '4', name: 'Change My Mind', url: 'https://i.imgflip.com/24y43o.jpg' }
  ];

  return (
    <div className="bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-700 w-full flex flex-col gap-6 sticky top-6">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
        Meme Controls
      </h2>

      {/* Templates */}
      <div className="flex flex-col gap-2">
         <label className="text-sm font-semibold text-slate-300">Quick Templates</label>
         <select
            className="w-full bg-slate-900 border border-slate-600 text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
            onChange={(e) => setPredefinedTemplate(e.target.value)}
            defaultValue="custom"
         >
            {templates.map(tpl => (
                <option key={tpl.id} value={tpl.url || 'custom'}>{tpl.name}</option>
            ))}
         </select>
      </div>

      <hr className="border-slate-700/50" />

      {/* Texts */}
      <div className="flex flex-col gap-4">
        <div>
           <label className="text-sm font-semibold text-slate-300 block mb-2">Top Text</label>
           <textarea
             className="w-full bg-slate-900 border border-slate-600 text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-500 resize-none h-20 shadow-inner"
             placeholder="One does not simply..."
             value={topText}
             onChange={(e) => setTopText(e.target.value)}
           />
        </div>
        <div>
           <label className="text-sm font-semibold text-slate-300 block mb-2">Bottom Text</label>
           <textarea
             className="w-full bg-slate-900 border border-slate-600 text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-500 resize-none h-20 shadow-inner"
             placeholder="Walk into Mordor"
             value={bottomText}
             onChange={(e) => setBottomText(e.target.value)}
           />
        </div>
      </div>

      <hr className="border-slate-700/50" />

      {/* Styling */}
      <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Font</label>
              <select
                 className="w-full bg-slate-900 border border-slate-600 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                 value={fontFamily}
                 onChange={(e) => setFontFamily(e.target.value)}
              >
                 <option value="Impact">Impact</option>
                 <option value="Arial">Arial</option>
                 <option value="'Comic Sans MS'">Comic Sans</option>
                 <option value="Georgia">Georgia</option>
                 <option value="Courier New">Courier</option>
              </select>
          </div>
          <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Font Size ({fontSize}px)</label>
              <input 
                 type="range" 
                 min="10" 
                 max="120" 
                 value={fontSize} 
                 onChange={(e) => setFontSize(Number(e.target.value))}
                 className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-3"
              />
          </div>
          <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Text Color</label>
              <div className="flex h-10 w-full overflow-hidden rounded-xl border border-slate-600">
                  <input
                    type="color"
                    className="flex-1 w-full bg-slate-900 h-10 border-none outline-none cursor-pointer"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
              </div>
          </div>
          <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Stroke Color</label>
              <div className="flex h-10 w-full overflow-hidden rounded-xl border border-slate-600">
                  <input
                    type="color"
                    className="flex-1 w-full bg-slate-900 h-10 border-none outline-none cursor-pointer"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                  />
              </div>
          </div>
      </div>
      
      <div className="mt-4 text-xs text-slate-400 text-center bg-slate-900/50 p-4 rounded-xl">
         <strong className="text-amber-400 block mb-1">CORS Taint Warning</strong>
         If you use standard web URLs, they might prevent downloading. Upload your own image for the best experience!
      </div>
    </div>
  );
};

export default MemeControls;
