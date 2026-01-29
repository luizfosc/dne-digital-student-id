import React from 'react';
import { Student } from '../types';
import QRCode from 'react-qr-code';

interface DynamicStudentCardProps {
    student: Student;
    side: 'front' | 'back';
}

export const DynamicStudentCard: React.FC<DynamicStudentCardProps> = ({ student, side }) => {
    if (side === 'back') {
        // Verso não tem alterações, apenas mostra a imagem
        return (
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/images/carteirinha-verso-template.jpg"
                    alt="Carteirinha Verso"
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    // Frente com dados dinâmicos sobrepostos
    return (
        <div className="absolute inset-0 w-full h-full">
            {/* Imagem de fundo do template */}
            <img
                src="/images/carteirinha-frente-template.png"
                alt="Carteirinha Frente"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Camada de dados sobrepostos */}
            <div className="absolute inset-0 w-full h-full">

                {/* Foto do estudante - Esquerda (Box branco) */}
                <div
                    className="absolute overflow-hidden"
                    style={{
                        left: '6.5%', // Ajustado para alinhar com o box
                        top: '36%',   // Desceu um pouco para centralizar verticalmente no box
                        width: '26%',
                        height: '38%',
                    }}
                >
                    <img
                        src={student.photoUrl}
                        className="w-full h-full object-cover"
                        alt="Foto do Estudante"
                    />
                </div>

                {/* Dados do estudante - Centro */}
                <div
                    className="absolute text-left"
                    style={{
                        left: '36%',
                        top: '25%', // Subir um pouco para caber tudo
                        width: '42%',
                        height: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        paddingTop: '1%',
                    }}
                >
                    {/* Nome */}
                    <div style={{ marginBottom: '2%' }}>
                        <p
                            style={{
                                fontSize: '0.6em',
                                fontWeight: '900',
                                color: '#000000',
                                lineHeight: '1.1',
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            {student.name}
                        </p>
                    </div>

                    {/* CPF */}
                    <div style={{ marginBottom: '1.2%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            CPF: {student.cpf}
                        </p>
                    </div>

                    {/* RG */}
                    <div style={{ marginBottom: '1.2%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            RG: {student.rg}
                        </p>
                    </div>

                    {/* Data de Nascimento - NOVO */}
                    <div style={{ marginBottom: '1.2%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                textTransform: 'uppercase',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            DATA DE NASC.: {student.birthDate}
                        </p>
                    </div>

                    {/* Instituição */}
                    <div style={{ marginBottom: '1.2%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            {student.institution}
                        </p>
                    </div>

                    {/* Nível */}
                    <div style={{ marginBottom: '1.2%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            {student.level}
                        </p>
                    </div>

                    {/* Curso */}
                    <div style={{ marginBottom: '1.2%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            {student.course}
                        </p>
                    </div>

                    {/* Matrícula */}
                    <div style={{ marginTop: '1.5%' }}>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '700',
                                color: '#000000',
                                lineHeight: '1.2',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            MATRÍCULA: {student.matricula}
                        </p>
                    </div>
                </div>

                {/* Cód Uso Container (QR Code + Texto abaixo) - Lado Direito */}
                <div
                    className="absolute"
                    style={{
                        left: '75%',
                        top: '28%',
                        width: '18%',
                    }}
                >
                    {/* QR Code */}
                    <div
                        className="bg-white p-1 flex items-center justify-center w-full"
                        style={{
                            marginBottom: '10%',
                        }}
                    >
                        <QRCode
                            value={student.usageCode}
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                            level="M"
                        />
                    </div>

                    {/* Texto CÓD USO - Abaixo do QR */}
                    <div className="w-full text-left">
                        <p
                            style={{
                                fontSize: '0.4em',
                                fontWeight: '700',
                                color: '#000000',
                                marginBottom: '2%',
                                lineHeight: '1',
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase',
                            }}
                        >
                            CÓD USO
                        </p>
                        <p
                            style={{
                                fontSize: '0.45em',
                                fontWeight: '900',
                                color: '#000000',
                                lineHeight: '1',
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase',
                            }}
                        >
                            {student.usageCode}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
