import React, { useState, useEffect } from 'react';
import MemeCanvas from './components/MemeCanvas';
import MemeControls from './components/MemeControls';

function App() {
  // Try loading initial state from local storage or set defaults
  const loadInitialState = () => {
     try {
       const saved = localStorage.getItem('memeGenState');
       if (saved) return JSON.parse(saved);
     } catch(e) {}
     return {
        imageSrc: '',
        topText: 'Meme',
        bottomText: 'Generator',
        fontFamily: 'Impact',
        textColor: '#FFFFFF',
        strokeColor: '#000000',
        fontSize: 40
     };
  };

  const [state, setState] = useState(loadInitialState);

  // Sync state to local storage on change
  useEffect(() => {
     localStorage.setItem('memeGenState', JSON.stringify(state));
  }, [state]);

  const updateState = (key, value) => {
     setState(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
       const reader = new FileReader();
       reader.onload = () => updateState('imageSrc', reader.result);
       reader.readAsDataURL(file);
    }
  };

  const handlePredefinedTemplate = (url) => {
    if (url === 'custom') {
       // Just keep the current image if custom is selected, or let user upload
    } else {
       updateState('imageSrc', url);
       // Clear texts for fresh start
       updateState('topText', '');
       updateState('bottomText', '');
    }
  };

  // Generate a stylish gradient header
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans mb-10 w-full">
      <header className="py-8 text-center relative overflow-hidden bg-slate-800 shadow-md border-b border-slate-700 w-full mb-8">
         {/* Decorative blobs */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         
         <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 mb-2">
              Ultimate Meme Maker
            </h1>
            <p className="text-slate-400 font-medium md:text-lg">Create, Customize & Download Epic Memes</p>
         </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 w-full">
         <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 perspective">
            
            {/* Left side: Canvas */}
            <div className="lg:col-span-8 flex flex-col w-full min-w-0 transition-transform hover:-translate-y-1 duration-300">
               <MemeCanvas 
                  imageSrc={state.imageSrc}
                  topText={state.topText}
                  bottomText={state.bottomText}
                  fontFamily={state.fontFamily}
                  textColor={state.textColor}
                  strokeColor={state.strokeColor}
                  fontSize={state.fontSize}
                  onImageChange={handleImageUpload}
               />
            </div>

            {/* Right side: Controls */}
            <div className="lg:col-span-4 w-full min-w-0 transition-transform hover:-translate-y-1 duration-300">
               <MemeControls 
                  topText={state.topText} setTopText={(val) => updateState('topText', val)}
                  bottomText={state.bottomText} setBottomText={(val) => updateState('bottomText', val)}
                  fontFamily={state.fontFamily} setFontFamily={(val) => updateState('fontFamily', val)}
                  textColor={state.textColor} setTextColor={(val) => updateState('textColor', val)}
                  strokeColor={state.strokeColor} setStrokeColor={(val) => updateState('strokeColor', val)}
                  fontSize={state.fontSize} setFontSize={(val) => updateState('fontSize', val)}
                  setPredefinedTemplate={handlePredefinedTemplate}
               />
            </div>

         </div>
      </main>
    </div>
  );
}

export default App;
