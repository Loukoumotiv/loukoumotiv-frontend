import React from 'react';
import '../CSS/Equipe.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function CoreEquipe() {
    const coreTeamData = [
        {
            name: 'Glenn SALIBA',
            position: `Fondatrice de Loukoumotiv’ et ostéopathe`,
            imageSrc: '../equipe/Glenn_SALIBA.jpg',
        },
        {
            name: 'Océane OLIVIER',
            position: `Responsable ressources humaines et ostéopathe`,
            imageSrc: '../equipe/Oceane_OLIVIER.jpg',
        },
        {
            name: 'Daphné ROUX',
            position: `Responsable communication`,
            imageSrc: '../equipe/Daphne_ROUX.JPG',
        },
    ]

    return (
        <div className='container d-flex align-items-center core-team'>
            {coreTeamData.map((member, index) => (
                <div key={index} className='d-flex justify-content-center align-items-center flex-column core-single'>
                    <img src={member.imageSrc} alt={member.name} />
                    <h6 className='text-center'>{member.name}</h6>
                    <p className='text-center font-italic'>{member.position}</p>
                </div>
            ))}
        </div>
    );
}

export default CoreEquipe;