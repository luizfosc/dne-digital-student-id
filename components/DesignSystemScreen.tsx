import React, { useState } from 'react';
import { ArrowLeft, Palette, Type, Layout, Zap } from 'lucide-react';

interface DesignSystemScreenProps {
    onBack: () => void;
}

export const DesignSystemScreen: React.FC<DesignSystemScreenProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'components'>('colors');

    const ColorSwatch: React.FC<{ name: string; value: string }> = ({ name, value }) => (
        <div className="flex items-center space-x-3 mb-2">
            <div
                className="w-12 h-12 rounded-lg shadow-md border border-gray-200"
                style={{ backgroundColor: value }}
            />
            <div className="flex-1">
                <p className="text-xs font-mono text-gray-600">{name}</p>
                <p className="text-xs font-mono text-gray-400">{value}</p>
            </div>
        </div>
    );

    const ColorScale = ({ name, shades }: { name: string; shades: { shade: string; value: string }[] }) => (
        <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3 capitalize">{name}</h4>
            <div className="grid grid-cols-2 gap-3">
                {shades.map(({ shade, value }) => (
                    <ColorSwatch key={shade} name={shade} value={value} />
                ))}
            </div>
        </div>
    );

    const Tab = ({ id, icon: Icon, label }: { id: typeof activeTab; icon: any; label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center py-3 border-b-2 transition-colors ${activeTab === id
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400'
                }`}
        >
            <Icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center space-x-4 sticky top-0 z-20">
                <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Design System</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 flex sticky top-16 z-10">
                <Tab id="colors" icon={Palette} label="Cores" />
                <Tab id="typography" icon={Type} label="Tipografia" />
                <Tab id="spacing" icon={Layout} label="Espaçamento" />
                <Tab id="components" icon={Zap} label="Componentes" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-24">

                {/* COLORS TAB */}
                {activeTab === 'colors' && (
                    <div>
                        <p className="text-sm text-gray-600 mb-6">
                            Paleta de cores completa do sistema DNE Digital Student ID
                        </p>

                        <ColorScale
                            name="Primary (Blue)"
                            shades={[
                                { shade: 'primary-50', value: '#e6f7ff' },
                                { shade: 'primary-100', value: '#bae7ff' },
                                { shade: 'primary-200', value: '#91d5ff' },
                                { shade: 'primary-300', value: '#69c0ff' },
                                { shade: 'primary-400', value: '#40a9ff' },
                                { shade: 'primary-500', value: '#0099e5' },
                                { shade: 'primary-600', value: '#0088cc' },
                                { shade: 'primary-700', value: '#006bb3' },
                                { shade: 'primary-800', value: '#004d99' },
                                { shade: 'primary-900', value: '#003366' },
                            ]}
                        />

                        <ColorScale
                            name="Secondary (Orange)"
                            shades={[
                                { shade: 'secondary-50', value: '#fff7e6' },
                                { shade: 'secondary-100', value: '#ffe7ba' },
                                { shade: 'secondary-200', value: '#ffd591' },
                                { shade: 'secondary-300', value: '#ffc069' },
                                { shade: 'secondary-400', value: '#ffa940' },
                                { shade: 'secondary-500', value: '#ff7e00' },
                                { shade: 'secondary-600', value: '#e66f00' },
                                { shade: 'secondary-700', value: '#cc5f00' },
                                { shade: 'secondary-800', value: '#b35000' },
                                { shade: 'secondary-900', value: '#994000' },
                            ]}
                        />

                        <ColorScale
                            name="Success (Green)"
                            shades={[
                                { shade: 'success-50', value: '#e6fff9' },
                                { shade: 'success-100', value: '#b3f5e6' },
                                { shade: 'success-200', value: '#80ebd3' },
                                { shade: 'success-300', value: '#4de1c0' },
                                { shade: 'success-400', value: '#1ad7ad' },
                                { shade: 'success-500', value: '#00c896' },
                                { shade: 'success-600', value: '#00b386' },
                                { shade: 'success-700', value: '#009e76' },
                                { shade: 'success-800', value: '#008966' },
                                { shade: 'success-900', value: '#007456' },
                            ]}
                        />

                        <ColorScale
                            name="Error (Red)"
                            shades={[
                                { shade: 'error-50', value: '#fff1f0' },
                                { shade: 'error-100', value: '#ffccc7' },
                                { shade: 'error-200', value: '#ffa39e' },
                                { shade: 'error-300', value: '#ff7875' },
                                { shade: 'error-400', value: '#ff4d4f' },
                                { shade: 'error-500', value: '#f5222d' },
                                { shade: 'error-600', value: '#cf1322' },
                                { shade: 'error-700', value: '#a8071a' },
                                { shade: 'error-800', value: '#820014' },
                                { shade: 'error-900', value: '#5c0011' },
                            ]}
                        />

                        <ColorScale
                            name="Neutral (Gray)"
                            shades={[
                                { shade: 'neutral-0', value: '#ffffff' },
                                { shade: 'neutral-50', value: '#fafafa' },
                                { shade: 'neutral-100', value: '#f5f5f5' },
                                { shade: 'neutral-200', value: '#e8e8e8' },
                                { shade: 'neutral-300', value: '#d9d9d9' },
                                { shade: 'neutral-400', value: '#bfbfbf' },
                                { shade: 'neutral-500', value: '#8c8c8c' },
                                { shade: 'neutral-600', value: '#595959' },
                                { shade: 'neutral-700', value: '#434343' },
                                { shade: 'neutral-800', value: '#262626' },
                                { shade: 'neutral-900', value: '#1a1a1a' },
                                { shade: 'neutral-1000', value: '#000000' },
                            ]}
                        />
                    </div>
                )}

                {/* TYPOGRAPHY TAB */}
                {activeTab === 'typography' && (
                    <div>
                        <p className="text-sm text-gray-600 mb-6">
                            Escala tipográfica e hierarquia de texto
                        </p>

                        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-500 mb-4">Font Family</h3>
                            <p className="font-mono text-xs text-gray-600 mb-2">--font-family-primary</p>
                            <p className="text-lg" style={{ fontFamily: 'var(--font-family-primary)' }}>
                                Inter, system-ui, -apple-system, sans-serif
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-500 mb-4">Font Sizes</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-mono text-xs text-gray-400">xs (10px)</p>
                                    <p style={{ fontSize: 'var(--font-size-xs)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">sm (12px)</p>
                                    <p style={{ fontSize: 'var(--font-size-sm)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">base (14px)</p>
                                    <p style={{ fontSize: 'var(--font-size-base)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">md (16px)</p>
                                    <p style={{ fontSize: 'var(--font-size-md)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">lg (18px)</p>
                                    <p style={{ fontSize: 'var(--font-size-lg)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">xl (20px)</p>
                                    <p style={{ fontSize: 'var(--font-size-xl)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">2xl (24px)</p>
                                    <p style={{ fontSize: 'var(--font-size-2xl)' }}>The quick brown fox</p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400">3xl (30px)</p>
                                    <p style={{ fontSize: 'var(--font-size-3xl)' }}>The quick brown fox</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-500 mb-4">Font Weights</h3>
                            <div className="space-y-2">
                                <p style={{ fontWeight: 300 }}>Light (300)</p>
                                <p style={{ fontWeight: 400 }}>Normal (400)</p>
                                <p style={{ fontWeight: 500 }}>Medium (500)</p>
                                <p style={{ fontWeight: 600 }}>Semibold (600)</p>
                                <p style={{ fontWeight: 700 }}>Bold (700)</p>
                                <p style={{ fontWeight: 800 }}>Extrabold (800)</p>
                                <p style={{ fontWeight: 900 }}>Black (900)</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* SPACING TAB */}
                {activeTab === 'spacing' && (
                    <div>
                        <p className="text-sm text-gray-600 mb-6">
                            Sistema de espaçamento baseado em múltiplos de 4px
                        </p>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-500 mb-4">Spacing Scale</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'spacing-1', value: '4px', rem: '0.25rem' },
                                    { name: 'spacing-2', value: '8px', rem: '0.5rem' },
                                    { name: 'spacing-3', value: '12px', rem: '0.75rem' },
                                    { name: 'spacing-4', value: '16px', rem: '1rem' },
                                    { name: 'spacing-5', value: '20px', rem: '1.25rem' },
                                    { name: 'spacing-6', value: '24px', rem: '1.5rem' },
                                    { name: 'spacing-8', value: '32px', rem: '2rem' },
                                    { name: 'spacing-10', value: '40px', rem: '2.5rem' },
                                    { name: 'spacing-12', value: '48px', rem: '3rem' },
                                    { name: 'spacing-16', value: '64px', rem: '4rem' },
                                    { name: 'spacing-20', value: '80px', rem: '5rem' },
                                    { name: 'spacing-24', value: '96px', rem: '6rem' },
                                ].map(({ name, value, rem }) => (
                                    <div key={name} className="flex items-center space-x-3">
                                        <div
                                            className="bg-blue-500 h-8"
                                            style={{ width: `var(--${name})` }}
                                        />
                                        <div className="flex-1">
                                            <p className="font-mono text-xs text-gray-600">{name}</p>
                                            <p className="font-mono text-xs text-gray-400">{value} / {rem}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm mt-4">
                            <h3 className="text-sm font-bold text-gray-500 mb-4">Border Radius</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: 'sm', value: '4px' },
                                    { name: 'base', value: '6px' },
                                    { name: 'md', value: '8px' },
                                    { name: 'lg', value: '12px' },
                                    { name: 'xl', value: '16px' },
                                    { name: '2xl', value: '24px' },
                                    { name: '3xl', value: '32px' },
                                    { name: 'full', value: '9999px' },
                                ].map(({ name, value }) => (
                                    <div key={name} className="flex items-center space-x-2">
                                        <div
                                            className="w-12 h-12 bg-blue-500"
                                            style={{ borderRadius: `var(--radius-${name})` }}
                                        />
                                        <div>
                                            <p className="font-mono text-xs text-gray-600">radius-{name}</p>
                                            <p className="font-mono text-xs text-gray-400">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* COMPONENTS TAB */}
                {activeTab === 'components' && (
                    <div>
                        <p className="text-sm text-gray-600 mb-6">
                            Componentes e padrões reutilizáveis do sistema
                        </p>

                        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-700 mb-4">Buttons</h3>
                            <div className="space-y-3">
                                <button className="btn btn-primary px-6 py-3">
                                    Primary Button
                                </button>
                                <button className="btn btn-secondary px-6 py-3">
                                    Secondary Button
                                </button>
                                <button className="btn btn-success px-6 py-3">
                                    Success Button
                                </button>
                                <button className="btn btn-error px-6 py-3">
                                    Error Button
                                </button>
                                <button className="btn btn-primary px-6 py-3" disabled>
                                    Disabled Button
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-700 mb-4">Cards</h3>
                            <div className="card">
                                <h4 className="font-bold text-gray-800 mb-2">Card Title</h4>
                                <p className="text-sm text-gray-600">
                                    Este é um exemplo de card usando as classes base do design system.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-700 mb-4">Inputs</h3>
                            <input
                                type="text"
                                className="input mb-3"
                                placeholder="Input padrão"
                            />
                            <input
                                type="text"
                                className="input"
                                placeholder="Input desabilitado"
                                disabled
                            />
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-700 mb-4">Shadows</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl'].map((size) => (
                                    <div
                                        key={size}
                                        className="h-20 bg-white rounded-lg flex items-center justify-center"
                                        style={{ boxShadow: `var(--shadow-${size})` }}
                                    >
                                        <p className="font-mono text-xs text-gray-600">shadow-{size}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
