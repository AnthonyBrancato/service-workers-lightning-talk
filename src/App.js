import React from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/`)
    .then(res => res.json())
    .then(data => setImages(data))
    .catch(err => console.error(err))
  }, [])

  console.log(images);

  return (
    <div className="App">
      <div className="App-header">
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <h1>Open the dev tools</h1>
          <article>
            {images.slice(0, 6).map(element => (
              <img key={element.id} src={element.thumbnailUrl} alt='random' />
            ))}
            <img src={logo} alt='logo' />
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;
