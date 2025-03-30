import React, { useState, useEffect } from 'react';
import Loading from '../Frequents/Loading';
import { useSelector, useDispatch } from "react-redux";
import { getUserID } from '../userInfo/getTeamData';
import { dropMission, getMissionsByTeamMember } from '../redux/actions/missions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import { toast } from "react-hot-toast";
import registered from '../assets/icones/inscrit_noir.png';
import see_details from '../assets/icones/voir_noir.png';

function MyMissionsAdminDash() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [missionToSee, setMissionToSee] = useState({});
  const [missionToDrop, setMissionToDrop] = useState(null);
  const LoggedMemberId = getUserID();

  const [title, setTitle] = useState(missionToSee.title || '');
  const [status, setStatus] = useState(missionToSee.status || '');
  const [partner, setPartner] = useState(missionToSee.partner || '');
  const [type, setType] = useState(missionToSee.type || '');
  const [time, setTime] = useState({
    date: missionToSee.date || '',
    hours: [missionToSee.hours || ''],
  });
  const [description, setDescription] = useState(missionToSee.description || '');
  const [location, setLocation] = useState({
    place: missionToSee.place || '',
    number: missionToSee.number || '',
    street: missionToSee.street || '',
    ZIPcode: missionToSee.ZIPcode || '',
    city: missionToSee.city || '',
  });
  const [remuneration, setRemuneration] = useState(missionToSee.remuneration || '');
  const [requiredMembers, setRequiredMembers] = useState(missionToSee.requiredMembers || '');
  const [capacity, setCapacity] = useState(missionToSee.capacity || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMissionsByTeamMember(LoggedMemberId))
        setLoading(false);
      } catch (error) {
        console.error('Erreur', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch])

  // setTimeout(() => {
  //   console.log("missions", missions);
  // }, 5000);

  const toggleDetailsModal = (mission) => {
    setMissionToSee(mission);
    setShowDetailsModal(!showDetailsModal)
  }

  const handleSee = () => {
    if (missionToSee && missionToSee._id) {
      setShowDetailsModal(false);
    }
  };

  const toggleDropModal = (Id, title) => {
    setMissionToDrop({ Id, title });
    setShowDropModal(!showDropModal)
  }

  const handleDrop = () => {
    if (missionToDrop && missionToDrop.Id && LoggedMemberId) {
      try {
        dispatch(dropMission(missionToDrop.Id, LoggedMemberId, token));
        toast.success(`Désinscription réussie !`)
        setTimeout(() => {
          setShowDropModal(false);
          window.location.reload()
        }, 3000);
      }
      catch {
        toast.error(`Oups, réessayez plus tard`)
      }
    };
  }

  return (
    <div className="container ">
      <div className='scrollable-table'>
        <div className='container-table'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Statut &#8597;</th>
                <th scope="col">Partenaire</th>
                <th scope="col">Type</th>
                <th scope="col">Date(s)</th>
                <th scope="col">Heures</th>
                <th scope="col">Requis</th>
                <th scope="col">Rémunération</th>
                <th scope="col">Détails</th>
                <th scope="col">Se désinscrire</th>
              </tr>
            </thead>
            <tbody>
              {missions.length === 0 ? (
                <tr>
                  <td colSpan="9" className='text-center font-italic'>Vous n'êtes encore inscrit à aucune mission Loukoumotiv'. <br />
                    Inscrivez-vous via l'onglet 'Toutes les missions'.</td>
                </tr>
              ) : (
                missions.map((mission) => (
                  <tr key={mission._id}>
                    <td scope="row">{mission.title}</td>
                    <td>{(() => {
                    switch (mission.status) {
                      case 'to do':
                        return 'À venir';
                      case 'done':
                        return 'Fait';
                      case 'cancelled':
                        return 'Annulée';
                      default:
                        return mission.status;
                    }
                  })()}</td>
                    <td>{mission.partner.name}</td>
                    <td>{mission.type}</td>
                    <td>{new Date(mission.time.date).toLocaleDateString("en-GB")}</td>
                    <td>
                      {mission.time.hours.map((hour, index) => (
                        <div key={index}>{hour}</div>
                      ))}
                    </td>
                    <td>{mission.requiredMembers}</td>
                    <td>{mission.remuneration}</td>
                    <td>
                      <img className="table-action-icon" src={see_details} alt="détails" onClick={() => toggleDetailsModal(mission)} />
                    </td>
                    <td>
                      <img className="table-action-icon" src={registered} alt="inscrit" onClick={() => toggleDropModal(mission._id, mission.title, LoggedMemberId)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div>
          <Modal isOpen={toggleDetailsModal} toggle={toggleDetailsModal}>
            {missionToSee && (
              < Form className="form-modal">
                <ModalHeader toggle={toggleDetailsModal}>Détails de la mission</ModalHeader>
                <ModalBody>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input type="text" value={missionToSee.title} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="status">Statut</Label>
                        <Input type="select" value={missionToSee.status} bsSize="sm" disabled >
                          <option value=""></option>
                          <option value="to do">À venir</option>
                          <option value="done">Fait</option>
                          <option value="cancelled">Annulée</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="partner">Partenaire</Label>
                        <Input type="email" value={missionToSee.partner?.name}bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" value={missionToSee.type} bsSize="sm" disabled >
                          <option value=""></option>
                          <option value="event">Événementiel</option>
                          <option value="corporate">En entreprise</option>
                          <option value="social">Social</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="text" value={missionToSee.time?.date} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="hours">Horaires</Label>
                        <Input type="text" value={missionToSee.time?.hours} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu</Label>
                        <Input type="email" value={missionToSee.location?.place} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="remuneration">Rémunération</Label>
                        <Input type="text" value={missionToSee.remuneration} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" value={missionToSee.description} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="fullAddress">Adresse</Label>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">N°</Label>
                            <Input type="text" value={missionToSee.location?.number} placeholder="N° de rue" bsSize="sm" disabled />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Rue</Label>
                            <Input type="text" value={missionToSee.location?.street} placeholder="Rue" bsSize="sm" disabled />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">Code postal</Label>
                            <Input type="text" value={missionToSee.location?.ZIPcode} placeholder="Code postal" bsSize="sm" disabled />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Ville</Label>
                            <Input type="text" value={missionToSee.location?.city} placeholder="Ville" bsSize="sm" disabled />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="requiredMembers">Masseurs requis</Label>
                        <Input type="number" value={missionToSee.requiredMembers} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="capacity">Jauge</Label>
                        <Input type="text" value={missionToSee.capacity} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button className='action-button' onClick={toggleDetailsModal}>
                    Ok
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Modal>
        </div>
      )}

      {showDropModal && (
        <div className=''>
          <Modal isOpen={toggleDropModal} toggle={toggleDropModal}>
            <ModalHeader toggle={toggleDropModal}>Se désinscrire à une mission</ModalHeader>
            <ModalBody>
              {missionToDrop && (
                <p>Êtes-vous sûr de vouloir vous désinscrire de la mission '{missionToDrop.title}' ?</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button className='action-button' onClick={() => handleDrop()}>
                Confirmer
              </Button>
              <Button className='cancel-button' onClick={toggleDropModal}>
                Annuler
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}

    </div >
  );
}

export default MyMissionsAdminDash;