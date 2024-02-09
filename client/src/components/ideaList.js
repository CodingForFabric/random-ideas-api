import IdeasAPI from '../services/ideasAPI';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._deleteBtn.forEach((el) => {
      el.addEventListener('click', this.deleteIdeas.bind(this));
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasAPI.getIdeas();
      this._ideas = res.data.data;
      console.log(this._ideas);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdeas(e) {
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    e.target.parentElement.parentElement.remove();
    try {
      await IdeasAPI.deleteIdea(id);
    } catch (error) {
      console.log('error');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        return `<div class="card" data-id="${idea._id}">
        <button class="delete"><i class="fas fa-times"></i></button>
         <h3>
           ${idea.text}
         </h3>
         <p class="tag ${this.getTagClass(
           idea.tag
         )}">${idea.tag.toUpperCase()}</p>
         <p>
           Posted on <span class="date">${idea.date}</span> by
           <span class="author">${idea.username}</span>
         </p>
       </div>`;
      })
      .join('');
    this._deleteBtn = document.querySelectorAll('.fa-times');
    this.addEventListeners();
  }
}

export default IdeaList;
