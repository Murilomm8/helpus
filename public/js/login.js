   // Toast Helper
    function mostrarToast(mensagem, tipo = 'danger') {
      const cor = tipo === 'success' ? 'bg-success text-white' : 'bg-danger text-white';
      const toast = document.createElement('div');
      toast.className = `toast align-items-center ${cor} border-0 show`;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${mensagem}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button>
        </div>
      `;
      document.getElementById('toastContainer').appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }

    // Validação + Login
    (function () {
      'use strict';
      const form = document.querySelector('.needs-validation');
      const btnEntrar = document.getElementById('btnEntrar');
      const btnTexto = document.getElementById('btnTexto');
      const spinner = document.getElementById('spinner');

      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }

        btnEntrar.disabled = true;
        btnTexto.textContent = 'Entrando...';
        spinner.classList.remove('d-none');

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        try {
          const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
          });

          const dados = await res.json();

          if (res.ok) {
            mostrarToast(`Bem-vindo, ${dados.nome}!`, 'success');
            setTimeout(() => {
              window.location.href = dados.tipo === 'admin' ? 'admin.html' : 'index.html';
            }, 1500);
          } else {
            mostrarToast(dados.mensagem || 'E-mail ou senha incorretos.');
          }

        } catch (erro) {
          console.error('Erro de login:', erro);
          mostrarToast('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        }

        btnEntrar.disabled = false;
        btnTexto.textContent = 'Entrar';
        spinner.classList.add('d-none');
      }, false);
    })();