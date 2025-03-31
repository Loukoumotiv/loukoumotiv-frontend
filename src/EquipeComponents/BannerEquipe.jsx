import React, { useState } from 'react';
import '../CSS/Equipe.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function BannerEquipe() {
    const [startIndex, setStartIndex] = useState(0);

    const teamData = [
        {
            name: 'Antoine Baudin',
            titre: 'Ostéopathe D.O.',
            lieu: 'Paris 19',
            site: 'https://www.doctolib.fr/osteopathe/paris/antoine-baudin',
            imageSrc: '../equipe/Antoine.png',
        },
        {
            name: 'Margaux Liurette',
            titre: 'Etudiante Ostéopathe',
            lieu: 'CSO Paris',
            site: 'https://www.smartagenda.fr/pro/cso/rendez-vous/',
            imageSrc: '../equipe/Margaux_LIURETTE.jpg',
        },
        {
            name: 'Joachim Bloch',
            titre: 'Ostéopathe D.O.',
            lieu: 'Paris 15',
            site: 'https://www.doctolib.fr/osteopathe/paris/joachim-bloch',
            imageSrc: '../equipe/Joachim_BLOCH.jpg',
        },
        {
            name: 'Océane Olivier',
            titre: 'Ostéopathe D.O.',
            lieu: 'Vanves',
            site: 'https://www.doctolib.fr/osteopathe/paris/oceane-olivier',
            imageSrc: '../equipe/Oceane_OLIVIER_osteo.jpg',
        },
        {
            name: 'Sophie Delaplane',
            titre: 'Massothérapeute Bien être',
            lieu: 'Clamart',
            site: 'https://sophiedelaplane2.wixsite.com/massage-avec-sophie',
            imageSrc: '../equipe/Sophie_DELAPLANE.jpg',
        },
        {
            name: 'Emma Chesneau',
            titre: 'Etudiante Ostéopathe',
            lieu: 'CSO Paris',
            site: 'https://www.smartagenda.fr/pro/cso/rendez-vous/',
            imageSrc: '../equipe/Emma_CHESNEAU.jpg',
        }
    ]

    const renderTeam = () => {
        const loopedData = [...teamData, ...teamData, ...teamData];
        const endIndex = Math.min(startIndex + 4, loopedData.length);
        return loopedData.slice(startIndex, endIndex).map((team, index) => (
            <a className='equipe-a' target="_blank" rel="noopener noreferrer" href={team.site}>
                <div key={index} className='equipe-member d-flex flex-column align-items-center'>
                    <img src={team.imageSrc} alt={team.name} title="Prendre rdv"/>
                    <h6 className='text-white'>{team.name}</h6>
                    <p className='text-center font-italic'>{team.titre} ({team.lieu})</p>
                </div>
            </a>
        ));
    };

    const handlePrevious = () => {
        const newIndex = startIndex === 0 ? teamData.length - 1 : startIndex - 1;
        setStartIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = startIndex === teamData.length * 2 - 1 ? 0 : startIndex + 1;
        setStartIndex(newIndex);
    };

    return (
        <div className='container-fluid banner-equipe-container'>
            <div className='container d-flex justify-content-between align-items-center'>
                <h4 className='oswald equipe-title'>Et nos loukoums masseurs !</h4>
                <div className='d-flex equipe-arrows'>
                    <p onClick={handlePrevious} disabled={startIndex === 0}>
                        &lt;
                    </p>
                    <p
                        onClick={handleNext} disabled={startIndex >= teamData.length - 5}>
                        &gt;
                    </p>
                </div>
            </div>
            <div className='container d-flex justify-content-between align-items-center equipe-slider'>
                {renderTeam()}
            </div>
                <div className='d-flex equipe-arrows arrows-after'>
                    <p onClick={handlePrevious} disabled={startIndex === 0}>
                        &lt;
                    </p>
                    <p
                        onClick={handleNext} disabled={startIndex >= teamData.length - 5}>
                        &gt;
                    </p>
                </div>
        </div>
    );
}

export default BannerEquipe;