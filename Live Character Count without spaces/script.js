const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');

textInput.addEventListener('input', function() {
    // Count characters excluding spaces
    const count = textInput.value.split(' ').join('').length;
    charCount.textContent = count;
});
