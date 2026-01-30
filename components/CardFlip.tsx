import React from 'react';
import { Student } from '../types';
import QRCode from 'react-qr-code';

interface CardFlipProps {
    student: Student;
    isFlipped: boolean;
    onFlip: () => void;
}

export const CardFlip: React.FC<CardFlipProps> = ({ student, isFlipped, onFlip }) => {

    // Reduced dimensions by ~10% to fit screen better
    // Wrapper: 270px width (visual) x 428px height (visual)
    // Card Actual: 428px width x ~270px height (before rotation)

    return (
        <div className="flex justify-center items-center py-2">
            <div className="relative w-[270px] h-[428px]">
                {/* The Rotating Wrapper */}
                <div
                    className="absolute top-1/2 left-1/2 w-[428px] aspect-[1.586] -translate-x-1/2 -translate-y-1/2 -rotate-90 perspective-1000 cursor-pointer"
                    onClick={onFlip}
                >
                    <div
                        className="relative w-full h-full"
                        style={{
                            transformStyle: 'preserve-3d',
                            WebkitTransformStyle: 'preserve-3d',
                            perspective: '1000px',
                            WebkitPerspective: '1000px'
                        }}
                    >
                        {/* FRONT SIDE - Original code-based design */}
                        {!isFlipped && (
                            <div
                                className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl overflow-hidden bg-[#e0f2fe] border border-slate-200"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: 'rotateX(0deg) translateZ(1px)',
                                    WebkitTransform: 'rotateX(0deg) translateZ(1px)',
                                    WebkitFontSmoothing: 'antialiased'
                                }}
                            >
                                {/* Header */}
                                <div className="absolute top-0 left-0 w-full h-[18%] bg-[#67d4fc] flex items-center justify-between px-5 z-20">
                                    {/* DNE Logo - Left */}
                                    <div className="flex items-center h-full">
                                        <img
                                            src="https://www.documentodoestudante.com.br/lp/assets/img/logo-dne-branco.webp"
                                            alt="DNE Logo"
                                            className="h-[70%] w-auto object-contain"
                                        />
                                    </div>
                                    {/* UEB Logo - Right */}
                                    <div className="flex items-center h-full">
                                        <img
                                            src="https://uebnacional.org.br/public/uploads/logo.png"
                                            alt="UEB Logo"
                                            className="h-[85%] w-auto object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Right Strip (QR & Year Logo) */}
                                <div className="absolute top-[18%] right-6 w-[18%] h-[82%] bg-white z-20 flex flex-col items-center justify-between py-4 shadow-[0_0_10px_rgba(0,0,0,0.05)]">
                                    <div className="mt-2 w-[90%] bg-white">
                                        <QRCode value={student.matricula} size={100} style={{ width: "100%", height: "auto" }} viewBox={`0 0 256 256`} />
                                    </div>
                                    <div className="mb-2 w-full flex items-center justify-center px-1">
                                        <img
                                            src="/images/2026-logo.png"
                                            alt="2026"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Background Decor */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    {/* Purple Ring Bottom Left */}
                                    <div className="absolute -bottom-14 -left-8 w-48 h-48 rounded-full border-[20px] border-[#a21caf]"></div>
                                    {/* Blue Ring Bottom Right */}
                                    <div className="absolute -bottom-20 right-[22%] w-64 h-64 rounded-full border-[24px] border-[#60a5fa]"></div>
                                </div>

                                {/* Content Area */}
                                <div className="absolute top-[18%] left-0 w-[77%] h-[82%] p-4 z-10 flex">
                                    {/* Photo */}
                                    <div className="w-[40%] h-auto relative mt-3 ml-1">
                                        <div className="w-full aspect-[3/4] bg-white p-1 shadow-md rounded-sm">
                                            <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="w-[60%] pl-3 pt-4 flex flex-col justify-start text-slate-800">
                                        <h2 className="text-base font-bold uppercase text-slate-900 leading-tight mb-2" style={{ textShadow: '0 0 4px white, 0 0 8px white, 1px 1px 2px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9)' }}>{student.name}</h2>

                                        <div className="text-[10px] font-semibold text-slate-600 space-y-0.5 leading-snug">
                                            <p><span className="text-slate-400">CPF:</span> {student.cpf}</p>
                                            <p><span className="text-slate-400">RG:</span> {student.rg}</p>
                                            <p><span className="text-slate-400">NASC.:</span> {student.birthDate.split('-').reverse().join('/')}</p>
                                            <p className="mt-1 font-bold text-slate-700">{student.institution}</p>
                                            <p className="uppercase">{student.course}</p>
                                            <p className="uppercase text-[9px]">{student.level}</p>
                                            <p><span className="text-slate-400">MAT.:</span> {student.matricula}</p>
                                        </div>

                                        <div className="mt-auto mb-1">
                                            <p className="text-[9px] text-slate-400 uppercase font-bold">Cód. Uso</p>
                                            <p className="text-base font-bold text-slate-900 tracking-wide">{student.usageCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BACK SIDE - SVG Template */}
                        {isFlipped && (
                            <div
                                className="absolute inset-0 w-full h-full shadow-2xl rounded-2xl overflow-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: 'rotateX(0deg) translateZ(2px)',
                                    WebkitTransform: 'rotateX(0deg) translateZ(2px)',
                                    WebkitFontSmoothing: 'antialiased'
                                }}
                            >
                                <img
                                    src="/logos/ueb-logo.svg"
                                    alt="Verso da Carteirinha"
                                    className="absolute inset-0 w-full h-full object-fill"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
