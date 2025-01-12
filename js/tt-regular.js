
// Função para ofuscar a string
function encode(str) {
    return btoa(str.split('').map((char) => 
        char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(''));
}

// Função para decodificar a string
function decode(str) {
    return atob(str).match(/.{1,2}/g).map((hex) => 
        String.fromCharCode(parseInt(hex, 16))
    ).join('');
}

// URL ofuscada
const encodedUrl = encode('https://glstrck.com/aff_c?offer_id=1539&aff_id=1497');

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.btn.btn-v2');
    if (!btn) return;
    
    // Remove o atributo href do botão
    btn.removeAttribute('href');
    
    // Adiciona o handler de clique
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const urlParams = new URLSearchParams(window.location.search);
        let finalUrl = decode(encodedUrl);
        
        const separator = finalUrl.includes('?') ? '&' : '?';
        
        let paramsAdded = false;
        urlParams.forEach((value, key) => {
            if (!paramsAdded) {
                finalUrl += separator;
                paramsAdded = true;
            } else {
                finalUrl += '&';
            }
            finalUrl += `${key}=${encodeURIComponent(value)}`;
        });
        
        // Adiciona um pequeno delay aleatório para dificultar automação
        setTimeout(() => {
            window.location.href = finalUrl;
        }, Math.random() * 100);
    });
    
    // Previne inspeção por right-click
    btn.addEventListener('contextmenu', e => e.preventDefault());
    
    // Desabilita visualização do link no hover
    btn.style.cursor = 'pointer';
});

// Adiciona proteção contra debug
(function() {
    const redirect = Function.prototype.toString;
    Object.defineProperty(Function.prototype, 'toString', {
        value: function() {
            if (this === decode || this === encode) {
                return 'function() { [native code] }';
            }
            return redirect.call(this);
        },
        writable: false,
        configurable: false
    });
})();
