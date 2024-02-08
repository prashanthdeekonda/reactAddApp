import logo from './bootstrap-logo.png';
import image from './IMG.jpeg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from 'react';
import AdditionApp from './AdditionApp';

function App() {

  const description = `I am from southern part of India and am here to pursue my dream. I am very passionate about learning new things`;

  const [name, setName] = useState('Sushank Sai Sriramoju');

  const [desc, setDesc] = useState(description);

  const [editable, setEditable] = useState(false);

  const [showAdditionApp, setShowAdditionApp] = useState(false);

  return (
    <div className="App">

      {/* navbar */}

      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid" style={{ "justify-content": "left"}}>
          <img src={logo} alt="bootstrapLogo" width="30" height="24" class="d-inline-block align-text-top" />
          <a class="navbar-brand px-5" href="#/profile" onClick={(e) => setShowAdditionApp(false)}>Profile           </a>
          <a class="navbar-brand " href="#/additon-app" onClick={(e) => setShowAdditionApp(true)}>Addition App</a>
        </div>
      </nav>

      {/* conditionally change the view between profile page and addition app */}

      {
        showAdditionApp ?
          (
            <AdditionApp />
          ) :
          (
            <div class="container mt-5">
              <div class="row align-items-start">
                <div class="col-auto">
                  <div class="thumbnail">
                    <img src={image} class="img-thumbnail" height="300" width="300" alt="profilepicture" />
                  </div>
                </div>
                <div class="col my-auto text-start">

                  {/* conditionally change the edit and save buttons on user click */}

                  <div class="text-end">
                    {
                      !editable ?
                        (
                          <i class="bi bi-pencil mb-5" onClick={(e) => setEditable(true)}></i>
                        ) :
                        (
                          <i class="bi bi-save mb-5" onClick={(e) => setEditable(false)}></i>
                        )
                    }
                  </div>

                  {/* conditionally change the input fields for edit click */}

                  {
                    editable ?
                      (
                        <>
                          <input type="text" class="form-control mb-2 mt-2" placeholder="profile name" aria-label="profile name" aria-describedby="profile-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <textarea class="form-control" placeholder="person description" aria-label="profile description" aria-describedby="profile-description" value={desc}
                            onChange={(e) => setDesc(e.target.value)} >

                          </textarea>
                        </>
                      )
                      :
                      (
                        <>
                          <h3 >{name}</h3>
                          <p class="text-wrap">{desc}</p>
                        </>
                      )
                  }

                </div>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default App;
