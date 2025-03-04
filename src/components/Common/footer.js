import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1b7b16', 
      height: '60px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
    }} className='mt-5'>
      <p style={{ 
        textAlign: 'center', 
        color: 'white', 
        margin: '0', 
        fontSize: '14px',
      }}>
        Developed By 
        <a 
          href="/" 
          style={{
            color: '#ffffff', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            marginLeft: '5px', 
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#ffcc00'}
          onMouseOut={(e) => e.target.style.color = '#ffffff'}
        >
          Muthu Dev
        </a>
      </p>
    </footer>
  );
}

export default Footer;
