// Confirmación antes de eliminar
document.querySelectorAll('.eliminar-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (confirm('¿Estás seguro de eliminar este libro?')) {
        this.submit();
      }
    });
  });
  
  // Auto-cierre de alertas después de 5 segundos
  setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);