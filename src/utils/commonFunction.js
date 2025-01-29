export function formatText(text) {

    if (text == null) {
        return '';
    }
    // Replace markdown **bold** with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
   
    // Replace markdown **new line** with <br>
    // text = text.replace(/\n(.*?)\n/g, '<br>$1</br>');

    text = text.replace(/^######\s*(.*)$/gm, '<h6>$1</h6>')     // Replace ### with <h3>
    text = text.replace(/^#####\s*(.*)$/gm, '<h5>$1</h5>')     // Replace ### with <h3>
    text = text.replace(/^####\s*(.*)$/gm, '<h4>$1</h4>')     // Replace ### with <h3>
    text = text.replace(/^###\s*(.*)$/gm, '<h3>$1</h3>')     // Replace ### with <h3>
    text = text.replace(/^##\s*(.*)$/gm, '<h2>$1</h2>')   // Replace ## with <h2>
    text = text.replace(/^#\s*(.*)$/gm, '<h1>$1</h1>')     // Replace # with <h1>
    text = text.replace(/\n/g, '<br />'); // Replace remaining newlines with <br />
    
    // Replace markdown *italic* with <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace markdown __underline__ with <u>
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    
    return text;
}

export function stringToDocument(str) {

    const container = document.createElement('div');  
    container.innerHTML = str;

    // const parser = new DOMParser();
    // return parser.parseFromString( '<div>' + str + '</div>', 'text/html'); // Parse as HTML
    return container;
}