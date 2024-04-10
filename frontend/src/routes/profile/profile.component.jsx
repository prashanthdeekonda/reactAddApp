import image from "../../IMG.jpeg";

import React, { Fragment, useState } from "react";

const Profile = () => {
  const description = `I am from southern part of India and am here to pursue my dream. I am very passionate about learning new things`;

  const [name, setName] = useState("Sushank Sai Sriramoju");

  const [desc, setDesc] = useState(description);

  const [editable, setEditable] = useState(false);

  return (
    <Fragment>
      <div class="container mt-5" style={{color: "white"}}>
        <div class="row align-items-start">
          <div class="col-auto">
            <div class="thumbnail">
              <img
                src={image}
                class="img-thumbnail"
                height="300"
                width="300"
                alt="profilepicture"
              />
            </div>
          </div>
          <div class="col my-auto text-start">
            {/* conditionally change the edit and save buttons on user click */}

            <div class="text-end">
              {!editable ? (
                <i
                  class="bi bi-pencil mb-5"
                  onClick={(e) => setEditable(true)}
                ></i>
              ) : (
                <i
                  class="bi bi-save mb-5"
                  onClick={(e) => setEditable(false)}
                ></i>
              )}
            </div>

            {/* conditionally change the input fields for edit click */}

            {editable ? (
              <>
                <input
                  type="text"
                  class="form-control mb-2 mt-2"
                  placeholder="profile name"
                  aria-label="profile name"
                  aria-describedby="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  class="form-control"
                  placeholder="person description"
                  aria-label="profile description"
                  aria-describedby="profile-description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </>
            ) : (
              <>
                <h3>{name}</h3>
                <p class="text-wrap">{desc}</p>
              </>
            )}
          </div>
        </div>
      </div>
      )
    </Fragment>
  );
};

export default Profile;
