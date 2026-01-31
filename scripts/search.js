document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-search');
  const input = document.getElementById('search-input');
  const list = document.getElementById('search-suggestions');

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  toggleBtn.addEventListener('click', () => {
    input.style.display = input.style.display === 'block' ? 'none' : 'block';
    input.focus();
  });

  input.addEventListener('input', debounce(function() {
    const value = input.value.trim();

    if (!value) {
      list.innerHTML = '';
      list.style.display = 'none';
      return;
    }

    fetch(`http://localhost:8000/search/${encodeURIComponent(value)}`)
      .then(res => res.json())
      .then(response => {
        const results = response.data || [];
        list.innerHTML = '';

        results.forEach(product => {
          const li = document.createElement('li');
          li.textContent = product.name;
          li.onclick = () => {
            window.location.href = `single-product.html?id=${product.id}`;
          };
          list.appendChild(li);
        });

        list.style.display = results.length ? 'block' : 'none';
      })
      .catch(err => {
        console.error('Search fetch error:', err);
      });

  }, 300));
});
