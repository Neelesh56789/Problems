const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');

textInput.addEventListener('input', function() {
    charCount.textContent = textInput.value.length;
});
