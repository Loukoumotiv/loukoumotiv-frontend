import { Link } from "react-router-dom";
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import loukoum from '../assets/icones/loukoum_mauve.png';
import massage from '../assets/massage1.png';

function BienfaitsHomepage() {

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className='container bienfaits-container d-lg-flex d-md-block text-photo-bloc'>
                <div className='texte-du-bloc'>
                    <h4 className='oswald'>Les bienfaits d’un massage Loukoumotiv’</h4>
                    <div className='bullets-bienfaits'>
                        <div className='d-flex'>
                            <img className='loukoum-icon' src={loukoum} alt="loukoum" />
                            <p>un massage intuitif, personnalisé et unique à chaque masseur pour chaque massé</p>
                        </div>
                        <div className='d-flex'>
                            <img className='loukoum-icon' src={loukoum} alt="loukoum" />
                            <p>un massage ergonomique, sur une chaise pour utiliser le poids de corps et préserver la posture des masseurs</p>
                        </div>
                        <div className='d-flex'>
                            <img className='loukoum-icon' src={loukoum} alt="loukoum" />
                            <p>des conseils pour la suite et partage d’outils d’auto-relaxation</p>
                        </div>
                    </div>
                    <Link to='/concept'><button className='mauve-button en-savoir-plus'>En savoir plus</button></Link>
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='massage-photo' src={massage} alt="massage" />
                </div>
            </div >
        </div>
    );
}

export default BienfaitsHomepage;