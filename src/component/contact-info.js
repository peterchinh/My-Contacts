import React, { useState } from 'react';
import styles from './contact-info.module.css';

// Sample data for testing
const contactInfo = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '(123) 456-7890',
    email: 'JohnDoe@gmail.com',
}


function ContactInfo() {

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const [contact, setContact] = useState({
    firstName: contactInfo.firstName,
    lastName: contactInfo.lastName,
    phoneNumber: contactInfo.phoneNumber,
    email: contactInfo.email,
  });

  function handleChange(event){
    /* to be added */
    return;
  }

  function EditContact(){
    toggleEdit();
    return;
  }

  function AddToGroup(){
    // To Be Added
    return;
  }

  function DeleteContact(){
    // To Be Added
    return;
  }

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src = "https://placehold.co/150x150"
        alt = "profile"
      />
      <div className={styles.body}>
        {isEditing ?
        // Form object. No real functionality yet.
        <>
        <div className={styles.inputName}> First Name... </div>
        <input className={styles.inputField} placeholder="first name" name="firstName"
               id="firstName" value={contact.firstName} onChange={handleChange}/>

        <div className={styles.inputName}> Last Name... </div>
        <input className={styles.inputField} placeholder="last name" name="lastName"
               id="lastName" value={contact.lastName} onChange={handleChange}/>

        <div className={styles.inputName}> Phone Number... </div>
        <input className={styles.inputField} placeholder="phone number" name="phoneNumber"
               id="phoneNumber" value={contact.phoneNumber} onChange={handleChange}/>

        <div className={styles.inputName}> Email... </div>
        <input className={styles.inputField} placeholder="email" name="email"
               id="email" value={contact.email} onChange={handleChange}/>
        </>
        :
        // Display
        <>
        <h2 className={styles.name} > {contactInfo.firstName + ' ' + contactInfo.lastName} </h2>
        <p className={styles.info}> {'Email: ' +  contactInfo.email } </p>
        <p className={styles.info}> {'Phone: ' + contactInfo.phoneNumber} </p>
        </>
        }
      </div>


      <div>
        {isEditing ?
        <input className={styles.submit} type = "submit" value = "Submit" onClick={EditContact} />
        :
        <>
        <input className={styles.group} type = "button" value = "Add to Group" onClick={AddToGroup} />
        <div>
        <input className={styles.edit} type = "button" value = "Edit" onClick={toggleEdit} />
        <input className={styles.deleteButton} type = "button" value = "Delete" onClick={DeleteContact} />
        </div>
        </>
        }
      </div>
    </div>
  );
}


export default ContactInfo;