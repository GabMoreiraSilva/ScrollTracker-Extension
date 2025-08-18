document.addEventListener("DOMContentLoaded", () => {
const btn = document.getElementById("btnSalvar");
const status = document.getElementById("status");

	btn.addEventListener("click", () => {
			const startInput = document.getElementById("starttime").value;
			const endInput = document.getElementById("endtime").value;

			// Validação: obrigar a preencher
			if (!startInput || !endInput) {
			status.textContent = "⚠️ Preencha os dois horários!";
			status.style.color = "red";
			return;
			}

			// Converte para Date
			const startDate = new Date(startInput);
			const endDate = new Date(endInput);

			// Validação: início não pode ser depois do fim
			if (endDate <= startDate) {
			status.textContent = "⚠️ O horário de término deve ser maior que o de início.";
			status.style.color = "red";
			return;
			}

			// Calcula diferença em milissegundos
			const diffMs = endDate - startDate;

			// Converte para horas, minutos e segundos
			const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
			const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
			const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

			status.textContent = `✅ Diferença: ${diffHrs}h ${diffMins}m ${diffSecs}s`;
			status.style.color = "green";
			salvarNoBanco(diffMs);
		});

	async function salvarNoBanco(totalHoras) {
		try {
			const response = await fetch("http://localhost:3000/registros", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					total: totalHoras,
					criadoEm: new Date().toISOString()
				})
			});

			if (!response.ok) throw new Error("Erro ao enviar para o servidor");
			const data = await response.json();
			console.log("✅ Registro salvo:", data);
		} catch (error) {
			console.error("❌ Erro:", error);
		}
	}
});