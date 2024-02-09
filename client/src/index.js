import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/modal';
new Modal();
import IdeaForm from './components/ideaForm';
const ideaForm = new IdeaForm();
ideaForm.render();
import IdeaList from './components/ideaList';
new IdeaList();
