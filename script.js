document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');

  // Load saved selections
  buttons.forEach(btn => {
    const cardIndex = btn.getAttribute('data-card');
    const savedEmoji = localStorage.getItem(`card-${cardIndex}`);
    if (savedEmoji && btn.getAttribute('data-emoji') === savedEmoji) {
      btn.classList.add('selected');
    }
  });

  // Handle button clicks
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const cardIndex = btn.getAttribute('data-card');
      const emoji = btn.getAttribute('data-emoji');

      // Save selection
      localStorage.setItem(`card-${cardIndex}`, emoji);

      // Update UI
      const siblingButtons = btn.parentElement.children;
      for (const sibling of siblingButtons) {
        sibling.classList.remove('selected');
      }
      btn.classList.add('selected');

      // Show toast notification
      showToast(`You reacted with ${emoji}`);
    });
  });

  // Disable long click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Function to show toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Automatically remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }
});
