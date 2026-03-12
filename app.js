document.addEventListener('DOMContentLoaded', () => {
    
    // -- 1. Dashboard Chart --
    const chartCanvas = document.getElementById('mainChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mar 11', '', '', '', 'Mar 12'],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [0, 0, 0, 0, 0], // Flat line as per screenshot
                    borderColor: '#2962ff',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    tension: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: true,
                            borderColor: '#e5e7eb'
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: { size: 12 },
                            maxRotation: 0
                        }
                    },
                    y: {
                        min: 0,
                        max: 2,
                        ticks: {
                            stepSize: 0.5,
                            color: '#9ca3af',
                            font: { size: 12 },
                            callback: function(value) {
                                return '₹' + value;
                            }
                        },
                        grid: {
                            color: '#f3f4f6',
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

    // -- 2. Modal Logic for 'Create Payment Link' --
    const modal = document.getElementById('paymentModal');
    const openBtn = document.getElementById('openPaymentModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('paymentForm');
    const resultDiv = document.getElementById('paymentResult');
    const linkInput = document.getElementById('generatedLink');

    if (modal && openBtn && closeBtn) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            form.style.display = 'block';
            resultDiv.style.display = 'none';
            form.reset();
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = document.getElementById('txAmount').value;
            const btn = form.querySelector('button[type="submit"]');
            
            // Mocking the API Request to Upeeqst / Upipay
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Generating...';
            btn.disabled = true;

            setTimeout(() => {
                // Mock response
                const mockTxId = 'txn_' + Math.random().toString(36).substr(2, 9);
                const mockLink = `https://pay.upipay.com/${mockTxId}?amt=${amount}`;
                
                form.style.display = 'none';
                resultDiv.style.display = 'block';
                linkInput.value = mockLink;
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 800);
        });
    }

});

// Global helper for copy buttons
window.copyToClipboard = function(elementId) {
    const copyText = document.getElementById(elementId);
    if (!copyText) return;
    
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        navigator.clipboard.writeText(copyText.value).then(() => {
            alert("Copied to clipboard: " + copyText.value);
        });
    } catch (err) {
        // Fallback for older browsers
        document.execCommand("copy");
        alert("Copied to clipboard!");
    }
}

// Multi-Step Modal Handling for Connect-M
document.addEventListener('DOMContentLoaded', () => {
    const merchantModal = document.getElementById('merchantModal');
    const openBtn = document.getElementById('openMerchantModalBtn');
    const closeBtns = document.querySelectorAll('.closeModalBtn');
    
    const tosCheckbox = document.getElementById('tosCheckbox');
    const btnAgreeTos = document.getElementById('btnAgreeTos');
    
    const btnNext1 = document.getElementById('btnNext1');
    const btnNext2 = document.getElementById('btnNext2');
    const btnBack2 = document.getElementById('btnBack2');
    const btnBack3 = document.getElementById('btnBack3');

    const steps = [
        document.getElementById('step-tos'),
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3')
    ];

    function showStep(index) {
        steps.forEach((s, i) => {
            if (s) {
                if (i === index) s.classList.add('active');
                else s.classList.remove('active');
            }
        });
    }

    if (openBtn && merchantModal) {
        openBtn.addEventListener('click', () => {
            merchantModal.classList.add('active');
            showStep(0); // Show TOS First
            if(tosCheckbox) tosCheckbox.checked = false;
            if(btnAgreeTos) {
                btnAgreeTos.disabled = true;
                btnAgreeTos.style.opacity = "0.5";
            }
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (merchantModal) merchantModal.classList.remove('active');
        });
    });

    if (tosCheckbox && btnAgreeTos) {
        tosCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                btnAgreeTos.disabled = false;
                btnAgreeTos.style.opacity = "1";
            } else {
                btnAgreeTos.disabled = true;
                btnAgreeTos.style.opacity = "0.5";
            }
        });

        btnAgreeTos.addEventListener('click', () => showStep(1));
    }

    if (btnNext1) btnNext1.addEventListener('click', () => showStep(2));
    if (btnNext2) btnNext2.addEventListener('click', () => showStep(3));
    if (btnBack2) btnBack2.addEventListener('click', () => showStep(1));
    if (btnBack3) btnBack3.addEventListener('click', () => showStep(2));

});
