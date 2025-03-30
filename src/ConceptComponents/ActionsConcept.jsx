import '../CSS/Concept.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function ActionsConcept() {

    return (
        <div className='container-fluid actions align-items-center'>
            <div className='container d-flex actions-title'>
                <h2 className="font-bold">NOS ACTIONS</h2>
            </div>
            <div className='container d-flex align-items-center monMartin-container justify-content-center'>
                <div className='container d-flex align-items-center justify-content-center actions-first-line'>
                    <div className='align-items-center actions-container actions-top-left-line'>
                        <div className='container d-flex align-items-center justify-content-center'>
                            <img className="actions-img" src="../concept/phase_diagnostique.png" alt="phase_diagnostique"/>
                            <div className='actions-text actions-top-text'>
                                <p>Phase diagnostique</p>
                            </div>
                        </div>
                    </div>
                    <div className='align-items-center actions-container actions-top-left-line'>
                        <div className='container d-flex align-items-center justify-content-center'>
                            <img className="actions-img" src="../concept/initiation.png" alt="initiation"/>
                            <div className='actions-text actions-top-text'>
                                <p>Initiation à l'ostéopathie</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='actions-container actions-top-right-line align-items-center'>
                    <div className='container d-flex align-items-center justify-content-center'>
                        <img className="actions-img" src="../concept/meditation.png" alt="meditation"/>
                        <div className='actions-text actions-top-text'>
                            <p>Méditation guidée</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container d-flex align-items-center actions-second-line'>
                <div className='actions-container actions-second-line-div align-items-center'>
                    <div className='container d-flex align-items-center justify-content-center'>
                        <img className="actions-img" src="../concept/massage_assis.png" alt="massage_assis"/>
                        <div className='actions-text actions-bottom'>
                            <p>Massage assis</p>
                        </div>
                    </div>
                </div>
                <div className='actions-container actions-second-line-div align-items-center'>
                    <div className='container d-flex align-items-center justify-content-center'>
                        <img className="actions-img" src="../concept/respiration.png" alt="respiration"/>
                        <div className='actions-text actions-bottom'>
                            <p>Respiration guidée</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ActionsConcept;