// Dynamic interactive filtering & search for ALWINTR Portfolio
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');

  // Filter Buttons Handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      applyFilters(filterValue, searchInput.value.toLowerCase().trim());
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('.filter-btn.active');
      const filterValue = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      applyFilters(filterValue, e.target.value.toLowerCase().trim());
    });
  }

  function applyFilters(category, query) {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (category === 'all' || cardCategory === category);
      const matchesQuery = (!query || cardText.includes(query));

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Fetch Public Repositories Count
  fetch('https://api.github.com/users/ALWINTR')
    .then(res => res.json())
    .then(data => {
      if (data.public_repos) {
        const repoStatEl = document.getElementById('stat-repos');
        if (repoStatEl) {
          repoStatEl.textContent = `${data.public_repos}+`;
        }
      }
    })
    .catch(err => console.log('GitHub API fetch skipped'));
});
